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
    // Initialize categories for all vehicle types
    const categoriesData = [
      { name: "Automotive", description: "Engine, brake, suspension, electrical parts for cars & trucks", icon: "fas fa-car" },
      { name: "Motorcycle", description: "Engine parts, tires, chains, exhaust systems", icon: "fas fa-motorcycle" },
      { name: "Marine", description: "Engines, propellers, electronics, hull parts for boats & jetskis", icon: "fas fa-anchor" },
      { name: "ATV & UTV", description: "Suspension, drivetrain, body panels, accessories for ATVs, UTVs & snowmobiles", icon: "fas fa-mountain" },
      { name: "RV & Motorhome", description: "Appliances, electrical, plumbing, chassis parts", icon: "fas fa-truck" },
      { name: "Heavy Equipment", description: "Hydraulics, tracks, engines, cab components", icon: "fas fa-cog" },
      { name: "Aircraft", description: "Avionics, engines, landing gear, interior components", icon: "fas fa-plane" },
    ];
    categoriesData.forEach(cat => this.createCategory(cat));

    // Initialize partners across all vehicle categories
    const partnersData = [
      // Automotive
      { name: "BMW Dealership", type: "dealership", address: "1234 Auto Plaza Dr", phone: "(555) 123-4567", email: "parts@bmw-dealer.com", isActive: true, pickupInstructions: "Use service entrance" },
      { name: "AutoZone", type: "store", address: "1234 Commerce Way", phone: "(555) 234-5678", email: "manager@autozone.com", isActive: true, pickupInstructions: "Counter pickup" },
      { name: "Ford Dealership", type: "dealership", address: "5555 Dealership Row", phone: "(555) 345-6789", email: "parts@ford-dealer.com", isActive: true, pickupInstructions: "Parts department" },
      { name: "Auto Dismantler", type: "dismantler", address: "999 Salvage Yard Rd", phone: "(555) 456-7890", email: "info@autodismantler.com", isActive: true, pickupInstructions: "Check in at office first" },
      
      // Marine
      { name: "MarineMax", type: "dealership", address: "800 Marina Blvd", phone: "(555) 567-8901", email: "parts@marinemax.com", isActive: true, pickupInstructions: "Service dock entrance" },
      { name: "West Marine", type: "store", address: "450 Harbor View Dr", phone: "(555) 678-9012", email: "store@westmarine.com", isActive: true, pickupInstructions: "Parts counter" },
      { name: "Boat Salvage Co", type: "dismantler", address: "1200 Boatyard Rd", phone: "(555) 789-0123", email: "info@boatsalvage.com", isActive: true, pickupInstructions: "Check in at harbor office" },
      
      // Motorcycle
      { name: "Harley-Davidson Dealer", type: "dealership", address: "2100 Thunder Road", phone: "(555) 890-1234", email: "parts@harley-dealer.com", isActive: true, pickupInstructions: "Service department" },
      { name: "Cycle Gear", type: "store", address: "3300 Bike Lane", phone: "(555) 901-2345", email: "manager@cyclegear.com", isActive: true, pickupInstructions: "Front counter" },
      { name: "Motorcycle Salvage", type: "dismantler", address: "1500 Salvage Way", phone: "(555) 012-3456", email: "parts@motosalvage.com", isActive: true, pickupInstructions: "Office check-in required" },
      
      // ATV & RV
      { name: "Polaris Dealer", type: "dealership", address: "4200 Off-Road Blvd", phone: "(555) 123-4567", email: "parts@polaris-dealer.com", isActive: true, pickupInstructions: "Service bay entrance" },
      { name: "Camping World RV", type: "store", address: "5500 RV Center Dr", phone: "(555) 234-5678", email: "parts@campingworld.com", isActive: true, pickupInstructions: "Parts department" },
      { name: "RV Salvage Depot", type: "dismantler", address: "6600 Salvage Park", phone: "(555) 345-6789", email: "info@rvsalvage.com", isActive: true, pickupInstructions: "Main office entrance" },
      
      // Aircraft
      { name: "Aircraft Spruce", type: "store", address: "7700 Aviation Way", phone: "(555) 456-7890", email: "parts@aircraftspruce.com", isActive: true, pickupInstructions: "Parts counter, ID required" },
      { name: "Cessna Service Center", type: "dealership", address: "8800 Runway Dr", phone: "(555) 567-8901", email: "service@cessna-center.com", isActive: true, pickupInstructions: "Maintenance hangar entrance" },
      { name: "Aviation Salvage Co", type: "dismantler", address: "9900 Airplane Boneyard", phone: "(555) 678-9012", email: "parts@aviationsalvage.com", isActive: true, pickupInstructions: "Security checkpoint required" },
    ];
    partnersData.forEach(partner => this.createPartner(partner));

    // Initialize vehicles across all categories
    const vehiclesData = [
      // Automotive
      { make: "BMW", model: "3 Series", year: 2020, engine: "2.0L Turbo", category: "automotive" },
      { make: "Ford", model: "F-150", year: 2019, engine: "3.5L V6", category: "automotive" },
      { make: "Toyota", model: "Camry", year: 2021, engine: "2.5L I4", category: "automotive" },
      
      // Motorcycles
      { make: "Harley-Davidson", model: "Sportster", year: 2023, engine: "883cc V-Twin", category: "motorcycle" },
      { make: "Yamaha", model: "R1", year: 2022, engine: "998cc Inline-4", category: "motorcycle" },
      { make: "Honda", model: "Gold Wing", year: 2021, engine: "1833cc Flat-6", category: "motorcycle" },
      
      // Marine
      { make: "Sea Ray", model: "Sundancer 320", year: 2023, engine: "MerCruiser 6.2L", category: "marine" },
      { make: "Boston Whaler", model: "Outrage 330", year: 2022, engine: "Triple 300 HP", category: "marine" },
      { make: "Yamaha", model: "242X E-Series", year: 2023, engine: "Twin 1.8L", category: "marine" },
      { make: "Sea-Doo", model: "GTX 300", year: 2023, engine: "1630cc Rotax", category: "marine" },
      { make: "Kawasaki", model: "Ultra 310LX", year: 2022, engine: "1498cc Supercharged", category: "marine" },
      { make: "Yamaha", model: "GP1800R HO", year: 2023, engine: "1812cc SVHO", category: "marine" },
      
      // ATVs & UTVs
      { make: "Polaris", model: "RZR XP 1000", year: 2023, engine: "999cc ProStar", category: "atv" },
      { make: "Can-Am", model: "Maverick X3", year: 2022, engine: "900cc Turbo", category: "atv" },
      { make: "Honda", model: "Pioneer 1000", year: 2023, engine: "999cc i-4", category: "atv" },
      { make: "Ski-Doo", model: "Summit X 850", year: 2023, engine: "850cc E-TEC", category: "atv" },
      { make: "Polaris", model: "RMK 850", year: 2022, engine: "850cc Patriot", category: "atv" },
      { make: "Yamaha", model: "Mountain Max 800", year: 2023, engine: "800cc Genesis", category: "atv" },
      
      // RVs & Motorhomes
      { make: "Winnebago", model: "View 24D", year: 2023, engine: "Mercedes 3.0L V6", category: "rv" },
      { make: "Thor", model: "Ace 30.4", year: 2022, engine: "Ford 7.3L V8", category: "rv" },
      { make: "Forest River", model: "Berkshire XLT", year: 2023, engine: "Freightliner Chassis", category: "rv" },
      
      // Heavy Equipment
      { make: "Caterpillar", model: "320 Excavator", year: 2022, engine: "Cat C7.1 ACERT", category: "heavy" },
      { make: "John Deere", model: "6155R Tractor", year: 2023, engine: "6.8L PowerTech", category: "heavy" },
      
      // Aircraft
      { make: "Cessna", model: "172 Skyhawk", year: 2020, engine: "Lycoming IO-360", category: "aircraft" },
      { make: "Piper", model: "Cherokee PA-28", year: 2019, engine: "Lycoming O-360", category: "aircraft" },
      { make: "Beechcraft", model: "Bonanza G36", year: 2022, engine: "Continental IO-550-N", category: "aircraft" },
      { make: "Diamond", model: "DA40 Star", year: 2021, engine: "Lycoming IO-360-M1A", category: "aircraft" },
      { make: "Cirrus", model: "SR22T", year: 2023, engine: "Continental TSIO-550-K", category: "aircraft" },
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
      
      // Snowmobile Parts (Premium Pricing)
      {
        name: "850cc Engine Block",
        description: "Complete Ski-Doo Summit X 850 engine block",
        categoryId: 4,
        partnerId: 10,
        price: "8,999.99",
        originalPrice: "12,500.00",
        condition: "used",
        source: "oem",
        stock: 1,
        vehicleCompatibility: [15],
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        estimatedDeliveryTime: 480,
        isActive: true,
      },
      {
        name: "Track Assembly 154x2.6",
        description: "Premium PowerClaw track for mountain riding",
        categoryId: 4,
        partnerId: 10,
        price: "1,299.99",
        originalPrice: "1,599.99",
        condition: "new",
        source: "aftermarket",
        stock: 3,
        vehicleCompatibility: [15, 16],
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        estimatedDeliveryTime: 240,
        isActive: true,
      },
      
      // Aircraft Parts (Premium Pricing for Large Components)
      {
        name: "Lycoming IO-360 Engine",
        description: "Complete overhauled engine for Cessna 172",
        categoryId: 7,
        partnerId: 15,
        price: "42,500.00",
        originalPrice: "65,000.00",
        condition: "overhauled",
        source: "certified",
        stock: 1,
        vehicleCompatibility: [22],
        imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        estimatedDeliveryTime: 2880,
        isActive: true,
      },
      {
        name: "Garmin G1000 Glass Cockpit",
        description: "Complete avionics suite with installation kit",
        categoryId: 7,
        partnerId: 14,
        price: "28,999.99",
        originalPrice: "45,000.00",
        condition: "new",
        source: "oem",
        stock: 2,
        vehicleCompatibility: [22, 23, 24],
        imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        estimatedDeliveryTime: 1440,
        isActive: true,
      },
      {
        name: "Wing Assembly - Cessna 172",
        description: "Complete wing assembly with fuel tanks",
        categoryId: 7,
        partnerId: 16,
        price: "18,750.00",
        originalPrice: "35,000.00",
        condition: "serviceable",
        source: "salvage",
        stock: 1,
        vehicleCompatibility: [22],
        imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        estimatedDeliveryTime: 1680,
        isActive: true,
      },
      {
        name: "Landing Gear Strut",
        description: "Main landing gear strut for Piper Cherokee",
        categoryId: 7,
        partnerId: 15,
        price: "3,450.00",
        originalPrice: "5,200.00",
        condition: "overhauled",
        source: "certified",
        stock: 2,
        vehicleCompatibility: [23],
        imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        estimatedDeliveryTime: 720,
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
