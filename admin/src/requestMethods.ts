import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';
const TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmVmMWExMzQxZTllOGQ4OTU2NjM4NSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NjgyMTI3NywiZXhwIjoxNjU3MDgwNDc3fQ.J8y5TT5RXG7C27rtTUP7c7Qm3bxIn57QmZtq6mVi560`;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
