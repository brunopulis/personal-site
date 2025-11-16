import { db, GuestBook } from "astro:db";

export default async function seed() {
  await db.insert(GuestBook).values([
    {
      id: 1,
      author: "João Silva",
      content: "Ótimo site! Parabéns pelo trabalho.",
      createdAt: new Date("2024-01-15").toISOString(),
    },
    {
      id: 2,
      author: "Maria Santos",
      content: "Adorei visitar seu site, muito inspirador!",
      createdAt: new Date("2024-01-16").toISOString(),
    },
  ]);
}
