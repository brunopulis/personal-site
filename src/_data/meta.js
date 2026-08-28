export const url = process.env.URL || 'http://localhost:8080';

// Extract domain from `url`
export const domain = new URL(url).hostname;
export const siteName = 'Bruno Pulis';
export const siteDescription = 'Engenheiro de Acessibilidade, desenvolvedor frontend, teologo';
export const siteType = 'Person'; // schema
export const locale = 'pt_BR';
export const lang = 'pt-br';
export const skipContent = 'Ir para conteúdo principal';

// Source logo used by the favicon generation script
export const pathToSvgLogo = 'src/assets/favicon.svg';

export const author = {
  name: 'Bruno Pulis',
  description:
    'Aqui compartilho pensamentos, descobertas e conversas longe do ruído dos algoritmos das redes sociais.',
  url: 'https://brunopulis.com',
  author: 'Bruno Pulis',
  email: 'brunopulis@protonmail.com',
  social: {
    github: 'brunopulis',
    mastodon: 'https://mastodon.social/@brunopulis',
    bluesky: 'https://bsky.app/profile/brunopulis.com',
    youtube: 'https://youtube.com/c/BrunoPulis',
    linkedin: 'https://linkedin.com/in/pulis',
    twitter: '@brunopulis'
  },
  repo: {
    url: 'https://github.com/brunopulis/personal-site',
    branch: 'main'
  },
  bio: {
    short:
      'Engenheiro de acessibilidade, focado em experiências inclusivas, teólogo, pensador e minimalista digital.',
    long: 'Apaixonado por escrita reflexiva, conexões significativas e pela construção de uma internet mais humana. Este é o meu cantinho na internet, onde compartilho ideias, experiências e descobertas.'
  },
  location: {
    city: 'Belo Horizonte',
    country: 'Brasil'
  },
  timezone: 'America/Sao_Paulo',
  newsletter: {
    enabled: true,
    provider: 'substack',
    action: 'https://brunopulis.substack.com',
    title: 'Assine minha newsletter',
    description: 'Receba atualizações direto no seu e-mail. Sem spam, apenas conteúdo significativo.'
  },
  donate: {
    enabled: true,
    kofi: 'brunopulis',
    paypal: '7YBCWD8WYY4ZA',
    github: 'brunopulis',
    message:
      'Se você valoriza meus textos, considere apoiar meu trabalho. Cada contribuição me ajuda a continuar criando conteúdo relevante.'
  },
  analytics: {
    enabled: true,
    provider: 'umami',
    domain: 'https://brunopulis.com',
    siteId: '88ff3bbf-61c5-4303-bea2-f0da4f5dbb53'
  },
  webmentions: {
    enabled: true,
    domain: 'https://brunopulis.com'
  },
  webring: {
    enabled: false,
    url: 'https://indieweb.org/webring'
  },
  lighthouse: {
    enabled: false,
    url: 'https://pagespeed.web.dev/'
  },
  indieweb: {
    h_card: true,
    rel_me: true,
    microformats: true
  }
};

// for the site developer, used for footer credits and humans.txt info
export const creator = {
  name: 'Bruno Pulis', // i.e. Lene Saile - creator's (developer) name.
  email: 'brunopulis@protonmail.com',
  website: 'https://www.brunopulis.com',
  social: 'https://front-end.social/@lene'
};

// Eleventy global data: only the default export is exposed as `meta`
export default {
  url,
  domain,
  siteName,
  siteDescription,
  siteType,
  locale,
  lang,
  skipContent,
  pathToSvgLogo,
  author,
  creator
};
