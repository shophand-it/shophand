import express from 'express';
import { db } from '../config/db';
import { parts } from '@shared/schema';

const router = express.Router();

export async function addPartsToCatalog() {
  try {
    const partsData = [
      {
        name: "BMW Brake Disc Set",
        description: "Premium brake disc set for BMW 3 Series. Includes front and rear discs.",
        categoryId: 2,
        partnerId: 2,
        price: "189.99",
        condition: "new",
        source: "oem",
        stock: 5,
        vehicleCompatibility: {
          makes: ["BMW"],
          models: ["320i", "330i"],
          years: [2018, 2019, 2020]
        }
      },
      {
        name: "Toyota Engine Air Filter",
        description: "High-performance engine air filter for Toyota Camry.",
        categoryId: 1,
        partnerId: 1,
        price: "24.99",
        condition: "new",
        source: "aftermarket",
        stock: 12,
        vehicleCompatibility: {
          makes: ["Toyota"],
          models: ["Camry"],
          years: [2018, 2019, 2020]
        }
      }
    ];

    for (const part of partsData) {
      const formattedPart = {
        ...part,
        vehicleCompatibility: JSON.stringify(part.vehicleCompatibility),
      };

      console.log('📦 Inserting:', formattedPart);

      await db.insert(parts).values(formattedPart);
    }

    console.log(`✅ Successfully added ${partsData.length} parts`);
    return { success: true, partsAdded: partsData.length };
  } catch (error: any) {
    console.error("❌ Error inserting parts into catalog:", error.message || error);
    throw error;
  }
}

router.post('/add', async (req, res) => {
  try {
    const result = await addPartsToCatalog();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add parts to catalog' });
  }
});

export default router;