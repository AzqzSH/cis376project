import { api } from './api';
import { useTokenStore } from './stores/tokenStore';

api.interceptors.request.use(
	async (config) => {
		let headers = config.headers;

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
