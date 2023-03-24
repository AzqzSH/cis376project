import React from 'react';
 import { HomeScreen } from './home_screen';
 import { HelpPage } from './help';
 import { LocationsStack } from './locations-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeColors } from '@/lib/theme';
import { Icon } from '@expo/vector-icons/build/createIconSet';
import { Button, View } from 'react-native';
 import { Icon as ButtonIcon } from '@/shared-components/icon';
import { IconButton } from '@/shared-components/icon-button';
import { useNavigation } from '@react-navigation/native';
import {AchievementsPage } from './achievements';

export type AppNavigatorParamListTabs = {
	Home: undefined;
	Achievements: undefined;
	Leaderboard: undefined;
	HomeScreen: undefined;
};

const AppTab = createBottomTabNavigator<AppNavigatorParamListTabs>();
const Stack = createNativeStackNavigator();


type TabNavigatorMap<T extends {}, K extends Icon<any, any>> = {
	[x in keyof T]: keyof K['glyphMap'];
};


const TAB_ICON: TabNavigatorMap<
	AppNavigatorParamListTabs,
	typeof MaterialCommunityIcons
> = {
	Home: 'map-marker-radius',
	Achievements: 'trophy',
	Leaderboard: 'equalizer',
	HomeScreen: 'home'
};


const Tabs = () => (
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
			<AppTab.Screen name="HomeScreen" component={HomeScreen} />
			<AppTab.Screen name="Leaderboard" component={HomeScreen} />
			<AppTab.Screen name="Home" component={LocationsStack} />
			<AppTab.Screen name="Achievements" component={AchievementsPage} />
		</AppTab.Navigator>
	 );

const NavButtons = () =>{
	const navigation : any = useNavigation();

	
	return(
<View style={{
				position: 'absolute',
				right: 0,
				zIndex: 999,
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'flex-end',
			}}>
			<IconButton
				onPress={() =>
					navigation.navigate('Help')}
				style={{
					paddingRight: 10,
				}}
				icon={
					<ButtonIcon
						as={MaterialCommunityIcons}
						name="map-marker-question-outline"
						size={23}
					/>
				}
			/>
			<IconButton
					onPress={() => console.log("Pressed")}
					icon={
						<ButtonIcon
							as={MaterialCommunityIcons}
							name="cog"
							size={23}
						/>
					}
				/>
				</View>
	
)}
export const AppNavigator = () => {
	return (
		<Stack.Navigator 
		screenOptions={{
			headerShown : false
		  }}>
			<Stack.Screen component= {Tabs} name="ExploreCampus" />
			<Stack.Screen component = {HelpPage} name = "Help" options={({ navigation, route }: any) => ({
          headerRight: NavButtons
        })}/>
			<Stack.Screen component = {HelpPage} name = "Settings" options={({ navigation, route }: any) => ({
          headerRight: NavButtons
        })}/>
      </Stack.Navigator>
	);
};
