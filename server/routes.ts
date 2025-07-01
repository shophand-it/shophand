import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertDriverSchema, insertOrderSchema, insertOrderItemSchema } from "@shared/schema";
import { z } from "zod";
import { automationEngine } from "./automation";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Partners
  app.get("/api/partners", async (req, res) => {
    try {
      const partners = await storage.getPartners();
      res.json(partners);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch partners" });
    }
  });

  // Vehicles
  app.get("/api/vehicles", async (req, res) => {
    try {
      const vehicles = await storage.getVehicles();
      res.json(vehicles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch vehicles" });
    }
  });

  // Parts
  app.get("/api/parts", async (req, res) => {
    try {
      const { categoryId, partnerId, search } = req.query;
      const filters = {
        ...(categoryId && { categoryId: parseInt(categoryId as string) }),
        ...(partnerId && { partnerId: parseInt(partnerId as string) }),
        ...(search && { search: search as string }),
      };
      const parts = await storage.getParts(filters);
      
      // Enrich with partner and category data
      const enrichedParts = await Promise.all(parts.map(async (part) => {
        const partner = await storage.getPartner(part.partnerId);
        const category = await storage.getCategory(part.categoryId);
        return {
          ...part,
          partner,
          category,
        };
      }));
      
      res.json(enrichedParts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch parts" });
    }
  });

  app.get("/api/parts/search", async (req, res) => {
    try {
      const { make, model, year } = req.query;
      if (!make || !model || !year) {
        return res.status(400).json({ message: "Make, model, and year are required" });
      }
      
      const parts = await storage.searchPartsByVehicle(
        make as string,
        model as string,
        parseInt(year as string)
      );
      
      // Enrich with partner and category data
      const enrichedParts = await Promise.all(parts.map(async (part) => {
        const partner = await storage.getPartner(part.partnerId);
        const category = await storage.getCategory(part.categoryId);
        return {
          ...part,
          partner,
          category,
        };
      }));
      
      res.json(enrichedParts);
    } catch (error) {
      res.status(500).json({ message: "Failed to search parts" });
    }
  });

  // Users
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Drivers
  app.post("/api/drivers", async (req, res) => {
    try {
      const driverData = insertDriverSchema.parse(req.body);
      const driver = await storage.createDriver(driverData);
      res.status(201).json(driver);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid driver data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create driver" });
    }
  });

  app.get("/api/drivers/online", async (req, res) => {
    try {
      const drivers = await storage.getOnlineDrivers();
      res.json(drivers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch online drivers" });
    }
  });

  app.patch("/api/drivers/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { isOnline } = req.body;
      await storage.updateDriverStatus(id, isOnline);
      res.json({ message: "Driver status updated" });
    } catch (error) {
      res.status(500).json({ message: "Failed to update driver status" });
    }
  });

  // Orders
  app.post("/api/orders", async (req, res) => {
    try {
      const { order, items } = req.body;
      const orderData = insertOrderSchema.parse(order);
      
      // Create order
      const createdOrder = await storage.createOrder(orderData);
      
      // Create order items
      for (const item of items) {
        const orderItemData = insertOrderItemSchema.parse({
          ...item,
          orderId: createdOrder.id,
        });
        await storage.createOrderItem(orderItemData);
      }
      
      res.status(201).json(createdOrder);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid order data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  app.get("/api/orders/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const orders = await storage.getOrdersByUser(userId);
      
      // Enrich with order items
      const enrichedOrders = await Promise.all(orders.map(async (order) => {
        const items = await storage.getOrderItems(order.id);
        return { ...order, items };
      }));
      
      res.json(enrichedOrders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  app.get("/api/orders/driver/:driverId", async (req, res) => {
    try {
      const driverId = parseInt(req.params.driverId);
      const orders = await storage.getOrdersByDriver(driverId);
      
      // Enrich with order items
      const enrichedOrders = await Promise.all(orders.map(async (order) => {
        const items = await storage.getOrderItems(order.id);
        return { ...order, items };
      }));
      
      res.json(enrichedOrders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch driver orders" });
    }
  });

  app.get("/api/orders/available", async (req, res) => {
    try {
      const orders = await storage.getAvailablePickups();
      
      // Enrich with order items and partner info
      const enrichedOrders = await Promise.all(orders.map(async (order) => {
        const items = await storage.getOrderItems(order.id);
        const enrichedItems = await Promise.all(items.map(async (item) => {
          const part = await storage.getPart(item.partId);
          const partner = part ? await storage.getPartner(part.partnerId) : null;
          return { ...item, part, partner };
        }));
        return { ...order, items: enrichedItems };
      }));
      
      res.json(enrichedOrders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch available pickups" });
    }
  });

  app.patch("/api/orders/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      await storage.updateOrderStatus(id, status);
      res.json({ message: "Order status updated" });
    } catch (error) {
      res.status(500).json({ message: "Failed to update order status" });
    }
  });

  app.patch("/api/orders/:id/assign-driver", async (req, res) => {
    try {
      const orderId = parseInt(req.params.id);
      const { driverId } = req.body;
      await storage.assignDriverToOrder(orderId, driverId);
      res.json({ message: "Driver assigned to order" });
    } catch (error) {
      res.status(500).json({ message: "Failed to assign driver" });
    }
  });

  // Mock order for demonstration
  app.get("/api/orders/mock/current", async (req, res) => {
    try {
      const mockOrder = {
        id: 1,
        orderNumber: "SH-2024-001",
        status: "out_for_delivery",
        totalAmount: "189.99",
        items: [
          {
            name: "BMW Brake Disc Set + Installation Hardware",
            quantity: 1,
          }
        ],
        estimatedDeliveryTime: new Date(Date.now() + 20 * 60 * 1000), // 20 minutes from now
        driver: {
          name: "Marcus Johnson",
          rating: 5.0,
          totalDeliveries: 2847,
          vehicle: "Toyota Tacoma",
          licensePlate: "ABC-123",
          phone: "(555) 123-4567"
        },
        timeline: [
          { status: "Order Confirmed", time: "12:15 PM", completed: true },
          { status: "Parts Picked Up", time: "1:45 PM", completed: true },
          { status: "Out for Delivery", time: "2:10 PM", completed: true, current: true },
          { status: "Delivered", time: "ETA 2:30 PM", completed: false },
        ]
      };
      res.json(mockOrder);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch current order" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
