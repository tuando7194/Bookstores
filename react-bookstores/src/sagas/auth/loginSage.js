import { takeEvery, call, put } from 'redux-saga/effects';

import { BASE_URL } from '../../config/config';
import { ACTION_REQUEST, actionSuccess, actionError } from '../../reducers/auth/loginReducers';
import request from '../../utils/request';

export default function* defaultSaga() {
	yield takeEvery(ACTION_REQUEST, load);
}

function* load(action) {
	const { username, password } = action.payload;

	const URL = `${BASE_URL}/auth/login`;

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ username, password })
	};

	try {
		const res = yield call(request, URL, options);
		yield put(actionSuccess(res));
	} catch (error) {

		yield put(actionError(error));
	}
}
