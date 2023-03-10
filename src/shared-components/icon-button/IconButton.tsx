import React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { Surface } from 'react-native-paper';

interface BaseIconButtonProps {
	onPress?: () => void;
	style?: StyleProp<ViewStyle>;
	contentStyle?: StyleProp<ViewStyle>;
}

interface IconButtonWithIconProps extends BaseIconButtonProps {
	icon: React.ReactNode;
	children?: never;
}

interface IconButtonWithChildrenProps extends BaseIconButtonProps {
	children: React.ReactNode;
	icon?: never;
}

type IconButtonProps = IconButtonWithIconProps | IconButtonWithChildrenProps;

const IconButton: React.FC<IconButtonProps> = ({
	contentStyle,
	onPress,
	style,
	children,
	icon,
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
				{icon || children}
			</Surface>
		</TouchableOpacity>
	);
};

export default IconButton;
