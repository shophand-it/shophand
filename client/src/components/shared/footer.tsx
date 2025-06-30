export default function Footer() {
  return (
    <footer className="bg-automotive-black-800 border-t border-gold-600/20 py-8 px-4 mt-16">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">ShopHand™</h3>
            <p className="text-gray-400 text-sm mb-4">
              Premium auto parts delivery platform connecting customers with dealerships, 
              auto stores, and certified dismantlers.
            </p>
            <p className="text-xs text-gray-500">
              © 2025 Star Soul Enterprise LLC. All rights reserved.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>OEM Parts</li>
              <li>Aftermarket Parts</li>
              <li>Recycled Parts</li>
              <li>Fast Delivery</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Partners</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Authorized Dealerships</li>
              <li>Auto Parts Stores</li>
              <li>Certified Dismantlers</li>
              <li>Professional Drivers</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gold-600/20 mt-8 pt-6 text-center">
          <p className="text-xs text-gray-500">
            ShopHand™ is a trademark of Star Soul Enterprise Limited Liability Company. 
            Licensed drivers and verified partners ensure quality and reliability.
          </p>
        </div>
      </div>
    </footer>
  );
}