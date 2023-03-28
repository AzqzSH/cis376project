import { Icon } from '@/shared-components/icon';
import { IconButton } from '@/shared-components/icon-button';
import React from 'react';
import { View, Image, Alert, FlatList } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { StyleSheet,ScrollView,SafeAreaView } from 'react-native';
import { ThemeColors } from '@/lib/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CompositeScreenProps } from '@react-navigation/native';
import { ScreenProps } from '../types';
import { MainStackNavigatorParamList } from '../AppNavigator';
import { BottomTabParamList } from '../BottomTabNavigator';

import { useGetLocations } from '@/api/points-of-interest/getLocations';
import { PointOfInterest } from '@/api/points-of-interest';
import { HomeScreen } from '.';
import { FastImage } from '@/shared-components/fast-image';

interface HomeScreenProps
	extends CompositeScreenProps<
		ScreenProps<BottomTabParamList, 'HomeScreen'>,
		ScreenProps<MainStackNavigatorParamList, 'ExploreCampus'>
	> {}

const HomeScreenImages: React.FC<HomeScreenProps> = ({ navigation }) => {
	const{data: locations, isFetching:loading}=useGetLocations();
	return (
		<View style={format.main}>
			<View style={format.topbar}>
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
			<View style={format.line2}></View>
			
		 				<SafeAreaView style={format.s}>
				<FlatList style={format.fl} showsVerticalScrollIndicator={false}
				
					data={locations}
					
					renderItem={({item})=>(

					//<HomeLocations info={item} />
					<View style={format.box}>
					<View>
						<FastImage
							style={format.imageone}
                            uri={item.image}
							
						/>
					</View>
					<View style={format.thinline}></View>

					<Button
						// mode="contained"  !This fixes the button
						onPress={() => {navigation.navigate('UC')}}
						style={format.button}
					>
						<Text style={format.buttonText}>{item.name}</Text>
					</Button>
					</View>
				
				)}
					
					keyExtractor={(item)=>item.id}

					/>

                </SafeAreaView>
			
			
				
				
			</View>
	);
};

const format = StyleSheet.create({
	s:{
		flex:1,
		marginTop: -40,
		
		backgroundColor:'white',
		
		alignItems:'center'
		
	},
	fl:{
		flex:1,
		
		
		
	},
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
	
	
	line: {
		backgroundColor: ThemeColors.secondary,
		borderColor: ThemeColors.secondary,
		borderWidth: 10,
		// borderRadius:5,
		marginVertical: -40,
		
	},
	line2: {
		backgroundColor: 'white',
		borderColor: "white",
		borderWidth: 10,
		// borderRadius:5,
		marginVertical: 40,
		
	},
	thinline: {
		backgroundColor: 'white',
		width: 125,
		height: 0.2,
		// borderRadius:5,
		//marginVertical:-40
	},

	logo: {
		height: 180,
		width: 250,
		marginVertical: 10,
		marginHorizontal: 30,
		resizeMode: 'contain',
	},
	button: {
		//backgroundColor: ThemeColors.secondary, // need to take out the background color to make the button ripple effect work
		borderColor: ThemeColors.secondary,
		borderWidth: 0.2,
		borderRadius: 5,
		maxHeight: 40,
		bottom: -10,
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
	buttonText: {
		textAlign: 'center',
		fontSize: 11,
		fontWeight: 'bold',
		color: ThemeColors.secondary,
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
});

export default HomeScreenImages;
