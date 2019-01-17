import { takeEvery, call, put } from 'redux-saga/effects';

import { BASE_URL } from '../../config/config';
import { ACTION_REQUEST, actionSuccess, actionError } from '../../reducers/books/listBooksReducers';
import request from '../../utils/request';
import { getToken } from "../../utils/helpers";

export default function* defaultSaga() {
	yield takeEvery(ACTION_REQUEST, load);
}

function* load() {
	const URL = `${BASE_URL}/books`;
	const options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${getToken()}`
		},
	};

	try {
		const res = yield call(request, URL, options);
		yield put(actionSuccess(res));
	} catch (error) {
		yield put(actionError(error));
	}
}
