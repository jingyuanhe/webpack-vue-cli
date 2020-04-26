import axios from 'axios';
import toast from '../components/common/toast';
import {getSession, removeSession, setSession} from './commonUtils'
const baseURL = process.env.PROXY_API;

const service = axios.create({
    baseURL,
    timeOut: 10000,
    withCredentials: false,
    headers: {
    // source: 'YTO-STEWARD'
    }
})
service.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json';
    if (config.url.indexOf('config')>-1) return config;
    let token =getSession('token');
    if (token) {
        config.headers['token'] =token;
    }
    return config;
},err => {
    return Promise.reject(err);
});
service.interceptors.response.use(response => {
    let { headers, data } = response;
    if (headers['token']) {
      setStore('token', headers['token']);
    }
    return data;
},err => {
    let { status, headers, data } = err.response;
    switch (status) {
        case 401:
        case 403:
            removeSession('token');
            break;
        case 500:
            if (headers['token']) {
                setSession('token', headers['token']);
            }
            break;
        default:
            toast(data.message);
            break;         
    };
    return Promise.reject(err);
})
export default service;