import { Icon } from '@/shared-components/icon';
import { IconButton } from '@/shared-components/icon-button';
import React from 'react';
import { View, Image, Alert } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/lib/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const HomeScreenImages = () => {
	const navigation : any = useNavigation();

	return (
		<View style={format.main}>
			<View style={format.topbar}>
				<IconButton
				onPress={() =>
					navigation.navigate('Help')}
					icon={
						<Icon
							as={MaterialCommunityIcons}
							name="map-marker-question-outline"
							size={25}
						/>
					}
				/>
				<IconButton
					style={{ marginLeft: 10 }}
					icon={
						<Icon
							as={MaterialCommunityIcons}
							name="cog"
							size={25}
						/>
					}
				/>
			</View>

			<Image style={format.logo} source={require('@/assets/logo.png')} />

			<View style={format.line}></View>

			<View style={format.grid}>
				<View style={format.box}>
					<View>
						<Image
							style={format.imageone}
							source={{
								uri: 'https://cdn.discordapp.com/attachments/1062450289468252306/1073368868476698724/PXL_20230209_222158970.jpg',
							}}
						/>
					</View>
					<View style={format.thinline}></View>

					<Button
						// mode="contained"  !This fixes the button
						onPress={() => {}}
						style={format.button}
					>
						<Text style={format.buttonText}>Engineering Lab</Text>
					</Button>
				</View>
				<View style={format.box}>
					<View>
						<Image
							style={format.imageone}
							source={{
								uri: 'https://cdn.discordapp.com/attachments/1062450289468252306/1081286947101753404/PXL_20230303_184017517.jpg',
							}}
						/>
					</View>
					<View style={format.thinline}></View>

					<Button
						// mode="contained"  !This fixes the button
						onPress={() => {}}
						style={format.button}
					>
						<Text style={format.buttonText}>University Center</Text>
					</Button>
				</View>
				<View style={format.box}>
					<View>
						<Image
							style={format.imageone}
							source={{
								uri: 'https://cdn.discordapp.com/attachments/1062450289468252306/1073368870674513951/PXL_20230209_221722772.PORTRAIT.jpg',
							}}
						/>
					</View>
					<View style={format.thinline}></View>

					<Button
						// mode="contained"  !This fixes the button
						onPress={() => {}}
						style={format.button}
					>
						<Text style={format.buttonText}>Mardigian Library</Text>
					</Button>
				</View>
			</View>
		</View>
	);
};

const format = StyleSheet.create({
	main: {
		backgroundColor: 'cornflowerblue',
		flex: 1,
	},
	topbar: {
		top: 40,
		right: 0,
		flexDirection: 'row',
		position: 'absolute',
		padding: 10,
		zIndex: 999,
	},
	bar: {
		backgroundColor: 'gray',
		height: 180,
		width: 250,
		marginHorizontal: 30,
		marginVertical: 10,
	},
	grid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginVertical: 40,
		marginHorizontal: 0,
		backgroundColor: 'ivory',
		paddingTop: 45,
		paddingLeft: 35,
		paddingRight: 35,
		height: '100%',
		width: '100%',
		justifyContent: 'space-between',
	},
	buttonText: {
		textAlign: 'center',
		fontSize: 11,
		fontWeight: 'bold',
		color: ThemeColors.secondary,
	},
	button: {
		//backgroundColor: ThemeColors.secondary, // need to take out the background color to make the button ripple effect work
		borderColor: ThemeColors.secondary,
		borderWidth: .2,
		borderRadius: 5,
		maxHeight: 40,
		bottom: -10,
	},
	line: {
		backgroundColor: ThemeColors.secondary,
		borderColor: ThemeColors.secondary,
		borderWidth: 10,
		// borderRadius:5,
		marginVertical: -40,
	},
	thinline: {
		backgroundColor: 'white',
		width: 125,
		height: 0.2,
		// borderRadius:5,
		//marginVertical:-40
	},
	box: {
		width: 150,
		height: 180,
		borderColor: ThemeColors.primary,
		borderWidth: 5,
		alignItems: 'center',
		//marginVertical:200,
		//marginHorizontal:30,
		marginBottom: 35,
		backgroundColor: ThemeColors.primary,
		flexDirection: 'column',
		borderRadius: 10,
	},

	imageone: {
		height: 85,
		width: 100,
		marginVertical: 10,
		marginBottom: 20,
		//marginHorizontal:26,
		borderColor: ThemeColors.secondary,
		borderWidth: 1,
		borderRadius: 3,
		// resizeMode: 'contains',
	},
	logo: {
		height: 180,
		width: 250,
		marginVertical: 10,
		marginHorizontal: 30,
		resizeMode: 'contain',
	},
});

export default HomeScreenImages;
