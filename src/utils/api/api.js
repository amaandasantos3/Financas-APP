import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sofit-mobile-challenge.herokuapp.com/',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;