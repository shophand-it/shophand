import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Example pages (replace with your real components)
import Home from "./pages/Home";
import Parts from "./pages/Parts";
import Orders from "./pages/Orders";
import Transactions from "./pages/Transactions";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/parts" element={<Parts />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;