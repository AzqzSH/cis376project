import React from 'react';
import { HomePage } from './home';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export type AppNavigatorParamList = {
	Home: undefined;
};

const AppTab = createBottomTabNavigator<AppNavigatorParamList>();

const TAB_ICON: {
	[x in keyof AppNavigatorParamList]: keyof typeof MaterialCommunityIcons['glyphMap'];
} = {
	Home: 'map-marker-radius',
};

export const AppNavigator = () => {
	return (
		<AppTab.Navigator
			initialRouteName="Home"
			screenOptions={({ route }) => {
				const icon = TAB_ICON[route.name];

				return {
					headerShown: false,

					tabBarIcon: ({ color, focused }) => (
						<MaterialCommunityIcons
							name={icon}
							color={color}
							size={focused ? 30 : 26}
						/>
					),
					tabBarShowLabel: false,
					tabBarStyle: {
						backgroundColor: '#012547',
						shadowOpacity: 1,
						shadowOffset: {
							height: 5,
							width: 0,
						},
						shadowColor: '#012547',
						shadowRadius: 10,
					},
					tabBarActiveTintColor: '#ffcb05',
				};
			}}
		>
			<AppTab.Screen name="Home" component={HomePage} />
		</AppTab.Navigator>
	);
};
