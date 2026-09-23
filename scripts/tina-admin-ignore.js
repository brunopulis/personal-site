#!/usr/bin/env node

/**
 * Marka _site/admin/index.html (painel do TinaCMS) como ignorado pelo Pagefind,
 * injectando data-pagefind-ignore no <body>. Chamado logo após `tinacms build`.
 */

import fs from 'node:fs';
import path from 'node:path';

const file = path.join('_site', 'admin', 'index.html');

try {
  let html = fs.readFileSync(file, 'utf-8');

  if (html.includes('data-pagefind-ignore')) {
    process.exit(0);
  }

  html = html.replace(/<body([^>]*)>/, (match, attrs) => `<body data-pagefind-ignore${attrs}>`);

  fs.writeFileSync(file, html);
  console.log(`[tina] ${file} marcado para ser ignorado pelo Pagefind`);
} catch {
  process.exit(0);
}
