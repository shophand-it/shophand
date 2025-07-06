import { api } from '../utils/api';

export const login = (email: string, password: string) => {
  return api('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

export const signup = (data: { name: string; email: string; password: string }) => {
  return api('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};