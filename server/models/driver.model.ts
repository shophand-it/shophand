import express from 'express';
import { Driver } from '../models/driver.model';

const router = express.Router();

// POST: Update driver's live location
router.post('/:id/location', async (req, res) => {
  try {
    const { coordinates } = req.body;
    const driver = await Driver.findByIdAndUpdate(
      req.params.id,
      {
        location: {
          type: 'Point',
          coordinates,
        },
        lastUpdated: new Date(),
      },
      { new: true }
    );
    res.status(200).json(driver);
  } catch (err) {
    res.status(500).json({ error: 'Location update failed' });
  }
});

export default router;