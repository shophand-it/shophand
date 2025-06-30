export interface VehicleSearch {
  make: string;
  model: string;
  year: number;
}

export interface CartItem {
  partId: number;
  name: string;
  price: number;
  quantity: number;
  partnerId: number;
  partnerName: string;
  imageUrl?: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface CurrentOrder {
  id: number;
  orderNumber: string;
  status: string;
  totalAmount: string;
  items: Array<{
    name: string;
    quantity: number;
  }>;
  estimatedDeliveryTime: Date;
  driver: {
    name: string;
    rating: number;
    totalDeliveries: number;
    vehicle: string;
    licensePlate: string;
    phone: string;
  };
  timeline: Array<{
    status: string;
    time: string;
    completed: boolean;
    current?: boolean;
  }>;
}

export interface DriverStats {
  deliveries: number;
  earnings: string;
  rating: number;
  onlineTime: string;
  isOnline: boolean;
}

export interface AvailablePickup {
  id: number;
  orderNumber: string;
  totalEarnings: string;
  distance: string;
  estimatedTime: string;
  items: string;
  pickup: {
    name: string;
    address: string;
    type: string;
  };
  delivery: {
    customerName: string;
    address: string;
  };
}
