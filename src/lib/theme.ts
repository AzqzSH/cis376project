import { DefaultTheme } from '@react-navigation/native';
import { DefaultTheme as PaperTheme } from 'react-native-paper';

export const ThemeColors = {
	primary: '#012547',
	secondary: '#ffcb05',
} as const;

export const paperTheme = {
	...DefaultTheme,
	...PaperTheme,
	colors: {
		...DefaultTheme.colors,
		...PaperTheme.colors,
		primary: ThemeColors.secondary,
		secondary: ThemeColors.primary,
		disabled: '#c4c4c4',
	},
} as const;
