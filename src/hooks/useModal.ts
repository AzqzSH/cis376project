import { useState } from 'react';

export type IModalProps = {
	visible: boolean;
	onDismiss: () => void;
};

export const useModal = () => {
	const [visible, setVisible] = useState(false);

	const show = () => setVisible(true);
	const onDismiss = () => setVisible(false);

	return { visible, show, onDismiss } as const;
};
