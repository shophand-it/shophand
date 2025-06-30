import {
  users, drivers, partners, vehicles, categories, parts, orders, orderItems, deliveries,
  type User, type InsertUser,
  type Driver, type InsertDriver,
  type Partner, type InsertPartner,
  type Vehicle, type InsertVehicle,
  type Category, type InsertCategory,
  type Part, type InsertPart,
  type Order, type InsertOrder,
  type OrderItem, type InsertOrderItem,
  type Delivery, type InsertDelivery,
} from "@shared/schema";

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

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private drivers: Map<number, Driver> = new Map();
  private partners: Map<number, Partner> = new Map();
  private vehicles: Map<number, Vehicle> = new Map();
  private categories: Map<number, Category> = new Map();
  private parts: Map<number, Part> = new Map();
  private orders: Map<number, Order> = new Map();
  private orderItems: Map<number, OrderItem> = new Map();
  private deliveries: Map<number, Delivery> = new Map();
  
  private currentIds = {
    user: 1,
    driver: 1,
    partner: 1,
    vehicle: 1,
    category: 1,
    part: 1,
    order: 1,
    orderItem: 1,
    delivery: 1,
  };

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize categories
    const categoriesData = [
      { name: "Engine Parts", description: "Pistons, valves, gaskets", icon: "fas fa-engine" },
      { name: "Brake System", description: "Pads, discs, calipers", icon: "fas fa-brake" },
      { name: "Electrical", description: "Batteries, alternators", icon: "fas fa-bolt" },
      { name: "Suspension", description: "Shocks, struts, springs", icon: "fas fa-tire" },
    ];
    categoriesData.forEach(cat => this.createCategory(cat));

    // Initialize partners
    const partnersData = [
      { name: "BMW Dealership", type: "dealership", address: "1234 Auto Plaza Dr", phone: "(555) 123-4567", email: "parts@bmw-dealer.com", isActive: true, pickupInstructions: "Use service entrance" },
      { name: "AutoZone", type: "store", address: "1234 Commerce Way", phone: "(555) 234-5678", email: "manager@autozone.com", isActive: true, pickupInstructions: "Counter pickup" },
      { name: "Ford Dealership", type: "dealership", address: "5555 Dealership Row", phone: "(555) 345-6789", email: "parts@ford-dealer.com", isActive: true, pickupInstructions: "Parts department" },
      { name: "Auto Dismantler", type: "dismantler", address: "999 Salvage Yard Rd", phone: "(555) 456-7890", email: "info@autodismantler.com", isActive: true, pickupInstructions: "Check in at office first" },
    ];
    partnersData.forEach(partner => this.createPartner(partner));

    // Initialize vehicles
    const vehiclesData = [
      { make: "BMW", model: "3 Series", year: 2020, engine: "2.0L Turbo" },
      { make: "Ford", model: "F-150", year: 2019, engine: "3.5L V6" },
      { make: "Toyota", model: "Camry", year: 2021, engine: "2.5L I4" },
    ];
    vehiclesData.forEach(vehicle => this.createVehicle(vehicle));

    // Initialize parts
    const partsData = [
      {
        name: "Premium Brake Disc Set",
        description: "High-performance brake discs for BMW 3 Series",
        categoryId: 2,
        partnerId: 1,
        price: "189.99",
        originalPrice: "229.99",
        condition: "new",
        source: "oem",
        stock: 5,
        vehicleCompatibility: [1],
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        estimatedDeliveryTime: 150,
        isActive: true,
      },
      {
        name: "High-Flow Air Filter",
        description: "Universal fit for most V6 engines",
        categoryId: 1,
        partnerId: 4,
        price: "45.99",
        originalPrice: "89.99",
        condition: "used",
        source: "recycled",
        stock: 3,
        vehicleCompatibility: [2],
        imageUrl: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        estimatedDeliveryTime: 90,
        isActive: true,
      },
      {
        name: "120A Alternator",
        description: "Compatible with Ford F-150 2015-2020",
        categoryId: 3,
        partnerId: 2,
        price: "159.99",
        originalPrice: "199.99",
        condition: "new",
        source: "aftermarket",
        stock: 8,
        vehicleCompatibility: [2],
        imageUrl: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        estimatedDeliveryTime: 30,
        isActive: true,
      },
    ];
    partsData.forEach(part => this.createPart(part));
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentIds.user++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Drivers
  async getDriver(id: number): Promise<Driver | undefined> {
    return this.drivers.get(id);
  }

  async getDriverByUserId(userId: number): Promise<Driver | undefined> {
    return Array.from(this.drivers.values()).find(driver => driver.userId === userId);
  }

  async createDriver(insertDriver: InsertDriver): Promise<Driver> {
    const id = this.currentIds.driver++;
    const driver: Driver = { 
      ...insertDriver, 
      id, 
      rating: "5.00", 
      totalDeliveries: 0,
      isOnline: false,
      isVerified: false,
    };
    this.drivers.set(id, driver);
    return driver;
  }

  async updateDriverStatus(id: number, isOnline: boolean): Promise<void> {
    const driver = this.drivers.get(id);
    if (driver) {
      this.drivers.set(id, { ...driver, isOnline });
    }
  }

  async getOnlineDrivers(): Promise<Driver[]> {
    return Array.from(this.drivers.values()).filter(driver => driver.isOnline);
  }

  // Partners
  async getPartner(id: number): Promise<Partner | undefined> {
    return this.partners.get(id);
  }

  async getPartners(): Promise<Partner[]> {
    return Array.from(this.partners.values()).filter(partner => partner.isActive);
  }

  async createPartner(insertPartner: InsertPartner): Promise<Partner> {
    const id = this.currentIds.partner++;
    const partner: Partner = { ...insertPartner, id };
    this.partners.set(id, partner);
    return partner;
  }

  // Vehicles
  async getVehicle(id: number): Promise<Vehicle | undefined> {
    return this.vehicles.get(id);
  }

  async getVehicles(): Promise<Vehicle[]> {
    return Array.from(this.vehicles.values());
  }

  async createVehicle(insertVehicle: InsertVehicle): Promise<Vehicle> {
    const id = this.currentIds.vehicle++;
    const vehicle: Vehicle = { ...insertVehicle, id };
    this.vehicles.set(id, vehicle);
    return vehicle;
  }

  // Categories
  async getCategory(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentIds.category++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  // Parts
  async getPart(id: number): Promise<Part | undefined> {
    return this.parts.get(id);
  }

  async getParts(filters?: { categoryId?: number; partnerId?: number; search?: string }): Promise<Part[]> {
    let parts = Array.from(this.parts.values()).filter(part => part.isActive);
    
    if (filters?.categoryId) {
      parts = parts.filter(part => part.categoryId === filters.categoryId);
    }
    
    if (filters?.partnerId) {
      parts = parts.filter(part => part.partnerId === filters.partnerId);
    }
    
    if (filters?.search) {
      const search = filters.search.toLowerCase();
      parts = parts.filter(part => 
        part.name.toLowerCase().includes(search) ||
        part.description.toLowerCase().includes(search)
      );
    }
    
    return parts;
  }

  async createPart(insertPart: InsertPart): Promise<Part> {
    const id = this.currentIds.part++;
    const part: Part = { ...insertPart, id };
    this.parts.set(id, part);
    return part;
  }

  async searchPartsByVehicle(make: string, model: string, year: number): Promise<Part[]> {
    const vehicle = Array.from(this.vehicles.values()).find(v => 
      v.make.toLowerCase() === make.toLowerCase() &&
      v.model.toLowerCase() === model.toLowerCase() &&
      v.year === year
    );
    
    if (!vehicle) return [];
    
    return Array.from(this.parts.values()).filter(part => {
      const compatibility = part.vehicleCompatibility as number[] | null;
      return compatibility && compatibility.includes(vehicle.id) && part.isActive;
    });
  }

  // Orders
  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getOrdersByUser(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(order => order.userId === userId);
  }

  async getOrdersByDriver(driverId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(order => order.driverId === driverId);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentIds.order++;
    const order: Order = { 
      ...insertOrder, 
      id, 
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.orders.set(id, order);
    return order;
  }

  async updateOrderStatus(id: number, status: string): Promise<void> {
    const order = this.orders.get(id);
    if (order) {
      this.orders.set(id, { ...order, status, updatedAt: new Date() });
    }
  }

  async assignDriverToOrder(orderId: number, driverId: number): Promise<void> {
    const order = this.orders.get(orderId);
    if (order) {
      this.orders.set(orderId, { ...order, driverId, status: "confirmed", updatedAt: new Date() });
    }
  }

  // Order Items
  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values()).filter(item => item.orderId === orderId);
  }

  async createOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const id = this.currentIds.orderItem++;
    const orderItem: OrderItem = { ...insertOrderItem, id };
    this.orderItems.set(id, orderItem);
    return orderItem;
  }

  // Deliveries
  async getDelivery(id: number): Promise<Delivery | undefined> {
    return this.deliveries.get(id);
  }

  async getAvailablePickups(): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(order => 
      order.status === "pending" && !order.driverId
    );
  }

  async createDelivery(insertDelivery: InsertDelivery): Promise<Delivery> {
    const id = this.currentIds.delivery++;
    const delivery: Delivery = { ...insertDelivery, id };
    this.deliveries.set(id, delivery);
    return delivery;
  }

  async updateDeliveryStatus(id: number, status: string): Promise<void> {
    const delivery = this.deliveries.get(id);
    if (delivery) {
      this.deliveries.set(id, { ...delivery, status });
    }
  }
}

export const storage = new MemStorage();
