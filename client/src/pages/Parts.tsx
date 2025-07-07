import { useEffect, useState } from "react";

interface Part {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image?: string;
  vendor?: string;
}

const Parts = () => {
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchParts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/parts`);
        if (!res.ok) throw new Error("Failed to fetch parts");
        const data = await res.json();
        setParts(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchParts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Parts</h1>

      {loading && <p className="text-center text-gray-500">Loading parts...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && !error && parts.length === 0 && (
        <p className="text-center text-gray-500">No parts found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {parts.map(part => (
          <div
            key={part._id}
            className="border rounded-lg shadow-md p-4 hover:shadow-lg transition duration-200 bg-white"
          >
            <h2 className="text-xl font-semibold mb-2">{part.name}</h2>
            {part.image && (
              <img
                src={part.image}
                alt={part.name}
                className="w-full h-40 object-cover rounded mb-4"
              />
            )}
            <p><strong>Category:</strong> {part.category}</p>
            <p><strong>Price:</strong> ${part.price.toFixed(2)}</p>
            <p><strong>Stock:</strong> {part.stock}</p>
            {part.vendor && <p><strong>Vendor:</strong> {part.vendor}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Parts;