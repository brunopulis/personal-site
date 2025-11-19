import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const books = await getCollection("biblioteca");

  // Filtrar apenas livros lidos e ordenar por data de leitura mais recente
  const readBooks = books
    .filter(book => book.data.status === "Lido")
    .sort((a, b) => {
      return new Date(b.data.reading_date).getTime() - new Date(a.data.reading_date).getTime();
    });

  return rss({
    stylesheet: "rss-styles.xsl",
    title: "Biblioteca - Bruno Pulis",
    description: "Livros que li, estou lendo e recomendações de leitura",
    site: context.site,

    items: readBooks.map(book => {
      // Construir descrição rica do livro
      const parts = [];

      // Adicionar autor
      parts.push(`📚 <strong>Autor:</strong> ${book.data.author}`);

      // Adicionar avaliação se existir
      if (book.data.rating) {
        const stars = "⭐".repeat(parseInt(book.data.rating));
        parts.push(`${stars} (${book.data.rating}/5)`);
      }

      // Adicionar descrição se existir
      if (book.data.description) {
        parts.push(`<br/><br/>${book.data.description}`);
      }

      // Adicionar categorias
      if (book.data.category && book.data.category.length > 0) {
        parts.push(`<br/><br/><strong>Categorias:</strong> ${book.data.category.join(", ")}`);
      }

      // Adicionar citações se existirem
      if (book.data.quotes) {
        parts.push(`<br/><br/><strong>Citação:</strong><br/><em>"${book.data.quotes}"</em>`);
      }

      // Adicionar recomendação se existir
      if (book.data.recommended_for) {
        parts.push(`<br/><br/><strong>Recomendado para:</strong> ${book.data.recommended_for}`);
      }

      // Adicionar número de páginas se existir
      if (book.data.pages) {
        parts.push(`<br/><br/><strong>Páginas:</strong> ${book.data.pages}`);
      }

      // Adicionar link de compra se existir
      if (book.data.purchase_link) {
        parts.push(`<br/><br/><a href="${book.data.purchase_link}">📖 Comprar este livro</a>`);
      }

      const description = parts.join("<br/>");

      return {
        title: `${book.data.title} - ${book.data.author}`,
        pubDate: book.data.reading_date,
        description: description,
        link: `/biblioteca/${book.slug}/`,
        categories: [...book.data.category, ...(book.data.tags || [])],
        customData: book.data.cover
          ? `<enclosure url="${book.data.cover}" type="image/jpeg" />`
          : undefined,
      };
    }),

    customData: `
      <language>pt-br</language>
      <category>Books</category>
      <category>Reading</category>
    `,

    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
      content: "http://purl.org/rss/1.0/modules/content/",
    },
  });
}
