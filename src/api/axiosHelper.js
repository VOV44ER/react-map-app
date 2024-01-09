import axios from 'axios';

axios.defaults.baseURL = 'https://test-task-server-jzuc.onrender.com/';

const axiosInstance = axios.create();

export default axiosInstance;
