export default {
  name: "Bruno Pulis",
  description: "Especialista em acessibilidade digital e frontend.",
  skipContent: "Pular para o conteúdo principal",
  url: "https://brunopulis.com",
  author: "Bruno Pulis",
  email: "brunopulis@protonmail.com",
  forminitFormId: process.env.FORMINIT_FORM_ID,
  social: {
    github: "brunopulis",
    mastodon: "@brunopulis@mastodon.social",
    twitter: "@brunopulis"
  },
  repo: {
    url: "https://github.com/brunopulis/brunopulis.com",
    branch: "main"
  },
  bio: {
    short: "Especialista em acessibilidade digital e <em>frontend</em>.",
    long: ""
  },
  location: "Belo Horizonte, Brazil",
  timezone: "America/Sao_Paulo",
  newsletter: {
    enabled: true,
    provider: "buttondown",
    action: "https://buttondown.email/api/emails/embed-subscribe/brunopulis",
    title: "Join the Newsletter",
    description: "Get thoughtful updates delivered to your inbox. No spam, just meaningful content."
  },
  donate: {
    enabled: true,
    libera: "brunopulis",
    kofi: "brunopulis",
    paypal: "donate/?hosted_button_id=7YBCWD8WYY4ZA",
    github: "brunopulis",
    message: "Se você encontrar valor na minha escrita, considere apoiar meu trabalho. Cada contribuição me ajuda a continuar criando conteúdo bem pensado."
  },
  analytics: {
    enabled: true,
    provider: "umami",
    domain: "brunopulis.com",
    siteId: "88ff3bbf-61c5-4303-bea2-f0da4f5dbb53"
  },
  webmentions: {
    enabled: true,
    domain: "brunopulis.com"
  },
  webring: {
    enabled: true,
    url: "https://indieweb.org/webring"
  },
  lighthouse: {
    enabled: true,
    url: "https://pagespeed.web.dev/"
  },
  indieweb: {
    h_card: true,
    rel_me: true,
    microformats: true
  },
  sections: {
    notes: { enabled: true, title: "Notes", path: "/notes/" },
    poetry: { enabled: true, title: "Poetry", path: "/poetry/" },
    portfolio: { enabled: true, title: "Portfolio", path: "/portfolio/" },
    projects: { enabled: true, title: "Projects", path: "/projects/" },
    resume: { enabled: true, title: "Curriculo", path: "/resume/" },
    type: { enabled: true, title: "Type", path: "/type/" },
    links: { enabled: true, title: "Links", path: "/links/" },
    bookshelf: { enabled: true, title: "Bookshelf", path: "/bookshelf/" }
  }
};
