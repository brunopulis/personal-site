#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const folders = ['src/content/notas', 'src/content/newsletter', 'src/content/posts', 'src/content/reply'];

const CONTENT_DIR = path.join(__dirname, folders[3]);
const SRC_DIR = path.join(__dirname, 'src');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
    } else {
      if (file.endsWith('.md')) {
        arrayOfFiles.push(path.join(dirPath, '/', file));
      }
    }
  });

  return arrayOfFiles;
}

function checkImages() {
  const files = getAllFiles(CONTENT_DIR);
  let missingImages = [];

  console.log(`Scanning ${files.length} files in ${CONTENT_DIR}...`);

  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Remove code blocks to avoid false positives
    content = content.replace(/```[\s\S]*?```/g, '');
    content = content.replace(/`[^`]*`/g, '');

    // Regex for markdown images: ![alt](url)
    const markdownImageRegex = /!\[.*?\]\((.*?)\)/g;

    // Regex for HTML images: <img src="url"
    const htmlImageRegex = /<img.*?src=["'](.*?)["']/g;

    let match;

    // Check Markdown images
    while ((match = markdownImageRegex.exec(content)) !== null) {
      const imageUrl = match[1];
      checkImage(file, imageUrl, missingImages);
    }

    // Check HTML images
    while ((match = htmlImageRegex.exec(content)) !== null) {
      const imageUrl = match[1];
      checkImage(file, imageUrl, missingImages);
    }
  });

  if (missingImages.length > 0) {
    console.log('\nFound missing images:');
    missingImages.forEach(item => {
      console.log(`File: ${path.relative(__dirname, item.file)}`);
      console.log(`  Image: ${item.image}`);
      console.log(`  Resolved Path: ${item.resolvedPath}`);
      console.log('---');
    });
  } else {
    console.log('\nNo missing images found.');
  }
}

function checkImage(file, imageUrl, missingImages) {
  // Ignore external links
  if (imageUrl.startsWith('http') || imageUrl.startsWith('//')) {
    return;
  }

  let imagePath;

  // Handle absolute paths (relative to project root/src)
  if (imageUrl.startsWith('/')) {
    // Try mapping /assets to src/assets
    if (imageUrl.startsWith('/assets/')) {
      imagePath = path.join(SRC_DIR, imageUrl.substring(1)); // Remove leading /
    } else {
      // Assuming other absolute paths might be relative to src or root.
      // Let's try relative to src first as it's common in this project structure
      imagePath = path.join(SRC_DIR, imageUrl.substring(1));
    }
  } else {
    // Relative path
    imagePath = path.resolve(path.dirname(file), imageUrl);
  }

  // Check if file exists
  if (!fs.existsSync(imagePath)) {
    // Try one more fallback: maybe it's relative to project root?
    const rootPath = path.join(__dirname, imageUrl.startsWith('/') ? imageUrl.substring(1) : imageUrl);
    if (!fs.existsSync(rootPath)) {
      missingImages.push({
        file: file,
        image: imageUrl,
        resolvedPath: imagePath
      });
    }
  }
}

checkImages();
