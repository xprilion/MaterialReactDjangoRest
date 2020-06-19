import axiosInstance from '../axios';

export const userService = {
  login,
  logout
};

function login(email, password) {
  const requestOptions = {
    headers: { 'Content-Type': 'multipart/form-data' },
    body: { email, password }
  };

  return axiosInstance
    .post(`/api/auth/login`, requestOptions.body, requestOptions.headers)
    .then((res) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(res.data));

      return res.data;
    });
}

function logout(access_token) {
  // axiosInstance
  //   .post('/token/logout/', { access_token })
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

function handleResponse(response) {
  // const response = error.response;
  const data = response.data;
  return data;
}
