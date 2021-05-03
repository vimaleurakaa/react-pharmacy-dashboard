import * as _ from '../action/action-types';

const initialState = {
	medEntry: null,
};

const storeManagerReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case _.ADD_NEW_MEDICINE_SUCCESS:
			return {
				...state,
				medEntry: payload,
			};

		case _.ADD_NEW_MEDICINE_ERROR:
			return {
				...state,
				medEntry: payload,
			};

		case _.UPDATE_MEDICINE_SUCCESS:
			return {
				...state,
				medEntry: payload,
			};

		case _.UPDATE_MEDICINE_ERROR:
			return {
				...state,
				medEntry: payload,
			};

		case _.DELETE_MEDICINE_SUCCESS:
			return {
				...state,
				medEntry: payload,
			};

		case _.ADD_NEW_TEAM_MEMBER_SUCCESS:
			return {
				...state,
				medEntry: payload,
			};

		case _.ADD_NEW_TEAM_MEMBER_ERROR:
			return {
				...state,
				medEntry: payload,
			};

		case _.UPDATE_TEAM_MEMBER_SUCCESS:
			return {
				...state,
				medEntry: payload,
			};

		case _.UPDATE_TEAM_MEMBER_ERROR:
			return {
				...state,
				medEntry: payload,
			};

		case _.DELETE_TEAM_MEMBER_SUCCESS:
			return {
				...state,
				medEntry: payload,
			};

		default:
			return state;
	}
};

export default storeManagerReducer;
