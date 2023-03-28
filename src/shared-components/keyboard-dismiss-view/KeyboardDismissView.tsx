import React from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface KeyboardDismissViewProps {
	children: React.ReactNode[] | React.ReactNode;
	safeAera?: boolean;
}

const KeyboardDismissView: React.FC<KeyboardDismissViewProps> = ({
	children,
	safeAera,
}) => {
	const _View = safeAera ? SafeAreaView : View;

	const [keyboardVisible, setKeyboardVisible] = React.useState(false);

	React.useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener(
			'keyboardDidShow',
			() => {
				setKeyboardVisible(true);
			}
		);

		const keyboardDidHideListener = Keyboard.addListener(
			'keyboardDidHide',
			() => {
				setKeyboardVisible(false);
			}
		);

		return () => {
			keyboardDidHideListener.remove();
			keyboardDidShowListener.remove();
		};
	}, []);

	return (
		<TouchableWithoutFeedback
			onPress={Keyboard.dismiss}
			accessible={false}
			style={{
				flex: 1,
				zIndex: 9999999999,
			}}
			disabled={!keyboardVisible}
		>
			<_View
				style={{
					flex: 1,
					backgroundColor: 'white',
				}}
			>
				{children}
			</_View>
		</TouchableWithoutFeedback>
	);
};

export default KeyboardDismissView;
