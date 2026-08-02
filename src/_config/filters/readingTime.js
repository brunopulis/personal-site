export const readingTime = content => {
  if (!content || typeof content !== 'string') return 1;

  const words = (content.trim().match(/\S+/g) || []).length;
  const minutes = Math.ceil(words / 200);

  return Math.max(1, minutes);
};
