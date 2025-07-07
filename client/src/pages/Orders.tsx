import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Order {
_id: string;
status: string;
totalAmount: number;
items: {
partId: {
name: string;
imageUrl?: string;
};
quantity: number;
price: number;
}[];
createdAt: string;
}

const Orders: React.FC = () => {
const [orders, setOrders] = useState<Order[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');

useEffect(() => {
const fetchOrders = async () => {
try {
const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/orders`);
setOrders(res.data);
} catch (err) {
setError('Unable to fetch orders. Please try again.');
} finally {
setLoading(false);
}
};

fetchOrders();
}, []);

return (
<div className="min-h-screen bg-white py-12 px-6">
<h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Your Orders</h1>

{loading && <p className="text-center text-gray-600">Loading orders...</p>}
{error && <p className="text-center text-red-500">{error}</p>}
{!loading && orders.length === 0 && !error && (
<p className="text-center text-gray-500">No orders found.</p>
)}

<div className="space-y-6">
{orders.map((order) => (
<div
key={order._id}
className="border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition duration-200"
>
<div className="flex justify-between items-center mb-4">
<h2 className="text-xl font-semibold">Order #{order._id.slice(-6)}</h2>
<span
className={`text-sm px-3 py-1 rounded-full ${
order.status === 'delivered'
? 'bg-green-100 text-green-700'
: order.status === 'pending'
? 'bg-yellow-100 text-yellow-700'
: 'bg-gray-100 text-gray-600'
}`}
>
{order.status.toUpperCase()}
</span>
</div>

<div className="space-y-3">
{order.items.map((item, index) => (
<div key={index} className="flex items-center gap-4">
<img
src={item.partId.imageUrl || 'https://via.placeholder.com/80x60'}
alt={item.partId.name}
className="w-20 h-16 object-cover rounded"
/>
<div className="flex-1">
<p className="font-medium">{item.partId.name}</p>
<p className="text-sm text-gray-600">
Qty: {item.quantity} × ${item.price.toFixed(2)}
</p>
</div>
</div>
))}
</div>

<div className="mt-4 text-right">
<p className="text-lg font-bold">
Total: ${order.totalAmount.toFixed(2)}
</p>
<p className="text-sm text-gray-500">
Placed on: {new Date(order.createdAt).toLocaleDateString()}
</p>
</div>
</div>
))}
</div>
</div>
);
};

export default Orders;