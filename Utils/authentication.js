export const logout = (access_token) => {
  const tokenInvalidate = axiosInstance.post('api/v1/auth/logout',{},{
      headers: {
          Authorization : "Bearer "+access_token,
          Accept : 'application/json'
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
          Accept : 'application/json'
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

export const acessTokenIsValid = async ($axios) => {
    const me = await $axios.get('/api/v1/auth/me', {
        headers : {
            Authorization : 'Bearer ' + getAccessToken(),
            Accept : 'application/json'
        }
    });

    return me != null;
};

export const userIsLogged = async ($router, $axios) => {
    if (!acessTokenIsValid($axios)) {
        $router.push({name:'Login'});
      }
}
