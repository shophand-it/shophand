import { useState, useEffect } from "react";
import CheckoutForm from "@/components/checkout/checkout-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Link } from "wouter";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  partnerId: number;
  partnerName: string;
}

export default function Checkout() {
  // Mock cart data - in real app this would come from cart state/context
  const [cartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Premium Brake Disc Set",
      price: 189.99,
      quantity: 1,
      partnerId: 1,
      partnerName: "AutoZone"
    },
    {
      id: 2,
      name: "Performance Air Filter",
      price: 45.99,
      quantity: 2,
      partnerId: 2,
      partnerName: "O'Reilly Auto Parts"
    }
  ]);

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-automotive-black-900 flex items-center justify-center">
        <Card className="bg-automotive-black-800 border-gold-600/20 max-w-md w-full mx-4">
          <CardContent className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Your cart is empty</h2>
            <p className="text-gray-400 mb-6">Add some parts to get started</p>
            <Link href="/">
              <Button className="bg-gold-gradient text-automotive-black-900 font-bold">
                Browse Parts
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-automotive-black-900">
      {/* Header */}
      <div className="bg-automotive-black-800 border-b border-gold-600/20 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-white hover:bg-gold-600/10 mr-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Shop
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-white">Checkout</h1>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">ShopHand™</p>
            <p className="text-xs text-gold-500">Need a part? Shop Hand it!</p>
          </div>
        </div>
      </div>

      {/* Checkout Form */}
      <div className="py-8">
        <CheckoutForm cartItems={cartItems} total={total} />
      </div>

      {/* Footer */}
      <div className="bg-automotive-black-800 border-t border-gold-600/20 py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            Secure payments powered by PayPal • Fast delivery by ShopHand drivers
          </p>
          <p className="text-xs text-gold-500 mt-2">
            © Star Soul Enterprise LLC • ShopHand™ Trademark
          </p>
        </div>
      </div>
    </div>
  );
}