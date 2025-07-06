import express from "express";
import { stripeWebhookHandler } from "../controllers/webhookController";

const router = express.Router();

router.post("/", express.raw({ type: "application/json" }), stripeWebhookHandler);

export default router;