import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, ShoppingCart, Building2 } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const { login, register } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    userType: "customer"
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(loginData.email, loginData.password);
      const userData = { user: { email: loginData.email } };
      onSuccess(userData);
      onClose();
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await register(registerData);
      const userData = { user: registerData };
      onSuccess(userData);
      onClose();
      toast({
        title: "Welcome to ShopHand™!",
        description: "Your account has been created successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "Unable to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-black border-gold-500/30">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
            ShopHand™ Access Portal
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-900">
            <TabsTrigger value="login" className="data-[state=active]:bg-gold-500/20 data-[state=active]:text-gold-400">
              Sign In
            </TabsTrigger>
            <TabsTrigger value="register" className="data-[state=active]:bg-gold-500/20 data-[state=active]:text-gold-400">
              Register
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="bg-gray-900/50 border-gold-500/20">
              <CardHeader>
                <CardTitle className="text-gold-400">Sign In</CardTitle>
                <CardDescription className="text-gray-300">
                  Access your ShopHand™ account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-gold-400">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className="bg-black border-gold-500/30"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-gold-400">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className="bg-black border-gold-500/30"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card className="bg-gray-900/50 border-gold-500/20">
              <CardHeader>
                <CardTitle className="text-gold-400">Create Account</CardTitle>
                <CardDescription className="text-gray-300">
                  Join the ShopHand™ network
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gold-400">First Name</Label>
                      <Input
                        value={registerData.firstName}
                        onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                        className="bg-black border-gold-500/30"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gold-400">Last Name</Label>
                      <Input
                        value={registerData.lastName}
                        onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                        className="bg-black border-gold-500/30"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gold-400">Username</Label>
                    <Input
                      value={registerData.username}
                      onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                      className="bg-black border-gold-500/30"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gold-400">Email</Label>
                    <Input
                      type="email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      className="bg-black border-gold-500/30"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gold-400">Password</Label>
                    <Input
                      type="password"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      className="bg-black border-gold-500/30"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gold-400">Account Type</Label>
                    <Select
                      value={registerData.userType}
                      onValueChange={(value) => setRegisterData({ ...registerData, userType: value })}
                    >
                      <SelectTrigger className="bg-black border-gold-500/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-gold-500/30">
                        <SelectItem value="customer" className="flex items-center gap-2">
                          <div className="flex items-center gap-2">
                            <ShoppingCart className="h-4 w-4" />
                            Customer - Order Parts
                          </div>
                        </SelectItem>
                        <SelectItem value="driver" className="flex items-center gap-2">
                          <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4" />
                            Driver - Deliver Parts
                          </div>
                        </SelectItem>
                        <SelectItem value="business" className="flex items-center gap-2">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4" />
                            Business - Sell Parts
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}