import markdownParser from 'markdown-it';

const markdown = markdownParser();

export const markdownFormat = string => {
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
