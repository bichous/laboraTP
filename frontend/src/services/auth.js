import axios from 'axios';
let baseURL;

process.env.NODE_ENV === 'production'
  ? (baseURL = 'https://laboratoria-pt.herokuapp.com')
  : (baseURL = 'http://localhost:3000');

const MY_SERVICE = axios.create({ withCredentials: true, baseURL });

const AUTH_SERVICE = {
  signup: async user => {
    return await MY_SERVICE.post('/auth/signup', user);
  },
  login: async user => {
    return await MY_SERVICE.post('/auth/login', user);
  },
  logOut: async () => {
    return await MY_SERVICE.get('/auth/logout');
  }
};

export default AUTH_SERVICE;
