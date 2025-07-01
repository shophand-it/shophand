import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Package, 
  Truck, 
  Clock, 
  MapPin, 
  Phone, 
  Star,
  CheckCircle,
  AlertCircle,
  Navigation
} from 'lucide-react';

interface DeliveryStep {
  status: string;
  time: string;
  location: string;
  completed: boolean;
  current?: boolean;
}

interface PartDelivery {
  id: string;
  partName: string;
  supplier: string;
  supplierAddress: string;
  deliveryAddress: string;
  estimatedTime: string;
  actualTime?: string;
  status: 'ordered' | 'picked_up' | 'in_transit' | 'delivered';
  driver: {
    name: string;
    rating: number;
    phone: string;
    vehicle: string;
    licensePlate: string;
  };
  timeline: DeliveryStep[];
  price: string;
  deliveryFee: string;
}

export function PartsDeliveryTracker() {
  const [activeDeliveries, setActiveDeliveries] = useState<PartDelivery[]>([
    {
      id: 'SH-2024-001',
      partName: 'Premium Brake Disc Set',
      supplier: 'AutoZone #1247',
      supplierAddress: '1425 Main St, Downtown',
      deliveryAddress: '789 Oak Avenue, Riverside',
      estimatedTime: '45 minutes',
      status: 'in_transit',
      driver: {
        name: 'Mike Rodriguez',
        rating: 4.8,
        phone: '+1 (555) 234-5678',
        vehicle: '2021 Ford Transit',
        licensePlate: 'DEL-7842'
      },
      timeline: [
        { status: 'Order placed', time: '2:15 PM', location: 'Online', completed: true },
        { status: 'Part located', time: '2:18 PM', location: 'AutoZone #1247', completed: true },
        { status: 'Driver assigned', time: '2:22 PM', location: 'AutoZone #1247', completed: true },
        { status: 'Picked up', time: '2:35 PM', location: 'AutoZone #1247', completed: true },
        { status: 'In transit', time: '2:38 PM', location: 'Main St & 5th Ave', completed: true, current: true },
        { status: 'Delivered', time: 'Est. 3:20 PM', location: '789 Oak Avenue', completed: false }
      ],
      price: '$89.99',
      deliveryFee: '$12.00'
    },
    {
      id: 'SH-2024-002', 
      partName: 'Marine Engine Oil Filter',
      supplier: 'Harbor Freight Tools',
      supplierAddress: '2340 Harbor Blvd, Marina District',
      deliveryAddress: '456 Boat Slip Road, Marina',
      estimatedTime: '1 hour 15 minutes',
      status: 'picked_up',
      driver: {
        name: 'Sarah Chen',
        rating: 4.9,
        phone: '+1 (555) 876-5432',
        vehicle: '2022 Honda Pilot',
        licensePlate: 'MAR-3456'
      },
      timeline: [
        { status: 'Order placed', time: '1:45 PM', location: 'Mobile App', completed: true },
        { status: 'Part located', time: '1:50 PM', location: 'Harbor Freight', completed: true },
        { status: 'Driver assigned', time: '2:05 PM', location: 'Harbor Freight', completed: true },
        { status: 'Picked up', time: '2:25 PM', location: 'Harbor Freight', completed: true, current: true },
        { status: 'In transit', time: 'Starting', location: 'Harbor Blvd', completed: false },
        { status: 'Delivered', time: 'Est. 3:40 PM', location: '456 Boat Slip Road', completed: false }
      ],
      price: '$24.99',
      deliveryFee: '$18.00'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500';
      case 'in_transit':
        return 'bg-blue-500';
      case 'picked_up':
        return 'bg-yellow-500';
      case 'ordered':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getProgressPercentage = (timeline: DeliveryStep[]) => {
    const completedSteps = timeline.filter(step => step.completed).length;
    return (completedSteps / timeline.length) * 100;
  };

  const formatStatus = (status: string) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="ai-heading text-2xl">Active Parts Deliveries</h2>
          <p className="cyber-text text-sm">Real-time tracking for all orders</p>
        </div>
        <Badge className="bg-neural-primary text-white px-3 py-1">
          {activeDeliveries.length} Active
        </Badge>
      </div>

      {activeDeliveries.map((delivery) => (
        <div key={delivery.id} className="futuristic-card">
          <div className="futuristic-card-content">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-neural-gradient rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{delivery.partName}</h3>
                  <p className="text-sm text-muted-foreground">Order #{delivery.id}</p>
                </div>
              </div>
              <Badge className={`${getStatusColor(delivery.status)} text-white`}>
                {formatStatus(delivery.status)}
              </Badge>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Delivery Progress</span>
                <span className="text-sm text-muted-foreground">
                  ETA: {delivery.estimatedTime}
                </span>
              </div>
              <Progress 
                value={getProgressPercentage(delivery.timeline)} 
                className="h-2 bg-muted"
              />
            </div>

            {/* Supplier & Delivery Info */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="glass-morphism p-3 rounded-lg">
                <h4 className="font-semibold text-sm mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-neural-primary" />
                  Pickup Location
                </h4>
                <p className="font-medium">{delivery.supplier}</p>
                <p className="text-sm text-muted-foreground">{delivery.supplierAddress}</p>
              </div>
              <div className="glass-morphism p-3 rounded-lg">
                <h4 className="font-semibold text-sm mb-2 flex items-center">
                  <Navigation className="w-4 h-4 mr-2 text-cyber-cyan" />
                  Delivery Address
                </h4>
                <p className="text-sm text-muted-foreground">{delivery.deliveryAddress}</p>
              </div>
            </div>

            {/* Driver Info */}
            <div className="bg-muted/50 rounded-lg p-3 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cyber-gradient rounded-full flex items-center justify-center">
                    <Truck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">{delivery.driver.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {delivery.driver.vehicle} • {delivery.driver.licensePlate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm ml-1">{delivery.driver.rating}</span>
                  </div>
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Delivery Timeline</h4>
              {delivery.timeline.map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    step.completed 
                      ? 'bg-green-500' 
                      : step.current 
                        ? 'bg-blue-500 animate-pulse' 
                        : 'bg-gray-300'
                  }`}>
                    {step.completed ? (
                      <CheckCircle className="w-4 h-4 text-white" />
                    ) : step.current ? (
                      <Clock className="w-4 h-4 text-white" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className={`text-sm font-medium ${
                        step.completed || step.current ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {step.status}
                      </span>
                      <span className="text-xs text-muted-foreground">{step.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{step.location}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Cost Breakdown */}
            <div className="border-t pt-3 mt-4">
              <div className="flex justify-between items-center text-sm">
                <span>Part Price:</span>
                <span>{delivery.price}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Delivery Fee:</span>
                <span>{delivery.deliveryFee}</span>
              </div>
              <div className="flex justify-between items-center font-semibold border-t pt-2 mt-2">
                <span>Total:</span>
                <span className="text-neural-primary">
                  ${(parseFloat(delivery.price.replace('$', '')) + parseFloat(delivery.deliveryFee.replace('$', ''))).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {activeDeliveries.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Active Deliveries</h3>
          <p className="text-muted-foreground">
            Your parts deliveries will appear here once you place an order.
          </p>
        </div>
      )}
    </div>
  );
}