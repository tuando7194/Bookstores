import { takeEvery, call, put } from 'redux-saga/effects';

import { BASE_URL } from '../../config/config';
import { ACTION_REQUEST, actionSuccess, actionError } from '../../reducers/books/updateBookReducers';
import request from '../../utils/request';
import { getToken } from "../../utils/helpers";

export default function* defaultSaga() {
	yield takeEvery(ACTION_REQUEST, load);
}

function* load(action) {
	const { bookId, title, description, price, image, preImage = '' } = action.payload;

	const URL = `${BASE_URL}/books/${bookId}`;

	let dataUploads = new FormData();
	if(image) dataUploads.append('image', image);

	const UPLOAD_URL = `${BASE_URL}/uploads/${preImage.substr(preImage.lastIndexOf('/') + 1) || 'none'}`;
	const optionUploads = {
		method: 'PUT',
		headers: {
			'Authorization': `Bearer ${getToken()}`
		},
		body: dataUploads
	};

	try {
		const image = yield call(request, UPLOAD_URL, optionUploads);
		if(!image.url)
			yield put(actionError(new Error('Cannot upload image')));
		const options = {
			method: 'PUT',
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
