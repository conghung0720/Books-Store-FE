import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchApi = async (url) => {
  return await api.get(url).json();
};

export default api;
