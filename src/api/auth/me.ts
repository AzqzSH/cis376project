import { api } from '@/lib/api';
import { useQuery } from 'react-query';
import { User } from './types';

export const me = async () => {
	try {
		const { data } = await api.get<User>('/auth/me');

		return data;
	} catch (error) {
		console.log(error);

		throw error;
	}
};

export const useMeQuery = () =>
	useQuery('me', me, {
		retry: false,
	});
