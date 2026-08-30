export function parseChoice(answer, options, defaultIndex = 0) {
  const index = parseInt(answer, 10) - 1;
  return options[index] ?? options[defaultIndex];
}

export function parseRating(answer) {
  if (!answer) return '';
  return parseInt(answer, 10) || '';
}

export function quote(value) {
  return `"${String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

export function formatTags(tags) {
  const list = Array.isArray(tags)
    ? tags
    : String(tags ?? '')
        .split(',')
        .map(t => t.trim())
        .filter(Boolean);
  return `[${list.map(quote).join(', ')}]`;
}

export function todayString() {
  return new Date().toISOString().slice(0, 10);
}

export function currentYear() {
  return String(new Date().getFullYear());
}
