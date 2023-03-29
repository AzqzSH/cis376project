export type PointOfInterest = {
	id: string;
	name: string;
	image: string;
	latitude: number;
	longitude: number;
	page: string;
	isUnlocked?: boolean;
};
