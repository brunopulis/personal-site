import collectionFunctions, {
  posts
} from '../collections';

const mockCollectionApi = (
  getFilteredByGlobReturn = [], 
  getAllReturn = [] 
) => ({
  getFilteredByGlob: jest.fn(() => getFilteredByGlobReturn),
  getAll: jest.fn(() => getAllReturn),
});

const mockItems = [
  { data: { date: new Date('2023-01-01'), tags: ['all', 'posts', 'tech'] }, title: 'Post Antigo' },
  { data: { date: new Date('2024-01-01'), tags: ['all', 'posts', 'dev'] }, title: 'Post Novo' },
  { data: { tags: ['all', 'notas', 'pessoal', 'pensamentos'] }, title: 'Nota' },
  { data: { tags: ['all', 'musica', 'jazz'] }, title: 'Música' },
  { data: { date: new Date('2023-05-15') }, title: 'Bookmark' },
  { data: { date: new Date('2024-05-15') }, title: 'Streams' }, // Item para streams
];

describe('Eleventy Collection Definitions', () => {
  // Teste de Sanidade para verificar as exportações padrão
  it('should export all collection functions in default export', () => {
    expect(collectionFunctions.posts).toBe(posts);
    expect(collectionFunctions.streams).toBe(streams);
    expect(collectionFunctions.tagList).toBe(tagList);
    // Adicione mais verificações se quiser testar todas as exportações
  });

  // Testes para funções que usam getFilteredByGlob
  describe('Glob-Based Collections', () => {
    const mockData = ['item1', 'item2', 'item3'];
    let api;

    beforeEach(() => {
      // Cria uma nova API de mock para cada teste para isolamento
      api = mockCollectionApi(mockData);
    });

    // Teste para coleções simples com .reverse()
    test.each([
      ['posts', './src/content/posts/**/*.md'],
      ['bookmarks', './src/content/bookmarks/**/*.md'],
      ['gallery', './src/content/gallery/**/*.md'],
      ['media', './src/content/media/**/*.md'],
      ['books', './src/content/books/**/*.md'],
    ])('should call getFilteredByGlob with correct path and reverse results for %s', (name, globPath) => {
      // Mockamos o retorno de getFilteredByGlob para que .reverse() seja chamado
      const reversedMockData = [...mockData].reverse();
      api.getFilteredByGlob.mockReturnValue(mockData);

      const result = collectionFunctions[name](api);

      expect(api.getFilteredByGlob).toHaveBeenCalledWith(globPath);
      // Usamos toEqual pois .reverse() é encadeado e muda a ordem
      expect(result).toEqual(reversedMockData);
      // O teste passa se ele chamar e reverter corretamente o array
    });

    // Teste para a coleção 'notes' (sem .reverse())
    it('should call getFilteredByGlob with correct path for notes (no reverse)', () => {
      const globPath = './src/content/notas/**/*.md';
      const result = notes(api);

      expect(api.getFilteredByGlob).toHaveBeenCalledWith(globPath);
      expect(result).toBe(mockData); // Deve retornar o array diretamente
    });

    // Teste para showInSitemap
    it('should call getFilteredByGlob with correct path for showInSitemap', () => {
      const globPath = './src/**/*.{md,njk}';
      const result = showInSitemap(api);

      expect(api.getFilteredByGlob).toHaveBeenCalledWith(globPath);
      expect(result).toBe(mockData);
    });
  });

  // Teste para coleções com ordenação customizada
  describe('Custom Sorted Collections (streams)', () => {
    it('should sort streams by date descending (mais novo primeiro)', () => {
      // Dados de streams desordenados
      const streamData = [
        { data: { date: new Date('2023-10-01') } },
        { data: { date: new Date('2024-01-01') } }, // Mais novo
        { data: { date: new Date('2023-05-01') } }, // Mais antigo
      ];

      const api = mockCollectionApi(streamData);
      const result = streams(api);

      expect(api.getFilteredByGlob).toHaveBeenCalledWith('./src/content/streams/**/*.md');
      // Espera-se que a ordem seja: '2024-01-01', '2023-10-01', '2023-05-01'
      expect(result[0].data.date).toEqual(new Date('2024-01-01'));
      expect(result[2].data.date).toEqual(new Date('2023-05-01'));
    });
  });

  // Teste para a função tagList
  describe('tagList', () => {
    // Dados de mock que simulam o retorno de collection.getAll()
    const tagListMockData = [
      { data: { tags: ['all', 'posts', 'tech'] } },
      { data: { tags: ['dev', 'all', 'posts'] } },
      { data: { tags: ['pessoal'] } },
      { data: { tags: ['musicas', 'jazz'] } }, // 'musicas' deve ser filtrado
      { data: {} }, // Item sem a propriedade 'tags'
      { data: { tags: ['all', 'outra-tag'] } },
    ];

    it('should extract and sort unique tags, excluding reserved ones', () => {
      const api = mockCollectionApi(undefined, tagListMockData);
      
      // Chamamos a função usando o retorno de getAll (que é o que collection.getAll() faz)
      const result = tagList(api);

      expect(api.getAll).toHaveBeenCalled();
      
      // As tags esperadas (ordenadas e sem as tags reservadas)
      const expectedTags = ['dev', 'jazz', 'outra-tag', 'pessoal', 'tech'];

      expect(result).toEqual(expectedTags);
      // Verifica se o resultado está ordenado
      expect(result).toEqual([...result].sort());
    });

    it('should return an empty array if no items have tags', () => {
      const api = mockCollectionApi(undefined, [{}, {}, {}]); // Retorna itens sem tags
      const result = tagList(api);

      expect(result).toEqual([]);
    });
  });
});