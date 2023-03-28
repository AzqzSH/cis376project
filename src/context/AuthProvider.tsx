import { User } from '@/api/auth';
import { useMeQuery } from '@/api/auth/me';
import { useState, useContext } from 'react';
import { createContext } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

type AuthContextType = {
	user?: User;
	refreshUser?: () => void;
};

const AuthContext = createContext<AuthContextType>({} as any);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const { data: user, isLoading, refetch } = useMeQuery();

	if (isLoading) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<ActivityIndicator />
			</View>
		);
	}

	return (
		<AuthContext.Provider value={{ user, refreshUser: refetch }}>
			{children}
		</AuthContext.Provider>
	);
};
