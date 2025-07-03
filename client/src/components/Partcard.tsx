type PartCardProps = {
  name: string;
  description: string;
  price: string;
  stock: number;
};

const PartCard = ({ name, description, price, stock }: PartCardProps) => (
  <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
    <h3>{name}</h3>
    <p>{description}</p>
    <p><strong>Price:</strong> ${price}</p>
    <p><strong>Stock:</strong> {stock}</p>
  </div>
);

export default PartCard;