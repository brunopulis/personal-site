import {z as validator} from 'zod';

const fieldDefSchema = validator
  .object({
    key: validator.string().min(1),
    label: validator.string().min(1),
    default: validator.any().optional(),
    required: validator.boolean().optional(),
    quote: validator.boolean().optional(),
    optional: validator.boolean().optional(),
    type: validator.literal('choice').optional(),
    options: validator.array(validator.string()).optional(),
    parse: validator.function().optional(),
    format: validator.function().optional()
  })
  .refine(field => field.type !== 'choice' || (field.options && field.options.length > 0), {
    message: "Campo com type 'choice' precisa de 'options' não vazio"
  });

// Valida o ContentSchema completo
export const contentSchemaValidator = validator
  .object({
    type: validator.string().min(1),
    contentDir: validator.function(),
    fileName: validator.function(),
    fields: validator.array(fieldDefSchema).min(1)
  })
  .refine(
    schema => {
      const keys = schema.fields.map(f => f.key);
      return new Set(keys).size === keys.length;
    },
    {message: 'Schema tem campos (fields) com key duplicada'}
  );

/**
 * @param {import('./types.js').ContentSchema} schema
 */
export function validateSchema(schema) {
  return contentSchemaValidator.parse(schema);
}
