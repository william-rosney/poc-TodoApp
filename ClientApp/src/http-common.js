import axios from 'axios';


const http = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	headers: {
		'Content-type': 'application/json',
	},
});

http.interceptors.request.use((config, error) => {
	if (error) return Promise.reject(error);
	const token = localStorage.getItem('token');

	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`;
	}

	return config;
});

export default http;
