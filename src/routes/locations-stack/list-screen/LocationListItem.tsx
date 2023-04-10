import { type PointOfInterest } from '@/api/points-of-interest';
import { ThemeColors } from '@/lib/theme';
import { FastImage } from '@/shared-components/fast-image';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';

interface LocationListItemProps {
	info: PointOfInterest;
	unlocked?: boolean;
	onPress?: () => void;
}

export const LocationListItem: React.FC<LocationListItemProps> = ({
	info,
	unlocked,
	onPress,
}) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={[
				styles.listItem,
				{
					...(unlocked ? {} : styles.listItemLocked),
				},
			]}
		>
			<FastImage uri={info.image} style={styles.listItemImage} />

			<View style={styles.listItemContent}>
				<Text style={styles.listItemTitle}>{info.name}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	listItem: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		padding: 20,
		height: 100,
	},
	listItemLocked: {
		opacity: 0.5,
	},
	listItemImage: {
		width: 100,
		height: '100%',
		borderRadius: 10,
		borderWidth: 2,
		borderColor: ThemeColors.secondary,
	},

	listItemContent: {
		display: 'flex',
		flexDirection: 'column',
		marginLeft: 20,
	},
	listItemTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		color: ThemeColors.primary,
	},
});
