import { useAuth } from '@/context/AuthProvider';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { AppNavigator } from './AppNavigator';
import { AuthNavigator } from './AuthNavigator';

interface RootRouterProps {}

const RootRouter: React.FC<RootRouterProps> = ({}) => {
	const { user } = useAuth();

	return (
		<NavigationContainer>
			{user ? <AppNavigator /> : <AuthNavigator />}
		</NavigationContainer>
	);
};

export default RootRouter;
