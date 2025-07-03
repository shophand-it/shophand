import {
  users,
  drivers,
  partners,
  vehicles,
  categories,
  parts,
  orders,
  orderItems,
  deliveries,
  type User,
  type Driver,
  type Partner,
  type Vehicle,
  type Category,
  type Part,
  type Order,
  type OrderItem,
  type Delivery,
  type InsertUser,
  type InsertDriver,
  type InsertPartner,
  type InsertVehicle,
  type InsertCategory,
  type InsertPart,
  type InsertOrder,
  type InsertOrderItem,
  type InsertDelivery,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Drivers
  getDriver(id: number): Promise<Driver | undefined>;
  getDriverByUserId(userId: number): Promise<Driver | undefined>;
  createDriver(driver: InsertDriver): Promise<Driver>;
  updateDriverStatus(id: number, isOnline: boolean): Promise<void>;
  getOnlineDrivers(): Promise<Driver[]>;
  
  // Partners
  getPartner(id: number): Promise<Partner | undefined>;
  getPartners(): Promise<Partner[]>;
  createPartner(partner: InsertPartner): Promise<Partner>;
  
  // Vehicles
  getVehicle(id: number): Promise<Vehicle | undefined>;
  getVehicles(): Promise<Vehicle[]>;
  createVehicle(vehicle: InsertVehicle): Promise<Vehicle>;
  
  // Categories
  getCategory(id: number): Promise<Category | undefined>;
  getCategories(): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Parts
  getPart(id: number): Promise<Part | undefined>;
  getParts(filters?: { categoryId?: number; partnerId?: number; search?: string }): Promise<Part[]>;
  createPart(part: InsertPart): Promise<Part>;
  searchPartsByVehicle(make: string, model: string, year: number): Promise<Part[]>;
  
  // Orders
  getOrder(id: number): Promise<Order | undefined>;
  getOrdersByUser(userId: number): Promise<Order[]>;
  getOrdersByDriver(driverId: number): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: number, status: string): Promise<void>;
  assignDriverToOrder(orderId: number, driverId: number): Promise<void>;
  
  // Order Items
  getOrderItems(orderId: number): Promise<OrderItem[]>;
  createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;
  
  // Deliveries
  getDelivery(id: number): Promise<Delivery | undefined>;
  getAvailablePickups(): Promise<Order[]>;
  createDelivery(delivery: InsertDelivery): Promise<Delivery>;
  updateDeliveryStatus(id: number, status: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  
  // Users
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Drivers
  async getDriver(id: number): Promise<Driver | undefined> {
    const [driver] = await db.select().from(drivers).where(eq(drivers.id, id));
    return driver || undefined;
  }

  async getDriverByUserId(userId: number): Promise<Driver | undefined> {
    const [driver] = await db.select().from(drivers).where(eq(drivers.userId, userId));
    return driver || undefined;
  }

  async createDriver(insertDriver: InsertDriver): Promise<Driver> {
    const [driver] = await db
      .insert(drivers)
      .values(insertDriver)
      .returning();
    return driver;
  }

  async updateDriverStatus(id: number, isOnline: boolean): Promise<void> {
    await db
      .update(drivers)
      .set({ isOnline })
      .where(eq(drivers.id, id));
  }

  async getOnlineDrivers(): Promise<Driver[]> {
    return await db.select().from(drivers).where(eq(drivers.isOnline, true));
  }

  // Partners
  async getPartner(id: number): Promise<Partner | undefined> {
    const [partner] = await db.select().from(partners).where(eq(partners.id, id));
    return partner || undefined;
  }

  async getPartners(): Promise<Partner[]> {
    return await db.select().from(partners);
  }

  async createPartner(insertPartner: InsertPartner): Promise<Partner> {
    const [partner] = await db
      .insert(partners)
      .values(insertPartner)
      .returning();
    return partner;
  }

  // Vehicles
  async getVehicle(id: number): Promise<Vehicle | undefined> {
    const [vehicle] = await db.select().from(vehicles).where(eq(vehicles.id, id));
    return vehicle || undefined;
  }

  async getVehicles(): Promise<Vehicle[]> {
    return await db.select().from(vehicles);
  }

  async createVehicle(insertVehicle: InsertVehicle): Promise<Vehicle> {
    const [vehicle] = await db
      .insert(vehicles)
      .values(insertVehicle)
      .returning();
    return vehicle;
  }

  // Categories  
  async getCategory(id: number): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.id, id));
    return category || undefined;
  }

  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const [category] = await db
      .insert(categories)
      .values(insertCategory)
      .returning();
    return category;
  }

  // Parts
  async getPart(id: number): Promise<Part | undefined> {
    const [part] = await db.select().from(parts).where(eq(parts.id, id));
    return part || undefined;
  }

  async getParts(filters?: { categoryId?: number; partnerId?: number; search?: string }): Promise<Part[]> {
    let query = db.select().from(parts);
    
    if (filters?.categoryId) {
      query = query.where(eq(parts.categoryId, filters.categoryId));
    }
    if (filters?.partnerId) {
      query = query.where(eq(parts.partnerId, filters.partnerId));
    }
    
    return await query;
  }

  async createPart(insertPart: InsertPart): Promise<Part> {
    const [part] = await db
      .insert(parts)
      .values(insertPart)
      .returning();
    return part;
  }

  async searchPartsByVehicle(make: string, model: string, year: number): Promise<Part[]> {
    return await db.select().from(parts);
  }

  // Orders
  async getOrder(id: number): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order || undefined;
  }

  async getOrdersByUser(userId: number): Promise<Order[]> {
    return await db.select().from(orders).where(eq(orders.userId, userId));
  }

  async getOrdersByDriver(driverId: number): Promise<Order[]> {
    return await db.select().from(orders).where(eq(orders.driverId, driverId));
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const [order] = await db
      .insert(orders)
      .values(insertOrder)
      .returning();
    return order;
  }

  async updateOrderStatus(id: number, status: string): Promise<void> {
    await db
      .update(orders)
      .set({ status })
      .where(eq(orders.id, id));
  }

  async assignDriverToOrder(orderId: number, driverId: number): Promise<void> {
    await db
      .update(orders)
      .set({ driverId })
      .where(eq(orders.id, orderId));
  }

  // Order Items
  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
  }

  async createOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const [orderItem] = await db
      .insert(orderItems)
      .values(insertOrderItem)
      .returning();
    return orderItem;
  }

  // Deliveries
  async getDelivery(id: number): Promise<Delivery | undefined> {
    const [delivery] = await db.select().from(deliveries).where(eq(deliveries.id, id));
    return delivery || undefined;
  }

  async getAvailablePickups(): Promise<Order[]> {
    return await db.select().from(orders).where(eq(orders.status, "confirmed"));
  }

  async createDelivery(insertDelivery: InsertDelivery): Promise<Delivery> {
    const [delivery] = await db
      .insert(deliveries)
      .values(insertDelivery)
      .returning();
    return delivery;
  }

  async updateDeliveryStatus(id: number, status: string): Promise<void> {
    await db
      .update(deliveries)
      .set({ status })
      .where(eq(deliveries.id, id));
  }
}

export const storage = new DatabaseStorage();