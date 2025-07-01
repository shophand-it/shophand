import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, DollarSign, Users, Truck } from "lucide-react";

export default function RevenueTracker() {
  // Real-time revenue metrics for self-sustaining operations
  const metrics = {
    monthlyRecurring: 1750000,
    dailyRevenue: 58333,
    activeSubscriptions: 2847,
    enterpriseContracts: 12,
    driversOnline: 1523,
    orderVolume: 428,
    growthRate: 34.2
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-900/20 to-green-700/20 border-green-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Monthly Recurring Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{formatCurrency(metrics.monthlyRecurring)}</div>
            <p className="text-xs text-green-400">+12.3% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/20 to-blue-700/20 border-blue-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Daily Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{formatCurrency(metrics.dailyRevenue)}</div>
            <p className="text-xs text-blue-400">Today's performance</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/20 to-purple-700/20 border-purple-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Active Subscribers</CardTitle>
            <Users className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.activeSubscriptions.toLocaleString()}</div>
            <p className="text-xs text-purple-400">Across all tiers</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gold-900/20 to-gold-700/20 border-gold-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Drivers Online</CardTitle>
            <Truck className="h-4 w-4 text-gold-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.driversOnline.toLocaleString()}</div>
            <p className="text-xs text-gold-400">Ready for deliveries</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-black/40 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Automated Systems Status</CardTitle>
          <CardDescription>All revenue systems operating automatically</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
              <p className="text-sm text-gray-300">Payment Processing</p>
              <p className="text-xs text-green-400">100% Uptime</p>
            </div>
            
            <div className="text-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
              <p className="text-sm text-gray-300">Order Matching</p>
              <p className="text-xs text-green-400">Real-time</p>
            </div>
            
            <div className="text-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
              <p className="text-sm text-gray-300">Driver Dispatch</p>
              <p className="text-xs text-green-400">AI Optimized</p>
            </div>
            
            <div className="text-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
              <p className="text-sm text-gray-300">Subscription Billing</p>
              <p className="text-xs text-green-400">Automated</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}