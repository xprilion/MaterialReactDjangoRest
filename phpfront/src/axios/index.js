import axios from "axios";

import config from "../config";
import { authHeader } from "../helpers/auth-header";

const axiosInstance = axios.create({
  baseURL: config.apiEndpoint,
});

axiosInstance.interceptors.request.use(
  config => {
    config.headers.Authorization = authHeader().Authorization;

    return config;
  },
  error => {
    return error;
  }
);

axiosInstance.interceptors.response.use(function (response) {
  return response;
}, function (error) {

  const originalRequest = error.config;

  if (error.response.status === 401 && !originalRequest._retry) {

    originalRequest._retry = true;

    let user = JSON.parse(localStorage.getItem('user'));
    if ('access_token' in user){
      const access_token = user.access_token;
      return axiosInstance.post('/api/auth/refresh/', { refresh: access_token })
        .then(({data}) => {
          if (data.success) {
            user.access_token = data.access_token;
            localStorage.setItem('user', JSON.stringify(user));
          }
          axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + data.access_token;
          originalRequest.headers['Authorization'] = 'Bearer ' + data.access_token;
          return axiosInstance(originalRequest);
        });
    }
  }

  return Promise.reject(error);
});

export default axiosInstance;
