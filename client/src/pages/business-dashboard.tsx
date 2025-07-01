import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Package, 
  Target, 
  Globe, 
  Zap,
  Crown,
  Building,
  Handshake
} from "lucide-react";
import SubscriptionPlans from "@/components/business/subscription-plans";
import RevenueTracker from "@/components/automation/revenue-tracker";
import PerformanceMonitor from "@/components/automation/performance-monitor";

export default function BusinessDashboard() {
  // Mock business analytics data
  const businessMetrics = {
    totalRevenue: "$47.2M",
    monthlyGrowth: "+127%",
    platformFees: "$3.8M",
    subscriptionRevenue: "$890K",
    totalOrders: "1.2M",
    activeDrivers: "45,000",
    activeCustomers: "280,000",
    marketShare: "23.4%",
    partnerships: 47,
    regions: 12
  };

  const revenueStreams = [
    {
      name: "Platform Transaction Fees",
      revenue: "$3.8M",
      growth: "+89%",
      description: "5-8% commission per transaction"
    },
    {
      name: "Premium Subscriptions",
      revenue: "$890K",
      growth: "+234%",
      description: "Business & fleet memberships"
    },
    {
      name: "Premium Large Parts",
      revenue: "$2.8M", 
      growth: "+312%",
      description: "Aircraft engines, wing assemblies, snowmobile blocks"
    },
    {
      name: "Strategic Partnerships",
      revenue: "$2.1M",
      growth: "+156%",
      description: "Insurance, manufacturers, fleet contracts"
    },
    {
      name: "White-Label Licensing",
      revenue: "$650K",
      growth: "+445%",
      description: "Regional franchise licenses"
    }
  ];

  const expansionMarkets = [
    { region: "North America", status: "Active", revenue: "$28.5M", drivers: "25,000" },
    { region: "Europe", status: "Expanding", revenue: "$12.3M", drivers: "12,500" },
    { region: "Asia-Pacific", status: "Launch", revenue: "$4.8M", drivers: "5,200" },
    { region: "Latin America", status: "Planning", revenue: "$1.6M", drivers: "2,300" }
  ];

  const strategicPartnerships = [
    { partner: "State Farm Insurance", type: "Insurance", value: "$45M", status: "Active" },
    { partner: "Ford Motor Company", type: "Manufacturer", value: "$78M", status: "Negotiating" },
    { partner: "Enterprise Fleet", type: "B2B Fleet", value: "$23M", status: "Active" },
    { partner: "AutoZone Corporate", type: "Retail Chain", value: "$34M", status: "Active" }
  ];

  return (
    <div className="py-8 px-4 bg-automotive-black-900 min-h-screen">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Business Intelligence Dashboard</h1>
          <p className="text-gray-400">Scaling ShopHand™ to billion-dollar valuation</p>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-automotive-black-800 border-gold-600/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400 flex items-center">
                <DollarSign className="w-4 h-4 mr-2 text-gold-500" />
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gold-500">{businessMetrics.totalRevenue}</div>
              <p className="text-green-400 text-sm">{businessMetrics.monthlyGrowth} YoY</p>
            </CardContent>
          </Card>

          <Card className="bg-automotive-black-800 border-gold-600/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400 flex items-center">
                <Users className="w-4 h-4 mr-2 text-gold-500" />
                Active Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{businessMetrics.activeCustomers}</div>
              <p className="text-gray-400 text-sm">{businessMetrics.activeDrivers} drivers</p>
            </CardContent>
          </Card>

          <Card className="bg-automotive-black-800 border-gold-600/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400 flex items-center">
                <Target className="w-4 h-4 mr-2 text-gold-500" />
                Market Share
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{businessMetrics.marketShare}</div>
              <p className="text-green-400 text-sm">Leading in 8 markets</p>
            </CardContent>
          </Card>

          <Card className="bg-automotive-black-800 border-gold-600/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400 flex items-center">
                <Package className="w-4 h-4 mr-2 text-gold-500" />
                Total Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{businessMetrics.totalOrders}</div>
              <p className="text-green-400 text-sm">+67% this quarter</p>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Streams */}
        <Card className="bg-automotive-black-800 border-gold-600/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-gold-500" />
              Revenue Streams
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {revenueStreams.map((stream, index) => (
                <div key={index} className="bg-automotive-black-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-white">{stream.name}</h3>
                    <Badge className="bg-green-500 text-white">{stream.growth}</Badge>
                  </div>
                  <div className="text-2xl font-bold text-gold-500 mb-2">{stream.revenue}</div>
                  <p className="text-gray-400 text-sm">{stream.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Market Expansion */}
        <Card className="bg-automotive-black-800 border-gold-600/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Globe className="w-5 h-5 mr-2 text-gold-500" />
              Global Market Expansion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {expansionMarkets.map((market, index) => (
                <div key={index} className="bg-automotive-black-700 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-white">{market.region}</h3>
                    <Badge className={`text-white ${
                      market.status === 'Active' ? 'bg-green-500' :
                      market.status === 'Expanding' ? 'bg-blue-500' :
                      market.status === 'Launch' ? 'bg-yellow-500' : 'bg-gray-500'
                    }`}>
                      {market.status}
                    </Badge>
                  </div>
                  <div className="text-lg font-bold text-gold-500">{market.revenue}</div>
                  <p className="text-gray-400 text-sm">{market.drivers} drivers</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Premium Pricing Structure */}
        <Card className="bg-automotive-black-800 border-gold-600/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Crown className="w-5 h-5 mr-2 text-gold-500" />
              Premium Pricing Tiers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-automotive-black-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Standard Parts</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Auto/Motorcycle:</span>
                    <span className="text-gold-500 ml-2">$12-25 delivery</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Marine/ATV:</span>
                    <span className="text-gold-500 ml-2">$18-35 delivery</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-automotive-black-700 rounded-lg p-4 border-l-4 border-gold-500">
                <h3 className="font-semibold text-white mb-2">Large Components</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Snowmobile Engines:</span>
                    <span className="text-gold-500 ml-2">$150-300 delivery</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Aircraft Parts:</span>
                    <span className="text-gold-500 ml-2">$500-2,000 delivery</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2">Specialized handling, insurance, & certification required</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Strategic Partnerships */}
        <Card className="bg-automotive-black-800 border-gold-600/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Handshake className="w-5 h-5 mr-2 text-gold-500" />
              Strategic Partnerships
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {strategicPartnerships.map((partnership, index) => (
                <div key={index} className="bg-automotive-black-700 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-white">{partnership.partner}</h3>
                    <p className="text-gray-400 text-sm">{partnership.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gold-500">{partnership.value}</div>
                    <Badge className={`text-white ${
                      partnership.status === 'Active' ? 'bg-green-500' : 'bg-blue-500'
                    }`}>
                      {partnership.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Growth Strategy Actions */}
        <Card className="bg-automotive-black-800 border-gold-600/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Zap className="w-5 h-5 mr-2 text-gold-500" />
              Billion-Dollar Growth Initiatives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button className="bg-gold-gradient text-automotive-black-900 font-bold h-auto p-4 flex flex-col items-start">
                <Crown className="w-6 h-6 mb-2" />
                <span className="text-lg">Premium Subscriptions</span>
                <span className="text-sm opacity-80">Launch enterprise fleet management</span>
              </Button>
              
              <Button className="bg-gold-gradient text-automotive-black-900 font-bold h-auto p-4 flex flex-col items-start">
                <Building className="w-6 h-6 mb-2" />
                <span className="text-lg">B2B Expansion</span>
                <span className="text-sm opacity-80">Target repair shops & fleet operators</span>
              </Button>
              
              <Button className="bg-gold-gradient text-automotive-black-900 font-bold h-auto p-4 flex flex-col items-start">
                <Globe className="w-6 h-6 mb-2" />
                <span className="text-lg">International Scale</span>
                <span className="text-sm opacity-80">White-label in 50+ markets</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Automation Dashboard */}
        <Card className="bg-black/40 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Revenue Automation Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueTracker />
          </CardContent>
        </Card>

        {/* Performance & Infrastructure */}
        <Card className="bg-black/40 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Performance & Infrastructure</CardTitle>
          </CardHeader>
          <CardContent>
            <PerformanceMonitor />
          </CardContent>
        </Card>

        {/* Subscription Plans Section */}
        <SubscriptionPlans />
      </div>
    </div>
  );
}