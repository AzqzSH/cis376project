import { useQuery } from 'react-query';
import { PointOfInterest } from './types';

export const getLocations = async (): Promise<PointOfInterest[]> => {
	// Simulate a network request
	await new Promise((resolve) => setTimeout(resolve, 1000));

	return [
		{
			id: '1',
			name: 'Library Front Desk',
			images: [
				'https://cdn.discordapp.com/attachments/1062450289468252306/1073368897178325214/PXL_20230209_221716344.jpg',
			],
			latitude: 42.3182,
			longitude: -83.2326,
		},
		{
			id: '2',
			name: 'ELB',
			images: [
				'https://cdn.discordapp.com/attachments/1062450289468252306/1073368869151985714/PXL_20230209_222156768.MP.jpg',
			],
			latitude: 42.3196,
			longitude: -83.234,
		},
		{
			id: '3',
			name: 'University Center',
			images: [
				'https://cdn.discordapp.com/attachments/1062450289468252306/1073368898134605844/PXL_20230209_221345249.jpg',
			],
			latitude: 42.3167,
			longitude: -83.2312,
		},
	];
};

export const useGetLocations = () =>
	useQuery('locations', getLocations, {
		staleTime: Infinity,
		cacheTime: Infinity,
	});
