import { defineDb, defineTable, column, NOW } from 'astro:db';

const Guestbook = defineTable({
  name: 'guestbook',
  columns: {
    id: column.integer().primaryKey().autoIncrement(),
    author: column.text(),
    timestamp: column.date({ default: NOW }),
  }
});
