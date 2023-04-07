import * as Location from 'expo-location';
import { useEffect } from 'react';
import { useState } from 'react';
import { Alert } from 'react-native';

/**
 * Hook to get the current location of the user and update it every x ms
 * @param everyMs - How often to update the location in ms
 */
export const useCurrentLocation = (everyMs: number = 3000) => {
	const [location, setLocation] = useState<Location.LocationObject | null>(
		null
	);

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null;

		async () => {
			const { status } =
				await Location.requestForegroundPermissionsAsync();

			if (status !== 'granted') {
				Alert.alert(
					'Permission to access location was denied. Please enable location services in your settings.'
				);

				return;
			}

			interval = setInterval(async () => {
				const location = await Location.getCurrentPositionAsync({});

				setLocation(location);
			}, everyMs);
		};

		return () => {
			if (interval) {
				clearInterval(interval);
			}
		};
	}, [everyMs]);

	return location;
};
