// import { defineAction } from "astro:actions";
// import { z } from "astro:schema";
// import { db, GuestBook } from "astro:db";

// export const server = {
//   guestbook: {
//     create: defineAction({
//       accept: "form",
//       input: z.object({
//         author: z.string().min(1, "Name is required"),
//         email: z.string().email("Invalid email").optional().or(z.literal("")),
//         content: z.string().min(1, "Message is required"),
//       }),
//       handler: async (input) => {
//         const { author, email, content } = input;

//         await db.insert(GuestBook).values({
//           author,
//           email: email || undefined,
//           content,
//         });

//         return { success: true };
//       },
//     }),
//   },
// };
export const server = {};
