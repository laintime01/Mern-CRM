import api from '../utils/api';

export const getServiceRequests = () => api.get('/services');
export const getServiceRequest = (id) => api.get(`/services/${id}`);
export const createServiceRequest = (serviceData) => api.post('/services', serviceData);
export const updateServiceRequest = (id, serviceData) => api.put(`/services/${id}`, serviceData);
export const deleteServiceRequest = (id) => api.delete(`/services/${id}`);