import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Package, 
  Users, 
  Building,
  DollarSign,
  AlertTriangle
} from "lucide-react";

export default function WorkingAnalytics() {
  // Get real data from working endpoints
  const { data: parts, isLoading: partsLoading } = useQuery({
    queryKey: ['/api/parts'],
  });

  const { data: partners, isLoading: partnersLoading } = useQuery({
    queryKey: ['/api/partners'],
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['/api/categories'],
  });

  const { data: vehicles, isLoading: vehiclesLoading } = useQuery({
    queryKey: ['/api/vehicles'],
  });

  const isLoading = partsLoading || partnersLoading || categoriesLoading || vehiclesLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-automotive-black-900">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-white">Loading actual platform data...</p>
        </div>
      </div>
    );
  }

  // Calculate real metrics from actual data
  const totalParts = parts?.length || 0;
  const totalPartners = partners?.length || 0;
  const totalCategories = categories?.length || 0;
  const totalVehicles = vehicles?.length || 0;
  
  // Calculate total inventory value
  const totalInventoryValue = parts?.reduce((sum: number, part: any) => {
    return sum + (parseFloat(part.price?.replace(/[,$]/g, '') || '0') * (part.stock || 0));
  }, 0) || 0;

  // Group parts by condition
  const newParts = parts?.filter((part: any) => part.condition === 'new').length || 0;
  const usedParts = parts?.filter((part: any) => part.condition === 'used').length || 0;
  const overhaul = parts?.filter((part: any) => part.condition === 'overhauled').length || 0;

  // High value parts (over $1000)
  const highValueParts = parts?.filter((part: any) => 
    parseFloat(part.price?.replace(/[,$]/g, '') || '0') >= 1000
  ).length || 0;

  return (
    <div className="py-8 px-4 bg-automotive-black-900 min-h-screen">
      <div className="container mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            ShopHand™ Platform Analytics
          </h1>
          <p className="text-gray-400">
            Real data from your working platform - Updated: {new Date().toLocaleString()}
          </p>
        </div>

        {/* Core Platform Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          <Card className="bg-automotive-black-800 border-gold-600/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Available Parts</CardTitle>
              <Package className="h-4 w-4 text-gold-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gold-400">
                {totalParts}
              </div>
              <p className="text-xs text-gold-600">
                Ready for delivery
              </p>
            </CardContent>
          </Card>

          <Card className="bg-automotive-black-800 border-gold-600/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Verified Suppliers</CardTitle>
              <Building className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">
                {totalPartners}
              </div>
              <p className="text-xs text-blue-600">
                Active partners
              </p>
            </CardContent>
          </Card>

          <Card className="bg-automotive-black-800 border-gold-600/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Categories</CardTitle>
              <Users className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">
                {totalCategories}
              </div>
              <p className="text-xs text-green-600">
                Vehicle types
              </p>
            </CardContent>
          </Card>

          <Card className="bg-automotive-black-800 border-gold-600/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Inventory Value</CardTitle>
              <DollarSign className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-400">
                ${totalInventoryValue.toLocaleString()}
              </div>
              <p className="text-xs text-purple-600">
                Total stock value
              </p>
            </CardContent>
          </Card>

        </div>

        {/* Parts Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          <Card className="bg-automotive-black-800 border-gold-600/20">
            <CardHeader>
              <CardTitle className="text-white">Parts by Condition</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">New Parts</span>
                  <Badge variant="outline" className="border-green-500 text-green-400">
                    {newParts}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Used Parts</span>
                  <Badge variant="outline" className="border-yellow-500 text-yellow-400">
                    {usedParts}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Overhauled</span>
                  <Badge variant="outline" className="border-blue-500 text-blue-400">
                    {overhaul}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-automotive-black-800 border-gold-600/20">
            <CardHeader>
              <CardTitle className="text-white">High-Value Parts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-gold-400 mb-2">
                  {highValueParts}
                </div>
                <p className="text-gray-400">Parts over $1,000</p>
                <p className="text-sm text-gray-500 mt-2">
                  Premium parts available for delivery
                </p>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Current Issues */}
        <Card className="bg-automotive-black-800 border-red-600/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
              Platform Status Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-gray-400">
              <p>• Payment processing needs bank account details to function</p>
              <p>• Driver network currently empty - no active drivers registered</p>
              <p>• Order processing system needs customer database setup</p>
              <p>• Revenue tracking requires transaction history</p>
              <p>• Analytics endpoints need API routing fixes</p>
            </div>
          </CardContent>
        </Card>

        {/* What's Actually Working */}
        <Card className="bg-automotive-black-800 border-green-600/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              What's Working
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-gray-400">
              <p>• Parts catalog is fully functional with {totalParts} real parts</p>
              <p>• {totalPartners} verified suppliers with contact information</p>
              <p>• {totalCategories} vehicle categories (Automotive, Aircraft, Marine, etc.)</p>
              <p>• Vehicle compatibility database with {totalVehicles} entries</p>
              <p>• Inventory tracking with stock levels and pricing</p>
              <p>• Basic platform structure and UI components</p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}