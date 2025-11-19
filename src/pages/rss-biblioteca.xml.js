import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const books = await getCollection("biblioteca");

  // Ordenar por data de leitura mais recente
  const sortedBooks = books.sort((a, b) => {
    return new Date(b.data.reading_date).getTime() - new Date(a.data.reading_date).getTime();
  });

  return rss({
    stylesheet: "/rss-styles.xsl",
    title: "Biblioteca - Bruno Pulis",
    description: "Livros que li, estou lendo e quero ler",
    site: context.site,

    items: sortedBooks.map(book => {
      // Emoji baseado no status
      const statusEmoji = {
        Lido: "✅",
        Lendo: "📖",
        "Quero ler": "📚",
        Abandonado: "⏸️",
      };

      const emoji = statusEmoji[book.data.status] || "📕";

      // Construir descrição rica do livro
      const parts = [];

      // Status do livro
      parts.push(`<strong>Status:</strong> ${emoji} ${book.data.status}`);

      // Adicionar autor
      parts.push(`<strong>Autor:</strong> ${book.data.author}`);

      // Adicionar avaliação se existir (apenas para livros lidos)
      if (book.data.rating && book.data.status === "Lido") {
        const stars = "⭐".repeat(parseInt(book.data.rating));
        parts.push(`<strong>Avaliação:</strong> ${stars} (${book.data.rating}/5)`);
      }

      // Adicionar descrição se existir
      if (book.data.description) {
        parts.push(`<br/>${book.data.description}`);
      }

      // Adicionar body se existir
      if (book.data.body) {
        parts.push(`<br/>${book.data.body}`);
      }

      // Adicionar categorias
      if (book.data.category && book.data.category.length > 0) {
        parts.push(`<strong>Categorias:</strong> ${book.data.category.join(", ")}`);
      }

      // Adicionar citações se existirem
      if (book.data.quotes) {
        parts.push(`<strong>Citação destacada:</strong><br/><em>"${book.data.quotes}"</em>`);
      }

      // Adicionar recomendação se existir
      if (book.data.recommended_for) {
        parts.push(`<strong>Recomendado para:</strong> ${book.data.recommended_for}`);
      }

      // Adicionar número de páginas se existir
      if (book.data.pages) {
        parts.push(`<strong>Páginas:</strong> ${book.data.pages}`);
      }

      // Adicionar link de compra se existir
      if (book.data.purchase_link) {
        parts.push(`<a href="${book.data.purchase_link}">🛒 Comprar este livro</a>`);
      }

      const description = parts.join("<br/><br/>");

      return {
        title: `${emoji} ${book.data.title} - ${book.data.author}`,
        pubDate: book.data.reading_date,
        description: description,
        link: `/biblioteca/${book.slug}/`,
        categories: [book.data.status, ...book.data.category, ...(book.data.tags || [])],
        // Incluir imagem da capa se existir
        customData: book.data.cover
          ? `<enclosure url="${book.data.cover}" type="image/jpeg" />`
          : undefined,
      };
    }),

    customData: `
      <language>pt-br</language>
      <category>Books</category>
      <category>Reading</category>
      <category>Book Reviews</category>
    `,

    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
      content: "http://purl.org/rss/1.0/modules/content/",
      dc: "http://purl.org/dc/elements/1.1/",
    },
  });
}
