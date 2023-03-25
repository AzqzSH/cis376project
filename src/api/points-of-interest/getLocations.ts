import { api } from '@/lib/api';
import { useQuery } from 'react-query';
import { PointOfInterest } from './types';

export const getLocations = async (): Promise<PointOfInterest[]> => {
	const { data } = await api.get<PointOfInterest[]>('/locations');

	return data;
};

export const useGetLocations = () => useQuery('locations', getLocations);
