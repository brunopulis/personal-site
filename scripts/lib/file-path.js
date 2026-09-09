/**
 * @param {import('./types.js').ContentSchema} schema
 * @param {Record<string, any>} data
 * @returns {{contentDir: string, fileName: string}}
 */
export function buildFilePath(schema, data) {
  return {
    contentDir: schema.contentDir(data),
    fileName: schema.fileName(data)
  };
}
