import { column, defineDb, defineTable, sql } from "astro:db";

export const GuestBook = defineTable({
	columns: {
		id: column.number({ primaryKey: true }),
		author: column.text(),
		email: column.text({ optional: true }),
		content: column.text(),
		createdAt: column.text({
			default: sql`(datetime('now'))`,
		}),
	},
});

export default defineDb({
	tables: { GuestBook },
});
