import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Info, Filter, Map, Store, Home, Clock, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface AvailableOrder {
  id: number;
  totalAmount: string;
  deliveryAddress: string;
  items: Array<{
    part: {
      name: string;
      partnerId: number;
    };
    partner: {
      name: string;
      type: string;
      address: string;
    };
    quantity: number;
  }>;
}

export default function AvailablePickups() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: availablePickups = [], isLoading } = useQuery<AvailableOrder[]>({
    queryKey: ["/api/orders/available"],
  });

  const assignDriverMutation = useMutation({
    mutationFn: async ({ orderId, driverId }: { orderId: number; driverId: number }) => {
      await apiRequest("PATCH", `/api/orders/${orderId}/assign-driver`, { driverId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/orders/available"] });
      toast({
        title: "Pickup Accepted!",
        description: "You've been assigned to this delivery.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to accept pickup. Please try again.",
        variant: "destructive",
      });
    },
  });

  const acceptPickup = (orderId: number) => {
    // Mock driver ID - in a real app, this would come from auth context
    assignDriverMutation.mutate({ orderId, driverId: 1 });
  };

  const formatEarnings = (totalAmount: string) => {
    const base = parseFloat(totalAmount);
    const earnings = Math.max(12, base * 0.08 + 5); // Base fee + percentage
    return earnings.toFixed(2);
  };

  const getPartnerTypeIcon = (type: string) => {
    switch (type) {
      case "dealership":
        return "🏢";
      case "dismantler":
        return "♻️";
      default:
        return "🏪";
    }
  };

  if (isLoading) {
    return (
      <div className="bg-automotive-black-800 rounded-2xl p-6 border border-gold-600/20">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Available Pickups</h3>
        </div>
        <div className="space-y-4">
          {[1, 2].map(i => (
            <div key={i} className="bg-automotive-black-700 rounded-xl p-6 border border-gold-600/20 animate-pulse">
              <div className="h-6 bg-gray-600 rounded mb-4"></div>
              <div className="h-4 bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-700 rounded mb-4"></div>
              <div className="h-10 bg-gray-600 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-automotive-black-800 rounded-2xl p-6 border border-gold-600/20">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Available Pickups</h3>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-gold-600/30 text-gold-500">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="border-gold-600/30 text-gold-500">
            <Map className="w-4 h-4 mr-2" />
            Map View
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        {availablePickups.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">No available pickups at the moment</p>
            <p className="text-gray-500 text-sm mt-2">Check back in a few minutes</p>
          </div>
        ) : (
          availablePickups.map(order => {
            const earnings = formatEarnings(order.totalAmount);
            const mainItem = order.items[0];
            const itemsText = order.items.length > 1 
              ? `${mainItem?.part.name} + ${order.items.length - 1} more`
              : mainItem?.part.name || "Auto parts";

            return (
              <div 
                key={order.id}
                className="bg-automotive-black-700 rounded-xl p-6 border border-gold-600/20 hover:border-gold-500 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-white mb-1">Order #SH-2024-{String(order.id).padStart(3, '0')}</h4>
                    <p className="text-gray-400 text-sm">{itemsText}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gold-500 font-bold text-lg">${earnings}</p>
                    <p className="text-gray-400 text-sm">2.3 mi • 12 min</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Store className="text-gold-500 w-4 h-4" />
                      <span className="text-white font-medium">
                        {getPartnerTypeIcon(mainItem?.partner.type)} {mainItem?.partner.name}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm pl-6">{mainItem?.partner.address}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Home className="text-gold-500 w-4 h-4" />
                      <span className="text-white font-medium">Customer Delivery</span>
                    </div>
                    <p className="text-gray-400 text-sm pl-6">{order.deliveryAddress}</p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Button 
                    onClick={() => acceptPickup(order.id)}
                    disabled={assignDriverMutation.isPending}
                    className="flex-1 bg-gold-gradient text-automotive-black-900 font-bold"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    {assignDriverMutation.isPending ? "Accepting..." : "Accept Pickup"}
                  </Button>
                  <Button variant="outline" className="border-gold-600/30 text-gold-500">
                    <Info className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
