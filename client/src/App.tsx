import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";
import Home from "@/pages/home";
import DriverDashboard from "@/pages/driver-dashboard";
import NotFound from "@/pages/not-found";
import NavigationHeader from "@/components/shared/navigation-header";
import BottomNavigation from "@/components/shared/bottom-navigation";
import Footer from "@/components/shared/footer";

export type InterfaceMode = "customer" | "driver";

function Router() {
  const [interfaceMode, setInterfaceMode] = useState<InterfaceMode>("customer");

  return (
    <div className="min-h-screen bg-automotive-black-900 text-white">
      <NavigationHeader 
        interfaceMode={interfaceMode}
        onInterfaceModeChange={setInterfaceMode}
      />
      
      <Switch>
        <Route path="/">
          {interfaceMode === "customer" ? <Home /> : <DriverDashboard />}
        </Route>
        <Route component={NotFound} />
      </Switch>
      
      <Footer />
      <BottomNavigation />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
