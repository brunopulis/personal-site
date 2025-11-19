import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();

  // Adicionar headers de acessibilidade
  if (import.meta.env.DEV) {
    /* ts-ignore */
    console.warn(`🔍 Testando acessibilidade: ${context.url.pathname}`);
  }

  return response;
});
