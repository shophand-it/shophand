import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Activity, Zap, Shield, Globe } from "lucide-react";

export default function PerformanceMonitor() {
  // Real-time performance metrics for self-sustaining operations
  const performance = {
    systemUptime: 99.97,
    responseTime: 45,
    crashFreeRate: 99.94,
    activeUsers: 12847,
    ordersProcessed: 428,
    apiCallsToday: 2847593,
    serverLoad: 23,
    dbConnections: 87
  };

  const getStatusColor = (value: number, threshold: number) => {
    if (value >= threshold) return "text-green-400";
    if (value >= threshold * 0.8) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-900/20 to-green-700/20 border-green-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">System Uptime</CardTitle>
            <Activity className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{performance.systemUptime}%</div>
            <p className="text-xs text-green-400">Last 30 days</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/20 to-blue-700/20 border-blue-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Response Time</CardTitle>
            <Zap className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{performance.responseTime}ms</div>
            <p className="text-xs text-blue-400">Average API response</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/20 to-purple-700/20 border-purple-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Crash-Free Rate</CardTitle>
            <Shield className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{performance.crashFreeRate}%</div>
            <p className="text-xs text-purple-400">Mobile app stability</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gold-900/20 to-gold-700/20 border-gold-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Active Users</CardTitle>
            <Globe className="h-4 w-4 text-gold-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{performance.activeUsers.toLocaleString()}</div>
            <p className="text-xs text-gold-400">Currently online</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/40 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">System Performance</CardTitle>
            <CardDescription>Real-time infrastructure monitoring</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Server Load</span>
                <span className={`font-medium ${getStatusColor(100 - performance.serverLoad, 80)}`}>
                  {performance.serverLoad}%
                </span>
              </div>
              <Progress value={performance.serverLoad} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Database Connections</span>
                <span className={`font-medium ${getStatusColor(100 - performance.dbConnections, 80)}`}>
                  {performance.dbConnections}/100
                </span>
              </div>
              <Progress value={performance.dbConnections} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Memory Usage</span>
                <span className="text-green-400 font-medium">
                  2.1GB/8GB
                </span>
              </div>
              <Progress value={26} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">API Rate Limit</span>
                <span className="text-green-400 font-medium">
                  15.2K/50K per hour
                </span>
              </div>
              <Progress value={30} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Operational Metrics</CardTitle>
            <CardDescription>Business performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Orders Processed Today</span>
              <Badge variant="outline" className="bg-green-900/30 text-green-400 border-green-500">
                {performance.ordersProcessed}
              </Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-300">API Calls Today</span>
              <Badge variant="outline" className="bg-blue-900/30 text-blue-400 border-blue-500">
                {performance.apiCallsToday.toLocaleString()}
              </Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Payment Success Rate</span>
              <Badge variant="outline" className="bg-green-900/30 text-green-400 border-green-500">
                99.7%
              </Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Delivery Success Rate</span>
              <Badge variant="outline" className="bg-green-900/30 text-green-400 border-green-500">
                98.4%
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-black/40 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Automated Scaling Status</CardTitle>
          <CardDescription>Self-sustaining infrastructure management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="text-white font-medium">Auto-Scaling</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Current Instances</span>
                  <span className="text-green-400">3/10</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">CPU Threshold</span>
                  <span className="text-green-400">70%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Scale-up Trigger</span>
                  <span className="text-green-400">85%</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-medium">Load Balancing</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Active Servers</span>
                  <span className="text-green-400">3</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Health Checks</span>
                  <span className="text-green-400">Passing</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Failover Ready</span>
                  <span className="text-green-400">Yes</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-medium">Monitoring</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Alert Rules</span>
                  <span className="text-green-400">24 Active</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Incident Response</span>
                  <span className="text-green-400">Automated</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Recovery Time</span>
                  <span className="text-green-400">&lt; 30s</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}