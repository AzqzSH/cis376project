import { PointOfInterest } from '@/api/points-of-interest';
import { useModal } from '@/hooks/useModal';
import { ThemeColors } from '@/lib/theme';
import { Icon } from '@/shared-components/icon';
import { IconButton } from '@/shared-components/icon-button';
import PlaceUnlockedPopup from '@/shared-components/place-unlocked/PlaceUnlockedPopup';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Overlay } from 'react-native-maps';
import { Surface } from 'react-native-paper';

const locations = [
	{
		id: '1',
		name: 'Library Front Desk',
		images: [
			'https://cdn.discordapp.com/attachments/1062450289468252306/1073368897178325214/PXL_20230209_221716344.jpg',
		],
		latitude: 42.3182,
		longitude: -83.2326,
	},
	{
		id: '2',
		name: 'ELB',
		images: [
			'https://cdn.discordapp.com/attachments/1062450289468252306/1073368869151985714/PXL_20230209_222156768.MP.jpg',
		],
		latitude: 42.3196,
		longitude: -83.234,
	},
	{
		id: '3',
		name: 'University Center',
		images: [
			'https://cdn.discordapp.com/attachments/1062450289468252306/1073368898134605844/PXL_20230209_221345249.jpg',
		],
		latitude: 42.3167,
		longitude: -83.2312,
	},
];

interface HomePageProps {}

export const HomePage: React.FC<HomePageProps> = ({}) => {
	const { show: showLocationUnlocked, ...locationUnlockedModal } = useModal();

	const [location, setLocation] = React.useState<PointOfInterest>();

	return (
		<View
			style={{
				flex: 1,
			}}
		>
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
				{/* <Overlay
					image={{
						uri: 'https://umdearborn.edu/sites/default/files/styles/open_graph/public/2022-08/campusMap_forWeb.jpg?itok=2qxbb487',
					}}
					bounds={[
						[42.32, -83.24],
						[42.31, -83.22],
					]}
					onPress={() => console.log('Pressed')}
					pointerEvents="auto"
					tappable
					onTouchEnd={() => console.log('Touched')}
				/> */}

				{locations.map((location) => (
					<Marker
						key={location.id}
						coordinate={{
							latitude: location.latitude,
							longitude: location.longitude,
						}}
						onPress={() => {
							setLocation(location);
							showLocationUnlocked();
						}}
						pinColor={ThemeColors.primary}
					/>
				))}
			</MapView>

			{location && (
				<PlaceUnlockedPopup
					pointOfInterest={location}
					{...locationUnlockedModal}
				/>
			)}
		</View>
	);
};
