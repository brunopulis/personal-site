import { ptBrNavigation } from './locales/pt-br/navigation';
import { enNavigation } from './locales/en/navigation';

import { ptBrHome } from './locales/pt-br/home';
import { enHome } from './locales/en/home';

import { ptBrSupport } from './locales/pt-br/support';
import { enSupport } from './locales/en/support';

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
    ...ptBrSupport,
  },
  en: {
    ...enNavigation,
    ...enHome,
    ...enSupport,
  },
} as const;

export type Language = keyof typeof languages;
export type TranslationKey = keyof (typeof translations)['pt-br'];

export { useTranslations, getLanguageFromPath } from './utils';
