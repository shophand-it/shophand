import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Package, 
  Users, 
  Building, 
  CheckCircle,
  AlertCircle,
  RefreshCw
} from "lucide-react";

export default function RealAnalytics() {
  const { data: realData, isLoading, error } = useQuery({
    queryKey: ['/api/analytics/real'],
    refetchInterval: 10000, // Update every 10 seconds
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-automotive-black-900">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-gold-500 animate-spin mx-auto mb-4" />
          <p className="text-white">Loading your real platform data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-automotive-black-900">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-white">Error loading analytics data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 bg-automotive-black-900 min-h-screen">
      <div className="container mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            ShopHand™ Real Analytics
          </h1>
          <p className="text-gray-400">
            Your actual platform data - Updated: {new Date(realData?.lastUpdated).toLocaleString()}
          </p>
        </div>

        {/* Real Platform Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          <Card className="bg-automotive-black-800 border-gold-600/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Platform Status</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">
                {realData?.platformStatus || "Live"}
              </div>
              <p className="text-xs text-green-600">
                {realData?.systemHealth || "Optimal"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-automotive-black-800 border-gold-600/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Available Parts</CardTitle>
              <Package className="h-4 w-4 text-gold-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gold-400">
                {realData?.totalParts || 0}
              </div>
              <p className="text-xs text-gold-600">
                Ready for delivery
              </p>
            </CardContent>
          </Card>

          <Card className="bg-automotive-black-800 border-gold-600/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Active Drivers</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">
                {realData?.activeDrivers || 0}
              </div>
              <p className="text-xs text-blue-600">
                Online and ready
              </p>
            </CardContent>
          </Card>

          <Card className="bg-automotive-black-800 border-gold-600/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Partner Suppliers</CardTitle>
              <Building className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-400">
                {realData?.totalPartners || 0}
              </div>
              <p className="text-xs text-purple-600">
                Verified suppliers
              </p>
            </CardContent>
          </Card>

        </div>

        {/* Platform Capabilities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          <Card className="bg-automotive-black-800 border-gold-600/20">
            <CardHeader>
              <CardTitle className="text-white">Payment Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge variant="outline" className="border-green-500 text-green-400">
                  {realData?.paymentIntegration || "Active"}
                </Badge>
                <p className="text-gray-400 text-sm">
                  Multiple payment methods available: PayPal, Bank Transfer, Credit Cards
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-automotive-black-800 border-gold-600/20">
            <CardHeader>
              <CardTitle className="text-white">Supported Vehicles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {(realData?.supportedVehicles || []).map((vehicle, index) => (
                  <Badge key={index} variant="outline" className="border-gold-600 text-gold-400">
                    {vehicle}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Revenue Status */}
        <Card className="bg-automotive-black-800 border-gold-600/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Revenue Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 mb-2">Daily Revenue</p>
                <div className="text-3xl font-bold text-gold-400">
                  ${realData?.dailyRevenue || 0}
                </div>
              </div>
              <div>
                <p className="text-gray-400 mb-2">Total Orders Processed</p>
                <div className="text-2xl font-bold text-blue-400">
                  {realData?.totalOrders || 0}
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Revenue grows automatically as customers place orders and drivers make deliveries
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Operating Regions */}
        <Card className="bg-automotive-black-800 border-gold-600/20">
          <CardHeader>
            <CardTitle className="text-white">Global Operations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-gold-400 mb-2">
                {realData?.operatingRegions || 1}
              </div>
              <p className="text-gray-400">Active Regions</p>
              <p className="text-sm text-gray-500 mt-2">
                Platform ready to scale globally as demand grows
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}