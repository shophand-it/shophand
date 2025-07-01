import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { AuthModal } from "@/components/auth/auth-modal";
import { Button } from "@/components/ui/button";
import Home from "@/pages/home";
import DriverDashboard from "@/pages/driver-dashboard";
import BusinessDashboard from "@/pages/business-dashboard";
import RealAnalytics from "@/pages/real-analytics";
import WorkingAnalytics from "@/pages/working-analytics";
import Checkout from "@/pages/checkout";
import NotFound from "@/pages/not-found";
import NavigationHeader from "@/components/shared/navigation-header";
import BottomNavigation from "@/components/shared/bottom-navigation";
import Footer from "@/components/shared/footer";

export type InterfaceMode = "customer" | "driver" | "business";

function Router() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [interfaceMode, setInterfaceMode] = useState<InterfaceMode>("customer");
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="min-h-screen bg-automotive-black-900 text-white relative overflow-x-hidden">
      <NavigationHeader 
        interfaceMode={interfaceMode}
        onInterfaceModeChange={setInterfaceMode}
      />
      
      <Switch>
        <Route path="/">
          {interfaceMode === "customer" ? 
            <Home 
              isAuthenticated={isAuthenticated} 
              onShowAuth={() => setShowAuthModal(true)}
            /> : 
           interfaceMode === "driver" ? <DriverDashboard /> : 
           <BusinessDashboard />}
        </Route>
        <Route path="/business">
          <BusinessDashboard />
        </Route>
        <Route path="/real-analytics">
          <RealAnalytics />
        </Route>
        <Route path="/working-analytics">
          <WorkingAnalytics />
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>
        <Route component={NotFound} />
      </Switch>
      
      <Footer />
      <BottomNavigation />

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => setShowAuthModal(false)}
      />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
