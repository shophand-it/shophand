import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Clock, 
  MapPin, 
  Star,
  Package,
  Truck,
  DollarSign,
  Filter
} from 'lucide-react';

interface PartResult {
  id: string;
  name: string;
  partNumber: string;
  price: number;
  supplier: string;
  supplierAddress: string;
  distance: string;
  deliveryTime: string;
  deliveryFee: number;
  inStock: number;
  rating: number;
  condition: 'new' | 'used' | 'refurbished';
  compatibility: string[];
}

export function PartsSearchDelivery() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('2020 BMW 3 Series');
  const [results, setResults] = useState<PartResult[]>([
    {
      id: '1',
      name: 'Premium Brake Disc Set',
      partNumber: 'BD-34227-BMW',
      price: 89.99,
      supplier: 'AutoZone #1247',
      supplierAddress: '1425 Main St, Downtown',
      distance: '2.3 miles',
      deliveryTime: '45 mins',
      deliveryFee: 12.00,
      inStock: 8,
      rating: 4.8,
      condition: 'new',
      compatibility: ['2018-2022 BMW 3 Series', '2019-2021 BMW X1']
    },
    {
      id: '2',
      name: 'OEM Brake Disc Set',
      partNumber: 'BD-34228-BMW-OEM',
      price: 156.00,
      supplier: 'BMW Dealership',
      supplierAddress: '3400 Auto Plaza Dr',
      distance: '4.1 miles',
      deliveryTime: '1.5 hours',
      deliveryFee: 25.00,
      inStock: 3,
      rating: 5.0,
      condition: 'new',
      compatibility: ['2020-2023 BMW 3 Series']
    },
    {
      id: '3',
      name: 'Quality Brake Discs',
      partNumber: 'BD-34225-AFT',
      price: 67.50,
      supplier: 'Parts Plus',
      supplierAddress: '890 Industrial Blvd',
      distance: '6.2 miles',
      deliveryTime: '2 hours',
      deliveryFee: 8.00,
      inStock: 12,
      rating: 4.3,
      condition: 'new',
      compatibility: ['2018-2022 BMW 3 Series']
    },
    {
      id: '4',
      name: 'Premium Used Brake Discs',
      partNumber: 'BD-34226-USED',
      price: 45.00,
      supplier: 'Euro Dismantlers',
      supplierAddress: '2100 Salvage Rd',
      distance: '8.7 miles',
      deliveryTime: '3 hours',
      deliveryFee: 15.00,
      inStock: 1,
      rating: 4.1,
      condition: 'used',
      compatibility: ['2019-2021 BMW 3 Series']
    }
  ]);

  const sortOptions = [
    { label: 'Fastest Delivery', value: 'delivery' },
    { label: 'Lowest Price', value: 'price' },
    { label: 'Highest Rating', value: 'rating' },
    { label: 'Closest Distance', value: 'distance' }
  ];

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'new': return 'bg-green-500';
      case 'refurbished': return 'bg-yellow-500';
      case 'used': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getTotalCost = (price: number, deliveryFee: number) => {
    return (price + deliveryFee).toFixed(2);
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="space-y-4">
        <div>
          <h2 className="ai-heading text-2xl">Find Parts Near You</h2>
          <p className="cyber-text text-sm">Real-time inventory • Same-day delivery • 47,000+ suppliers</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input 
            placeholder="Search brake pads, oil filters, spark plugs..."
            className="futuristic-input pl-12 pr-20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button className="absolute right-1 top-1 bottom-1 ai-button">
            Search
          </Button>
        </div>
        
        {/* Vehicle Selection */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Vehicle:</span>
          <Badge className="bg-neural-primary text-white px-3 py-1">
            {selectedVehicle}
          </Badge>
          <Button variant="outline" size="sm">
            Change Vehicle
          </Button>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg">Brake Disc Sets Available</h3>
          <p className="text-sm text-muted-foreground">{results.length} results found</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Sort by:</span>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Fastest Delivery
          </Button>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {results.map((part) => (
          <div key={part.id} className="futuristic-card">
            <div className="futuristic-card-content">
              <div className="grid lg:grid-cols-4 gap-4">
                {/* Part Info */}
                <div className="lg:col-span-2">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-neural-gradient rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg">{part.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Part #: {part.partNumber}
                      </p>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={`${getConditionColor(part.condition)} text-white text-xs`}>
                          {part.condition.toUpperCase()}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {part.inStock} in stock
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Compatible: {part.compatibility.join(', ')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Supplier & Delivery */}
                <div>
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-semibold text-sm mb-1 flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-neural-primary" />
                        {part.supplier}
                      </h5>
                      <p className="text-xs text-muted-foreground">{part.supplierAddress}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs">{part.rating}</span>
                        <span className="text-xs text-muted-foreground">• {part.distance}</span>
                      </div>
                    </div>
                    
                    <div className="bg-muted/50 rounded-lg p-2">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-cyber-cyan" />
                        <span className="text-sm font-medium text-cyber-cyan">
                          {part.deliveryTime} delivery
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing & Action */}
                <div className="flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-neural-primary">
                        ${part.price.toFixed(2)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        + ${part.deliveryFee.toFixed(2)} delivery
                      </div>
                      <div className="text-sm font-semibold">
                        Total: ${getTotalCost(part.price, part.deliveryFee)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mt-4">
                    <Button className="w-full ai-button">
                      Order for Delivery
                    </Button>
                    <Button variant="outline" className="w-full text-xs">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="glass-morphism p-3 rounded-lg text-center">
          <div className="text-lg font-bold text-neural-primary">45min</div>
          <div className="text-xs text-muted-foreground">Avg Delivery</div>
        </div>
        <div className="glass-morphism p-3 rounded-lg text-center">
          <div className="text-lg font-bold text-cyber-cyan">47,000+</div>
          <div className="text-xs text-muted-foreground">Suppliers</div>
        </div>
        <div className="glass-morphism p-3 rounded-lg text-center">
          <div className="text-lg font-bold text-luxury-gold">99.2%</div>
          <div className="text-xs text-muted-foreground">In Stock</div>
        </div>
        <div className="glass-morphism p-3 rounded-lg text-center">
          <div className="text-lg font-bold text-neon-green">24/7</div>
          <div className="text-xs text-muted-foreground">Available</div>
        </div>
      </div>
    </div>
  );
}