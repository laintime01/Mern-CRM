import api from '../utils/api';

export const getClients = () => api.get('/clients');
export const getClient = (id) => api.get(`/clients/${id}`);
export const createClient = (clientData) => api.post('/clients', clientData);
export const updateClient = (id, clientData) => api.put(`/clients/${id}`, clientData);
export const deleteClient = (id) => api.delete(`/clients/${id}`);