import { signIn } from '@/api/auth';
import { useAuth } from '@/context/AuthProvider';
import { useTokenStore } from '@/lib/stores/tokenStore';
import { paperTheme, ThemeColors } from '@/lib/theme';
import { KeyboardDismissView } from '@/shared-components/keyboard-dismiss-view';
import LoadingOverlay from '@/shared-components/loading-overlay/LoadingOverlay';
import { CompositeScreenProps } from '@react-navigation/native';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Image, KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button, Divider, Text, TextInput } from 'react-native-paper';
import { MainStackNavigatorParamList } from '../AppNavigator';
import { AuthNavigatorParamList } from '../AuthNavigator';
import { ScreenProps } from '../types';

interface LoginScreenProps
	extends ScreenProps<AuthNavigatorParamList, 'Login'> {}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const { refreshUser } = useAuth();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<any>(null);

	const [showPassword, setShowPassword] = useState(false);

	const { setAccessToken, setRefreshToken } = useTokenStore((state) => ({
		setAccessToken: state.setAccessToken,
		setRefreshToken: state.setRefreshToken,
	}));

	const onSubmit = handleSubmit(async ({ email, password }) => {
		setLoading(true);
		setError(null);

		try {
			const response = await signIn(email.toLowerCase(), password);

			setAccessToken(response.accessToken);
			setRefreshToken(response.refreshToken);

			await refreshUser?.();
		} catch (error) {
			console.log(error);

			setError(error);
		} finally {
			setLoading(false);
		}
	});

	return (
		<KeyboardAvoidingView
			style={{
				flex: 1,
			}}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<KeyboardDismissView safeAera>
				<LoadingOverlay visible={loading} />

				<View
					style={{
						flex: 1,
						paddingHorizontal: 16,

						backgroundColor: 'white',
						width: '100%',
						height: '100%',
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
					<View>
						<Image
							source={require('@/assets/logo.png')}
							style={{
								width: 200,
								height: 75,
								resizeMode: 'contain',
								alignSelf: 'center',
							}}
						/>

						<Divider
							style={{
								width: '100%',
								marginBottom: 16,
							}}
						/>

						{error && (
							<Text
								style={{
									color: paperTheme.colors.error,
									marginBottom: 16,
									fontSize: 16,
									textAlign: 'center',
								}}
							>
								Invalid email or password
							</Text>
						)}

						<Controller
							control={control}
							rules={{
								required: true,
							}}
							render={({
								field: { onChange, onBlur, value },
							}) => (
								<TextInput
									error={error}
									placeholder="Email"
									keyboardType="email-address"
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
									secureTextEntry={false}
								/>
							)}
							name="email"
						/>
						<Controller
							control={control}
							rules={{
								required: true,
							}}
							render={({
								field: { onChange, onBlur, value },
							}) => (
								<TextInput
									error={error}
									secureTextEntry={!showPassword}
									placeholder="Password"
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
									right={
										<TextInput.Icon
											icon={
												showPassword ? 'eye-off' : 'eye'
											}
											onPress={() =>
												setShowPassword(!showPassword)
											}
										/>
									}
									style={{
										marginTop: 16,
									}}
								/>
							)}
							name="password"
						/>

						<Button
							mode="contained"
							style={{
								marginTop: 16,
								borderRadius: 6,
							}}
							theme={{
								colors: {
									primary: ThemeColors.primary,
								},
							}}
							onPress={onSubmit}
						>
							Login
						</Button>

						<Button
							theme={{
								colors: {
									primary: ThemeColors.primary,
								},
							}}
							style={{
								marginTop: 16,
								borderRadius: 6,
							}}
							onPress={() => {}}
						>
							Forgot password?
						</Button>
					</View>

					<View>
						<Text
							style={{
								color: 'grey',
								textAlign: 'center',
							}}
						>
							Don't have an account yet?{' '}
						</Text>

						<Button
							mode="outlined"
							style={{
								width: '100%',
								marginTop: 16,
								borderRadius: 6,
							}}
							theme={{
								colors: {
									primary: ThemeColors.primary,
								},
							}}
							onPress={() => {}}
						>
							Sign up
						</Button>
					</View>
				</View>
			</KeyboardDismissView>
		</KeyboardAvoidingView>
	);
};
