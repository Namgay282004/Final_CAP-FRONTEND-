import axios from 'axios';

const API_URL = 'http://localhost:5000';  // Update this to your backend URL

export const register = async (username, password) => {
  return axios.post(`${API_URL}/register`, { username, password });
};

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  localStorage.setItem('token', response.data.token);
  return response.data;
};

export const getMessages = async () => {
  const response = await axios.get(`${API_URL}/messages`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return response.data;
};

export const sendMessage = async (message) => {
  return axios.post(`${API_URL}/messages`, message, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
};

export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return response.data;
};
