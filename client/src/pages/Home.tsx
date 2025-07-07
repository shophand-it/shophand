import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* HERO */}
      <section className="w-full bg-gray-100 py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Welcome to ShopHandIt
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Fast delivery for auto, RV, marine, ATV, snowmobile, heavy machinery, and aircraft parts — directly to your location.
        </p>
        <Link to="/order" className="inline-block bg-black text-white text-lg px-6 py-3 rounded hover:bg-gray-800 transition">
          Order Parts Now
        </Link>
      </section>

      {/* FEATURES */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Why ShopHandIt?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg p-6 rounded">
            <h3 className="text-xl font-semibold mb-2">Parts Delivered Anywhere</h3>
            <p className="text-gray-600">
              Whether you're in a marina, on the road, or at an airfield — our drivers deliver directly where others can’t.
            </p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded">
            <h3 className="text-xl font-semibold mb-2">Trusted Vendors</h3>
            <p className="text-gray-600">
              We partner with top-tier vendors to guarantee OEM quality and compatibility with your vehicle or machinery.
            </p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded">
            <h3 className="text-xl font-semibold mb-2">Real-Time Tracking</h3>
            <p className="text-gray-600">
              Live driver tracking ensures your parts arrive quickly and safely — with full visibility every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black text-white py-16 text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Parts Delivered Now?</h2>
        <p className="text-lg md:text-xl mb-6">
          Get started with the most reliable parts delivery service in the industry.
        </p>
        <Link to="/order" className="bg-white text-black px-6 py-3 rounded font-semibold hover:bg-gray-200 transition">
          Place an Order
        </Link>
      </section>
    </div>
  );
};

export default Home;