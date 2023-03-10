import { computedStore, store } from '@/lib/store';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Portal } from 'react-native-paper';
import { LocationsListScreen } from './list-screen';
import { MapScreen } from './map-screen';

export type LocationsStackParamList = {
	Map: undefined;
	List: undefined;
};

const Stack = createNativeStackNavigator<LocationsStackParamList>();

export const test = store(1);
export const test2 = store(2);

export const test3 = computedStore((get) => get(test) + get(test2));

export const LocationsStack = () => {
	return (
		<Portal.Host>
			<Stack.Navigator
				initialRouteName="Map"
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name="Map" component={MapScreen} />
				<Stack.Screen name="List" component={LocationsListScreen} />
			</Stack.Navigator>
		</Portal.Host>
	);
};
