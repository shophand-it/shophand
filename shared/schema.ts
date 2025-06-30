import { pgTable, text, serial, integer, boolean, decimal, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phone: text("phone"),
  address: text("address"),
  userType: text("user_type").notNull().default("customer"), // customer, driver, business
  isActive: boolean("is_active").notNull().default(true),
  subscriptionTier: text("subscription_tier").default("basic"), // basic, premium, enterprise
  businessName: text("business_name"),
  businessType: text("business_type"), // repair_shop, fleet, dealership
  taxId: text("tax_id"),
});

export const drivers = pgTable("drivers", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  vehicleType: text("vehicle_type").notNull(),
  vehicleMake: text("vehicle_make").notNull(),
  vehicleModel: text("vehicle_model").notNull(),
  vehicleYear: integer("vehicle_year").notNull(),
  licensePlate: text("license_plate").notNull(),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("5.00"),
  totalDeliveries: integer("total_deliveries").default(0),
  isOnline: boolean("is_online").default(false),
  isVerified: boolean("is_verified").default(false),
});

export const partners = pgTable("partners", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // store, dealership, dismantler
  address: text("address").notNull(),
  phone: text("phone"),
  email: text("email"),
  isActive: boolean("is_active").default(true),
  pickupInstructions: text("pickup_instructions"),
});

export const vehicles = pgTable("vehicles", {
  id: serial("id").primaryKey(),
  make: text("make").notNull(),
  model: text("model").notNull(),
  year: integer("year").notNull(),
  engine: text("engine"),
  category: text("category").notNull().default("automotive"), // automotive, motorcycle, marine, rv, heavy_equipment
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  icon: text("icon").notNull(),
});

export const parts = pgTable("parts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  categoryId: integer("category_id").notNull().references(() => categories.id),
  partnerId: integer("partner_id").notNull().references(() => partners.id),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }),
  condition: text("condition").notNull(), // new, used, refurbished
  source: text("source").notNull(), // oem, aftermarket, recycled
  stock: integer("stock").default(0),
  vehicleCompatibility: jsonb("vehicle_compatibility"), // array of vehicle IDs
  imageUrl: text("image_url"),
  estimatedDeliveryTime: integer("estimated_delivery_time"), // in minutes
  isActive: boolean("is_active").default(true),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  driverId: integer("driver_id").references(() => drivers.id),
  status: text("status").notNull().default("pending"), // pending, confirmed, picked_up, out_for_delivery, delivered, cancelled
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  deliveryFee: decimal("delivery_fee", { precision: 10, scale: 2 }).default("0.00"),
  platformFee: decimal("platform_fee", { precision: 10, scale: 2 }).default("0.00"),
  deliveryAddress: text("delivery_address").notNull(),
  pickupAddress: text("pickup_address"),
  estimatedDeliveryTime: timestamp("estimated_delivery_time"),
  actualDeliveryTime: timestamp("actual_delivery_time"),
  priority: text("priority").default("standard"), // standard, express, emergency
  orderType: text("order_type").default("individual"), // individual, bulk, subscription
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull().references(() => orders.id),
  partId: integer("part_id").notNull().references(() => parts.id),
  quantity: integer("quantity").notNull().default(1),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
});

export const deliveries = pgTable("deliveries", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull().references(() => orders.id),
  driverId: integer("driver_id").notNull().references(() => drivers.id),
  pickupTime: timestamp("pickup_time"),
  deliveryTime: timestamp("delivery_time"),
  earnings: decimal("earnings", { precision: 10, scale: 2 }),
  status: text("status").notNull().default("assigned"), // assigned, picked_up, delivered
});

// New revenue-focused tables
export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  planType: text("plan_type").notNull(), // premium, enterprise, fleet
  status: text("status").notNull().default("active"), // active, cancelled, expired
  monthlyFee: decimal("monthly_fee", { precision: 10, scale: 2 }).notNull(),
  features: jsonb("features"), // array of feature flags
  startDate: timestamp("start_date").defaultNow(),
  endDate: timestamp("end_date"),
});

