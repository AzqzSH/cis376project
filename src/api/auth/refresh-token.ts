import { api } from '@/lib/api';
import { SignInResponse } from './types';

export const refreshToken = async (refreshToken: string) => {
	try {
		const { data } = await api.get<SignInResponse>('/auth/refresh-token', {
			params: {
				refresh: refreshToken,
			},
		});

		return data;
	} catch (error) {
		console.log(error);

		throw error;
	}
};
