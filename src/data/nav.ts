/**
 * Define a estrutura de um item de navegação.
 */
interface NavItem {
  id: number;
  title: string;
  href: string;
  // Opcional: ícone, target="_blank", etc.
}

/**
 * Menu principal que aparece em linha (e.g., Sobre, Projetos, Blog).
 */
export const MAIN_NAV_LINKS: NavItem[] = [
  {
    id: 1,
    title: 'Sobre',
    href: '/sobre',
  },
  {
    id: 2,
    title: 'Projetos',
    href: '/projetos',
  },
  {
    id: 3,
    title: 'Serviços',
    href: '/servicos',
  },
  {
    id: 4,
    title: 'Blog',
    href: '/blog',
  },
  {
    id: 5,
    title: 'Newsletter',
    href: '/newsletter',
  },
  {
    id: 6,
    title: 'Tags',
    href: '/tags',
  },
];

/**
 * Link de destaque, geralmente um botão (e.g., Contato).
 */
export const CONTACT_LINK: NavItem = {
  id: 7,
  title: 'Contato',
  href: '/contato',
};
