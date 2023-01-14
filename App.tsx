import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';
import { QueryClient, onlineManager, QueryClientProvider } from 'react-query';
import RootRouter from './src/routes/RootRouter';
import NetInfo from '@react-native-community/netinfo';

const queryClient = new QueryClient();

onlineManager.setEventListener((setOnline) => {
	return NetInfo.addEventListener((state) => {
		setOnline(!!state.isConnected);
	});
});

onlineManager.isOnline();

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<PaperProvider theme={MD3LightTheme}>
				<StatusBar style="auto" />
				<RootRouter />
			</PaperProvider>
		</QueryClientProvider>
	);
}
