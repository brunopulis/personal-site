import type { CollectionEntry } from "astro:content";

export function getAllTags(posts: CollectionEntry<"blog">[]) {
	const tagCount = new Map<string, number>();

	posts.forEach((post) => {
		post.data.tags?.forEach((tag: string) => {
			tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
		});
	});

	return Array.from(tagCount.entries())
		.sort((a, b) => b[1] - a[1]) // ordena por frequência
		.slice(0, 15); // limita a 15 tags mais usadas
}
