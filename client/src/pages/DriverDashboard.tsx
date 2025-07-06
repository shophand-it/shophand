import io from 'socket.io-client';

const socket = io('http://localhost:5173'); // Or your prod domain

useEffect(() => {
  const watchId = navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;

      socket.emit('driverLocation', {
        driverId: userId,
        coordinates: [longitude, latitude],
      });

      // Optionally update via REST as backup
      fetch(`/api/drivers/${userId}/location`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coordinates: [longitude, latitude] }),
      });
    },
    (err) => console.error(err),
    { enableHighAccuracy: true }
  );

  return () => navigator.geolocation.clearWatch(watchId);
}, []);