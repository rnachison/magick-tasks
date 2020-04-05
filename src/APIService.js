require('dotenv').config();

import axios from 'axios';

const base_url = process.env.VUE_APP_API_BASE_URL ? process.env.VUE_APP_API_BASE_URL : '';

export class APIService {

  constructor() {}

  login(userData) {
    const url = base_url + `/api/auth/login/`;
    return axios.post(url, userData);
  }

  register(userData) {
    const url = base_url + `/api/auth/register/`;
    return axios.post(url, userData);
  }

  getTasks() {
    const url = base_url + `/task/`;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    return axios.get(url);
  }

  getTask(id) {
    const url = base_url + `/task/${id}`;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    return axios.get(url);
  }

  createTask(task) {
    const url = base_url + `/task`;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    return axios.post(url, task);
  }

  updateTask(task) {
    const url = base_url + `/task/${task.id}`;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    return axios.put(url, task);
  }

  deleteTask(id) {
    const url = base_url + `/task/${id}`;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
    return axios.delete(url);
  }
}
