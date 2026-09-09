/**
 * @typedef {Object} FieldDef
 * @property {string} key - Nome do campo no objeto de dados e no YAML.
 * @property {string} label - Texto exibido ao perguntar no terminal.
 * @property {*} [default] - Valor padrão, ou função que retorna o valor padrão.
 * @property {boolean} [required] - Se true, repete a pergunta até ter valor.
 * @property {boolean} [quote] - Se true, envolve o valor em aspas no YAML.
 * @property {boolean} [optional] - Se true, omite a linha do YAML quando vazio.
 * @property {'choice'} [type] - Tipo especial de campo (múltipla escolha).
 * @property {string[]} [options] - Opções quando type === 'choice'.
 * @property {(raw: string) => *} [parse] - Transforma a resposta crua do terminal.
 * @property {(value: *) => string} [format] - Formata o valor final para o YAML.
 */

/**
 * @typedef {Object} ContentSchema
 * @property {string} type - Identificador do tipo de conteúdo ('book', 'movie', 'tv').
 * @property {(data: Record<string, any>) => string} contentDir - Pasta de destino.
 * @property {(data: Record<string, any>) => string} fileName - Nome do arquivo .md.
 * @property {FieldDef[]} fields - Definição dos campos do frontmatter.
 */

export {};
