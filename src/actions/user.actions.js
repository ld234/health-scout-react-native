/* * * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Description: Actions for add, get and delete medication history
 * Created: 24 September 2018
 * Last modified:  28 September 2018
 * * * * * * * * * * * * * * * * * * * * * */

import axios from 'axios';
import { logout } from './auth.actions';
import { AsyncStorage } from 'react-native';
export const GET_USER_PENDING = 'GET_USER_PENDING';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';

const ROOT_URL = 'https://10.0.2.2:8888/user';

function setGetUserPending(isGetUserPending) {
	return {
		type: GET_USER_PENDING,
		isGetUserPending: isGetUserPending,
	};
}

function setGetUserSuccess(isGetUserSuccess, user) {
	return {
		type: GET_USER_SUCCESS,
		isGetUserSuccess: isGetUserSuccess,
		user: user,
	};
}

function setGetUserError(getUserError) {
	return {
		type: GET_USER_ERROR,
		getUserError: getUserError,
	};
}

export function getUserDetails(cb) {
	return dispatch => {
		dispatch(setGetUserPending(true));
		dispatch(setGetUserSuccess(false));
		dispatch(setGetUserError(null));
		AsyncStorage.getItem('id_token')
		.then(res => {
			axios
				.get(ROOT_URL, {
					headers: {
						'x-access-token': res,
					},
				})
				.then(res => {
					dispatch(setGetUserPending(false));
					dispatch(setGetUserSuccess(true, res.data));
					if (cb) cb();
				})
				.catch(err => {
					dispatch(setGetUserPending(false));
					dispatch(setGetUserSuccess(false, null));
					if (err.response && err.response.data.message) dispatch(setGetUserError(err.response.data.message));
					dispatch(logout());
				});
		})
	};
}
