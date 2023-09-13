import axios from 'axios';
const Axios = axios.create({
    baseURL: 'http://localhost:5000/'
  });
const bearerToken = localStorage.getItem('AuthToken') ? `Bearer ${localStorage.getItem('AuthToken')}` : 'Bearer';
Axios.defaults.headers.common = {'Authorization': bearerToken}
export default Axios;