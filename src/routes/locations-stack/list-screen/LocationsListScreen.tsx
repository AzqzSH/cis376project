import { useGetLocations } from '@/api/points-of-interest/getLocations';
import { ThemeColors } from '@/lib/theme';
import { BottomTabScreenProps } from '@/routes/BottomTabNavigator';
import { ScreenProps } from '@/routes/types';
import { Icon } from '@/shared-components/icon';
import { IconButton } from '@/shared-components/icon-button';
import LoadingOverlay from '@/shared-components/loading-overlay/LoadingOverlay';
import { Feather } from '@expo/vector-icons';
import { CompositeScreenProps } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Divider, Text, Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LocationsStackParamList } from '../LocationsStack';
import { LocationListItem } from './LocationListItem';

interface LocationsListScreenProps
	extends CompositeScreenProps<
		ScreenProps<LocationsStackParamList, 'List'>,
		BottomTabScreenProps<'Locations'>
	> {}

const LocationsListScreen: React.FC<LocationsListScreenProps> = ({
	navigation,
}) => {
	const { data: locations, isFetching: loading } = useGetLocations();

	return (
		<SafeAreaView style={styles.container}>
			<LoadingOverlay visible={loading} />

			<StatusBar style="light" />
			<View style={styles.header}>
				<Title style={styles.headerTitle}>
					Locations {locations && `(${locations?.length})`}
				</Title>
			</View>

			<View style={styles.content}>
				<FlatList
					data={locations}
					renderItem={({ item }) => <LocationListItem info={item} />}
					keyExtractor={(item) => item.id}
					ItemSeparatorComponent={() => (
						<Divider
							style={{
								marginHorizontal: 20,
								backgroundColor: ThemeColors.primary,
							}}
						/>
					)}
				/>
			</View>

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
					navigation.navigate('Map');
				}}
			>
				<Icon as={Feather} name="map-pin" size={24} color="black" />
				<Text
					style={{
						fontSize: 16,
						fontWeight: 'bold',
						marginLeft: 10,
						textAlign: 'center',
					}}
				>
					Map View
				</Text>
			</IconButton>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: ThemeColors.primary,
	},
	header: {
		alignItems: 'center',
		paddingHorizontal: 20,
		backgroundColor: ThemeColors.primary,
		display: 'flex',
		flexDirection: 'row',
		paddingBottom: 20,
	},
	headerTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		color: ThemeColors.secondary,
	},
	content: {
		height: '100%',
		backgroundColor: 'white',
	},
});

export default LocationsListScreen;
