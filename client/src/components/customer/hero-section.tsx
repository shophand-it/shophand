import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { Vehicle } from "@shared/schema";

export default function HeroSection() {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  const { data: vehicles = [] } = useQuery<Vehicle[]>({
    queryKey: ["/api/vehicles"],
  });

  const years = [...new Set(vehicles.map(v => v.year))].sort((a, b) => b - a);
  const makes = [...new Set(vehicles.map(v => v.make))].sort();
  const models = selectedMake 
    ? [...new Set(vehicles.filter(v => v.make === selectedMake).map(v => v.model))].sort()
    : [];

  const handleSearch = () => {
    if (selectedYear && selectedMake && selectedModel) {
      // TODO: Implement vehicle parts search
      console.log("Searching for parts for:", { year: selectedYear, make: selectedMake, model: selectedModel });
    }
  };

  return (
    <section className="relative bg-dark-gradient py-16 px-4 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-30">
        <img 
          src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
          alt="Auto parts warehouse" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative container mx-auto max-w-4xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
          Premium Parts for All Vehicles{" "}
          <span className="text-transparent bg-clip-text bg-gold-gradient">
            Delivered Fast
          </span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Cars • Trucks • Motorcycles • ATVs • Boats • Jetskis • Snowmobiles • RVs • Aircraft - Get authentic parts from dealerships, specialty stores, and certified dismantlers
        </p>
        
        {/* Vehicle Search Widget */}
        <div className="bg-automotive-black-800/90 backdrop-blur-sm rounded-2xl p-6 border border-gold-600/20 max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-gold-500 mb-4">Find Parts for Your Vehicle</h3>
          <div className="grid md:grid-cols-3 gap-3 mb-4">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="bg-automotive-black-700 border border-gold-600/30 text-white">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent className="bg-automotive-black-700 border-gold-600/30">
                {years.map(year => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedMake} onValueChange={setSelectedMake}>
              <SelectTrigger className="bg-automotive-black-700 border border-gold-600/30 text-white">
                <SelectValue placeholder="Select Make" />
              </SelectTrigger>
              <SelectContent className="bg-automotive-black-700 border-gold-600/30">
                {makes.map(make => (
                  <SelectItem key={make} value={make}>
                    {make}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedModel} onValueChange={setSelectedModel} disabled={!selectedMake}>
              <SelectTrigger className="bg-automotive-black-700 border border-gold-600/30 text-white">
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>
              <SelectContent className="bg-automotive-black-700 border-gold-600/30">
                {models.map(model => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button 
            onClick={handleSearch}
            className="w-full bg-gold-gradient text-automotive-black-900 font-bold hover:shadow-lg hover:shadow-gold-500/25"
            disabled={!selectedYear || !selectedMake || !selectedModel}
          >
            <Search className="w-4 h-4 mr-2" />
            Search Compatible Parts
          </Button>
        </div>
      </div>
    </section>
  );
}
