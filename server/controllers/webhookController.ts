import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export const stripeWebhookHandler = (req: any, res: any) => {
  const sig = req.headers["stripe-signature"]!;
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle different events here
  if (event.type === "payment_intent.succeeded") {
    console.log("💰 Payment succeeded:", event.data.object);
  }

  if (event.type === "charge.succeeded") {
    console.log("✅ Charge successful:", event.data.object);
  }

  res.status(200).json({ received: true });
};