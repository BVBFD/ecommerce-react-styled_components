import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';
const TOKEN = JSON.parse(
  JSON.parse(localStorage.getItem('persist:root') as string)?.user
)?.currentUser?.accessToken.toString();

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});