export const businessAnalytics = pgTable("business_analytics", {
  id: serial("id").primaryKey(),
  date: timestamp("date").defaultNow(),
  totalRevenue: decimal("total_revenue", { precision: 12, scale: 2 }).default("0.00"),
  platformFees: decimal("platform_fees", { precision: 12, scale: 2 }).default("0.00"),
  subscriptionRevenue: decimal("subscription_revenue", { precision: 12, scale: 2 }).default("0.00"),
  totalOrders: integer("total_orders").default(0),
  activeDrivers: integer("active_drivers").default(0),
  activeCustomers: integer("active_customers").default(0),
  marketShare: decimal("market_share", { precision: 5, scale: 2 }).default("0.00"),
});

export const partnerships = pgTable("partnerships", {
  id: serial("id").primaryKey(),
  partnerName: text("partner_name").notNull(),
  partnerType: text("partner_type").notNull(), // insurance, manufacturer, fleet, white_label
  contractValue: decimal("contract_value", { precision: 12, scale: 2 }),
  revenueShare: decimal("revenue_share", { precision: 5, scale: 2 }),
  status: text("status").default("active"),
  startDate: timestamp("start_date").defaultNow(),
  regions: jsonb("regions"), // array of regions/markets
});

export const productRecommendations = pgTable("product_recommendations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  vehicleId: integer("vehicle_id").references(() => vehicles.id),
  recommendedParts: jsonb("recommended_parts"), // AI-generated recommendations
  predictionAccuracy: decimal("prediction_accuracy", { precision: 5, scale: 2 }),
  conversionRate: decimal("conversion_rate", { precision: 5, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertDriverSchema = createInsertSchema(drivers).omit({
  id: true,
  rating: true,
  totalDeliveries: true,
});

export const insertPartnerSchema = createInsertSchema(partners).omit({
  id: true,
});

export const insertVehicleSchema = createInsertSchema(vehicles).omit({
  id: true,
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
});

export const insertPartSchema = createInsertSchema(parts).omit({
  id: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertOrderItemSchema = createInsertSchema(orderItems).omit({
  id: true,
});

export const insertDeliverySchema = createInsertSchema(deliveries).omit({
  id: true,
});

export const insertSubscriptionSchema = createInsertSchema(subscriptions).omit({
  id: true,
  startDate: true,
});

export const insertBusinessAnalyticsSchema = createInsertSchema(businessAnalytics).omit({
  id: true,
  date: true,
});

export const insertPartnershipSchema = createInsertSchema(partnerships).omit({
  id: true,
  startDate: true,
});

export const insertProductRecommendationSchema = createInsertSchema(productRecommendations).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertDriver = z.infer<typeof insertDriverSchema>;
export type Driver = typeof drivers.$inferSelect;

export type InsertPartner = z.infer<typeof insertPartnerSchema>;
export type Partner = typeof partners.$inferSelect;

export type InsertVehicle = z.infer<typeof insertVehicleSchema>;
export type Vehicle = typeof vehicles.$inferSelect;

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

export type InsertPart = z.infer<typeof insertPartSchema>;
export type Part = typeof parts.$inferSelect;

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;
export type OrderItem = typeof orderItems.$inferSelect;

export type InsertDelivery = z.infer<typeof insertDeliverySchema>;
export type Delivery = typeof deliveries.$inferSelect;

export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;
export type Subscription = typeof subscriptions.$inferSelect;

export type InsertBusinessAnalytics = z.infer<typeof insertBusinessAnalyticsSchema>;
export type BusinessAnalytics = typeof businessAnalytics.$inferSelect;

export type InsertPartnership = z.infer<typeof insertPartnershipSchema>;
export type Partnership = typeof partnerships.$inferSelect;

export type InsertProductRecommendation = z.infer<typeof insertProductRecommendationSchema>;
export type ProductRecommendation = typeof productRecommendations.$inferSelect;
