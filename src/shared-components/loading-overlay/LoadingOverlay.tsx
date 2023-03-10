import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Modal, Portal } from 'react-native-paper';

interface LoadingOverlayProps {
	visible: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ visible }) => {
	if (!visible) return null;

	return (
		<Portal>
			<Modal visible={visible} dismissable={false}>
				<View>
					<ActivityIndicator />
				</View>
			</Modal>
		</Portal>
	);
};

export default LoadingOverlay;
