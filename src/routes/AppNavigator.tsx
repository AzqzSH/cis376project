import React from 'react';
import { HelpPage } from './help-screen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { Icon as ButtonIcon } from '@/shared-components/icon';
import { IconButton } from '@/shared-components/icon-button';
import { ScreenProps } from './types';
import { BottomTabNavigator } from './BottomTabNavigator';

export type MainStackNavigatorParamList = {
	ExploreCampus: undefined;
	Help: undefined;
	Settings: undefined;
};

const Stack = createNativeStackNavigator<MainStackNavigatorParamList>();

interface NavButtonsProps {
	navigation: ScreenProps<
		MainStackNavigatorParamList,
		'Settings'
	>['navigation'];
}

const NavButtons: React.FC<NavButtonsProps> = ({ navigation }) => {
	return (
		<View
			style={{
				position: 'absolute',
				right: 0,
				zIndex: 999,
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'flex-end',
			}}
		>
			<IconButton
				onPress={() => navigation.navigate('Help')}
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
				onPress={() => console.log('Pressed')}
				icon={
					<ButtonIcon
						as={MaterialCommunityIcons}
						name="cog"
						size={23}
					/>
				}
			/>
		</View>
	);
};

export const AppNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen component={BottomTabNavigator} name="ExploreCampus" />
			<Stack.Screen
				component={HelpPage}
				name="Help"
				options={({ navigation }) => ({
					headerRight: () => <NavButtons navigation={navigation} />,
					headerShown: true,
				})}
			/>
			<Stack.Screen
				component={HelpPage}
				name="Settings"
				options={({ navigation }) => ({
					headerRight: () => <NavButtons navigation={navigation} />,
				})}
			/>
		</Stack.Navigator>
	);
};
