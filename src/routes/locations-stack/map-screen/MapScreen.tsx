import { type PointOfInterest, getLocations } from '@/api/points-of-interest';
import { useGetLocations } from '@/api/points-of-interest/getLocations';
import { useModal } from '@/hooks/useModal';
import { ThemeColors } from '@/lib/theme';
import { BottomTabScreenProps } from '@/routes/BottomTabNavigator';
import { ScreenProps } from '@/routes/types';
import { Icon } from '@/shared-components/icon';
import { IconButton } from '@/shared-components/icon-button';
import LoadingOverlay from '@/shared-components/loading-overlay/LoadingOverlay';
import PlaceUnlockedPopup from '@/shared-components/place-unlocked/PlaceUnlockedPopup';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { CompositeScreenProps } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Text } from 'react-native-paper';
import { LocationsStackParamList } from '../LocationsStack';
import { useCurrentLocation } from '@/hooks/useCurrentLocation';
import { unlockLocation } from '@/api/points-of-interest/unlockLocation';
import { StatusBar } from 'expo-status-bar';

interface MapScreenProps
	extends CompositeScreenProps<
		ScreenProps<LocationsStackParamList, 'Map'>,
		BottomTabScreenProps<'Locations'>
	> {}

const MapScreen: React.FC<MapScreenProps> = ({ navigation }) => {
	const { show: showLocationUnlocked, ...locationUnlockedModal } = useModal();

	const [location, setLocation] = React.useState<PointOfInterest>();

	const {
		data: locations,
		isFetching: loading,
		isLoading,
		refetch,
	} = useGetLocations();

	const currentLocation = useCurrentLocation(3000);

	React.useEffect(() => {
		if (!locations || !currentLocation || isLoading) return;

		locations.forEach(async (location) => {
			const distance =
				Math.pow(currentLocation.latitude - location.latitude, 2) +
				Math.pow(currentLocation.longitude - location.longitude, 2);

			if (distance < 0.0001 && !location.isUnlocked) {
				setLocation(location);
				showLocationUnlocked();

				await unlockLocation(location.id);

				await refetch();
			}
		});
	}, [currentLocation, locations]);

	return (
		<View
			style={{
				flex: 1,
			}}
		>
			<StatusBar style="dark" />
			<LoadingOverlay visible={loading} />

			<View
				style={{
					position: 'absolute',
					top: 40,
					right: 0,
					padding: 10,
					zIndex: 999,
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'flex-end',
				}}
			>
				<IconButton
					onPress={() => navigation.navigate('Help')}
					icon={
						<Icon
							as={MaterialCommunityIcons}
							name="map-marker-question-outline"
							size={25}
						/>
					}
				/>

				<IconButton
					style={{
						marginLeft: 10,
					}}
					onPress={() => console.log('Pressed')}
					icon={
						<Icon
							as={MaterialCommunityIcons}
							name="cog"
							size={25}
						/>
					}
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
				{locations?.map((location) => (
					<Marker
						key={location.id}
						coordinate={{
							latitude: location.latitude,
							longitude: location.longitude,
						}}
						title={location.name}
						pinColor={
							location.isUnlocked ? ThemeColors.primary : 'grey'
						}
					/>
				))}
			</MapView>

			{location && (
				<PlaceUnlockedPopup
					onViewPlace={() => {
						navigation.navigate('Location', {
							itemImage: location.image,
							itemName: location.name,
							itemInfo: location.page,
						});
					}}
					pointOfInterest={location}
					{...locationUnlockedModal}
				/>
			)}

			<IconButton
				style={{
					position: 'absolute',
					zIndex: 50,
					bottom: 20,
					alignSelf: 'center',
				}}
				contentStyle={{
					height: '100%',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'row',
					paddingHorizontal: 20,
				}}
				onPress={() => {
					navigation.navigate('List');
				}}
			>
				<Icon as={Feather} name="list" size={24} color="black" />
				<Text
					style={{
						fontSize: 16,
						fontWeight: 'bold',
						marginLeft: 10,
						textAlign: 'center',
					}}
				>
					List View
				</Text>
			</IconButton>
		</View>
	);
};

export default MapScreen;
