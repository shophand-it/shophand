import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, Truck, Package, Star } from "lucide-react";

interface Part {
  id: number;
  name: string;
  description: string;
  price: string;
  condition: string;
  categoryId: number;
  partnerId: number;
  partner?: { name: string; type: string };
  category?: { name: string; icon: string };
}

interface Category {
  id: number;
  name: string;
  icon: string;
}

interface Order {
  id: number;
  orderNumber: string;
  status: string;
  totalAmount: string;
  items: any[];
}

export default function SimpleHome() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [currentView, setCurrentView] = useState<"shop" | "track" | "drive">("shop");

  // Fetch data
  const { data: parts = [] } = useQuery<Part[]>({ queryKey: ["/api/parts"] });
  const { data: categories = [] } = useQuery<Category[]>({ queryKey: ["/api/categories"] });
  const { data: mockOrder } = useQuery<Order>({ queryKey: ["/api/orders/mock/current"] });
  const { data: driverStats } = useQuery<any>({ queryKey: ["/api/drivers/stats"] });
  const { data: availablePickups = [] } = useQuery<any[]>({ queryKey: ["/api/drivers/pickups"] });

  // Filter parts
  const filteredParts = parts.filter(part => {
    const matchesSearch = part.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || part.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Shopping View
  const ShoppingView = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold mb-2">ShopHand™</h1>
        <p className="text-xl text-gold-500">Need a part? Shop Hand it!</p>
        <p className="text-gray-400 mt-2">Premium auto parts delivered by professional drivers</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search for parts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-gray-800 border-gray-700"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 justify-center">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory(null)}
          className="bg-gold-600 hover:bg-gold-700"
        >
          All Parts
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="bg-gray-800 border-gray-700 hover:bg-gray-700"
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Parts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredParts.map((part) => (
          <Card key={part.id} className="bg-gray-800 border-gray-700 hover:border-gold-500 transition-colors">
            <CardHeader>
              <CardTitle className="text-white text-lg">{part.name}</CardTitle>
              <CardDescription className="text-gray-400">
                {part.description?.slice(0, 100)}...
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl font-bold text-gold-500">${part.price}</span>
                <Badge variant="secondary" className="bg-green-600 text-white">
                  {part.condition}
                </Badge>
              </div>
              {part.partner && (
                <p className="text-sm text-gray-500">Supplier: {part.partner.name}</p>
              )}
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gold-600 hover:bg-gold-700 text-black font-semibold">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredParts.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 mx-auto text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-400">No parts found</h3>
          <p className="text-gray-500">Try searching for different keywords or categories</p>
        </div>
      )}
    </div>
  );

  // Order Tracking View
  const TrackingView = () => (
    <div className="space-y-6">
      <div className="text-center py-8">
        <h2 className="text-3xl font-bold mb-2">Order Tracking</h2>
        <p className="text-gray-400">Track your ShopHand™ deliveries</p>
      </div>

      {mockOrder ? (
        <Card className="max-w-2xl mx-auto bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Order {mockOrder.orderNumber}</span>
              <Badge className="bg-green-600">{mockOrder.status}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Total:</span>
              <span className="text-gold-500 font-bold">${mockOrder.totalAmount}</span>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Order Items:</h4>
              {mockOrder.items?.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span>Qty: {item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-gray-700">
              <div className="flex items-center gap-2 text-green-500">
                <Truck className="w-4 h-4" />
                <span>Out for delivery - Driver Mike is on the way!</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="text-center py-12">
          <Package className="w-16 h-16 mx-auto text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-400">No active orders</h3>
          <p className="text-gray-500">Place an order to track your delivery</p>
        </div>
      )}
    </div>
  );

  // Driver View
  const DriverView = () => (
    <div className="space-y-6">
      <div className="text-center py-8">
        <h2 className="text-3xl font-bold mb-2">Driver Dashboard</h2>
        <p className="text-gray-400">Earn money delivering auto parts</p>
      </div>

      {/* Driver Stats */}
      {driverStats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <Card className="bg-gray-800 border-gray-700 text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-gold-500">{driverStats?.deliveries || 0}</div>
              <div className="text-sm text-gray-400">Deliveries</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700 text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-500">{driverStats?.earnings || "$0"}</div>
              <div className="text-sm text-gray-400">Today's Earnings</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700 text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-2xl font-bold">{driverStats?.rating || 5.0}</span>
              </div>
              <div className="text-sm text-gray-400">Rating</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700 text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-500">{driverStats?.onlineTime || "0h"}</div>
              <div className="text-sm text-gray-400">Online Time</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Available Pickups */}
      <div className="max-w-4xl mx-auto">
        <h3 className="text-xl font-bold mb-4">Available Pickups</h3>
        <div className="space-y-4">
          {Array.isArray(availablePickups) && availablePickups.map((pickup: any) => (
            <Card key={pickup.id} className="bg-gray-800 border-gray-700">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold">{pickup.orderNumber}</h4>
                    <p className="text-sm text-gray-400">{pickup.items}</p>
                    <p className="text-sm text-gray-500">
                      {pickup.pickup?.name} → {pickup.delivery?.address}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-green-500">{pickup.totalEarnings}</div>
                    <div className="text-sm text-gray-400">{pickup.distance} • {pickup.estimatedTime}</div>
                  </div>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Accept Pickup
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Simple Navigation */}
      <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-gold-500">ShopHand™</h1>
              <span className="text-xs text-gray-500">Star Soul Enterprise LLC</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant={currentView === "shop" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentView("shop")}
                className="bg-gold-600 hover:bg-gold-700"
              >
                <ShoppingCart className="w-4 h-4 mr-1" />
                Shop
              </Button>
              <Button
                variant={currentView === "track" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentView("track")}
              >
                <Package className="w-4 h-4 mr-1" />
                Track
              </Button>
              <Button
                variant={currentView === "drive" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentView("drive")}
              >
                <Truck className="w-4 h-4 mr-1" />
                Drive
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === "shop" && <ShoppingView />}
        {currentView === "track" && <TrackingView />}
        {currentView === "drive" && <DriverView />}
      </main>

      {/* Simple Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p className="text-gray-400">
            ShopHand™ is a trademark of Star Soul Enterprise Limited Liability Company
          </p>
          <p className="text-gold-500 mt-2">Need a part? Shop Hand it!</p>
        </div>
      </footer>
    </div>
  );
}