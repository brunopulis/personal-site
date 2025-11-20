import {
  translations,
  defaultLanguage,
  type Language,
  type TranslationKey,
} from "@i18n/translations";

/**
 * Detecta o idioma a partir da URL
 * @param pathname - O pathname da URL
 * @returns O idioma detectado ou o idioma padrão
 */
export function getLanguageFromPath(pathname: string): Language {
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  // Verifica se o primeiro segmento é um código de idioma válido
  if (firstSegment === "en") {
    return "en";
  }

  // Padrão é português (Brasil)
  return "pt-br";
}

/**
 * Hook para traduzir chaves
 * Retorna uma função que traduz chaves para o idioma especificado
 * @param lang - O idioma
 * @returns Função t(key) para traduzir
 *
 * @example
 * const t = useTranslations('pt-br');
 * console.log(t('nav.about')); // 'Sobre'
 */
export function useTranslations(lang: Language) {
  return function t(key: TranslationKey): string {
    const translation = translations[lang]?.[key];

    if (!translation) {
      // eslint-disable-next-line no-undef
      console.warn(`Translation key "${key}" not found for language "${lang}"`);
      return key;
    }

    return translation;
  };
}

/**
 * Valida se um idioma é suportado
 * @param lang - O código do idioma
 * @returns true se o idioma é suportado
 */
export function isValidLanguage(lang: unknown): lang is Language {
  return lang === "pt-br" || lang === "en";
}

/**
 * Retorna o idioma padrão
 */
export function getDefaultLanguage(): Language {
  return defaultLanguage;
}
