import { api } from '@/lib/api';

export const unlockLocation = async (locationId: string) => {
	const { data } = await api.get(`/locations/${locationId}/unlock`);

	console.log(data);

	return data;
};
