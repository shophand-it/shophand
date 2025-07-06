import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="mobile-toggle">
        <button onClick={toggleSidebar}>
          ☰
        </button>
      </div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <h2 className="sidebar-title">ShopHand</h2>
        <nav className="sidebar-nav">
          <Link to="/admin/dashboard" className={location.pathname.includes('dashboard') ? 'active' : ''}>Dashboard</Link>
          <Link to="/admin/transactions" className={location.pathname.includes('transactions') ? 'active' : ''}>Transactions</Link>
          <Link to="/admin/orders" className={location.pathname.includes('orders') ? 'active' : ''}>Orders</Link>
          <Link to="/admin/vendors" className={location.pathname.includes('vendors') ? 'active' : ''}>Vendors</Link>
          <Link to="/admin/drivers" className={location.pathname.includes('drivers') ? 'active' : ''}>Drivers</Link>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;