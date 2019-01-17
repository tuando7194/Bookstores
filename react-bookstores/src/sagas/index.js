import { all } from 'redux-saga/effects';

import loginSage from './auth/loginSage';
import listBooksSaga from './books/listBooksSaga';
import delBookSaga from './books/delBookSaga';
import createBookSaga from './books/createBookSaga';
import getBookSaga from './books/getBookSaga';
import updateBookSaga from './books/updateBookSaga';

export default function* rootSaga () {
	yield all([
		loginSage(),
		listBooksSaga(),
		delBookSaga(),
		createBookSaga(),
		getBookSaga(),
		updateBookSaga(),
	])
}