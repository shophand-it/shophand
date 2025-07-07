import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 px-4">
      <h1 className="text-7xl font-extrabold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-center text-gray-600 max-w-md mb-6">
        Sorry, the page you’re looking for doesn’t exist. It may have been moved or deleted.
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition duration-200"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;