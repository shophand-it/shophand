import express from 'express';
import { Driver } from '../models/driver.model';
import { Order } from '../models/order.model';

const router = express.Router();

// 🚗 Update driver location and delivery radius
router.post('/update-location', async (req, res) => {
  const { driverId, latitude, longitude, deliveryRadius } = req.body;

  try {
    const updatedDriver = await Driver.findByIdAndUpdate(
      driverId,
      {
        location: {
          type: 'Point',
          coordinates: [longitude, latitude]
        },
        deliveryRadius,
        lastUpdated: Date.now(),
        status: 'available'
      },
      { new: true, upsert: true }
    );

    res.status(200).json(updatedDriver);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update driver location.' });
  }
});

// 📦 Get nearby orders for the driver
router.get('/nearby-orders/:driverId', async (req, res) => {
  const { driverId } = req.params;

  try {
    const driver = await Driver.findById(driverId);

    if (!driver || !driver.location) {
      return res.status(404).json({ error: 'Driver not found or missing location' });
    }

    const radiusInMeters = (driver.deliveryRadius || 15) * 1609.34; // Convert miles to meters

    const nearbyOrders = await Order.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: driver.location.coordinates
          },
          $maxDistance: radiusInMeters
        }
      },
      status: 'pending' // optional status filter
    });

    res.json(nearbyOrders);
  } catch (err) {
    res.status(500).json({ error: 'Error finding nearby orders' });
  }
});

export default router;