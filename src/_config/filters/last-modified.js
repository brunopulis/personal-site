import fs from 'fs';

export function lastModified(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.mtime;
  } catch {
    return null;
  }
}
