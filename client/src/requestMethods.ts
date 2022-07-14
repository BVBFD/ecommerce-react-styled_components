import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';
const USER = JSON.parse(localStorage?.getItem('persist:root') as string)?.user;
const TOKEN = USER
  ? JSON.parse(USER).currentUser?.accessToken.toString()
  : null;
const HOST = window.location.host;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    origin: `http://${HOST}`,
    // @ts-ignore
    CSRF_TOKEN: process.env.REACT_APP_CSRF_TOKEN,
  },
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    token: `Bearer ${TOKEN}`,
    origin: `http://${HOST}`,
    // @ts-ignore
    CSRF_TOKEN: process.env.REACT_APP_CSRF_TOKEN,
  },
});
