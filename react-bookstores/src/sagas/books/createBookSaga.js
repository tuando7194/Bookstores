import { takeEvery, call, put } from 'redux-saga/effects';

import { BASE_URL } from '../../config/config';
import { ACTION_REQUEST, actionSuccess, actionError } from '../../reducers/books/createBookReducers';
import request from '../../utils/request';
import { getToken } from "../../utils/helpers";

export default function* defaultSaga() {
	yield takeEvery(ACTION_REQUEST, load);
}

function* load(action) {
	const { title, description, price, image } = action.payload;

	let dataUploads = new FormData();
	if(image) dataUploads.append('image', image);

	const UPLOAD_URL = `${BASE_URL}/uploads`;
	const optionUploads = {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${getToken()}`
		},
		body: dataUploads
	};

	try {
		const image = yield call(request, UPLOAD_URL, optionUploads);
		if(!image.url)
			yield put(actionError(new Error('Cannot upload image')));
		const URL = `${BASE_URL}/books`;
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${getToken()}`
			},
			body: JSON.stringify({ title, description, price, image: image.url })
		};
		const res = yield call(request, URL, options);
		yield put(actionSuccess(res));
	} catch (error) {
		yield put(actionError(error));
	}
}
