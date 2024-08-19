import api from '../utils/api';

export const getServices = () => api.get('/services');
export const getService = (id) => api.get(`/services/${id}`);
export const createService = (serviceData) => api.post('/services', serviceData);
export const updateService = (id, serviceData) => api.put(`/services/${id}`, serviceData);
export const deleteService = (id) => api.delete(`/services/${id}`);