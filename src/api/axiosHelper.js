import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5001/';

const axiosInstance = axios.create();

export default axiosInstance;
