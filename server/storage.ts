import { 
  users, properties, propertyImages, favorites, inquiries,
  type User, type InsertUser, 
  type Property, type InsertProperty,
  type PropertyImage, type InsertPropertyImage,
  type Favorite, type InsertFavorite,
  type Inquiry, type InsertInquiry 
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, sql, asc } from "drizzle-orm";

// The interface with CRUD methods for all models
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;
  
  // Property methods
  getProperty(id: number): Promise<Property | undefined>;
  getPropertiesByOwner(ownerId: number): Promise<Property[]>;
  getAllProperties(filters?: {
    type?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    bathrooms?: number;
    city?: string;
    state?: string;
    isAvailable?: boolean;
  }): Promise<Property[]>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: number, property: Partial<InsertProperty>): Promise<Property | undefined>;
  deleteProperty(id: number): Promise<boolean>;
  approveProperty(id: number): Promise<Property | undefined>;
  
  // Property Image methods
  getPropertyImages(propertyId: number): Promise<PropertyImage[]>;
  addPropertyImage(image: InsertPropertyImage): Promise<PropertyImage>;
  deletePropertyImage(id: number): Promise<boolean>;
  
  // Favorites methods
  getUserFavorites(userId: number): Promise<Favorite[]>;
  toggleFavorite(favorite: InsertFavorite): Promise<Favorite | undefined>;
  isFavorite(userId: number, propertyId: number): Promise<boolean>;
  
  // Inquiry methods
  getInquiriesByProperty(propertyId: number): Promise<Inquiry[]>;
  getInquiriesByUser(userId: number): Promise<Inquiry[]>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  updateInquiryStatus(id: number, status: string): Promise<Inquiry | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined> {
    const [updatedUser] = await db
      .update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning();
    return updatedUser || undefined;
  }

  // Property methods
  async getProperty(id: number): Promise<Property | undefined> {
    const [property] = await db.select().from(properties).where(eq(properties.id, id));
    return property || undefined;
  }

  async getPropertiesByOwner(ownerId: number): Promise<Property[]> {
    return db
      .select()
      .from(properties)
      .where(eq(properties.ownerId, ownerId))
      .orderBy(desc(properties.createdAt));
  }

  async getAllProperties(filters?: {
    type?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    bathrooms?: number;
    city?: string;
    state?: string;
    isAvailable?: boolean;
  }): Promise<Property[]> {
    // Build query conditions
    let query = db.select().from(properties);
    
    if (filters) {
      // Type filter
      if (filters.type) {
        query = query.where(eq(properties.type, filters.type));
      }
      
      // Price range filters
      if (filters.minPrice !== undefined) {
        query = query.where(sql`${properties.price} >= ${filters.minPrice}`);
      }
      
      if (filters.maxPrice !== undefined) {
        query = query.where(sql`${properties.price} <= ${filters.maxPrice}`);
      }
      
      // Room filters
      if (filters.bedrooms !== undefined) {
        query = query.where(eq(properties.bedrooms, filters.bedrooms));
      }
      
      if (filters.bathrooms !== undefined) {
        query = query.where(eq(properties.bathrooms, filters.bathrooms));
      }
      
      // Location filters
      if (filters.city) {
        query = query.where(eq(properties.city, filters.city));
      }
      
      if (filters.state) {
        query = query.where(eq(properties.state, filters.state));
      }
      
      // Availability filter
      if (filters.isAvailable !== undefined) {
        query = query.where(eq(properties.isAvailable, filters.isAvailable));
      }
    }
    
    // Execute query with sorting
    const result = await query.orderBy(desc(properties.createdAt));
    return result;
  }

  async createProperty(property: InsertProperty): Promise<Property> {
    const [newProperty] = await db
      .insert(properties)
      .values(property)
      .returning();
    return newProperty;
  }

  async updateProperty(id: number, propertyData: Partial<InsertProperty>): Promise<Property | undefined> {
    const [updatedProperty] = await db
      .update(properties)
      .set(propertyData)
      .where(eq(properties.id, id))
      .returning();
    return updatedProperty || undefined;
  }

  async approveProperty(id: number): Promise<Property | undefined> {
    const [approvedProperty] = await db
      .update(properties)
      .set({ approvalStatus: 'approved', updatedAt: new Date() })
      .where(eq(properties.id, id))
      .returning();
    return approvedProperty || undefined;
  }

  async deleteProperty(id: number): Promise<boolean> {
    const result = await db
      .delete(properties)
      .where(eq(properties.id, id))
      .returning({ id: properties.id });
    return result.length > 0;
  }

  // Property Image methods
  async getPropertyImages(propertyId: number): Promise<PropertyImage[]> {
    return db
      .select()
      .from(propertyImages)
      .where(eq(propertyImages.propertyId, propertyId))
      .orderBy(asc(propertyImages.id));
  }

  async addPropertyImage(image: InsertPropertyImage): Promise<PropertyImage> {
    const [newImage] = await db
      .insert(propertyImages)
      .values(image)
      .returning();
    return newImage;
  }

  async deletePropertyImage(id: number): Promise<boolean> {
    const result = await db
      .delete(propertyImages)
      .where(eq(propertyImages.id, id))
      .returning({ id: propertyImages.id });
    return result.length > 0;
  }

  // Favorites methods
  async getUserFavorites(userId: number): Promise<Favorite[]> {
    return db
      .select()
      .from(favorites)
      .where(eq(favorites.userId, userId))
      .orderBy(desc(favorites.createdAt));
  }

  async toggleFavorite(favorite: InsertFavorite): Promise<Favorite | undefined> {
    // Check if the favorite already exists
    const [existingFavorite] = await db
      .select()
      .from(favorites)
      .where(
        and(
          eq(favorites.userId, favorite.userId), 
          eq(favorites.propertyId, favorite.propertyId)
        )
      );
    
    if (existingFavorite) {
      // If it exists, delete it
      await db
        .delete(favorites)
        .where(eq(favorites.id, existingFavorite.id));
      return undefined;
    } else {
      // If it doesn't exist, create it
      const [newFavorite] = await db
        .insert(favorites)
        .values(favorite)
        .returning();
      return newFavorite;
    }
  }

  async isFavorite(userId: number, propertyId: number): Promise<boolean> {
    const [existingFavorite] = await db
      .select()
      .from(favorites)
      .where(
        and(
          eq(favorites.userId, userId), 
          eq(favorites.propertyId, propertyId)
        )
      );
    
    return !!existingFavorite;
  }

  // Inquiry methods
  async getInquiriesByProperty(propertyId: number): Promise<Inquiry[]> {
    return db
      .select()
      .from(inquiries)
      .where(eq(inquiries.propertyId, propertyId))
      .orderBy(desc(inquiries.createdAt));
  }

  async getInquiriesByUser(userId: number): Promise<Inquiry[]> {
    return db
      .select()
      .from(inquiries)
      .where(eq(inquiries.userId, userId))
      .orderBy(desc(inquiries.createdAt));
  }

  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    const [newInquiry] = await db
      .insert(inquiries)
      .values(inquiry)
      .returning();
    return newInquiry;
  }

  async updateInquiryStatus(id: number, status: string): Promise<Inquiry | undefined> {
    const [updatedInquiry] = await db
      .update(inquiries)
      .set({ 
        status,
        updatedAt: new Date()
      })
      .where(eq(inquiries.id, id))
      .returning();
    return updatedInquiry || undefined;
  }
}

export const storage = new DatabaseStorage();
