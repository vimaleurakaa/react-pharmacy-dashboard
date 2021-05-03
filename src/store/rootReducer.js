import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import AuthReducer from './reducers/authReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import SM_Reducer from './reducers/storeManagerReducer';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['auth', 'firestore'],
};

const rootReducer = combineReducers({
	auth: AuthReducer,
	storeManager: SM_Reducer,
	firestore: firestoreReducer,
	firebase: firebaseReducer,
});

export default persistReducer(persistConfig, rootReducer);
