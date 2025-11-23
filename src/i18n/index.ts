import { enAbout } from './locales/en/about';
import { enHome } from './locales/en/home';
import { enNavigation } from './locales/en/navigation';
import { enSupport } from './locales/en/support';
import { ptBrAbout } from './locales/pt-br/about';
import { ptBrHome } from './locales/pt-br/home';
import { ptBrNavigation } from './locales/pt-br/navigation';
import { ptBrSupport } from './locales/pt-br/support';

export const languages = {
  'pt-br': {
    code: 'pt-br',
    label: 'Português (Brasil)',
    nativeName: 'Português',
  },
  en: {
    code: 'en',
    label: 'English',
    nativeName: 'English',
  },
} as const;

export const defaultLanguage = 'pt-br';

export const translations = {
  'pt-br': {
    ...ptBrNavigation,
    ...ptBrHome,
    ...ptBrAbout,
    ...ptBrSupport,
  },
  en: {
    ...enNavigation,
    ...enHome,
    ...enAbout,
    ...enSupport,
  },
} as const;

export type Language = keyof typeof languages;
export type TranslationKey = keyof (typeof translations)['pt-br'];

export type { RouteKey } from './routes';
export { getLanguageFromPath, useTranslations } from './utils';
