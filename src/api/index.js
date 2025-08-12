import axios from 'axios';
import { responseError } from '../adminpages/helpers/responseHandler.js';
import { store } from '../redux/index.js';

export const api = axios.create({

    baseURL: import.meta.env.VITE_API_URL,
    // timeout: 5000, // Optional: Set timeout

});


api.interceptors.request.use((config) => {
    const token = store.getState()?.authenticate?.token

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor to handle 401 errors
// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response && error.response.status === 401) {
//             // Clear token from Redux store
//             responseError(error?.response);
//             console.error('error-401===', error);
//             // store.dispatch(logout());


//             // Navigate to login page
//             // window.location.href = '/login'; // Fallback navigation
//         }
//         return Promise.reject(error);
//     }
// );


// Generic GET request
export const getRequest = async (endpoint, params = {}) => {
    try {
        const response = await api.get(endpoint, { params });
        if (response?.data?.statusCode === 200 || response?.data?.status == true) {
            if (response?.data?.bundles) return response.data?.bundles;
            return response.data?.response?.data ? response.data?.response?.data : response.data?.packages;
        }
        return response;
    } catch (error) {
        throw new Error(error.response?.data?.message || `GET request to ${endpoint} failed`);
    }
};

export const deleteRequest = async (endpoint, params = {}) => {
    try {
        const response = await api.delete(endpoint, { params });
        if (response?.data?.statusCode === 200) {
            return response.data
        }
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || `GET request to ${endpoint} failed`);
    }
};

// Generic POST request
export const postRequest = async (endpoint, data = {}, file = false) => {
    try {
        const headers = {
            headers: {
                'Content-Type': file ? 'multipart/form-data' : 'application/json',
            }
        };
        const response = await api.post(endpoint, data, headers);
        console.log('Api Successfully Run:', response.data);
        return response.data;
    } catch (error) {
        console.log('errow', error.response)
        responseError(error.response)
        // throw new Error(error.response?.data?.message || `POST request to ${ endpoint } failed`);
    }
};

export const putRequest = async (endpoint, data = {}, file = false) => {
    try {
        const headers = {
            headers: {
                'Content-Type': file ? 'multipart/form-data' : 'application/json',
            }
        };
        const response = await api.put(endpoint, data, headers);
        console.log('Api Successfully Run:', response.data);
        return response.data;
    } catch (error) {
        console.log('errow', error.response)
        responseError(error.response)
    }
};
