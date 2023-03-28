import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { QueryClient, onlineManager, QueryClientProvider } from 'react-query';
import RootRouter from './src/routes/RootRouter';
import NetInfo from '@react-native-community/netinfo';
import { paperTheme } from '@/lib/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '@/context/AuthProvider';
import '@/lib/interceptors';

const queryClient = new QueryClient();

onlineManager.setEventListener((setOnline) => {
	return NetInfo.addEventListener((state) => {
		setOnline(!!state.isConnected);
	});
});

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<PaperProvider theme={paperTheme}>
				<AuthProvider>
					<SafeAreaProvider>
						<StatusBar
							translucent
							networkActivityIndicatorVisible
							animated
							style="dark"
						/>
						<RootRouter />
					</SafeAreaProvider>
				</AuthProvider>
			</PaperProvider>
		</QueryClientProvider>
	);
}
