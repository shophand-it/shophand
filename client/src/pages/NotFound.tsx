import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="text-center mt-10">
      <h2 className="text-4xl font-bold text-red-600">404 - Page Not Found</h2>
      <p className="mt-4 text-gray-600">Sorry, we couldn't find that page.</p>
      <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;