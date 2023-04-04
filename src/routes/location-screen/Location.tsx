import { ThemeColors } from "@/lib/theme";
import { FastImage } from "@/shared-components/fast-image";
import { SafeAreaView } from "react-native";
import { View, Button, Image, StyleSheet, Text } from "react-native";
import { MainStackNavigatorParamList } from "../AppNavigator";
import { ScreenProps } from "../types";

interface LocationScreenProps
	extends ScreenProps<MainStackNavigatorParamList, "Location"> {}

export const LocationScreen: React.FC<LocationScreenProps> = ({ route }) => {
	const { itemName, itemImage, itemInfo } = route.params;

	return (
		<SafeAreaView style={format.box}>
			<View style={format.topBar}>
				<Text style={format.text}>{itemName}</Text>
			</View>
			<View style={format.sbox}>
				<FastImage uri={itemImage} style={format.imageone} />

				<Text style={format.textbox}>{itemInfo}</Text>
			</View>
		</SafeAreaView>
	);
};

const format = StyleSheet.create({
	textbox: {
		backgroundColor: ThemeColors.primary,
		paddingRight: 20,
		paddingLeft: 20,
		paddingTop: 20,
		paddingBottom: 20,
		marginRight: 20,
		marginLeft: 20,
		color: "white",
		borderColor: ThemeColors.secondary,
		borderWidth: 5,
		borderRadius: 10,
	},
	sbox: {
		height: "100%",
		backgroundColor: "white",
		alignItems: "center",
	},
	box: {
		flex: 1,
		backgroundColor: ThemeColors.primary,
	},
	imageone: {
		height: 170,
		width: 210,
		marginVertical: 30,
		marginBottom: 20,
		//marginHorizontal:26,
		borderColor: ThemeColors.primary,
		borderWidth: 7,
		borderRadius: 10,
		//resizeMode: 'contain',
	},
	topBar: {
		alignItems: "center",
		paddingHorizontal: 20,
		backgroundColor: ThemeColors.primary,
		display: "flex",
		flexDirection: "row",
		paddingBottom: 20,
		paddingTop: 20,
	},
	aText: {
		textAlign: "center",
		fontSize: 11,
		fontWeight: "bold",
		color: ThemeColors.primary,
	},
	text: {
		fontSize: 24,
		fontWeight: "bold",
		color: ThemeColors.secondary,
	},
});
