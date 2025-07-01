import { Request, Response } from "express";

interface BankingConfig {
  accountHolder: string;
  routingNumber: string;
  accountNumber: string;
  bankName: string;
  accountType: "checking" | "savings";
}

interface PaymentProcessor {
  processPayment(amount: number, currency: string): Promise<string>;
  transferToBankAccount(amount: number, transactionId: string): Promise<boolean>;
}

class DirectBankingProcessor implements PaymentProcessor {
  private bankingConfig: BankingConfig;

  constructor() {
    // Your banking configuration - these would be environment variables
    this.bankingConfig = {
      accountHolder: process.env.BANK_ACCOUNT_HOLDER || "ShopHand Business Account",
      routingNumber: process.env.BANK_ROUTING_NUMBER || "",
      accountNumber: process.env.BANK_ACCOUNT_NUMBER || "",
      bankName: process.env.BANK_NAME || "",
      accountType: (process.env.BANK_ACCOUNT_TYPE as "checking" | "savings") || "checking"
    };
  }

  async processPayment(amount: number, currency: string): Promise<string> {
    // Generate transaction ID
    const transactionId = `SH-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    console.log(`Processing payment: $${amount} ${currency}`);
    console.log(`Transaction ID: ${transactionId}`);
    
    // In production, this would integrate with:
    // - Stripe ACH transfers
    // - Plaid for bank verification
    // - Wire transfer services
    // - Banking APIs
    
    return transactionId;
  }

  async transferToBankAccount(amount: number, transactionId: string): Promise<boolean> {
    console.log(`Transferring $${amount} to bank account`);
    console.log(`Account: ${this.bankingConfig.bankName} - ${this.bankingConfig.accountType}`);
    console.log(`Transaction: ${transactionId}`);
    
    // Simulate successful transfer
    // In production, this would:
    // 1. Initiate ACH transfer
    // 2. Log transaction in database
    // 3. Send confirmation email
    // 4. Update business dashboard
    
    return true;
  }

  getBankingInfo() {
    return {
      bankName: this.bankingConfig.bankName,
      accountType: this.bankingConfig.accountType,
      lastFourDigits: this.bankingConfig.accountNumber.slice(-4),
      isConfigured: !!(this.bankingConfig.routingNumber && this.bankingConfig.accountNumber)
    };
  }
}

// Initialize banking processor
const bankingProcessor = new DirectBankingProcessor();

// API Routes for Banking
export async function processBankPayment(req: Request, res: Response) {
  try {
    const { amount, currency, customerInfo } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid payment amount" });
    }

    // Process payment through your banking system
    const transactionId = await bankingProcessor.processPayment(amount, currency || "USD");
    
    // Transfer funds to your bank account
    const transferSuccess = await bankingProcessor.transferToBankAccount(amount, transactionId);
    
    if (transferSuccess) {
      res.json({
        success: true,
        transactionId,
        message: "Payment processed successfully",
        bankInfo: bankingProcessor.getBankingInfo()
      });
    } else {
      res.status(500).json({ error: "Bank transfer failed" });
    }
  } catch (error) {
    console.error("Banking payment error:", error);
    res.status(500).json({ error: "Payment processing failed" });
  }
}

export async function getBankingStatus(req: Request, res: Response) {
  try {
    const bankInfo = bankingProcessor.getBankingInfo();
    res.json({
      configured: bankInfo.isConfigured,
      bankName: bankInfo.bankName,
      accountType: bankInfo.accountType,
      lastFourDigits: bankInfo.lastFourDigits
    });
  } catch (error) {
    console.error("Banking status error:", error);
    res.status(500).json({ error: "Failed to get banking status" });
  }
}

export async function getRevenueTransfers(req: Request, res: Response) {
  try {
    // Mock recent transfers - in production this would query your database
    const recentTransfers = [
      {
        id: "SH-TXN-001",
        amount: 247.50,
        date: new Date().toISOString(),
        status: "completed",
        type: "Parts Sales + Delivery Fee"
      },
      {
        id: "SH-TXN-002", 
        amount: 189.99,
        date: new Date(Date.now() - 3600000).toISOString(),
        status: "completed",
        type: "Premium Parts Order"
      },
      {
        id: "SH-TXN-003",
        amount: 89.99,
        date: new Date(Date.now() - 7200000).toISOString(),
        status: "completed", 
        type: "Standard Delivery"
      }
    ];

    res.json({
      transfers: recentTransfers,
      totalToday: recentTransfers.reduce((sum, t) => sum + t.amount, 0),
      bankAccount: bankingProcessor.getBankingInfo()
    });
  } catch (error) {
    console.error("Revenue transfers error:", error);
    res.status(500).json({ error: "Failed to get revenue transfers" });
  }
}

export { bankingProcessor };