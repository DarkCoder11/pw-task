import axios from 'axios';
import envConfig from '../../../env.config';

const axiosInstance = axios.create({
  baseURL: envConfig.API_URL,
});

export default axiosInstance;
