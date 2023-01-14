import React from 'react';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

interface HomePageProps {}

export const HomePage: React.FC<HomePageProps> = ({}) => {
	return (
		<SafeAreaView
			style={{
				padding: 10,
				width: '100%',
				height: '100%',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Text>Hello World</Text>
		</SafeAreaView>
	);
};
