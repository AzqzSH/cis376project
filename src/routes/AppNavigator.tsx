import React from 'react';
import { HomePage } from './home';
import { HelpPage } from './help';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeColors } from '@/lib/theme';
import { Icon } from '@expo/vector-icons/build/createIconSet';
import { Button, View } from 'react-native';

export type AppNavigatorParamList = {
	Home: undefined;
	Achievements: undefined;
	Leaderboard: undefined;
};

const AppTab = createBottomTabNavigator<AppNavigatorParamList>();
const Stack = createNativeStackNavigator();

type TabNavigatorMap<T extends {}, K extends Icon<any, any>> = {
	[x in keyof T]: keyof K['glyphMap'];
};

const TAB_ICON: TabNavigatorMap<
	AppNavigatorParamList,
	typeof MaterialCommunityIcons
> = {
	Home: 'map-marker-radius',
	Achievements: 'trophy',
	Leaderboard: 'equalizer',
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
						backgroundColor: ThemeColors.primary,
						shadowOpacity: 1,
						shadowOffset: {
							height: 5,
							width: 0,
						},
						shadowColor: ThemeColors.primary,
						shadowRadius: 10,
					},
					tabBarActiveTintColor: ThemeColors.secondary,
				};
			}}
		>
			<AppTab.Screen name="Leaderboard" component={HelpPage} />
			<AppTab.Screen name="Home" component={HomePage} />
			<AppTab.Screen name="Achievements" component={HomePage} />
		</AppTab.Navigator>
	);
};
