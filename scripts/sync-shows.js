#!/usr/bin/env node

import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const STATUS_ORDER = [
  "Quero assistir",
  "assistindo",
  "abandonei",
  "assistido",
  "reassistindo",
  "favorito"
];

const STATUS_MAP = {
  "assistindo": "assistindo",
  "watching": "assistindo",
  "assistido": "assistido",
  "watched": "assistido",
  "completed": "assistido",
  "abandoned": "abandonei",
  "abandonei": "abandonei",
  "dropped": "abandonei",
  "reassistindo": "reassistindo",
  "rewatching": "reassistindo",
  "plantowatch": "Quero assistir",
  "ptw": "Quero assistir",
  "plantowatch": "Quero assistir",
  "favorito": "favorito",
  "favorite": "favorito"
};

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function normalizeStatus(status) {
  if (!status) return null;
  const s = status.toLowerCase().trim();
  return STATUS_MAP[s] || null;
}

function extractTmdbId(url) {
  if (!url) return null;
  const tmdbMatch = url.match(/themoviedb\.org\/tv\/(\d+)/);
  if (tmdbMatch) return { id: tmdbMatch[1], type: "tmdb" };
  const imdbMatch = url.match(/imdb\.com\/\w*\/title\/(tt\d+)/);
  return imdbMatch ? { id: imdbMatch[1], type: "imdb" } : null;
}

async function searchShowByTitle(query) {
  const url = `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=pt-BR`;
  const response = await fetchJson(url);
  return response.results?.[0] || null;
}

async function getShowDetails(showId) {
  const url = `${BASE_URL}/tv/${showId}?api_key=${API_KEY}&language=pt-BR&append_to_response=credits`;
  return fetchJson(url);
}

async function fetchShowData(identifier, title, isImbdId = false) {
  if (isImbdId) {
    const searchResult = await searchShowByTitle(title);
    if (searchResult) {
      return { ...searchResult, foundVia: "title" };
    }
    throw new Error("Show not found via title search");
  }
  return getShowDetails(identifier);
}

function getShowsDir() {
  return path.resolve("src/content/watching/shows");
}

function getYearDirs(dir) {
  return fs.readdirSync(dir)
    .filter(f => fs.statSync(path.join(dir, f)).isDirectory())
    .filter(f => /^\d{4}$/.test(f))
    .sort((a, b) => b - a);
}

function getShowFiles(yearDir) {
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

function getStatusLabel(status) {
  const normalized = normalizeStatus(status);
  return STATUS_ORDER.find(s => s.toLowerCase() === normalized?.toLowerCase()) ||
         STATUS_ORDER.find(s => s === status) ||
         status;
}

async function syncShowsMain() {
  const showsDir = getShowsDir();
  const yearDirs = getYearDirs(showsDir);

  console.log(`Found ${yearDirs.length} year directories\n`);

  let totalUpdated = 0;
  let totalErrors = 0;
  const showsByYear = {};

  for (const year of yearDirs) {
    const yearDir = path.join(showsDir, year);
    const showFiles = getShowFiles(yearDir);

    if (!showsByYear[year]) {
      showsByYear[year] = {};
      STATUS_ORDER.forEach(s => showsByYear[year][s] = []);
    }

    for (const filePath of showFiles) {
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
        const details = await fetchShowData(identifier, title, isImdbId);

        const status = getStatusLabel(frontmatter.status);

        const updates = {
          title: details.name || frontmatter.title,
          poster: details.poster_path
            ? `https://image.tmdb.org/t/p/w600_and_h900_face${details.poster_path}`
            : frontmatter.poster,
          category: details.genres?.map(g => g.name).join(", ") || frontmatter.category,
        };

        if (!frontmatter.url?.includes("themoviedb")) {
          updates.url = `https://www.themoviedb.org/tv/${details.id}-${title.toLowerCase().replace(/\s+/g, "-")}`;
        }

        updateFrontmatter(filePath, updates);

        if (!showsByYear[year][status]) {
          showsByYear[year][status] = [];
        }
        showsByYear[year][status].push({
          title: updates.title,
          tmdbId: details.id,
          file: path.basename(filePath),
        });

        console.log(`  ✓ ${updates.title} (${status})`);
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

  console.log("\n--- Shows by Year and Status ---");
  const years = Object.keys(showsByYear).sort((a, b) => b - a);
  for (const year of years) {
    const yearShows = showsByYear[year];
    let hasShows = false;

    for (const status of STATUS_ORDER) {
      if (yearShows[status]?.length > 0) {
        if (!hasShows) {
          console.log(`\n${year}:`);
          hasShows = true;
        }
        console.log(`  ${status} (${yearShows[status].length}):`);
        yearShows[status].forEach(s => {
          console.log(`    - ${s.title}`);
        });
      }
    }
  }
}

syncShowsMain().catch(console.error);