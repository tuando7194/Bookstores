import { isJSON } from '../../utils/helpers';
const ACTION = 'LOGIN';
const ACTION_REQUEST = `${ACTION}_REQUEST`;
const ACTION_SUCCESS = `${ACTION}_SUCCESS`;
const ACTION_ERROR = `${ACTION}_ERROR`;
const ACTION_LOGOUT = 'LOGOUT';

const userLocalStorage = localStorage.getItem('USER')
const user = isJSON(userLocalStorage) ? JSON.parse(userLocalStorage) : false;

const login = (payload) => ({
	type: ACTION_REQUEST,
	payload
});

const actionSuccess = (payload) => ({
	type: ACTION_SUCCESS,
	payload
});

const actionError = (error) => ({
	type: ACTION_ERROR,
	error
});

const logout = () => ({
	type: ACTION_LOGOUT
});


export const initialState = {
	data: user,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ACTION_REQUEST:
			return {
				...state,
				data: false,
			};
		case ACTION_SUCCESS:
			localStorage.setItem('USER', JSON.stringify(action.payload));
			return {
				...state,
				data: action.payload,
			};

		case ACTION_LOGOUT:
			localStorage.setItem('USER', '');
			return {
				...state,
				data: false
			};
		default:
			return state;
	}
};

export { ACTION_REQUEST, login, logout, actionSuccess, actionError };
