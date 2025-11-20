import { ptBrAbout } from "@i18n/locales/pt-br/about";

import { enAbout } from "@i18n/locales/en/about";

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
    ...ptBrAbout,
  },
  en: {
    ...enAbout,
  },
} as const;

export type Language = keyof typeof languages;
export type TranslationKey = keyof (typeof translations)["pt-br"];
