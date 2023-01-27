import { PointOfInterest } from '@/api/points-of-interest';
import { ThemeColors } from '@/lib/theme';
import React from 'react';
import { Image, View } from 'react-native';
import { Button, Divider, Modal, Portal, Text } from 'react-native-paper';

interface PlaceUnlockedPopupProps {
	pointOfInterest: PointOfInterest;
}

const PlaceUnlockedPopup: React.FC<PlaceUnlockedPopupProps> = ({
	pointOfInterest,
}) => {
	return (
		<Portal>
			<Modal
				dismissable={true}
				visible={true}
				contentContainerStyle={{
					backgroundColor: ThemeColors.primary,
					padding: 10,
					borderRadius: 10,
					width: 350,
					alignSelf: 'center',
				}}
			>
				<Text
					style={{
						textAlign: 'center',
						fontWeight: 'bold',
						fontSize: 20,
						color: ThemeColors.secondary,
					}}
				>
					Congratulations!
				</Text>

				<Divider
					style={{
						marginVertical: 10,
						borderColor: 'black',
					}}
				/>

				<View
					style={{
						width: '100%',
						height: 150,
					}}
				>
					<Image
						source={require('@/assets/dummy.png')}
						style={{
							width: '100%',
							height: '100%',
							borderRadius: 10,
						}}
					/>
				</View>

				<View
					style={{
						width: '100%',
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						marginTop: 20,
					}}
				>
					<Text
						style={{
							color: 'white',
							fontSize: 16,
						}}
					>
						You have unlocked
					</Text>

					<Text
						style={{
							fontWeight: 'bold',
							fontSize: 16,
							marginLeft: 5,
							color: ThemeColors.secondary,
							flexWrap: 'wrap',
							maxWidth: 200,
						}}
					>
						({pointOfInterest.name})
					</Text>
				</View>

				<Divider
					style={{
						marginVertical: 10,
					}}
				/>

				<Button
					mode="contained"
					style={{
						borderRadius: 10,
						backgroundColor: ThemeColors.secondary,
					}}
				>
					<Text
						style={{
							color: ThemeColors.primary,
							fontWeight: 'bold',
							fontSize: 16,
						}}
					>
						View Place
					</Text>
				</Button>
			</Modal>
		</Portal>
	);
};

export default PlaceUnlockedPopup;
