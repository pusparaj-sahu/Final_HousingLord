// import { users, interests } from "@shared/schema";
// import db from './db';
// import { eq, and } from "drizzle-orm";

// export interface IStorage {
//   getUser(id: string): Promise<any | undefined>;
//   getUserByUsername(username: string): Promise<any | undefined>;
//   createUser(user: any): Promise<any>;
//   updateUser(id: string, user: Partial<any>): Promise<any | undefined>;
//   addInterest(interest: any): Promise<any>;
//   hasInterest(userId: string, propertyId: string): Promise<boolean>;
//   getInterestedUsersByProperty(propertyId: string): Promise<any[]>;
// }

// export class DatabaseStorage implements IStorage {
//   async getUser(id: string): Promise<any | undefined> {
//     const [user] = await db.select().from(users).where(eq(users.id, Number(id)));
//     return user || undefined;
//   }

//   async getUserByUsername(username: string): Promise<any | undefined> {
//     const [user] = await db.select().from(users).where(eq(users.username, username));
//     return user || undefined;
//   }

//   async createUser(insertUser: any): Promise<any> {
//     const result = await db.insert(users).values(insertUser);
//     // If result.insertId is not available, just return the inserted user
//     return { ...insertUser };
//   }

//   async updateUser(id: string, userData: Partial<any>): Promise<any | undefined> {
//     await db.update(users).set(userData).where(eq(users.id, Number(id)));
//     return this.getUser(id);
//   }

//   async addInterest(interest: any): Promise<any> {
//     const exists = await this.hasInterest(interest.userId, interest.propertyId);
//     if (exists) return null;
//     await db.insert(interests).values({
//       ...interest,
//       userId: Number(interest.userId),
//       propertyId: Number(interest.propertyId)
//     });
//     return interest;
//   }

//   async hasInterest(userId: string, propertyId: string): Promise<boolean> {
//     const [existing] = await db
//       .select()
//       .from(interests)
//       .where(and(
//         eq(interests.userId, Number(userId)),
//         eq(interests.propertyId, Number(propertyId))
//       ));
//     return !!existing;
//   }

//   async getInterestedUsersByProperty(propertyId: string): Promise<any[]> {
//     const rows = await db
//       .select()
//       .from(interests)
//       .innerJoin(users, eq(interests.userId, users.id))
//       .where(eq(interests.propertyId, Number(propertyId)));
//     // Drizzle returns { interests: ..., users: ... }
//     return rows.map((row: any) => row.users);
//   }
// }

// export const storage = new DatabaseStorage();
