import { api } from '@/lib/api';

type SignInResponse = {
	accessToken: string;
	refreshToken: string;
};

export const signIn = async (email: string, password: string) => {
	try {
		const { data } = await api.post<SignInResponse>('/auth/login', {
			email,
			password,
		});

		return data;
	} catch (error) {
		console.log(error);

		throw error;
	}
};
