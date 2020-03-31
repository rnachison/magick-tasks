import axios from 'axios';

export class APIService {

  constructor() {}

  login(userData) {
    const url = `/api/auth/login/`;
    return axios.post(url, userData);
  }

  register(userData) {
    const url = `/api/auth/register/`;
    return axios.post(url, userData);
  }

  getTasks() {
    const url = `/task/`;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    return axios.get(url);
  }

  getTask(id) {
    const url = `/task/${id}`;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    return axios.get(url);
  }

  createTask(task) {
    const url = `/task`;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    return axios.post(url, task);
  }

  updateTask(task) {
    const url = `/task/${task.id}`;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    return axios.put(url, task);
  }

  deleteTask(id) {
    const url = `/task/${id}`;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
    return axios.delete(url);
  }
}
