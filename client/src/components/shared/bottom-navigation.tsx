import { Home, Search, List, Truck, User } from "lucide-react";

export default function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-automotive-black-800 border-t border-gold-600/20 md:hidden">
      <div className="grid grid-cols-5 py-2">
        <button className="flex flex-col items-center py-2 text-gold-500">
          <Home className="w-5 h-5 mb-1" />
          <span className="text-xs">Home</span>
        </button>
        <button className="flex flex-col items-center py-2 text-gray-400">
          <Search className="w-5 h-5 mb-1" />
          <span className="text-xs">Search</span>
        </button>
        <button className="flex flex-col items-center py-2 text-gray-400">
          <List className="w-5 h-5 mb-1" />
          <span className="text-xs">Orders</span>
        </button>
        <button className="flex flex-col items-center py-2 text-gray-400">
          <Truck className="w-5 h-5 mb-1" />
          <span className="text-xs">Track</span>
        </button>
        <button className="flex flex-col items-center py-2 text-gray-400">
          <User className="w-5 h-5 mb-1" />
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </nav>
  );
}
