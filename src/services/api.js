import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/users';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const userApi = {
  getAll: () => api.get('/').then(res => res.data),
  create: (user) => api.post('/', user).then(res => res.data),
  update: (id, user) => api.put(`/${id}`, user).then(res => res.data),
  delete: (id) => api.delete(`/${id}`).then(() => id),
};
