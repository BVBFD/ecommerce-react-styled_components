import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';
const USER = JSON.parse(localStorage.getItem('persist:root') as string)?.user;
const TOKEN = USER
  ? JSON.parse(USER).currentUser?.accessToken.toString()
  : '121231312';

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
