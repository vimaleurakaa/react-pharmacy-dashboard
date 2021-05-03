import * as _ from '../action/action-types';

const initialState = {
	authError: null,
};

export const success = 'SUCCESS';

const authReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case _.SIGNIN_SUCCESS:
			return {
				...state,
				authError: success,
			};

		case _.SIGNIN_ERROR:
			return {
				...state,
				authError: null,
			};

		case _.SINGOUT_SUCCESS:
			return {
				...state,
				authError: null,
			};

		default:
			return state;
	}
};

export default authReducer;
