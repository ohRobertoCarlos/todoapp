import axios from '@nuxtjs/axios'
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

export const logoutAll = ($axios) => {
  const tokenInvalidate = $axios.post('api/v1/auth/logout-all',{},{
      headers: {
          Authorization : "Bearer "+ getAccessToken(),
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
  if (process.client && localStorage.getItem('access_token') != null) {
    return localStorage.getItem('access_token');
  }
  return false;
}

export const setAccessToken = (token) => {
  if (process.client) {
    localStorage.setItem('access_token', token);

    return true;
  }

  return false;
}

export const removeAccessToken = () => {
  if (process.client) {
    localStorage.removeItem('access_token');

    return true;
  }

  return false;
}
