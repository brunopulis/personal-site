import * as filters from '../filters.js';

describe('Filtros Customizados', () => {
  describe('readableDate', () => {
    it('deve formatar a data em formato legível', () => {
      const date = new Date('2025-01-15T10:00:00Z');
      const result = filters.readableDate(date);
      
      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
      expect(result).toContain('2025');
    });

    it('deve retornar string vazia para data inválida', () => {
      const result = filters.readableDate(null);
      expect(result).toBe('');
    });
  });

  describe('slug', () => {
    it('deve converter string em slug', () => {
      const result = filters.slug('Meu Artigo Incrível!');
      
      expect(result).toBe('meu-artigo-incrivel');
    });

    it('deve remover caracteres especiais', () => {
      const result = filters.slug('Hello @#$% World');
      
      expect(result).toBe('hello-world');
    });

    it('deve lidar com acentos', () => {
      const result = filters.slug('São Paulo Café');
      
      expect(result).toBe('sao-paulo-cafe');
    });
  });

  describe('striptags', () => {
    it('deve remover tags HTML', () => {
      const html = '<p>Olá <strong>mundo</strong></p>';
      const result = filters.striptags(html);
      
      expect(result).toBe('Olá mundo');
    });

    it('deve lidar com múltiplas tags', () => {
      const html = '<div><h1>Título</h1><p>Parágrafo</p></div>';
      const result = filters.striptags(html);
      
      expect(result).toBe('TítuloParágrafo');
    });
  });

  describe('truncate', () => {
    it('deve truncar texto longo', () => {
      const text = 'Este é um texto muito longo que precisa ser truncado';
      const result = filters.truncate(text, 20);
      
      expect(result).toBe('Este é um texto muito...');
      expect(result.length).toBeLessThanOrEqual(23);
    });

    it('não deve truncar texto curto', () => {
      const text = 'Texto curto';
      const result = filters.truncate(text, 20);
      
      expect(result).toBe('Texto curto');
    });

    it('deve usar comprimento padrão', () => {
      const text = 'a'.repeat(250);
      const result = filters.truncate(text);
      
      expect(result).toContain('...');
    });
  });

  describe('capitalize', () => {
    it('deve capitalizar primeira letra', () => {
      const result = filters.capitalize('hello world');
      
      expect(result).toBe('Hello world');
    });

    it('deve lidar com strings vazias', () => {
      const result = filters.capitalize('');
      
      expect(result).toBe('');
    });
  });

  describe('toRfc822Date', () => {
    it('deve formatar data para RFC822', () => {
      const date = new Date('2025-01-15T10:00:00Z');
      const result = filters.toRfc822Date(date);
      
      expect(result).toMatch(/\w+,\s\d+\s\w+\s\d+\s\d+:\d+:\d+/);
    });
  });

  describe('toISOString', () => {
    it('deve retornar ISO string', () => {
      const date = new Date('2025-01-15T10:00:00Z');
      const result = filters.toISOString(date);
      
      expect(result).toBe('2025-01-15T10:00:00.000Z');
    });
  });

  describe('groupByMonth', () => {
    it('deve agrupar itens por mês', () => {
      const items = [
        { data: { date: new Date('2025-01-15') } },
        { data: { date: new Date('2025-01-20') } },
        { data: { date: new Date('2024-12-10') } }
      ];
      
      const result = filters.groupByMonth(items);
      
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(2);
      expect(result[0].label).toContain('janeiro');
    });

    it('deve ordenar grupos do mais recente', () => {
      const items = [
        { data: { date: new Date('2024-01-15') } },
        { data: { date: new Date('2025-01-15') } }
      ];
      
      const result = filters.groupByMonth(items);
      
      expect(result[0].key).toContain('2025');
      expect(result[1].key).toContain('2024');
    });

    it('deve retornar array vazio para entrada inválida', () => {
      const result = filters.groupByMonth(null);
      
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });
  });
});