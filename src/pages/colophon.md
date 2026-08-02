---
layout: base.njk
permalink: '/colophon/'
title: Colophon
---

# Colophon

A short "how it's made" page for this site.
How this site is built

This website is currently built with 🎈 Eleventy (11ty) v3.1.5, a wonderful static site generator that prioritizes speed and simplicity. The domain brennan.day is registered on Porkbun and hosted on Netlify with automatic HTTPS via Let's Encrypt. The site uses Deflect.ca nameservers for enhanced DDoS protection and digital security.

The CSS is custom-built with a Gruvbox-inspired colour scheme and no external frameworks, prioritizing performance and maintainability. The typefaces* use modern font stacks from Modern Font Stacks: Geometric Humanist (Avenir, Montserrat, Corbel) for headings, Old Style (Iowan Old Style, Palatino Linotype) for body text, and Monospace Code (Cascadia Code, Source Code Pro, Menlo) for code and metadata. These system fonts eliminate external dependencies and improve page load performance.

The site features the Tomatic cursor set by JefTriforce, available at RW-Designer. These cute, fat cursors are licensed under Creative Commons - Attribution + Noncommercial.

The site's 88x31 button was created using the Button Generator from Ritual.

Drafts are usually written first as Markdown files in 750 Words, a practice of mine since September 2011. Other times, I write in Bear for note-taking and idea capture.

Content is then transferred to the local git repository on GitLab, with changes saved using git. Development and formatting done in Sublime Text 4.

Tech stack for brennan.day:

    Static Site Generator: Eleventy (11ty) v3.1.5
    Template Engine: Nunjucks for layouts and partials
    Markdown: Content written in Markdown with YAML front matter
    Styling: Custom CSS (Gruvbox-inspired color scheme) with no framework dependencies
    Search: Pagefind for static, client-side search
    Syntax Highlighting: @11ty/eleventy-plugin-syntaxhighlight
    RSS/JSON Feeds: @11ty/eleventy-plugin-rss for RSS/Atom/JSON feeds
    Math Rendering: @vscode/markdown-it-katex for LaTeX equations
    Emoji Support: markdown-it-emoji for emoji shortcodes
    Footnotes: markdown-it-footnote for standard markdown footnotes
    Diagrams: Mermaid.js for flowcharts and diagrams
    Like Button: iine for post engagement tracking
    Hosting: Netlify with continuous deployment
    DNS Security: Deflect.ca nameservers for DDoS protection
    Version Control: Git + GitLab

Digital Security & Resilience

This site uses Deflect.ca for DNS management and DDoS protection. Deflect is a Canadian social enterprise by eQualitie that provides free DDoS mitigation and website security services to civil society organizations, independent media, and human rights groups worldwide. Founded in 2011, Deflect protects organizations facing digital threats and censorship, supporting approximately 2% of the global internet population annually. Their work has defended sites like Black Lives Matter, Ukrainian independent media, and countless human rights organizations against cyber attacks.
Enhanced Markdown Capabilities

The site supports extended markdown features for rich content creation:

    Mathematical expressions via KaTeX (inline $ and block $$ delimiters)
    Emoji shortcodes that automatically convert to emoji characters
    Standard markdown footnotes with proper styling and backlinks
    Mermaid diagrams for visual representations of processes and relationships
    Custom CSS classes for styled components (alerts, buttons, color utilities)

These features enable technical writing, academic content, and expressive formatting while maintaining the simplicity of plain text authoring. See the style guide for a complete demonstration of all markdown capabilities.
IndieWeb Features

This site follows IndieWeb principles:

    Microformats2: Proper h-card, h-entry, and h-feed markup for machine-readable content
    Webmentions: Configured with webmention.io for receiving interactions
    POSSE: Publish (Own Site, Syndicate Elsewhere) - canonical content lives here first
    IndieAuth: 20+ rel-me verification links establishing identity across the web
    WebSub: Hub and self links configured for instant feed push notifications to subscribers
    RSS/Atom/JSON Feeds: Multiple feed formats at /feed.xml and /feed.json
    Semantic HTML: Proper landmarks, ARIA labels, and accessibility features

