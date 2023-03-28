import { create } from 'zustand';

import { persist, combine, createJSONStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';
import { refreshToken } from '@/api/auth';

const Storage = {
	getItem: SecureStore.getItemAsync,
	setItem: SecureStore.setItemAsync,
	removeItem: SecureStore.deleteItemAsync,
};

const initialState = {
	accessToken: undefined as string | undefined,
	refreshToken: undefined as string | undefined,
};

export const useTokenStore = create(
	persist(
		combine(initialState, (set, get) => ({
			setAccessToken: (accessToken: string) => set({ accessToken }),
			setRefreshToken: (refreshToken: string) => set({ refreshToken }),
			clearTokens: () =>
				set({ accessToken: undefined, refreshToken: undefined }),
			refreshAccess: async () => {
				const currentRefreshToken = get().refreshToken;

				if (!currentRefreshToken) {
					return;
				}

				const newTokens = await refreshToken(currentRefreshToken);

				set({
					...newTokens,
				});
			},
		})),
		{
			name: 'auth',
			storage: createJSONStorage(() => Storage),
		}
	)
);
