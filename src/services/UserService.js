import axios from "./customize-axios";
const fetchAllUser = (page) => {
  return axios.get(`/api/users?page=${page}`);
};

const createUser = (name, job) => {
  return axios.post(`/api/users`, { name, job });
};

const updateUser = (id, name, job) => {
  return axios.put(`/api/users/${id}`, { name, job });
};

const deleteUser = (id) => {
  return axios.delete(`/api/users`, { id });
};

const userLogin = (username, password) => {
  return axios.post(`/api/login/`,{username, password});
}

export { fetchAllUser, createUser, updateUser, deleteUser, userLogin };
