import { ThemeColors } from '@/lib/theme';
import PlaceUnlockedPopup from '@/shared-components/place-unlocked/PlaceUnlockedPopup';
import React from 'react';
import { View } from 'react-native';
import MapView, { Overlay } from 'react-native-maps';
import { IconButton } from 'react-native-paper';

interface HomePageProps {}

export const HomePage: React.FC<HomePageProps> = ({}) => {
	return (
		<View
			style={{
				flex: 1,
			}}
		>
			<View
				style={{
					position: 'absolute',
					top: 25,
					right: 0,
					padding: 10,
					zIndex: 999,
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'flex-end',
				}}
			>
				<IconButton
					icon={'map-marker-question-outline'}
					iconColor={ThemeColors.primary}
					mode="outlined"
					size={25}
					onPress={() => console.log('Pressed')}
				/>
				<IconButton
					icon={'cog'}
					iconColor={ThemeColors.primary}
					size={25}
					mode="outlined"
					onPress={() => console.log('Pressed')}
				/>
			</View>

			<MapView
				style={{
					width: '100%',
					height: '100%',
				}}
				showsUserLocation
				initialRegion={{
					latitude: 42.3176343,
					longitude: -83.2320299,
					latitudeDelta: 0.005,
					longitudeDelta: 0.005,
				}}
				provider="google"
			>
				<Overlay
					image={{
						uri: 'https://umdearborn.edu/sites/default/files/styles/open_graph/public/2022-08/campusMap_forWeb.jpg?itok=2qxbb487',
					}}
					bounds={[
						[42.32, -83.24],
						[42.31, -83.22],
					]}
				/>
			</MapView>

			<PlaceUnlockedPopup
				pointOfInterest={{ id: '123', name: 'Library Front Desk' }}
			/>
		</View>
	);
};
