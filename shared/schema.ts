import { mysqlTable, varchar, int, timestamp, primaryKey, uniqueIndex } from "drizzle-orm/mysql-core";
import { eq } from "drizzle-orm/expressions";
import { db } from "../server/db";

// User table for authentication
export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  role: varchar("role", { length: 50 }).default("tenant").notNull(), // tenant, landlord, admin
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Interests table (for users to show interest in properties)
export const interests = mysqlTable("interests", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id").notNull(),
  propertyId: int("property_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => {
  return {
    uniqueInterest: uniqueIndex("unique_interest").on(table.userId, table.propertyId)
  };
});

// Type definition for User
export interface User {
  id: number;
  username: string;
  password: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  role: string;
  createdAt: Date;
}

// Function to get interested users by property
export async function getInterestedUsersByProperty(propertyId: number): Promise<User[]> {
  const rows = await db
    .select()
    .from(users)
    .innerJoin(interests, eq(interests.userId, users.id))
    .where(eq(interests.propertyId, propertyId));
  
  return rows.map(row => ({
    id: row.users.id,
    username: row.users.username,
    password: row.users.password,
    name: row.users.name,
    email: row.users.email,
    phone: row.users.phone,
    role: row.users.role,
    createdAt: row.users.createdAt
  }));
}