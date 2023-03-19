import { useSyncExternalStore } from 'react';

interface Store<StoreType> {
	get: () => StoreType;
	set: (newState: StoreType | ((oldState: StoreType) => StoreType)) => void;
	subscribe: (callback: (newState: StoreType) => void) => () => void;
}

type StoreGetter<StoreType> = (get: <T>(store: Store<T>) => T) => StoreType;

function baseStore<StoreType>({
	initialState,
	getter,
}: {
	initialState: StoreType;
	getter?: StoreGetter<StoreType>;
}): Store<StoreType> {
	let state = initialState;

	if (!initialState && getter) computeValue();

	let listeners = new Set<(newState: StoreType) => void>();

	function get<TargetStore>(store: Store<TargetStore>) {
		if (!getter) return store.get();

		let current = store.get();

		store.subscribe((newState) => {
			if (newState === current) return;

			current = newState;

			computeValue();

			listeners.forEach((update) => update(state));
		});

		return current;
	}

	function computeValue() {
		if (!getter) return;

		state = getter(get);
	}

	return {
		get: () => state,
		set: (newState) => {
			if (
				typeof newState === 'function' &&
				newState instanceof Function
			) {
				state = newState(state);
			} else {
				state = newState;
			}

			listeners.forEach((update) => update(state));
		},
		subscribe: (callback) => {
			listeners.add(callback);

			return () => {
				listeners.delete(callback);
			};
		},
	};
}

export function store<StoreType>(initialState: StoreType) {
	return baseStore({ initialState });
}

export function computedStore<StoreType>(
	getter: StoreGetter<StoreType>
): Store<StoreType> {
	return baseStore({ initialState: null as StoreType, getter });
}

export function useStore<StoreType>(store: Store<StoreType>) {
	return [
		useSyncExternalStore(store.subscribe, store.get),
		store.set,
	] as const;
}

export function useStoreValue<StoreType>(store: Store<StoreType>) {
	return useSyncExternalStore(store.subscribe, store.get);
}

export function useStoreSetter<StoreType>(store: Store<StoreType>) {
	return store.set;
}
