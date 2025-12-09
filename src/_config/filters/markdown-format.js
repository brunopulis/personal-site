// by Chris Burnell: https://chrisburnell.com/article/some-eleventy-filters/#markdown-format

import markdownParser from 'markdown-it';

const markdown = markdownParser();

export const markdownFormat = (string) => {
  // Validar se é uma string válida
  if (!string || typeof string !== 'string') {
    return '';
  }

  try {
    return markdown.render(string);
  } catch (error) {
    console.error('Erro ao processar markdown:', error);
    return '';
  }
};
