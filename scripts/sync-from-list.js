#!/usr/bin/env node

import fs from "fs";
import path from "path";
import slugify from "slugify";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const LIST_STATUS_MAP = {
  "8577926": "assistido",
  "8646808": "reassistindo",
  "8577929": "Quero assistir",
  "8577927": "assistindo",
  "8577928": "abandonei"
};

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function getListItems(listId, page = 1) {
  const url = `${BASE_URL}/list/${listId}?api_key=${API_KEY}&language=pt-BR&page=${page}`;
  const response = await fetchJson(url);
  const results = response.items || [];
  if (response.total_pages && page < response.total_pages) {
    const more = await getListItems(listId, page + 1);
    return [...results, ...more];
  }
  return results;
}

async function getDetails(itemId, mediaType) {
  const endpoint = mediaType === "tv" ? "tv" : "movie";
  const url = `${BASE_URL}/${endpoint}/${itemId}?api_key=${API_KEY}&language=pt-BR&append_to_response=credits`;
  return fetchJson(url);
}

async function syncList(listId, status, contentDir) {
  console.log(`\n=== ${status} (List: ${listId}) ===`);
  console.log(`Fetching list ${listId}...`);
  
  const items = await getListItems(listId);
  console.log(`Found ${items.length} items\n`);

  const moviesDir = path.join(contentDir, "watching", "movies");
  const showsDir = path.join(contentDir, "watching", "shows");

  let created = 0;
  let skipped = 0;

  for (const item of items) {
    const title = item.title || item.name || null;
    if (!title) {
      console.log(`  ⚠️  Skipping without title (TMDB ID: ${item.id})`);
      skipped++;
      continue;
    }

    const mediaType = item.media_type || (item.first_air_date ? "tv" : "movie");
    const currentYear = new Date().getFullYear();
    const yearStr = String(currentYear);
    
    const targetDir = mediaType === "tv" ? showsDir : moviesDir;
    const yearDir = path.join(targetDir, yearStr);
    
    const safeTitle = title.replace(/[:\-"']/g, " ").replace(/\s+/g, " ").trim();
    const fileName = `${yearStr}-${slugify(safeTitle, { lower: true, strict: true })}.md`;
    const filePath = path.join(yearDir, fileName);

    if (!fs.existsSync(yearDir)) {
      fs.mkdirSync(yearDir, { recursive: true });
    }

    const details = await getDetails(item.id, mediaType).catch(() => null);
    if (!details) {
      console.log(`  ⚠️  Not found on TMDB: ${title}`);
      skipped++;
      continue;
    }

    const creator = mediaType === "tv"
      ? details.created_by?.map(c => c.name).join(", ") || ""
      : details.credits?.crew?.find(c => c.job === "Director")?.name || "";
    
    const genres = details.genres?.map(g => g.name).join(", ") || "";
    const poster = details.poster_path
      ? `https://image.tmdb.org/t/p/w600_and_h900_face${details.poster_path}`
      : "";
    
    const safeTitleForUrl = title.replace(/[:\-"']/g, " ").replace(/\s+/g, " ").trim();
    const tmdbUrl = mediaType === "tv"
      ? `https://www.themoviedb.org/tv/${item.id}-${slugify(safeTitleForUrl, { lower: true })}.html`
      : `https://www.themoviedb.org/movie/${item.id}-${slugify(safeTitleForUrl, { lower: true })}.html`;

    const frontmatter = `---
title: "${title}"
director: ${creator}
category: ${genres}
status: ${status}
rating: 
type: ${mediaType}
watchedYear: ${currentYear}
poster: ${poster}
url: ${tmdbUrl}
watchedDate: ${new Date().toISOString()}
favorite: false
---
`;

    try {
      fs.writeFileSync(filePath, frontmatter);
      console.log(`  ✓ ${title} (${yearStr}) [${mediaType}]`);
      created++;
    } catch (err) {
      console.log(`  ✗ Error writing ${title}: ${err.message}`);
      skipped++;
    }
  }

  console.log(`  Created: ${created}, Skipped: ${skipped}`);
  return { created, skipped };
}

async function main() {
  const args = process.argv.slice(2);
  const contentDir = path.resolve("src/content");

  const lists = args.length > 0 ? args : Object.keys(LIST_STATUS_MAP);

  console.log(`Syncing ${lists.length} lists from TMDB...`);

  let totalCreated = 0;
  let totalSkipped = 0;

  for (const listId of lists) {
    const status = LIST_STATUS_MAP[listId] || "assistido";
    const result = await syncList(listId, status, contentDir);
    totalCreated += result.created;
    totalSkipped += result.skipped;
  }

  console.log(`\n=== TOTAL ===`);
  console.log(`Created: ${totalCreated}`);
  console.log(`Skipped: ${totalSkipped}`);
}

main().catch(console.error);