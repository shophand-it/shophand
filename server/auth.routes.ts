import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User'; // Make sure this matches your User model path
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const newUser = new User({ email, password: hashedPassword, name });
    await newUser.save();

    // Token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });

    res.status(201).json({ user: newUser, token });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', error: err });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err });
  }
});

export default router;