const BASE_URL = 'https://shophand.replit.app'; // Update if backend changes

// Fetch parts for catalog
export const fetchParts = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/parts`);
    if (!res.ok) throw new Error('Failed to fetch parts');
    return await res.json();
  } catch (err) {
    console.error('Error fetching parts:', err);
    return [];
  }
};

// User login (example POST)
export const loginUser = async (email: string, password: string) => {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) throw new Error('Login failed');
    return await res.json();
  } catch (err) {
    console.error('Login error:', err);
    return null;
  }
};

// Future: Add functions like placeOrder(), fetchOrders(), etc.