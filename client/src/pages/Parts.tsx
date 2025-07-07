import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Part {
_id: string;
name: string;
description: string;
price: number;
imageUrl?: string;
category: string;
}

const Parts: React.FC = () => {
const [parts, setParts] = useState<Part[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');

useEffect(() => {
const fetchParts = async () => {
try {
const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/parts`);
setParts(res.data);
} catch (err) {
setError('Failed to load parts. Please try again.');
} finally {
setLoading(false);
}
};

fetchParts();
}, []);

return (
<div className="min-h-screen bg-white text-gray-900 py-12 px-6">
<h1 className="text-3xl md:text-4xl font-bold text-center mb-10">Available Parts</h1>

{loading && <p className="text-center text-gray-600">Loading parts...</p>}
{error && <p className="text-center text-red-600">{error}</p>}

{!loading && parts.length === 0 && !error && (
<p className="text-center text-gray-500">No parts available at the moment.</p>
)}

<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
{parts.map((part) => (
<div
key={part._id}
className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition duration-200"
>
<img
src={part.imageUrl || 'https://via.placeholder.com/200x150?text=No+Image'}
alt={part.name}
className="w-full h-40 object-cover rounded mb-4"
/>
<h2 className="text-xl font-semibold">{part.name}</h2>
<p className="text-gray-600 text-sm mb-2">{part.category}</p>
<p className="text-gray-700 mb-3 text-sm">{part.description}</p>
<p className="font-bold text-lg">${part.price.toFixed(2)}</p>
</div>
))}
</div>
</div>
);
};

export default Parts;