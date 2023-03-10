import { ParamListBase, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type ScreenProps<P extends ParamListBase, R extends keyof P> = {
	navigation: NativeStackNavigationProp<P, R>;
	route: RouteProp<P, R>;
};
