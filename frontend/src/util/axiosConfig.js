import axios from 'axios';

// Cấu hình cơ bản cho Axios
const axiosInstance = axios.create({
    baseURL: 'http://10.0.2.2:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            console.error('Response error:', error.response);
        } else if (error.request) {
            console.error('Request error:', error.request);
        } else {
            console.error('Error', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
