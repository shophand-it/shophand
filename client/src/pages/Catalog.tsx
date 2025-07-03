import { useEffect, useState } from 'react';
import PartCard from '../components/PartCard';
import { fetchParts } from '../api/api';

type Part = {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
};

const Catalog = () => {
  const [parts, setParts] = useState<Part[]>([]);

  useEffect(() => {
    fetchParts().then(data => setParts(data));
  }, []);

  return (
    <div>
      <h2>Parts Catalog</h2>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {parts.map(part => (
          <PartCard key={part.id} {...part} />
        ))}
      </div>
    </div>
  );
};

export default Catalog;