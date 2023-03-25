import { ThemeColors } from '@/lib/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Icon } from '@expo/vector-icons/build/createIconSet';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { AchievementScreen } from './achievements-screen';
import { MainStackNavigatorParamList } from './AppNavigator';
import { HomeScreen } from './home_screen';
import { LocationsStack } from './locations-stack';
import { ScreenProps } from './types';

export type BottomTabParamList = {
	Map: undefined;
	Achievements: undefined;
	Leaderboard: undefined;
	HomeScreen: undefined;
};

export type BottomTabScreenProps<T extends keyof BottomTabParamList> =
	CompositeScreenProps<
		ScreenProps<BottomTabParamList, T>,
		ScreenProps<MainStackNavigatorParamList, 'ExploreCampus'>
	>;

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

type TabNavigatorMap<T extends {}, K extends Icon<any, any>> = {
	[x in keyof T]: keyof K['glyphMap'];
};

const TAB_ICON: TabNavigatorMap<
	BottomTabParamList,
	typeof MaterialCommunityIcons
> = {
	Map: 'map-marker-radius',
	Achievements: 'trophy',
	Leaderboard: 'equalizer',
	HomeScreen: 'home',
};

export const BottomTabNavigator = () => (
	<BottomTab.Navigator
		initialRouteName="HomeScreen"
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
		<BottomTab.Screen name="HomeScreen" component={HomeScreen} />
		<BottomTab.Screen name="Leaderboard" component={LocationsStack} />
		<BottomTab.Screen name="Map" component={LocationsStack} />
		<BottomTab.Screen name="Achievements" component={AchievementScreen} />
	</BottomTab.Navigator>
);
