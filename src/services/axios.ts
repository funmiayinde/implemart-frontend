import axois from 'axios';
import auth from './auth';

const defaultOptions = {
    baseURL: process.env.REACT_APP_API_HOST,
    headers: {
        'x-api-key': 'simplemartplace_web'
    },
};

// update instance
const instance = axois.create(defaultOptions);

//set the auth token if there's any for any request
instance.interceptors.request.use(
    config => {
        config.headers['x-access-token'] = auth.getUserSession();
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        return Promise.reject(error.response);
    }
);

export default instance;

export const createAPIRequest = (config: any) => instance(config);
