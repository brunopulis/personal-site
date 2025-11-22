import { enHome } from './locales/en/home';
import { enNavigation } from './locales/en/navigation';
import { enSupport } from './locales/en/support';
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

export { getLanguageFromPath, useTranslations } from './utils';
