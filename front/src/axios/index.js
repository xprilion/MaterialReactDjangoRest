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
    if ('refreshToken' in user){
      const refreshToken = user.refreshToken;
      return axiosInstance.post('/token/refresh/', { refresh: refreshToken })
        .then(({data}) => {
          if (data.success) {
            user.accessToken = data.accessToken;
            localStorage.setItem('user', JSON.stringify(user));
          }
          axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + data.accessToken;
          originalRequest.headers['Authorization'] = 'Bearer ' + data.accessToken;
          return axiosInstance(originalRequest);
        });
    }
  }

  return Promise.reject(error);
});

export default axiosInstance;
