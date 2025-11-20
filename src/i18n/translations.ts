export const languages = {
  "pt-br": {
    code: "pt-br",
    label: "Português (Brasil)",
    nativeName: "Português",
  },
  en: {
    code: "en",
    label: "English",
    nativeName: "English",
  },
} as const;

export const defaultLanguage = "pt-br";

export const translations = {
  "pt-br": {
    // Navigation
    "nav.about": "Sobre",
    "nav.projects": "Projetos",
    "nav.services": "Serviços",
    "nav.blog": "Blog",
    "nav.newsletter": "Newsletter",
    "nav.contact": "Contato",

    // Home
    "home.title": "Bem-vindo ao nosso site",
    "home.description": "Conteúdo em português",
    "button.learnMore": "Saiba mais",

    // About page
    "about.title": "Sobre Bruno Pulis",
    "about.description": "Conheça minha história e o que me guia",
    "about.intro.greeting": "Olá, eu sou Bruno Pulis",
    "about.intro.description":
      "Apaixonado por criar uma web que funciona para todo mundo. Também sou marido, pai, cristão, leitor compulsivo e eterno aprendiz.",

    "about.info.location.label": "Localização",
    "about.info.location.value": "Belo Horizonte, MG",
    "about.info.experience.label": "Experiência",
    "about.info.experience.value": "15+ anos",
    "about.info.specialty.label": "Especialidade",
    "about.info.specialty.value": "Acessibilidade Web",

    "about.journey.title": "Como cheguei até aqui",
    "about.journey.paragraph1":
      "Sou consultor de acessibilidade digital e desenvolvedor front-end em Belo Horizonte.",
    "about.journey.paragraph2":
      "Mas, antes de tudo, sou alguém que acredita que tecnologia boa é a que inclui pessoas.",
    "about.journey.paragraph3":
      "Escrevo, dou palestras, treinamentos e mentorias, tudo com propósito: ajudar pessoas e empresas a criarem experiências inclusivas.",
    "about.journey.paragraph4": "Atualmente, atuo como Especialista de Testes em Acessibilidade na",
    "about.journey.company": "NTT Data Brasil",

    "about.story.title": "Minha história",
    "about.story.paragraph1":
      "Minha jornada não começou com código. Em 2006, eu servia hambúrguer no Burger King. Dois anos depois, estava montando computadores. Em 2010, me formei em Sistemas para Internet e comecei a viver daquilo que me fascinava: a web.",
    "about.story.paragraph2":
      "Passei por agências, startups e produtos digitais. Em 2015, criei o Awesome A11y, um repositório de recursos sobre acessibilidade. Em 2017, entrei para a área de qualidade de software. E em 2021, dei um passo decisivo: acessibilidade se tornou meu foco principal.",
    "about.story.paragraph3":
      "Desde então, cada projeto que faço é um lembrete do porquê comecei: criar uma internet onde todo mundo possa participar.",
  },
  en: {
    // Navigation
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.services": "Services",
    "nav.blog": "Writing",
    "nav.newsletter": "Newsletter",
    "nav.contact": "Contact",

    // Home
    "home.title": "Welcome to our website",
    "home.description": "Content in English",
    "button.learnMore": "Learn more",

    // About page
    "about.title": "About Bruno Pulis",
    "about.description": "Learn about my story and what drives me",
    "about.intro.greeting": "Hello, I'm Bruno Pulis",
    "about.intro.description":
      "Passionate about creating a web that works for everyone. I'm also a husband, father, Christian, compulsive reader, and lifelong learner.",

    "about.info.location.label": "Location",
    "about.info.location.value": "Belo Horizonte, MG",
    "about.info.experience.label": "Experience",
    "about.info.experience.value": "15+ years",
    "about.info.specialty.label": "Specialty",
    "about.info.specialty.value": "Web Accessibility",

    "about.journey.title": "How I got here",
    "about.journey.paragraph1":
      "I'm a digital accessibility consultant and front-end developer in Belo Horizonte.",
    "about.journey.paragraph2":
      "But first and foremost, I'm someone who believes that good technology is technology that includes people.",
    "about.journey.paragraph3":
      "I write, speak, provide training and mentoring, all with purpose: helping people and companies create inclusive experiences.",
    "about.journey.paragraph4": "Currently, I work as an Accessibility Testing Specialist at",
    "about.journey.company": "NTT Data Brasil",

    "about.story.title": "My story",
    "about.story.paragraph1":
      "My journey didn't start with code. In 2006, I was serving burgers at Burger King. Two years later, I was building computers. In 2010, I graduated in Internet Systems and started living what fascinated me: the web.",
    "about.story.paragraph2":
      "I worked at agencies, startups, and digital products. In 2015, I created Awesome A11y, a repository of accessibility resources. In 2017, I entered the software quality field. And in 2021, I took a decisive step: accessibility became my main focus.",
    "about.story.paragraph3":
      "Since then, every project I do reminds me why I started: to create an internet where everyone can participate.",
  },
} as const;

export type Language = keyof typeof languages;
export type TranslationKey = keyof (typeof translations)["pt-br"];
