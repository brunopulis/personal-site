import { ptBrNavigation } from "./locales/pt-br/navigation"; 
import { enNavigation } from "./locales/en/navigation";

import { ptBrHome } from "./locales/pt-br/home"; 
import { enHome } from "./locales/en/home";


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
    ...ptBrNavigation,
    ...ptBrHome
  },
  en: {
    ...enNavigation,
    ...enHome
  },
} as const;

export type Language = keyof typeof languages;
export type TranslationKey = keyof (typeof translations)["pt-br"];

export { useTranslations, getLanguageFromPath } from './utils';
