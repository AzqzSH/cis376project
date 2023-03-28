import { api } from '@/lib/api';

export const signUp = async (email: string, password: string) => {
	try {
		const { data } = await api.post<string>('/auth/register', {
			email,
			password,
		});

		return data;
	} catch (error) {
		console.log(error);

		throw error;
	}
};
