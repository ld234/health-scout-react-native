import axios from 'axios';
import DeviceStorage from '../services/DeviceStorage';
import { AsyncStorage } from 'react-native';

export const SEARCH_PRAC_PENDING = 'SEARCH_PRAC_REQUEST';
export const SEARCH_PRAC_SUCCESS = 'SEARCH_PRAC_SUCCESS';
export const SEARCH_PRAC_ERROR = 'SEARCH_PRAC_ERROR';

export const GET_PRAC_TYPE_SPECIALTY_PENDING = 'GET_PRAC_TYPE_SPECIALTY_PENDING';
export const GET_PRAC_TYPE_SPECIALTY_SUCCESS = 'GET_PRAC_TYPE_SPECIALTY_SUCCESS';
export const GET_PRAC_TYPE_SPECIALTY_ERROR = 'GET_PRAC_TYPE_SPECIALTY_ERROR';

const ROOT_URL_SPECIALTY = 'http://10.0.2.2:8888/specialty';

function setGetPracTypeSpecialtyPending(isGetSpecialtyPending) {
	return {
		type: GET_PRAC_TYPE_SPECIALTY_PENDING,
		isGetPracTypeSpecialtyPending: isGetSpecialtyPending,
	};
}

function setGetPracTypeSpecialtySuccess(isGetSpecialtySuccess, q) {
	return {
		type: GET_PRAC_TYPE_SPECIALTY_SUCCESS,
		isGetPracTypeSpecialtySuccess: isGetSpecialtySuccess,
		pracTypeSpecialties: q,
	};
}

function setGetPracTypeSpecialtyError(getSpecialtyError) {
	return {
		type: GET_PRAC_TYPE_SPECIALTY_ERROR,
		getPracTypeSpecialtyError: getSpecialtyError,
	};
}

export function getPracTypeSpecialties(pracType) {
	console.log('in getPractypeSpecialties', pracType);
	return dispatch => {
		dispatch(setGetPracTypeSpecialtyPending(true));
		dispatch(setGetPracTypeSpecialtySuccess(false));
		dispatch(setGetPracTypeSpecialtyError(null));
		AsyncStorage.getItem('id_token').then(res => {
			axios
				.get(`${ROOT_URL_SPECIALTY}/${pracType}`, {
					headers: {
						'x-access-token': res,
					},
				})
				.then(res => {
					console.log('pracType res ', res.data);
					dispatch(setGetPracTypeSpecialtyPending(false));
					dispatch(setGetPracTypeSpecialtySuccess(true, res.data));
				})
				.catch(err => {
					dispatch(setGetPracTypeSpecialtyPending(false));
					dispatch(setGetPracTypeSpecialtySuccess(false, null));
					dispatch(setGetPracTypeSpecialtyError(err.response));
				});
		})
	};
}


export const VERIFY_EMAIL_SUCCESS = 'VERIFY_EMAIL_SUCCESS';
export const VERIFY_EMAIL_REQUEST = 'VERIFY_EMAIL_REQUEST';
export const VERIFY_EMAIL_ERROR = 'VERIFY_EMAIL_ERROR';
export const LOGOUT = 'LOGOUT';

const ROOT_URL = 'http://10.0.2.2:8888/prac/search';

function setSearchPracPending(isSearchPracPending) {
	return {
		type: SEARCH_PRAC_REQUEST,
		isSearchPracPending: isSearchPracPending,
	};
}

function setSearchPracSuccess(isSearchPracSuccess, user) {
	return {
		type: SEARCH_PRAC_SUCCESS,
		isSearchPracSuccess: isSearchPracSuccess,
		user: user,
	};
}

function setSearchPracError(searchPracError) {
	return {
		type: SEARCH_PRAC_ERROR,
		searchPracError: searchPracError,
	};
}

export function searchPrac(username, password, cb) {
	return dispatch => {
		dispatch(setSearchPracPending(true));
		dispatch(setSearchPracSuccess(false));
		dispatch(setSearchPracError(null));

		axios
			.post(`${ROOT_URL}/searchPrac`, {
				username,
				password,
			})
			.then(async res => {
				dispatch(setSearchPracPending(false));
				dispatch(setSearchPracSuccess(true, res.data.pracSearchResults));
				cb();
			})
			.catch(err => {
				console.log('err', JSON.stringify(err, 0, 4));
				dispatch(setSearchPracPending(false));
				dispatch(setSearchPracSuccess(false, null));
				if (err) dispatch(setSearchPracError(err));
			});
	};
}