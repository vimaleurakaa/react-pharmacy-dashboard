import * as _ from './action-types';
import { v4 as uuid } from 'uuid';

export const signInAction = (credential) => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		firebase
			.auth()
			.signInWithEmailAndPassword(credential.username, credential.password)
			.then(() => {
				dispatch({ type: _.SIGNIN_SUCCESS });
				console.log('Success');
			})
			.catch((err) => {
				dispatch({ type: _.SIGNIN_ERROR });
				console.log(err);
			});
	};
};

export const singOutAction = () => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		firebase
			.auth()
			.signOut()
			.then(() => {
				dispatch({ type: _.SINGOUT_SUCCESS });
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const addNewMedicine = (data, modalVisible, loaderState) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();
		const id = uuid();
		firestore
			.collection('medicines')
			.doc(id)
			.set({
				key: id,
				medicine_Name: data.medicine_Name,
				discount: `${data.discount}%`,
				manufacturer: data.manufacturer,
				price: `Rs.${data.price}`,
				stock: data.stock,
				createdAt: new Date().toLocaleDateString(),
			})
			.then(() => {
				dispatch({
					type: _.ADD_NEW_MEDICINE_SUCCESS,
					payload: data.medicine_Name,
				});
				modalVisible(false);
				loaderState({ loading: false });
			})
			.catch((err) => {
				dispatch({ type: _.ADD_NEW_MEDICINE_ERROR, payload: null }, err);
				modalVisible(true);
				loaderState({ loading: false });
			});
	};
};

export const deleteMedicineData = (key, state, setState) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();

		firestore
			.collection('medicines')
			.doc(key)
			.delete()
			.then(() => {
				setState(!state);
				dispatch({ type: _.DELETE_MEDICINE_SUCCESS, payload: 'Sucess' });
			});
	};
};

export const updateMedicine = (data, modalVisible, loaderState, id) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();
		firestore
			.collection('medicines')
			.doc(id)
			.update({
				medicine_Name: data.medicine_Name,
				discount: `${data.discount}%`,
				manufacturer: data.manufacturer,
				price: `Rs.${data.price}`,
				stock: data.stock,
				createdAt: new Date().toLocaleDateString(),
			})
			.then(() => {
				dispatch({
					type: _.UPDATE_MEDICINE_SUCCESS,
					payload: data.medicine_Name,
				});
				modalVisible(false);
				loaderState({ loading: false });
			})
			.catch((err) => {
				dispatch({ type: _.UPDATE_MEDICINE_ERROR, payload: null }, err);
				modalVisible(true);
				loaderState({ loading: false });
			});
	};
};

export const addNewTeamMember = (data, modalVisible, loaderState) => {
	return (dispatch, getState, { getFirestore }) => {
		console.log(data);

		const firestore = getFirestore();
		const id = uuid();
		firestore
			.collection('teams')
			.doc(id)
			.set({
				key: id,
				first_Name: data.first_Name,
				last_Name: data.last_Name,
				experience: data.experience,
				gender: data.gender,
				date_of_birth: new Date(data.date_of_birth._d).toDateString(),
				createdAt: new Date().toLocaleDateString(),
			})
			.then(() => {
				dispatch({
					type: _.ADD_NEW_MEDICINE_SUCCESS,
					payload: data.medicine_Name,
				});
				modalVisible(false);
				loaderState({ loading: false });
			})
			.catch((err) => {
				dispatch({ type: _.ADD_NEW_MEDICINE_ERROR, payload: null }, err);
				modalVisible(true);
				loaderState({ loading: false });
			});
	};
};

export const updateTeamMember = (data, modalVisible, loaderState, id) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();
		firestore
			.collection('teams')
			.doc(id)
			.update({
				first_Name: data.first_Name,
				last_Name: data.last_Name,
				experience: data.experience,
				gender: data.gender,
				date_of_birth: new Date(data.date_of_birth._d).toDateString(),
				createdAt: new Date().toLocaleDateString(),
			})
			.then(() => {
				dispatch({
					type: _.UPDATE_TEAM_MEMBER_SUCCESS,
					payload: data.medicine_Name,
				});
				modalVisible(false);
				loaderState({ loading: false });
			})
			.catch((err) => {
				dispatch({ type: _.UPDATE_TEAM_MEMBER_ERROR, payload: null }, err);
				modalVisible(true);
				loaderState({ loading: false });
			});
	};
};

export const deleteTeamMember = (key, state, setState) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();

		firestore
			.collection('teams')
			.doc(key)
			.delete()
			.then(() => {
				setState(!state);
				dispatch({ type: _.DELETE_TEAM_MEMBER_SUCCESS, payload: 'Sucess' });
			});
	};
};
