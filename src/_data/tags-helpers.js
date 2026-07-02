export function toSlug(s) {
  return String(s)
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function extractTags(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return [];

  const frontmatter = match[1];
  const tags = [];

  const lines = frontmatter.split('\n');
  let inTags = false;

  for (const line of lines) {
    const keyMatch = line.match(/^(\w+):\s*(.*)$/);
    if (keyMatch) {
      const key = keyMatch[1];
      const value = keyMatch[2].trim();
      inTags = key === 'tags';

      if (inTags && value.startsWith('[')) {
        const arrayContent = value.slice(1, -1);
        arrayContent.split(',').forEach(s => {
          const t = s.trim().replace(/['"]/g, '');
          if (t) tags.push(t);
        });
        inTags = false;
      }
    } else if (inTags && line.match(/^\s+-\s+(.+)$/)) {
      const tag = line.match(/^\s+-\s+(.+)$/)[1].trim().replace(/['"]/g, '');
      if (tag) tags.push(tag);
    }
  }

  return tags;
}
