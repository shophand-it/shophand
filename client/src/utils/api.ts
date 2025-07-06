const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export const api = async (endpoint: string, options: RequestInit = {}) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    credentials: 'include',
    ...options,
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'API Error');
  }

  return res.json();
};