export const url = process.env.URL || 'http://localhost:8080';
export const domain = new URL(url).hostname;
export const siteName = 'Bruno Pulis';
export const siteDescription = 'Desenvolvedor e engenheiro de acessibilidade';
export const siteType = 'Person';
export const locale = 'pt_BR';
export const lang = 'pt-br';
export const skipContent = 'Ir para conteúdo';

export const author = {
  name: 'Bruno Pulis',
  avatar: '/icon-512x512.png',
  email: 'brunopulis@protonmail.com',
  website: 'https://www.brunopulis.com',
  fediverse: '@brunopulis@mastodon.social'
};

export const creator = {
  name: 'Bruno Pulis',
  email: 'brunopulis@protonmail.com',
  website: 'https://www.brunopulis.com',
  social: 'https://mastodon.social/@brunopulis'
};

export const pathToSvgLogo = 'src/assets/svg/misc/logo.svg';
export const themeColor = '#dd4462';
export const themeLight = '#f8f8f8';
export const themeDark = '#2e2e2e';
export const opengraph_default = '/assets/images/template/opengraph-default.jpg';
export const opengraph_default_alt = "Bruno Pulis - Desenvolvedor e consultor de acessibilidade";

export const blog = {
  name: 'Bruno Pulis Blog',
  description: 'Artigos sobre acessibilidade web, teologia e tecnologia',
  feedLinks: [
    {
      title: 'Atom Feed',
      url: '/feed.xml',
      type: 'application/atom+xml'
    },
    {
      title: 'JSON Feed',
      url: '/feed.json',
      type: 'application/json'
    }
  ],
  tagSingle: 'Tag',
  tagPlural: 'Tags',
  tagMore: 'Mais tags:',
  paginationLabel: 'Blog',
  paginationPage: 'Página',
  paginationPrevious: 'Anterior',
  paginationNext: 'Próximo',
  paginationNumbers: true
};

export const details = {
  aria: 'section controls',
  expand: 'expandir todos',
  collapse: 'recolher todos'
};

export const dialog = {
  close: 'Fechar',
  next: 'Próximo',
  previous: 'Anterior'
};

export const navigation = {
  navLabel: 'Menu',
  ariaTop: 'Principal',
  ariaBottom: 'Complementar',
  ariaPlatforms: 'Plataformas',
  drawerNav: false,
  subMenu: false
};

export const themeSwitch = {
  title: 'Tema',
  light: 'claro',
  dark: 'escuro'
};

export const greenweb = {
  disclosures: [
    {
      docType: 'sustainability-page',
      url: `${url}/sustainability/`,
      domain: domain
    }
  ],
  services: [{domain: 'netlify.com', serviceType: 'cdn'}]
};

export const tests = {
  pa11y: {
    customPaths: ['/', '/sobre/', '/blog/', '/styleguide/'],
    globalIgnore: []
  }
};

export const viewRepo = {
  allow: true,
  infoText: 'Ver esta página no GitHub'
};

export const easteregg = true;

