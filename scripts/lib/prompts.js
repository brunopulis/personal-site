import {parseChoice} from './util.js';

/**
 * @param {(prompt: string) => Promise<string>} ask
 * @param {import('./types.js').ContentSchema} schema
 * @returns {Promise<Record<string, any>>}
 */
export async function collectInput(ask, schema) {
  /** @type {Record<string, any>} */
  const data = {};

  for (const field of schema.fields) {
    if (field.type === 'choice' && field.options) {
      field.options.forEach((option, index) => console.log(`  ${index + 1}. ${option}`));
      const answer = (await ask(`${field.label} (${field.default}): `)) || String(field.default);
      data[field.key] = parseChoice(answer, field.options);
      continue;
    }

    const defaultValue = typeof field.default === 'function' ? field.default() : field.default;
    const hint = field.parse
      ? ''
      : defaultValue === '' || defaultValue == null
        ? ' (—)'
        : ` (${defaultValue})`;

    let answer = (await ask(`${field.label}${hint}: `)) || defaultValue;

    if (field.required) {
      while (!answer) {
        console.log('  ⚠️ Campo obrigatório.');
        answer = (await ask(`${field.label}: `)) || defaultValue;
      }
    }

    data[field.key] = field.parse ? field.parse(answer) : answer;
  }

  return data;
}
