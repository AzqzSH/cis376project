import { api } from '@/lib/api';
import { useQuery } from 'react-query';
import { Achievement } from './types';

export const getAchievements = async (): Promise<Achievement[]> => {
	const { data } = await api.get<Achievement[]>('/achievements');

	return data;
};

export const useGetAchievements = () =>
	useQuery('achievements', getAchievements);
