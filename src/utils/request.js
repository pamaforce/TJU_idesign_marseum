import axios from 'axios';
const service = axios.create({
    baseURL: 'https://idesign.tju.edu.cn'
});
export default service;
