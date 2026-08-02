export const hasCode = content => {
  if (!content || typeof content !== 'string') return false;

  return /<pre(?:\s[^>]*)?>/i.test(content);
};
