export const starRating = (rating, maxStars = 5) => {
  if (!rating || typeof rating !== 'number') {
    return '';
  }

  const filled = '★';
  const empty = '☆';
  const clampedRating = Math.min(Math.max(Math.round(rating), 0), maxStars);

  return filled.repeat(clampedRating) + empty.repeat(maxStars - clampedRating);
};
