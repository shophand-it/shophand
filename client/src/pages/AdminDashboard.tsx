import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const initialPosition = {
  lat: 37.7749,    // Replace with your driver's initial latitude
  lng: -122.4194,  // Replace with your driver's initial longitude
};

const AdminDashboard = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY!,
  });

  const [driverPosition, setDriverPosition] = useState(initialPosition);

  // Simulated real-time movement (replace with socket or REST call in production)
  useEffect(() => {
    const interval = setInterval(() => {
      setDriverPosition((prev) => ({
        lat: prev.lat + 0.0001,
        lng: prev.lng + 0.0001,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={driverPosition}
          zoom={15}
        >
          <Marker position={driverPosition} />
        </GoogleMap>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

export default AdminDashboard;