export const storeUser = data => {
  return {
    type: 'STORE_USER',
    payload: data,
  };
};

export const initData = data => {
  alert('redux..', data);
  return {
    type: 'ADD_INIT',
    payload: data,
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};

export const saveAccessToken = data => {
  return {
    type: 'ACCESS_TOKEN',
    payload: data,
  };
};
