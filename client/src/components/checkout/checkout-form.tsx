import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import PayPalButton from "@/components/PayPalButton";
import BankPayment from "./bank-payment";
import { ShoppingCart, CreditCard, MapPin, Truck, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  partnerId: number;
  partnerName: string;
}

interface CheckoutFormProps {
  cartItems: CartItem[];
  total: number;
}

export default function CheckoutForm({ cartItems, total }: CheckoutFormProps) {
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: ""
  });
  const [paymentMethod, setPaymentMethod] = useState<"paypal" | "card" | "applepay" | "googlepay" | "bank">("bank");
  const { toast } = useToast();

  const deliveryFee = 12.99;
  const totalWithDelivery = total + deliveryFee;

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return customerInfo.name && customerInfo.email && customerInfo.phone && 
           customerInfo.address && customerInfo.city && customerInfo.zipCode;
  };

  const handlePaymentSuccess = (transactionId: string) => {
    toast({
      title: "Payment Successful!",
      description: `Order processed. Transaction ID: ${transactionId}`,
    });
    // In real app, redirect to success page or update order status
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Order Summary */}
      <Card className="bg-automotive-black-800 border-gold-600/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <ShoppingCart className="w-5 h-5 mr-2 text-gold-500" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center text-white">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-400">Qty: {item.quantity} • {item.partnerName}</p>
              </div>
              <p className="font-bold text-gold-500">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <Separator className="bg-gold-600/20" />
          <div className="flex justify-between text-white">
            <span>Parts Subtotal:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-white">
            <span className="flex items-center">
              <Truck className="w-4 h-4 mr-1" />
              Delivery Fee:
            </span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>
          <Separator className="bg-gold-600/20" />
          <div className="flex justify-between text-xl font-bold text-gold-500">
            <span>Total:</span>
            <span>${totalWithDelivery.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Customer Information */}
      <Card className="bg-automotive-black-800 border-gold-600/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-gold-500" />
            Delivery Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-white">Full Name</Label>
              <Input
                id="name"
                value={customerInfo.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="bg-automotive-black-700 border-gold-600/20 text-white"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                value={customerInfo.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="bg-automotive-black-700 border-gold-600/20 text-white"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-white">Phone Number</Label>
              <Input
                id="phone"
                value={customerInfo.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="bg-automotive-black-700 border-gold-600/20 text-white"
                placeholder="(555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="address" className="text-white">Street Address</Label>
              <Input
                id="address"
                value={customerInfo.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="bg-automotive-black-700 border-gold-600/20 text-white"
                placeholder="123 Main Street"
              />
            </div>
            <div>
              <Label htmlFor="city" className="text-white">City</Label>
              <Input
                id="city"
                value={customerInfo.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className="bg-automotive-black-700 border-gold-600/20 text-white"
                placeholder="Your City"
              />
            </div>
            <div>
              <Label htmlFor="zipCode" className="text-white">ZIP Code</Label>
              <Input
                id="zipCode"
                value={customerInfo.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                className="bg-automotive-black-700 border-gold-600/20 text-white"
                placeholder="12345"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card className="bg-automotive-black-800 border-gold-600/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-gold-500" />
            Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <Button
              variant={paymentMethod === "paypal" ? "default" : "outline"}
              onClick={() => setPaymentMethod("paypal")}
              className={paymentMethod === "paypal" 
                ? "bg-gold-gradient text-automotive-black-900" 
                : "border-gold-600/20 text-white hover:bg-gold-600/10"
              }
            >
              PayPal
            </Button>
            <Button
              variant={paymentMethod === "card" ? "default" : "outline"}
              onClick={() => setPaymentMethod("card")}
              className={paymentMethod === "card" 
                ? "bg-gold-gradient text-automotive-black-900" 
                : "border-gold-600/20 text-white hover:bg-gold-600/10"
              }
            >
              Credit Card
            </Button>
            <Button
              variant={paymentMethod === "applepay" ? "default" : "outline"}
              onClick={() => setPaymentMethod("applepay")}
              className={paymentMethod === "applepay" 
                ? "bg-gold-gradient text-automotive-black-900" 
                : "border-gold-600/20 text-white hover:bg-gold-600/10"
              }
            >
              Apple Pay
            </Button>
            <Button
              variant={paymentMethod === "googlepay" ? "default" : "outline"}
              onClick={() => setPaymentMethod("googlepay")}
              className={paymentMethod === "googlepay" 
                ? "bg-gold-gradient text-automotive-black-900" 
                : "border-gold-600/20 text-white hover:bg-gold-600/10"
              }
            >
              Google Pay
            </Button>
            <Button
              variant={paymentMethod === "bank" ? "default" : "outline"}
              onClick={() => setPaymentMethod("bank")}
              className={paymentMethod === "bank" 
                ? "bg-gold-gradient text-automotive-black-900" 
                : "border-gold-600/20 text-white hover:bg-gold-600/10"
              }
            >
              <Building className="w-4 h-4 mr-1" />
              Bank Account
            </Button>
          </div>

          {paymentMethod === "paypal" && isFormValid() && (
            <div className="border border-gold-600/20 rounded-lg p-4 bg-automotive-black-700">
              <p className="text-white mb-4 text-center">
                Complete your ${totalWithDelivery.toFixed(2)} payment with PayPal
              </p>
              <div className="flex justify-center">
                <PayPalButton
                  amount={totalWithDelivery.toFixed(2)}
                  currency="USD"
                  intent="CAPTURE"
                />
              </div>
            </div>
          )}

          {(paymentMethod === "card" || paymentMethod === "applepay" || paymentMethod === "googlepay") && isFormValid() && (
            <div className="border border-gold-600/20 rounded-lg p-6 bg-automotive-black-700">
              <div className="text-center mb-4">
                <p className="text-white mb-2">
                  {paymentMethod === "card" && "Credit Card Payment"}
                  {paymentMethod === "applepay" && "Apple Pay"}
                  {paymentMethod === "googlepay" && "Google Pay"}
                </p>
                <p className="text-sm text-gray-400 mb-4">
                  Processed securely through PayPal • ${totalWithDelivery.toFixed(2)}
                </p>
              </div>
              <div className="flex justify-center">
                <PayPalButton
                  amount={totalWithDelivery.toFixed(2)}
                  currency="USD"
                  intent="CAPTURE"
                />
              </div>
              <p className="text-xs text-gray-500 text-center mt-3">
                All payments are securely processed and funds go directly to your ShopHand account
              </p>
            </div>
          )}

          {paymentMethod === "bank" && isFormValid() && (
            <BankPayment
              amount={totalWithDelivery}
              currency="USD"
              customerInfo={customerInfo}
              onPaymentSuccess={handlePaymentSuccess}
            />
          )}

          {!isFormValid() && (
            <div className="text-center py-4">
              <p className="text-yellow-500">Please complete delivery information to continue</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}