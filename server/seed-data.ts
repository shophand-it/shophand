import { db } from "./db";
import { users, drivers, partners, vehicles, categories, parts, orders, orderItems } from "@shared/schema";

export async function seedDatabase() {
  try {
    console.log("Starting database seeding...");

    // Check if data already exists
    const existingParts = await db.select().from(parts).limit(1);
    if (existingParts.length > 0) {
      console.log("Database already seeded, skipping...");
      return;
    }

    // Seed Categories
    const categoryData = [
      { name: "Engine Parts", description: "Engine components and accessories", icon: "engine" },
      { name: "Brake System", description: "Brake components and hardware", icon: "brake" },
      { name: "Electrical", description: "Electrical components and wiring", icon: "electric" },
      { name: "Suspension", description: "Suspension and steering components", icon: "suspension" },
      { name: "Exhaust", description: "Exhaust system components", icon: "exhaust" },
      { name: "Marine Parts", description: "Boat and marine vehicle parts", icon: "marine" },
      { name: "Aviation Parts", description: "Aircraft components and accessories", icon: "aviation" },
      { name: "Recreational", description: "ATV, snowmobile, and recreational vehicle parts", icon: "recreational" }
    ];

    const insertedCategories = [];
    for (const category of categoryData) {
      const result = await db.insert(categories).values(category).returning();
      insertedCategories.push(result[0]);
    }

    // Seed Partners
    const partnerData = [
      { 
        name: "AutoZone", 
        type: "store",
        address: "1234 Commerce Way, Atlanta, GA 30309",
        email: "partnership@autozone.com", 
        phone: "(555) 123-4567",
        isActive: true
      },
      { 
        name: "BMW Dealership", 
        type: "dealership",
        address: "5678 Luxury Ave, Beverly Hills, CA 90210",
        email: "parts@bmwdealer.com", 
        phone: "(555) 234-5678",
        isActive: true
      },
      {
        name: "Salvage Masters",
        type: "dismantler",
        address: "999 Scrap Yard Dr, Detroit, MI 48201",
        email: "info@salvage-masters.com",
        phone: "(555) 345-6789", 
        isActive: true
      },
      {
        name: "Marine Supply Co",
        type: "store",
        address: "123 Harbor Way, Miami, FL 33101",
        email: "sales@marinesupply.com",
        phone: "(555) 456-7890",
        isActive: true
      },
      {
        name: "Aircraft Spruce",
        type: "store",
        address: "7700 Aviation Blvd, Corona, CA 92880",
        email: "orders@aircraftspruce.com",
        phone: "(555) 567-8901",
        isActive: true
      }
    ];

    const insertedPartners = [];
    for (const partner of partnerData) {
      const result = await db.insert(partners).values(partner).returning();
      insertedPartners.push(result[0]);
    }

    // Seed Vehicles
    const vehicleData = [
      { id: 1, make: "BMW", model: "320i", year: 2020, vehicleType: "car" },
      { id: 2, make: "Toyota", model: "Camry", year: 2019, vehicleType: "car" },
      { id: 3, make: "Ford", model: "F-150", year: 2021, vehicleType: "truck" },
      { id: 4, make: "Honda", model: "Civic", year: 2018, vehicleType: "car" },
      { id: 5, make: "Yamaha", model: "WaveRunner", year: 2022, vehicleType: "marine" },
      { id: 6, make: "Cessna", model: "172", year: 2015, vehicleType: "aircraft" },
      { id: 7, make: "Polaris", model: "RZR", year: 2023, vehicleType: "recreational" }
    ];

    for (const vehicle of vehicleData) {
      await db.insert(vehicles).values(vehicle).onConflictDoNothing();
    }

    // Seed Parts
    const partData = [
      {
        name: "BMW Brake Disc Set",
        description: "Premium brake disc set for BMW 3 Series. Includes front and rear discs with installation hardware.",
        price: "189.99",
        categoryId: 2,
        partnerId: 2,
        condition: "new",
        source: "oem",
        stock: 15,
        vehicleCompatibility: JSON.stringify({ makes: ["BMW"], models: ["320i", "330i"], years: [2018, 2019, 2020, 2021] }),
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center"
      },
      {
        name: "Toyota Engine Air Filter",
        description: "High-performance engine air filter for Toyota Camry. Improves airflow and engine efficiency.",
        price: "24.99",
        categoryId: 1,
        partnerId: 1,
        condition: "new",
        source: "aftermarket",
        stock: 25,
        vehicleCompatibility: JSON.stringify({ makes: ["Toyota"], models: ["Camry"], years: [2018, 2019, 2020] }),
        imageUrl: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=400&fit=crop&crop=center"
      },
      {
        name: "Ford F-150 Exhaust System",
        description: "Complete exhaust system replacement for Ford F-150. Stainless steel construction.",
        price: "445.00",
        categoryId: 5,
        partnerId: 3,
        condition: "refurbished",
        source: "aftermarket",
        stock: 8,
        vehicleCompatibility: JSON.stringify({ makes: ["Ford"], models: ["F-150"], years: [2020, 2021, 2022] }),
        imageUrl: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=400&fit=crop&crop=center"
      },
      {
        name: "Marine Propeller - Stainless Steel", 
        description: "High-performance stainless steel propeller for Yamaha WaveRunner. 3-blade design.",
        price: "299.99",
        categoryId: 6,
        partnerId: 4,
        condition: "new",
        source: "oem",
        stock: 12,
        vehicleCompatibility: JSON.stringify({ makes: ["Yamaha"], models: ["WaveRunner"], years: [2020, 2021, 2022, 2023] }),
        imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=400&fit=crop&crop=center"
      },
      {
        name: "Aircraft Avionics Display Unit",
        description: "Modern avionics display unit for Cessna 172. GPS navigation and flight instruments.",
        price: "1299.99",
        categoryId: 7,
        partnerId: 5,
        condition: "new",
        source: "oem",
        stock: 3,
        vehicleCompatibility: JSON.stringify({ makes: ["Cessna"], models: ["172"], years: [2010, 2011, 2012, 2013, 2014, 2015] }),
        imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=400&fit=crop&crop=center"
      },
      {
        name: "Honda Suspension Shock",
        description: "Front suspension shock absorber for Honda Civic. Improves ride quality and handling.",
        price: "89.99",
        categoryId: 4,
        partnerId: 1,
        condition: "new",
        source: "aftermarket",
        stock: 20,
        vehicleCompatibility: JSON.stringify({ makes: ["Honda"], models: ["Civic"], years: [2016, 2017, 2018, 2019] }),
        imageUrl: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=400&fit=crop&crop=center"
      },
      {
        name: "Polaris RZR Drive Belt",
        description: "Heavy-duty drive belt for Polaris RZR recreational vehicles. Designed for extreme conditions.",
        price: "159.99",
        categoryId: 8,
        partnerId: 3,
        condition: "new",
        source: "oem",
        stock: 6,
        vehicleCompatibility: JSON.stringify({ makes: ["Polaris"], models: ["RZR"], years: [2022, 2023] }),
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center"
      },
      {
        name: "BMW Electrical Harness",
        description: "Complete electrical wiring harness for BMW 3 Series. Includes all connectors and documentation.",
        price: "234.50",
        categoryId: 3,
        partnerId: 2,
        condition: "new",
        source: "oem",
        stock: 10,
        vehicleCompatibility: JSON.stringify({ makes: ["BMW"], models: ["320i", "330i"], years: [2019, 2020, 2021] }),
        imageUrl: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=400&fit=crop&crop=center"
      }
    ];

    for (const part of partData) {
      await db.insert(parts).values(part).onConflictDoNothing();
    }

    // Seed Users
    const userData = [
      {
        id: 1,
        email: "customer@shophand.com",
        username: "customer1",
        firstName: "John",
        lastName: "Doe",
        userType: "customer"
      },
      {
        id: 2,
        email: "driver@shophand.com", 
        username: "driver1",
        firstName: "Mike",
        lastName: "Wilson",
        userType: "driver"
      },
      {
        id: 3,
        email: "admin@shophand.com",
        username: "admin",
        firstName: "Sarah", 
        lastName: "Admin",
        userType: "business"
      }
    ];

    for (const user of userData) {
      await db.insert(users).values(user).onConflictDoNothing();
    }

    // Seed Drivers
    const driverData = [
      {
        id: 1,
        userId: 2,
        vehicleInfo: JSON.stringify({ make: "Honda", model: "Civic", year: 2020, licensePlate: "DRV-001" }),
        isOnline: true,
        rating: 4.8,
        earnings: 1250.75,
        status: "active"
      }
    ];

    for (const driver of driverData) {
      await db.insert(drivers).values(driver).onConflictDoNothing();
    }

    // Seed Sample Orders
    const orderData = [
      {
        id: 1,
        userId: 1,
        status: "delivered",
        totalAmount: "214.98",
        deliveryAddress: "123 Main St, Atlanta, GA 30309",
        customerPhone: "(555) 123-4567",
        customerEmail: "customer@shophand.com",
        paymentStatus: "paid",
        paymentMethod: "credit_card",
        driverId: 1
      }
    ];

    for (const order of orderData) {
      await db.insert(orders).values(order).onConflictDoNothing();
    }

    // Seed Order Items
    const orderItemData = [
      {
        id: 1,
        orderId: 1,
        partId: 1,
        quantity: 1,
        price: "189.99"
      },
      {
        id: 2,
        orderId: 1,
        partId: 2,
        quantity: 1,
        price: "24.99"
      }
    ];

    for (const orderItem of orderItemData) {
      await db.insert(orderItems).values(orderItem).onConflictDoNothing();
    }

    console.log("Database seeding completed successfully!");
    
    // Return summary
    return {
      categories: categoryData.length,
      partners: partnerData.length,
      vehicles: vehicleData.length,
      parts: partData.length,
      users: userData.length,
      drivers: driverData.length,
      orders: orderData.length,
      orderItems: orderItemData.length
    };

  } catch (error) {
    console.error("Database seeding failed:", error);
    throw error;
  }
}