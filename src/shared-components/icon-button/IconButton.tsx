import React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { Surface } from 'react-native-paper';

interface IconButtonProps {
	icon: React.ReactNode;
	onPress?: () => void;
	style?: StyleProp<ViewStyle>;
	contentStyle?: StyleProp<ViewStyle>;
}

const IconButton: React.FC<IconButtonProps> = ({
	icon,
	contentStyle,
	onPress,
	style,
}) => {
	return (
		<TouchableOpacity onPress={onPress} style={style} activeOpacity={0.5}>
			<Surface
				style={{
					padding: 8,
					borderRadius: 100,
					backgroundColor: 'white',

					...(contentStyle as any),
				}}
			>
				{icon}
			</Surface>
		</TouchableOpacity>
	);
};

export default IconButton;
