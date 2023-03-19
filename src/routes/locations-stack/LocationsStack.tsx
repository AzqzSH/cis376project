import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Portal } from 'react-native-paper';
import { LocationsListScreen } from './list-screen';
import { MapScreen } from './map-screen';
import { HelpPage } from '../help';

export type LocationsStackParamList = {
	Map: undefined;
	List: undefined;
	Help: undefined
};

const Stack = createNativeStackNavigator<LocationsStackParamList>();

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
				<Stack.Screen name="Help" component={HelpPage}/>
			</Stack.Navigator>
		</Portal.Host>
	);
};
