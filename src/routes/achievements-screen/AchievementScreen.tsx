import React from 'react';
import {
	View,
	Image,
	TouchableOpacity,
	FlatList,
	RefreshControl,
} from 'react-native';
import { Text, Divider, Title } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/lib/theme';
import { BottomTabScreenProps } from '../BottomTabNavigator';
import { useGetAchievements } from '@/api/achievements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FastImage } from '@/shared-components/fast-image';
import { StatusBar } from 'expo-status-bar';

interface AchievementScreenProps extends BottomTabScreenProps<'Achievements'> {}

const AchievementScreen: React.FC<AchievementScreenProps> = ({}) => {
	const {
		data: achievements,
		isFetching,
		isLoading,
		refetch,
		error,
	} = useGetAchievements();

	return (
		<SafeAreaView style={format.container}>
			<StatusBar style="light" />

			<View style={format.topBar}>
				<Title style={format.text}>Achievements</Title>
			</View>

			<View
				style={{
					height: '100%',
					backgroundColor: 'white',
				}}
			>
				{isLoading ? (
					<Text>Loading...</Text>
				) : (
					<FlatList
						refreshControl={
							<RefreshControl
								refreshing={isFetching}
								onRefresh={refetch}
							/>
						}
						data={achievements}
						ListEmptyComponent={() => (
							<Text
								style={{
									fontSize: 24,
									fontWeight: 'bold',
									color: ThemeColors.secondary,
									textAlign: 'center',
								}}
							>
								No achievements
							</Text>
						)}
						renderItem={({ item }) => (
							<TouchableOpacity>
								<View
									style={[
										format.row,
										{
											...(!item.isUnlocked &&
												format.rowLocked),
										},
									]}
								>
									<FastImage
										style={format.logos}
										uri={item.icon}
									/>
								</View>
							</TouchableOpacity>
						)}
						keyExtractor={(item) => item.id}
						ItemSeparatorComponent={() => (
							<Divider style={format.line} />
						)}
					/>
				)}
			</View>
		</SafeAreaView>
	);
};
const format = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: ThemeColors.primary,
	},
	row: {
		height: 150,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	rowLocked: {
		opacity: 0.25,
	},

	topBar: {
		alignItems: 'center',
		paddingHorizontal: 20,
		backgroundColor: ThemeColors.primary,
		display: 'flex',
		flexDirection: 'row',
		paddingBottom: 20,
	},
	logos: {
		resizeMode: 'contain',
		height: 100,
		width: 200,
	},
	line: {
		height: 1,
	},
	text: {
		fontSize: 24,
		fontWeight: 'bold',
		color: ThemeColors.secondary,
	},
});

export default AchievementScreen;
