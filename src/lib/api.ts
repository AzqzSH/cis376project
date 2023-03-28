import axios from 'axios';
import { useTokenStore } from './stores/tokenStore';

export const api = axios.create({
	baseURL: 'http://10.0.0.219:8000',
});

api.interceptors.request.use(
	async (config) => {
		let headers = config.headers;

		console.log('interceptor');

		const token = useTokenStore.getState().accessToken;

		if (token) {
			headers.setAuthorization(`Bearer ${token}`);
		}

		return {
			...config,
			headers,
		};
	},
	(error) => {
		return Promise.reject(error);
	}
);