All 9 of 9 key IndieWeb building blocks are implemented, as verified by an IndieWeb checker.
Principles

    Plain text survives. Markdown + git keeps the work portable and future-proof.
    Performance matters. Shipping less is a form of respect. Target: 95+ Lighthouse scores.
    Accessibility is non-negotiable. Sites that work for people, not screens. WCAG 2.1 AA compliance.
    Progressive enhancement. Start with what works everywhere, enhance from there.
    Own your data. Canonical content on my domain, syndicated elsewhere as desired.
    Build in the open. Source code available on GitLab, documented for others to learn from.

Current Site Statistics

    Build time: ~4.6 seconds (including search indexing)
    Pages generated: 425
    Blog posts: 185+ and growing
    Static pages: 45+
    Tag pages: 80+ with h-feed markup
    Search index: 30,335 words across 422 pages
    rel-me links: 20+ verified profiles across the web

Performance Optimizations

The site has been optimized for faster builds and better development experience:

    Filter caching: lastModified batches all git queries into a single process at startup; assetHash caches MD5 results to avoid redundant disk reads — cutting cold-start time from 13.99s to under 3s
    Disk-persistent git cache: Timestamp data is written to .cache/git-timestamps.json keyed by HEAD SHA, making repeated cold starts nearly free once the cache is warm
    EleventyFetch for remote data: Guestbook and webmention fetches are cached to disk for 6 hours, skipping live network requests on successive builds
    Modular config: .eleventy.js refactored from an 866-line monolith into four focused modules (config/filters.js, config/shortcodes.js, config/collections.js, config/markdown.js) — easier to read, easier to extend
    Incremental builds: Only rebuilds changed files during development

See I Made My Eleventy Build 5× Faster for build-time benchmarks and Cleaning House for the config refactor.
Operational Notes

These details are mostly for future-me (or anyone curious enough to poke at the source).
Commit Conventions

All commits follow type: description in lowercase, imperative tense. The types are tailored to a personal blog so the changelog is readable at a glance. Each type has a clear, non-overlapping job:
Type 	Purpose
post: 	New essay, blog post, or other published written content
edit: 	Corrections, revisions, or expansions to existing written content
update: 	Routine data refreshes like comments, stats, now page, friends list
design: 	Visual, layout, or CSS changes
build: 	Site infrastructure, config, tooling, or dependency changes
fix: 	Code bugs only; prose corrections use edit: instead
ci: 	CI/CD pipeline changes (GitLab CI, Netlify config)
a11y: 	Accessibility improvements like ARIA, contrast, alt text, semantics
perf: 	Performance improvements like build speed, asset size, caching
refactor: 	Code restructuring without behaviour change
revert: 	Undoing a previous commit

The distinction between post: and edit: matters most: someone scanning the changelog can immediately see which days had new writing versus housekeeping. update: absorbs all the automated, timestamped noise (comment syncs, stats refreshes) without polluting either. fix: is reserved strictly for broken code.
Local Development

Prerequisites:

    Node.js 18+ and npm

Commands:

npm install
npm start              # Standard development server
npm run start:fast     # Quieter development output
npm run start:clean    # Start with clean cache

The dev server runs at http://localhost:8081 with incremental builds enabled.

To build the site:

npm run build          # Production build
npm run build:clean    # Clean build from scratch
npm run build:perf     # Test build speed without writing files

For debugging and performance profiling:

npm run debug          # Verbose Eleventy output
npm run debug:perf     # Performance profiling with timing

Webmentions

Webmentions are fetched from webmention.io at build time. The build expects a token:

export WEBMENTION_IO_TOKEN=your_token_here

Deployment

Hosting is on Netlify with continuous deployment from GitLab.

Build settings:

    Build command: npm run build
    Publish directory: _site

