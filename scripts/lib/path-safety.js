import {basename, resolve, sep} from 'node:path';

export function safeYear(value) {
  const year = String(value ?? '');
  return /^\d{4}$/.test(year) ? year : String(new Date().getFullYear());
}

export function safeDate(value) {
  const date = String(value ?? '');
  return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : new Date().toISOString().slice(0, 10);
}

export function slugToSegment(value) {
  return (
    String(value ?? '')
      .toLowerCase()
      .replace(/[^a-z0-9._-]+/g, '')
      .replace(/^[._-]+/, '')
      .replace(/[._-]+$/, '')
      .slice(0, 80) || 'untitled'
  );
}

export function resolveInside(root, ...names) {
  const rootResolved = resolve(root);
  const target = resolve(rootResolved, ...names.map(name => basename(String(name ?? ''))));

  if (target === rootResolved) {
    throw new Error(`Refusing path that resolves to the directory itself: ${rootResolved}`);
  }
  if (!target.startsWith(rootResolved + sep)) {
    throw new Error(`Resolved path escapes ${rootResolved}: ${target}`);
  }
  return target;
}
