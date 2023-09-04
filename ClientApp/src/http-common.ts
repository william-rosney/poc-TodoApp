import axios, {
	AxiosError,
	type AxiosInstance,
	type AxiosRequestConfig,
} from 'axios';

const http: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	headers: {
		'Content-type': 'application/json',
	},
});

http.interceptors.request.use(
	(config: any) => {
		const token: string | null = localStorage.getItem('token');

		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}

		return config;
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	}
);

export default http;
