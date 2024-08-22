import api from '../utils/api';

export const login = (email, password) => {
  return api.post('/users/login', { email, password });
};

export const register = (name, email, password) => {
  return api.post('/users/register', { name, email, password });
};

export const getCurrentUser = () => {
  return api.get('/users/me');
};

export const logout = () => {
  // 如果后端有 logout 路由，可以调用它
  // return api.post('/users/logout');
  
  // 如果没有，只需要清除本地存储的 token
  localStorage.removeItem('token');
  return Promise.resolve();
};