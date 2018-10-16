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

const ROOT_URL = 'http://10.0.2.2:8888/search';

function setSearchPracPending(isSearchPracPending) {
	return {
		type: SEARCH_PRAC_PENDING,
		isSearchPracPending: isSearchPracPending,
	};
}

function setSearchPracSuccess(isSearchPracSuccess,result ) {
	return {
		type: SEARCH_PRAC_SUCCESS,
		isSearchPracSuccess: isSearchPracSuccess,
		pracSearchResult: result,
	};
}

function setSearchPracError(searchPracError) {
	return {
		type: SEARCH_PRAC_ERROR,
		searchPracError: searchPracError,
	};
}

export function searchPracByRadius(radius, latitude, longitude) {
	return dispatch => {
		dispatch(setSearchPracPending(true));
		dispatch(setSearchPracSuccess(false, []));
		dispatch(setSearchPracError(null));
		AsyncStorage.getItem('id_token').then(res => {
			axios
				.get(`${ROOT_URL}/radius`, {
					headers: {
						'x-access-token': res
					},
					params: {
						radius,
						latitude, 
						longitude,
					}
				})
				.then( res => {
					dispatch(setSearchPracPending(false));
					dispatch(setSearchPracSuccess(true, res.data));
				})
				.catch(err => {
					dispatch(setSearchPracPending(false));
					dispatch(setSearchPracSuccess(false, []));
					if (err) dispatch(setSearchPracError(err));
				});
		})
	};
}