import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, CreditCard, Building, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface BankPaymentProps {
  amount: number;
  currency: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
  };
  onPaymentSuccess: (transactionId: string) => void;
}

export default function BankPayment({ amount, currency, customerInfo, onPaymentSuccess }: BankPaymentProps) {
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setCardInfo(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    // Add spaces every 4 digits
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const isFormValid = () => {
    return cardInfo.cardNumber.replace(/\s/g, '').length >= 16 &&
           cardInfo.expiryDate.length === 5 &&
           cardInfo.cvv.length >= 3 &&
           cardInfo.nameOnCard.length > 0;
  };

  const processPayment = async () => {
    if (!isFormValid()) {
      toast({
        title: "Invalid Payment Information",
        description: "Please complete all payment fields",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const response = await apiRequest("POST", "/api/banking/payment", {
        amount,
        currency,
        customerInfo,
        paymentMethod: {
          type: "card",
          cardNumber: cardInfo.cardNumber.replace(/\s/g, ''),
          nameOnCard: cardInfo.nameOnCard
        }
      });

      const result = await response.json();
      
      if (result.success) {
        toast({
          title: "Payment Successful!",
          description: `$${amount} has been processed. Funds will be deposited to your business account.`
        });
        onPaymentSuccess(result.transactionId);
      } else {
        throw new Error(result.error || "Payment failed");
      }
    } catch (error: any) {
      toast({
        title: "Payment Failed", 
        description: error.message || "Please try again",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="bg-automotive-black-700 border-gold-600/20">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center mb-4">
            <Building className="w-5 h-5 text-gold-500 mr-2" />
            <span className="text-white font-medium">Direct Bank Deposit</span>
            <Shield className="w-4 h-4 text-green-500 ml-2" />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="nameOnCard" className="text-white">Name on Card</Label>
              <Input
                id="nameOnCard"
                value={cardInfo.nameOnCard}
                onChange={(e) => handleInputChange("nameOnCard", e.target.value)}
                className="bg-automotive-black-600 border-gold-600/20 text-white"
                placeholder="Full name as shown on card"
              />
            </div>
            
            <div>
              <Label htmlFor="cardNumber" className="text-white">Card Number</Label>
              <Input
                id="cardNumber"
                value={cardInfo.cardNumber}
                onChange={(e) => handleInputChange("cardNumber", formatCardNumber(e.target.value))}
                className="bg-automotive-black-600 border-gold-600/20 text-white"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate" className="text-white">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  value={cardInfo.expiryDate}
                  onChange={(e) => handleInputChange("expiryDate", formatExpiryDate(e.target.value))}
                  className="bg-automotive-black-600 border-gold-600/20 text-white"
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>
              <div>
                <Label htmlFor="cvv" className="text-white">CVV</Label>
                <Input
                  id="cvv"
                  value={cardInfo.cvv}
                  onChange={(e) => handleInputChange("cvv", e.target.value.replace(/\D/g, ''))}
                  className="bg-automotive-black-600 border-gold-600/20 text-white"
                  placeholder="123"
                  maxLength={4}
                />
              </div>
            </div>
          </div>

          <div className="bg-automotive-black-600 p-3 rounded-lg">
            <div className="flex items-center text-sm text-gray-300">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <span>Funds deposited directly to your business bank account</span>
            </div>
            <div className="flex items-center text-sm text-gray-300 mt-1">
              <Shield className="w-4 h-4 text-blue-500 mr-2" />
              <span>256-bit SSL encryption • PCI DSS compliant</span>
            </div>
          </div>

          <Button
            onClick={processPayment}
            disabled={!isFormValid() || isProcessing}
            className="w-full bg-gold-gradient text-automotive-black-900 font-bold hover:shadow-lg"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            {isProcessing ? "Processing..." : `Pay $${amount.toFixed(2)}`}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Payment processed securely • Funds go directly to ShopHand business account
          </p>
        </div>
      </CardContent>
    </Card>
  );
}