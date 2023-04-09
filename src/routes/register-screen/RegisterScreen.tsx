import { signUp } from '@/api/auth';
import { ThemeColors, paperTheme } from '@/lib/theme';
import { KeyboardDismissView } from '@/shared-components/keyboard-dismiss-view';
import LoadingOverlay from '@/shared-components/loading-overlay/LoadingOverlay';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, KeyboardAvoidingView, Platform, View } from 'react-native';
import { Appbar, Button, Divider, Text, TextInput } from 'react-native-paper';
import { ScreenProps } from '../types';
import { AuthNavigatorParamList } from '../AuthNavigator';

interface RegisterScreenProps
	extends ScreenProps<AuthNavigatorParamList, 'Register'> {}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
	navigation,
}) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
		setError,
		clearErrors,
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	const [loading, setLoading] = useState(false);
	const [networkError, setNetworkError] = useState<any>(null);

	const onSubmit = handleSubmit(
		async ({ email, password, confirmPassword }) => {
			setLoading(true);
			clearErrors();

			if (password !== confirmPassword) {
				setError('password', {
					message: 'Passwords do not match',
				});
				setError('confirmPassword', {
					message: 'Passwords do not match',
				});

				setLoading(false);
				return;
			}

			try {
				await signUp(email.toLowerCase(), password);

				navigation.navigate('Login');
			} catch (error) {
				setNetworkError(error);
			} finally {
				setLoading(false);
			}
		}
	);

	return (
		<KeyboardAvoidingView
			style={{
				flex: 1,
			}}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<Appbar.Header
				style={{
					backgroundColor: 'white',
					borderBottomColor: paperTheme.colors.border,
					borderBottomWidth: 1,
				}}
			>
				<Appbar.BackAction onPress={() => navigation.goBack()} />
			</Appbar.Header>
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
					}}
				>
					{networkError && (
						<Text
							style={{
								color: paperTheme.colors.error,
								marginBottom: 16,
								fontSize: 16,
								textAlign: 'center',
							}}
						>
							{networkError.message}
						</Text>
					)}
					<Controller
						control={control}
						rules={{
							required: true,
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								error={!!errors.email}
								placeholder="Email"
								keyboardType="email-address"
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								right={<TextInput.Affix text="@umich.edu" />}
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
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								error={!!errors.password}
								secureTextEntry
								placeholder="Password"
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								style={{
									marginTop: 16,
								}}
							/>
						)}
						name="password"
					/>

					<Controller
						control={control}
						rules={{
							required: true,
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								error={!!errors.confirmPassword}
								secureTextEntry
								placeholder="Confirm Password"
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								style={{
									marginTop: 16,
								}}
							/>
						)}
						name="confirmPassword"
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
						Sign up
					</Button>
				</View>
			</KeyboardDismissView>
		</KeyboardAvoidingView>
	);
};
