import express from 'express';
import { register, login, getProfile } from '../controllers/authController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile/:userId', getProfile);

export default router;