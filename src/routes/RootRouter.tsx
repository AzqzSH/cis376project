import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { AppNavigator } from './AppNavigator';
import { AuthNavigator } from './AuthNavigator';

interface RootRouterProps {}

const RootRouter: React.FC<RootRouterProps> = ({}) => {
	const isAuthenticated = true;

	return (
		<NavigationContainer>
			{isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
		</NavigationContainer>
	);
};

export default RootRouter;
