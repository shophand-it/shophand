import { db } from "./db";
import { parts } from "@shared/schema";

export async function addPartsToCatalog() {
  try {
    // Add parts with all required fields including source
    const partsData = [
      {
        name: "BMW Brake Disc Set",
        description: "Premium brake disc set for BMW 3 Series. Includes front and rear discs with installation hardware.",
        categoryId: 2, // Brake System
        partnerId: 2,  // BMW Dealership
        price: "189.99",
        condition: "new",
        source: "oem",
        stock: 5,
        vehicleCompatibility: JSON.stringify({ makes: ["BMW"], models: ["320i", "330i"], years: [2018, 2019, 2020, 2021] })
      },
      {
        name: "Toyota Engine Air Filter",
        description: "High-performance engine air filter for Toyota Camry. Improves airflow and engine efficiency.",
        categoryId: 1, // Engine Parts
        partnerId: 1,  // AutoZone
        price: "24.99", 
        condition: "new",
        source: "aftermarket",
        stock: 12,
        vehicleCompatibility: JSON.stringify({ makes: ["Toyota"], models: ["Camry"], years: [2018, 2019, 2020] })
      },
      {
        name: "Ford F-150 Exhaust System", 
        description: "Complete exhaust system replacement for Ford F-150. Stainless steel construction.",
        categoryId: 5, // Exhaust
        partnerId: 3,  // Salvage Masters
        price: "445.00",
        condition: "refurbished", 
        source: "recycled",
        stock: 3,
        vehicleCompatibility: JSON.stringify({ makes: ["Ford"], models: ["F-150"], years: [2020, 2021, 2022] })
      },
      {
        name: "Marine Propeller - Stainless Steel",
        description: "High-performance stainless steel propeller for Yamaha WaveRunner. 3-blade design.",
        categoryId: 6, // Marine Parts
        partnerId: 4,  // Marine Supply Co
        price: "299.99",
        condition: "new",
        source: "oem", 
        stock: 8,
        vehicleCompatibility: JSON.stringify({ makes: ["Yamaha"], models: ["WaveRunner"], years: [2020, 2021, 2022, 2023] })
      },
      {
        name: "Aircraft Avionics Display Unit",
        description: "Modern avionics display unit for Cessna 172. GPS navigation and flight instruments.",
        categoryId: 7, // Aviation Parts
        partnerId: 5,  // Aircraft Spruce
        price: "1299.99",
        condition: "new",
        source: "oem",
        stock: 2,
        vehicleCompatibility: JSON.stringify({ makes: ["Cessna"], models: ["172"], years: [2010, 2011, 2012, 2013, 2014, 2015] })
      },
      {
        name: "Honda Suspension Shock",
        description: "Front suspension shock absorber for Honda Civic. Improves ride quality and handling.",
        categoryId: 4, // Suspension
        partnerId: 1,  // AutoZone
        price: "89.99",
        condition: "new",
        source: "aftermarket",
        stock: 7,
        vehicleCompatibility: JSON.stringify({ makes: ["Honda"], models: ["Civic"], years: [2016, 2017, 2018, 2019] })
      },
      {
        name: "ATV Drive Belt",
        description: "Heavy-duty drive belt for Polaris RZR recreational vehicles. Designed for extreme conditions.",
        categoryId: 8, // Recreational
        partnerId: 3,  // Salvage Masters
        price: "159.99",
        condition: "new",
        source: "aftermarket",
        stock: 4,
        vehicleCompatibility: JSON.stringify({ makes: ["Polaris"], models: ["RZR"], years: [2022, 2023] })
      },
      {
        name: "BMW Electrical Harness",
        description: "Complete electrical wiring harness for BMW 3 Series. Includes all connectors and documentation.",
        categoryId: 3, // Electrical
        partnerId: 2,  // BMW Dealership
        price: "234.50",
        condition: "new",
        source: "oem",
        stock: 6,
        vehicleCompatibility: JSON.stringify({ makes: ["BMW"], models: ["320i", "330i"], years: [2019, 2020, 2021] })
      }
    ];

    for (const part of partsData) {
      await db.insert(parts).values(part);
    }

    console.log(`Successfully added ${partsData.length} parts to catalog`);
    return { success: true, partsAdded: partsData.length };

  } catch (error) {
    console.error("Failed to add parts:", error);
    throw error;
  }
}