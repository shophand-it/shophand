import { db } from "./db";
import { categories, partners, parts } from "@shared/schema";

export async function addSampleData() {
  try {
    console.log("Adding sample data...");

    // Add categories one by one
    const category1 = await db.insert(categories).values({
      name: "Engine Parts",
      description: "Engine components and accessories", 
      icon: "engine"
    }).returning();

    const category2 = await db.insert(categories).values({
      name: "Brake System",
      description: "Brake components and hardware",
      icon: "brake"
    }).returning();

    // Add partners
    const partner1 = await db.insert(partners).values({
      name: "AutoZone",
      type: "store", 
      address: "1234 Commerce Way, Atlanta, GA",
      phone: "(555) 123-4567",
      email: "partnership@autozone.com"
    }).returning();

    const partner2 = await db.insert(partners).values({
      name: "BMW Dealership",
      type: "dealership",
      address: "5678 Luxury Ave, Beverly Hills, CA", 
      phone: "(555) 234-5678",
      email: "parts@bmwdealer.com"
    }).returning();

    // Add parts
    await db.insert(parts).values({
      name: "BMW Brake Disc Set",
      description: "Premium brake disc set for BMW 3 Series",
      categoryId: category2[0].id,
      partnerId: partner2[0].id,
      price: "189.99",
      condition: "new",
      source: "oem",
      stock: 5,
      vehicleCompatibility: JSON.stringify({ makes: ["BMW"], models: ["320i"] })
    });

    await db.insert(parts).values({
      name: "Engine Air Filter", 
      description: "High-performance engine air filter",
      categoryId: category1[0].id,
      partnerId: partner1[0].id,
      price: "24.99",
      condition: "new", 
      source: "aftermarket",
      stock: 12,
      vehicleCompatibility: JSON.stringify({ makes: ["Toyota"], models: ["Camry"] })
    });

    console.log("Sample data added successfully!");
    return { success: true, message: "Sample data added" };
    
  } catch (error) {
    console.error("Failed to add sample data:", error);
    throw error;
  }
}