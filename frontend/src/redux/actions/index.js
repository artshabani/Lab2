import { SET_USER, SET_SUBSCRIBE } from './types'

const setUser = (user) => {
  return {
    type: SET_USER, 
    user: user
  };
};

const setSubscribe = (subscribe) => {
  return {
    type: SET_SUBSCRIBE, 
    subscribe: subscribe
  };
};

export { setUser, setSubscribe };