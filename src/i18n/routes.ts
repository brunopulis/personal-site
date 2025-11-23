/**
 * Define as rotas para cada idioma
 * Estrutura: { [language]: { [routeKey]: routePath } }
 */
export const routes = {
  'pt-br': {
    index: '',
    about: 'sobre',
    projects: 'projetos',
    services: 'servicos',
    blog: 'blog',
    now: 'agora',
    newsletter: 'newsletter',
    contact: 'contato',
    stream: 'fluxo',
    support: 'apoie',
  },
  en: {
    index: '',
    about: 'about',
    projects: 'projects',
    services: 'services',
    blog: 'blog',
    now: 'now',
    newsletter: 'newsletter',
    contact: 'contact',
    stream: 'stream',
    support: 'support',
  },
} as const;

export type RouteKey = keyof (typeof routes)['pt-br'];
