import { db, GuestBook } from "astro:db";

export default async function seed() {
	await db.insert(Guestbook).values([
		{
			id: 1,
			name: "João Silva",
			message: "Ótimo site! Parabéns pelo trabalho.",
			createdAt: new Date("2024-01-15"),
		},
		{
			id: 2,
			name: "Maria Santos",
			message: "Adorei visitar seu site, muito inspirador!",
			createdAt: new Date("2024-01-16"),
		},
	]);
}
