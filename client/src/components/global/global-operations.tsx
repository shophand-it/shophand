import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, MapPin, Clock, DollarSign, Users, Package } from "lucide-react";

export default function GlobalOperations() {
  const globalMetrics = {
    totalRevenue: "$2.47B",
    weeklyRevenue: "$14M",
    regions: 8,
    countries: 195,
    drivers: "323,000",
    customers: "9.6M",
    orders: "42M"
  };

  const regionalOperations = [
    { 
      region: "North America", 
      countries: 23, 
      revenue: "$52.3M", 
      drivers: "85,000",
      status: "Active",
      timezone: "UTC-5 to UTC-8",
      languages: ["English", "Spanish", "French"]
    },
    { 
      region: "Europe", 
      countries: 44, 
      revenue: "$45.8M", 
      drivers: "65,000",
      status: "Active",
      timezone: "UTC+0 to UTC+3",
      languages: ["English", "German", "French", "Spanish", "Italian"]
    },
    { 
      region: "Asia-Pacific", 
      countries: 54, 
      revenue: "$38.2M", 
      drivers: "58,000",
      status: "Active",
      timezone: "UTC+5 to UTC+12",
      languages: ["English", "Mandarin", "Japanese", "Korean", "Hindi"]
    },
    { 
      region: "Latin America", 
      countries: 33, 
      revenue: "$25.6M", 
      drivers: "35,000",
      status: "Active",
      timezone: "UTC-3 to UTC-6",
      languages: ["Spanish", "Portuguese", "English"]
    },
    { 
      region: "Middle East", 
      countries: 18, 
      revenue: "$18.4M", 
      drivers: "22,000",
      status: "Active",
      timezone: "UTC+2 to UTC+5",
      languages: ["Arabic", "English", "Persian", "Turkish"]
    },
    { 
      region: "Africa", 
      countries: 54, 
      revenue: "$12.8M", 
      drivers: "18,000",
      status: "Expanding",
      timezone: "UTC-1 to UTC+4",
      languages: ["English", "French", "Arabic", "Swahili"]
    },
    { 
      region: "Australia/Oceania", 
      countries: 14, 
      revenue: "$8.9M", 
      drivers: "12,000",
      status: "Active",
      timezone: "UTC+8 to UTC+12",
      languages: ["English"]
    },
    { 
      region: "Eastern Europe", 
      countries: 23, 
      revenue: "$15.2M", 
      drivers: "28,000",
      status: "Active",
      timezone: "UTC+1 to UTC+5",
      languages: ["Russian", "English", "Polish", "Czech"]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Global Overview */}
      <Card className="bg-automotive-black-800 border-gold-600/20">
        <CardHeader>
          <CardTitle className="flex items-center text-gold-500">
            <Globe className="w-5 h-5 mr-2" />
            Global Operations Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gold-500">{globalMetrics.regions}</div>
              <p className="text-sm text-gray-400">Major Regions</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{globalMetrics.countries}</div>
              <p className="text-sm text-gray-400">Countries</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{globalMetrics.weeklyRevenue}</div>
              <p className="text-sm text-gray-400">Weekly Revenue</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{globalMetrics.drivers}</div>
              <p className="text-sm text-gray-400">Global Drivers</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Regional Operations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {regionalOperations.map((region, index) => (
          <Card key={index} className="bg-automotive-black-800 border-gold-600/20">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-white flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-gold-500" />
                  {region.region}
                </CardTitle>
                <Badge 
                  variant={region.status === "Active" ? "default" : "secondary"}
                  className={region.status === "Active" ? "bg-green-600" : "bg-yellow-600"}
                >
                  {region.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center text-sm text-gray-400">
                    <DollarSign className="w-3 h-3 mr-1" />
                    Revenue
                  </div>
                  <div className="font-semibold text-gold-500">{region.revenue}</div>
                </div>
                <div>
                  <div className="flex items-center text-sm text-gray-400">
                    <Users className="w-3 h-3 mr-1" />
                    Drivers
                  </div>
                  <div className="font-semibold text-white">{region.drivers}</div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center text-sm text-gray-400 mb-1">
                  <Package className="w-3 h-3 mr-1" />
                  Countries: {region.countries}
                </div>
                <div className="flex items-center text-sm text-gray-400 mb-2">
                  <Clock className="w-3 h-3 mr-1" />
                  {region.timezone}
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-400 mb-1">Languages:</div>
                <div className="flex flex-wrap gap-1">
                  {region.languages.map((lang, langIndex) => (
                    <Badge 
                      key={langIndex} 
                      variant="outline" 
                      className="text-xs border-gold-600/30 text-gray-300"
                    >
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}