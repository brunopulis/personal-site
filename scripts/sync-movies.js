#!/usr/bin/env node

import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function extractTmdbId(url) {
  if (!url) return null;
  const tmdbMatch = url.match(/themoviedb\.org\/movie\/(\d+)/);
  if (tmdbMatch) return { id: tmdbMatch[1], type: "tmdb" };
  const imdbMatch = url.match(/imdb\.com\/\w*\/title\/(tt\d+)/);
  return imdbMatch ? { id: imdbMatch[1], type: "imdb" } : null;
}

async function searchMovieByTitle(query) {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=pt-BR`;
  const response = await fetchJson(url);
  return response.results?.[0] || null;
}

async function getMovieDetails(movieId) {
  const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=pt-BR&append_to_response=credits`;
  return fetchJson(url);
}

async function fetchMovieData(identifier, title, isImbdId = false) {
  if (isImbdId) {
    const searchResult = await searchMovieByTitle(title);
    if (searchResult) {
      return { ...searchResult, foundVia: "title" };
    }
    throw new Error("Movie not found via title search");
  }
  return getMovieDetails(identifier);
}

function getMoviesDir() {
  return path.resolve("src/content/watching/movies");
}

function getYearDirs(dir) {
  return fs.readdirSync(dir)
    .filter(f => fs.statSync(path.join(dir, f)).isDirectory())
    .filter(f => /^\d{4}$/.test(f))
    .sort((a, b) => b - a);
}

function getMovieFiles(yearDir) {
  return fs.readdirSync(yearDir)
    .filter(f => f.endsWith(".md"))
    .map(f => path.join(yearDir, f));
}

function readFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const frontmatter = {};
  match[1].split("\n").forEach(line => {
    const [key, ...valueParts] = line.split(":");
    if (key && valueParts.length) {
      let value = valueParts.join(":").trim();
      if (value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1);
      } else if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      frontmatter[key.trim()] = value;
    }
  });
  return frontmatter;
}

function updateFrontmatter(filePath, updates) {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  const newLines = [];
  let inFrontmatter = false;
  let frontmatterEnd = false;

  lines.forEach(line => {
    if (line.trim() === "---") {
      if (!inFrontmatter) {
        inFrontmatter = true;
        newLines.push(line);
      } else if (!frontmatterEnd) {
        frontmatterEnd = true;
        Object.entries(updates).forEach(([key, value]) => {
          if (value !== undefined && value !== "") {
            newLines.push(`${key}: ${value}`);
          }
        });
        newLines.push(line);
      } else {
        newLines.push(line);
      }
    } else if (!frontmatterEnd) {
      newLines.push(line);
    } else {
      newLines.push(line);
    }
  });

  fs.writeFileSync(filePath, newLines.join("\n"));
}

async function syncMoviesMain() {
  const moviesDir = getMoviesDir();
  const yearDirs = getYearDirs(moviesDir);

  console.log(`Found ${yearDirs.length} year directories\n`);

  let totalUpdated = 0;
  let totalErrors = 0;
  const moviesByYear = {};

  for (const year of yearDirs) {
    const yearDir = path.join(moviesDir, year);
    const movieFiles = getMovieFiles(yearDir);

    if (!moviesByYear[year]) {
      moviesByYear[year] = [];
    }

    for (const filePath of movieFiles) {
      const frontmatter = readFrontmatter(filePath);
      const identifierData = extractTmdbId(frontmatter.url);
      const title = frontmatter.title;

      if (!identifierData) {
        console.log(`⚠️  Skipping ${path.basename(filePath)} - no TMDB/IMDb URL`);
        totalErrors++;
        continue;
      }

      const { id: identifier, type } = identifierData;
      const isImdbId = type === "imdb";

      try {
        console.log(isImdbId ? `Searching "${title}"...` : `Fetching TMDB ${identifier}...`);
        const details = await fetchMovieData(identifier, title, isImdbId);

        const updates = {
          title: details.title || frontmatter.title,
          poster: details.poster_path
            ? `https://image.tmdb.org/t/p/w600_and_h900_face${details.poster_path}`
            : frontmatter.poster,
          director: details.credits?.crew?.find(c => c.job === "Director")?.name || frontmatter.director,
          category: details.genres?.map(g => g.name).join(", ") || frontmatter.category,
        };

        if (!frontmatter.url?.includes("themoviedb")) {
          updates.url = `https://www.themoviedb.org/movie/${details.id}-${title.toLowerCase().replace(/\s+/g, "-")}`;
        }

        updateFrontmatter(filePath, updates);

        moviesByYear[year].push({
          title: updates.title,
          tmdbId: details.id,
          file: path.basename(filePath),
        });

        console.log(`  ✓ ${updates.title} (${year})`);
        totalUpdated++;
      } catch (err) {
        console.log(`  ✗ Error: ${err.message}`);
        totalErrors++;
      }
    }
  }

  console.log("\n--- Summary ---");
  console.log(`Total updated: ${totalUpdated}`);
  console.log(`Total errors: ${totalErrors}`);

  console.log("\n--- Movies by Year ---");
  const years = Object.keys(moviesByYear).sort((a, b) => b - a);
  for (const year of years) {
    const movies = moviesByYear[year];
    if (movies.length > 0) {
      console.log(`\n${year} (${movies.length} movies):`);
      movies.forEach(m => {
        console.log(`  - ${m.title}`);
      });
    }
  }
}

syncMoviesMain().catch(console.error);