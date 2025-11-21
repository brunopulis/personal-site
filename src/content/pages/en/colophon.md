---
title: 'Colophon'
description: 'Technologies I haved use on this site'
lang: 'en'
routeKey: 'colophon'
date: '2025-11-21'
---

## About this Site

This site is intended to serve as my personal home on the web. I write about many different topics that interest me for fun. It’s part profile, part public journal, part playground.

In many ways it serves as an excuse to push myself and try different technologies. In this case using a static site is an intentional exercise to help me think more about the layout and styles I use. At the same time I hope to improve the performance of the site and experimenting with optimizations.

I started the site mainly to serve as a professional profile that I could point to instead of updating my bio on every site with a profile page. The scope has expanded over time as I migrated blog content after I became unhappy with the Medium.com reader experience.

In 2021 I began experimenting more with IndieWeb concepts and added other kinds of posts as I became more unhappy with the impact of traditional social media sites. In March 2022 I added support for notes. In June 2022, I backfilled photos I had previously posted on Instagram. In September 2022 I started supporting receiving webmention responses.

## Technology

The code for this website is on GitHub and deployed to Netlify. Posts are saved as markdown files and created manually, using Decap CMS, or via an Indiekit micropub server. The build is processed using Eleventy, a static site generator for node. This site was originally hosted on GitHub pages with a Jekyll build when it was launched at the end of 2017.

The styles of this site are primarily hand written and designed to be minimal. Some downleveling of new CSS standards is done via lightning CSS. See the style guide for more details on theming. The site uses system fonts to minimize page size and load times. Included are some SVG icons from Material Design Icons. Other icons (like logos) are made by Pixel perfect from www.flaticon.com

Webmention receiving is handled by webmention.io while rendering responses is done client-side with code modified from webmention.js. Webmentions are automatically sent via a fork of webmention.app triggered during the static site build by netlify-plugin-webmentions. Interactions with the fediverse are translated to and from ActivityPub via Bridgy Fed. Webmentions are also used to syndicate posts to Octothorp.es.

This site currently uses CloudFlare analytics due to its better privacy policy and limited performance impact. Previously I’ve used GoatCounter.

If there is an problem with this website or improvement you’d like to suggest, please open an issue on GitHub or reach out directly.

---

[Colophon](<https://en.wikipedia.org/wiki/Colophon_(publishing)>) is a publishing term typically used to describe the publishing process but has been expanded to websites. This page was inspired by Binyamin Aron Green and Eric Bailey.
