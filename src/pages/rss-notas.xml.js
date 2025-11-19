// src/pages/rss-notas.xml.js
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const notes = await getCollection("notes");

  // Ordenar por data mais recente
  const sortedNotes = notes.sort((a, b) => {
    return new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime();
  });

  return rss({
    stylesheet: "/rss-styles.xsl",
    title: "Notas - Bruno Pulis",
    description: "Pensamentos rápidos, dicas práticas e reflexões sobre qualquer coisa",
    site: context.site,

    items: sortedNotes.map(note => {
      // Pegar primeira linha não vazia como título
      const firstLine = note.body.split("\n").find(line => line.trim().length > 0) || "";
      const title = firstLine.substring(0, 60).trim() + (firstLine.length > 60 ? "..." : "");

      return {
        title: title,
        pubDate: note.data.pubDate,
        description: note.body,
        link: `/notes/${note.slug}/`,
        categories: note.data.tags || [],
      };
    }),
    customData: `<language>pt-br</language>`,

    // Adicionar informações extras no feed
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
    },
  });
}
