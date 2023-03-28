import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { LoginScreen } from './login-screen/LoginScreen';

export type AuthNavigatorParamList = {
	Login: undefined;
	Register: undefined;
};

const AuthStack = createNativeStackNavigator<AuthNavigatorParamList>();

interface AuthNavigatorProps {}

export const AuthNavigator: React.FC<AuthNavigatorProps> = ({}) => {
	return (
		<AuthStack.Navigator
			initialRouteName="Login"
			screenOptions={{
				headerShown: false,
			}}
		>
			<AuthStack.Screen name="Login" component={LoginScreen} />
			{/* <AuthStack.Screen name="Register" component={() => <></>} /> */}
		</AuthStack.Navigator>
	);
};
