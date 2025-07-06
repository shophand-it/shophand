import { Request, Response } from 'express';
import Part from '../models/Part';

// Create a new part
export const createPart = async (req: Request, res: Response) => {
  try {
    const { name, description, price, image, category } = req.body;

    const newPart = new Part({
      name,
      description,
      price,
      image,
      category,
    });

    await newPart.save();
    res.status(201).json(newPart);
  } catch (error) {
    console.error('Create part error:', error);
    res.status(500).json({ message: 'Server error creating part.' });
  }
};

// Get all parts
export const getAllParts = async (_req: Request, res: Response) => {
  try {
    const parts = await Part.find();
    res.status(200).json(parts);
  } catch (error) {
    console.error('Get all parts error:', error);
    res.status(500).json({ message: 'Server error fetching parts.' });
  }
};

// Get part by ID
export const getPartById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const part = await Part.findById(id);

    if (!part) {
      return res.status(404).json({ message: 'Part not found.' });
    }

    res.status(200).json(part);
  } catch (error) {
    console.error('Get part by ID error:', error);
    res.status(500).json({ message: 'Server error fetching part.' });
  }
};

// Update a part
export const updatePart = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await Part.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ message: 'Part not found for update.' });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error('Update part error:', error);
    res.status(500).json({ message: 'Server error updating part.' });
  }
};

// Delete a part
export const deletePart = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Part.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Part not found for deletion.' });
    }

    res.status(200).json({ message: 'Part deleted successfully.' });
  } catch (error) {
    console.error('Delete part error:', error);
    res.status(500).json({ message: 'Server error deleting part.' });
  }
};