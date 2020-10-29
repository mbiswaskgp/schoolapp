import axios from "axios";
import authHeader from "./auth-header";

import apiUrl from "./ApiUrl";

const API_URL =  `${apiUrl}`;

const create = (url,data) => {
  return axios.post(API_URL + url, data, { headers: authHeader() });
};
const getAll = (url) => {
  return axios.get(API_URL + url, { headers: authHeader() });
};

const getAllWithPage = (url,data) => {
  return axios.post(API_URL + url , data,  { headers: authHeader() });
};

const findByTitle = (url, data) => {
  return axios.post(API_URL + url, data, { headers: authHeader() });
};
const getById = (url,id) => {
  return axios.get(API_URL + `${url}/${id}`, { headers: authHeader() });
};
const update = (url, id, data) => {
  return axios.put(API_URL + `${url}/${id}`, data, { headers: authHeader() });
};
export default {
  create,
  getAll,
  getAllWithPage,
  findByTitle,
  getById,
  update
};