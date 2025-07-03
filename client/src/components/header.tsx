import { Link } from 'react-router-dom';

const Header = () => (
  <header style={{ backgroundColor: '#1a1a1a', padding: '1rem', color: '#fff' }}>
    <nav style={{ display: 'flex', justifyContent: 'space-between' }}>
      <h1>ShopHand</h1>
      <div>
        <Link to="/" style={{ margin: '0 1rem', color: '#fff' }}>Home</Link>
        <Link to="/catalog" style={{ margin: '0 1rem', color: '#fff' }}>Catalog</Link>
        <Link to="/orders" style={{ margin: '0 1rem', color: '#fff' }}>Orders</Link>
        <Link to="/login" style={{ margin: '0 1rem', color: '#fff' }}>Login</Link>
      </div>
    </nav>
  </header>
);

export default Header;