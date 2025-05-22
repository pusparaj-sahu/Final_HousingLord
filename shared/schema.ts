// import { mysqlTable, varchar, int, timestamp, primaryKey, uniqueIndex } from "drizzle-orm/mysql-core";
// import { eq } from "drizzle-orm/expressions";

// // User table for authentication
// export const users = mysqlTable("users", {
//   id: int("id").primaryKey().autoincrement(),
//   username: varchar("username", { length: 255 }).notNull().unique(),
//   password: varchar("password", { length: 255 }).notNull(),
//   name: varchar("name", { length: 255 }),
//   email: varchar("email", { length: 255 }),
//   phone: varchar("phone", { length: 50 }),
//   role: varchar("role", { length: 50 }).default("tenant").notNull(), // tenant, landlord, admin
//   createdAt: timestamp("created_at").defaultNow().notNull(),
// });

// // Type definition for User
// export interface User {
//   id: number;
//   username: string;
//   password: string;
//   name: string | null;
//   email: string | null;
//   phone: string | null;
//   role: string;
//   createdAt: Date;
// }