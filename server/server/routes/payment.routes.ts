import express from 'express';
import { createPaymentIntent, confirmPayment } from '../controllers/paymentController';

const router = express.Router();

router.post('/create-intent', createPaymentIntent);
router.post('/confirm', confirmPayment); // optional route

export default router;