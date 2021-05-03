import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { getFirestore, createFirestoreInstance } from 'redux-firestore';
import { getFirebase } from 'react-redux-firebase';
import FirebaseConfig from './services/firebase';
import RootReducer from './rootReducer';
import { persistStore } from 'redux-persist';

export const store = createStore(
	RootReducer,
	compose(
		applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }))
	)
);

const rrfConfig = {
	userProfile: 'users',
	useFirestoreForProfile: true,
	attachAuthIsReady: true,
};

export const rrfProps = {
	firebase: FirebaseConfig,
	config: rrfConfig,
	dispatch: store.dispatch,
	createFirestoreInstance,
};

export const persistor = persistStore(store);
