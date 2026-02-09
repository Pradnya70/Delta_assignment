import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const api = axios.create({ baseURL: API_BASE_URL });

export const userApi = {
  getAll: () => api.get("/users").then((res) => res.data),
  create: (user) => api.post("/users", user).then((res) => res.data),
  update: (id, user) => api.put(`/users/${id}`, user).then((res) => res.data),
  delete: (id) => api.delete(`/users/${id}`).then(() => id),
};
