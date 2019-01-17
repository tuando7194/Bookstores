import { combineReducers } from 'redux'

import loginReducers from './auth/loginReducers'
import { loadingReducer } from 'reducers/app/loadingReducer'
import { errorReducer } from 'reducers/app/errReducer'
import delBookReducers from 'reducers/books/delBookReducers';
import createBookReducers from 'reducers/books/createBookReducers';
import getBookReducers from 'reducers/books/getBookReducers';
import updateBookReducers from 'reducers/books/updateBookReducers';
import listBooksReducers from 'reducers/books/listBooksReducers';

const reducers = combineReducers({
	loadingReducer,
	errorReducer,
	authUser: loginReducers,
	createBookReducers,
	getBookReducers,
	updateBookReducers,
	delBookReducers,
	listBooksReducers
});

export default reducers;