import axios from 'axios';

const URL_API = process.env.REACT_APP_URL_API;

const getConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const signIn = (body) => axios.post(`${URL_API}/sign-in`, body);

const signUp = (body) => axios.post(`${URL_API}/sign-up`, body);

const getUser = (token) => axios.get(`${URL_API}/user`, getConfig(token));

const getStates = () => axios.get(`${URL_API}/states`);

const subscribe = (token, body) => axios.post(`${URL_API}/subscribe`, body, getConfig(token));

export {
  signIn, signUp, getUser, getStates, subscribe,
};
