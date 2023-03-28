import { Icon } from '@/shared-components/icon';
import { IconButton } from '@/shared-components/icon-button';
import React from 'react';
import { View, Image, Alert } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/lib/theme';
import { PointOfInterest } from '@/api/points-of-interest';
import { FastImage } from '@/shared-components/fast-image';
interface Loc{
    info:PointOfInterest;
    unlocked?:boolean;

}
export const HomeLocations: React.FC<Loc>=({
    info,
    unlocked,
})=>{
    return(
        <View style={format.box}>
					<View>
						<FastImage
							style={format.imageone}
                            uri={info.image}
							
						/>
					</View>
					<View style={format.thinline}></View>

					<Button
						// mode="contained"  !This fixes the button
						onPress={() => {}}
						style={format.button}
					>
						<Text style={format.buttonText}>{info.name}</Text>
					</Button>
				</View>

    );
};

const format = StyleSheet.create({
	main: {
		backgroundColor: 'cornflowerblue',
		flex: 1,
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
		borderWidth: 0.2,
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
	
});


