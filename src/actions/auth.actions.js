import axios from 'axios';
import DeviceStorage from '../services/DeviceStorage';
import { AsyncStorage } from 'react-native';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const VERIFY_EMAIL_SUCCESS = 'VERIFY_EMAIL_SUCCESS';
export const VERIFY_EMAIL_REQUEST = 'VERIFY_EMAIL_REQUEST';
export const VERIFY_EMAIL_ERROR = 'VERIFY_EMAIL_ERROR';
export const LOGOUT = 'LOGOUT';

const ROOT_URL = 'http://10.0.2.2:8888/auth';

function setLoginPending(isLoginPending) {
	return {
		type: LOGIN_REQUEST,
		isLoginPending: isLoginPending,
	};
}

function setLoginSuccess(isLoginSuccess, user) {
	return {
		type: LOGIN_SUCCESS,
		isLoginSuccess: isLoginSuccess,
		user: user,
	};
}

function setLoginError(loginError) {
	return {
		type: LOGIN_ERROR,
		loginError: loginError,
	};
}

export function login(username, password, cb) {
	return dispatch => {
		dispatch(setLoginPending(true));
		dispatch(setLoginSuccess(false));
		dispatch(setLoginError(null));

		axios
			.post(`${ROOT_URL}/login`, {
				username,
				password,
			})
			.then(async res => {
				await AsyncStorage.setItem('id_token', res.data.token);
				// deviceStorage.saveItem("id_token", res.data.token);
				dispatch(setLoginPending(false));
				dispatch(setLoginSuccess(true, res.data.user));
				cb();
			})
			.catch(err => {
				dispatch(setLoginPending(false));
				dispatch(setLoginSuccess(false, null));
				if (err) dispatch(setLoginError(err));
			});
	};
}

export function logout() {
	return async dispatch => {
		await AsyncStorage.removeItem('id_token');
		dispatch(setLoginPending(false));
		dispatch(setLoginSuccess(false, null));
		dispatch(setLoginError(null));
	};
}

export function checkAuth(cb) {
	return dispatch => {
		dispatch(setLoginPending(true));
		dispatch(setLoginSuccess(false, null));
		AsyncStorage.getItem('id_token').then(res => {
			axios
			.post(
				`${ROOT_URL}/checkAuth`,
				{},
				{
					headers: {
						'x-access-token': res,
					},
				}
			)
			.then(() => {
				dispatch(setLoginPending(false));
				dispatch(setLoginSuccess(true));
				setTimeout(() => cb('Main'),2000);
			})
			.catch(() => {
				dispatch(setLoginPending(false));
				dispatch(setLoginSuccess(false, null));
				dispatch(setLoginError(null));
				setTimeout(() => cb('Login'),2000);
			});
		});
		
	};
}

function setVerifyEmailPending(isVerifyEmailPending) {
	return {
		type: VERIFY_EMAIL_REQUEST,
		isVerifyEmailPending: isVerifyEmailPending,
	};
}

function setVerifyEmailSuccess(isVerifyEmailSuccess) {
	return {
		type: VERIFY_EMAIL_SUCCESS,
		isVerifyEmailSuccess: isVerifyEmailSuccess,
	};
}

function setVerifyEmailError(verifyEmailError) {
	return {
		type: VERIFY_EMAIL_ERROR,
		verifyEmailError: verifyEmailError,
	};
}

export function verifyEmail(token) {
	return dispatch => {
		dispatch(setVerifyEmailPending(true));
		dispatch(setVerifyEmailSuccess(false));
		dispatch(setVerifyEmailError(null));

		axios
			.put(
				`${ROOT_URL}/verifyEmail`,
				{},
				{
					params: {
						token,
					},
				}
			)
			.then(res => {
				dispatch(setVerifyEmailPending(false));
				dispatch(setVerifyEmailSuccess(true, res.data.user));
			})
			.catch(err => {
				dispatch(setVerifyEmailPending(false));
				dispatch(setVerifyEmailSuccess(false, null));
				if (err.response.data) dispatch(setVerifyEmailError(err.response.data.message));
			});
	};
}
