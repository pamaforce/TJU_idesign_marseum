import axios from 'axios';
const service = axios.create({
    baseURL: 'http://idesign.tju.edu.cn',
})
export default service;