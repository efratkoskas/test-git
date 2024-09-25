import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig, AxiosHeaders } from 'axios';
import { toast } from 'react-toastify';

// Create an axios instance
const apiClient = axios.create();

// Intercept requests to add Authorization header
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            // Ensure headers is initialized as AxiosHeaders
            config.headers = AxiosHeaders.from(config.headers || {});
            config.headers.set('Authorization', `Bearer ${token}`);
            const baseConfigs = JSON.parse(localStorage.getItem('config') || '{}');
            config.url = `${baseConfigs?.REACT_APP_BASE_URL}/api${config.url}`; // Add base URL to all requests
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// Intercept responses to handle JWT errors
apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        if (error.response) {
            const { status } = error.response;

            // Handle 401 and 405 exceptions
            if (status === 401 || status === 405) {
                toast.error(`Error: ${status === 401 ? 'Invalid token' : 'Token expired'}`);
                localStorage.removeItem('authToken');

                // Redirect to login if token is invalid or expired
                setTimeout(() => {
                    window.location.pathname = '/loginRegister';
                }, 3000);
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
