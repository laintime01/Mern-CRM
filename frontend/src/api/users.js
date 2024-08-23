import api from '../utils/api';

const USER_ENDPOINT = '/users';

export const getUsers = () => api.get(USER_ENDPOINT);

export const createUser = (userData) => api.post(`${USER_ENDPOINT}/register`, userData);

export const updateUser = (userId, userData) => api.put(`${USER_ENDPOINT}/${userId}`, userData);

export const deleteUser = (userId) => api.delete(`${USER_ENDPOINT}/${userId}`);

export const assignRole = (userId, role) => api.put(`${USER_ENDPOINT}/${userId}/role`, { role });

export const login = (credentials) => api.post(`${USER_ENDPOINT}/login`, credentials);