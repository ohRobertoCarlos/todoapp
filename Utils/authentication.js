export const logout = (access_token) => {
  const tokenInvalidate = axiosInstance.post('api/v1/auth/logout',{},{
      headers: {
          Authorization : "Bearer "+access_token,
      }
  })
  .then(response => {
      if (response.status == 200) {
          return removeAccessToken();
      }

      return false;
  })
  .catch(() => {
      return removeAccessToken();
  });

  return tokenInvalidate;
}

export const logoutAll = (access_token) => {
  const tokenInvalidate = axiosInstance.post('api/v1/auth/logout-all',{},{
      headers: {
          Authorization : "Bearer "+access_token,
      }
  })
  .then(response => {
      if (response.status == 200) {
          return removeAccessToken();
      }

      return false;
  })
  .catch(() => {
      return removeAccessToken();
  });

  return tokenInvalidate;
}

export const getAccessToken = () => {
  if (localStorage.getItem('access_token') != null) {
    return localStorage.getItem('access_token');
  }
  return false;
}

export const setAccessToken = (token) => {
    localStorage.setItem('access_token', token);

    return true;
}

export const removeAccessToken = () => {
  localStorage.removeItem('access_token');

  return true;
}
