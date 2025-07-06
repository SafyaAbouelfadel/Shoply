const stripe = require('stripe');

// Initialize Stripe with secret key
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

// Stripe configuration object
const stripeConfig = {
  publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  currency: 'usd', // Default currency
  
  // Payment method types allowed
  paymentMethodTypes: ['card'],
  
  // Success and cancel URLs (update these based on your frontend)
  successUrl: `${process.env.FRONTEND_URL}/payment/success`,
  cancelUrl: `${process.env.FRONTEND_URL}/payment/cancel`,
};

// Helper function to create payment intent
const createPaymentIntent = async (amount, currency = 'usd', metadata = {}) => {
  try {
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    
    return paymentIntent;
  } catch (error) {
    throw new Error(`Stripe payment intent creation failed: ${error.message}`);
  }
};

// Helper function to create checkout session
const createCheckoutSession = async (lineItems, customerEmail, metadata = {}) => {
  try {
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: stripeConfig.paymentMethodTypes,
      line_items: lineItems,
      mode: 'payment',
      customer_email: customerEmail,
      success_url: stripeConfig.successUrl,
      cancel_url: stripeConfig.cancelUrl,
      metadata,
    });
    
    return session;
  } catch (error) {
    throw new Error(`Stripe checkout session creation failed: ${error.message}`);
  }
};

// Helper function to verify webhook signature
const verifyWebhookSignature = (payload, signature) => {
  try {
    return stripeInstance.webhooks.constructEvent(
      payload,
      signature,
      stripeConfig.webhookSecret
    );
  } catch (error) {
    throw new Error(`Webhook signature verification failed: ${error.message}`);
  }
};

module.exports = {
  stripe: stripeInstance,
  stripeConfig,
  createPaymentIntent,
  createCheckoutSession,
  verifyWebhookSignature,
};
