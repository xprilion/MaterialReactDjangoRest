import axiosInstance from '../axios';

export const userService = {
  login,
  logout,
  register
};

function login(username, password) {
  const requestOptions = {
    headers: { 'Content-Type': 'multipart/form-data' },
    body: { username, password }
  };

  return axiosInstance
    .post(`/token/login/`, requestOptions.body, requestOptions.headers)
    .then(handleResponse)
    .then(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));

      return user;
    });
}

function logout(refreshToken) {
  // axiosInstance
  //   .post('/token/logout/', { refreshToken })
  //   .then(response => {
  //     if (response.data.success) {
        // remove user from local storage to log user out
        localStorage.removeItem('user');

        return true;
    //   }
    // })
    // .catch(error => {
    //   handleResponse(error.response);
    // });
}

function register(user) {
  const requestOptions = {
    headers: { 'Content-Type': 'application/json' },
    body: user
  };

  return axiosInstance
    .post(`/token/register/`, requestOptions.body, requestOptions.headers)
    .then(handleResponse);
}

function handleResponse(response) {
  // const response = error.response;
  const data = response.data;
  // const rtn = rt;
  // const originalRequest = error.config;
    if (!response.data.success) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        // logout();
        // window.location.reload(true);
        console.log("Error");
        // refreshToken(rtn);
        // console.log(originalRequest);
      }

      const error = (data && data.message) || response.statusText;

      // eslint-disable-next-line no-throw-literal
      throw { error, code: data.code };
    }
  return data;
}
