import axios from 'axios';
import DeviceStorage from '../services/DeviceStorage';
import { AsyncStorage } from 'react-native';

export const ADD_ALLERGY_PENDING = 'ADD_ALLERGY_PENDING';
export const ADD_ALLERGY_SUCCESS = 'ADD_ALLERGY_SUCCESS';
export const ADD_ALLERGY_ERROR = 'ADD_ALLERGY_ERROR';
export const GET_ALLERGIES_PENDING = 'GET_ALLERGIES_PENDING';
export const GET_ALLERGIES_SUCCESS = 'GET_ALLERGIES_SUCCESS';
export const GET_ALLERGIES_ERROR = 'GET_ALLERGIES_ERROR';
export const DELETE_ALLERGY_PENDING = 'DELETE_ALLERGY_PENDING';
export const DELETE_ALLERGY_SUCCESS = 'DELETE_ALLERGY_SUCCESS';
export const DELETE_ALLERGY_ERROR = 'DELETE_ALLERGY_ERROR';

const ROOT_URL = 'http://10.0.2.2:8888/patient/medicalDetails/allergy';

function setAddAllergyPending(isAddAllergyPending) {
	return {
		type: ADD_ALLERGY_PENDING,
		isAddAllergyPending: isAddAllergyPending,
	};
}

function setAddAllergySuccess(isAddAllergySuccess, med) {
	return {
		type: ADD_ALLERGY_SUCCESS,
		isAddAllergySuccess: isAddAllergySuccess,
		allergy: med,
	};
}

function setAddAllergyError(addAllergyError) {
	return {
		type: ADD_ALLERGY_ERROR,
		addAllergyError: addAllergyError,
	};
}

export function addAllergy(allergy,cb) {
	return dispatch => {
		dispatch(setAddAllergyPending(true));
		dispatch(setAddAllergySuccess(false));
		dispatch(setAddAllergyError(null));
		AsyncStorage.getItem('id_token').then(res => {
			axios
				.post(`${ROOT_URL}`, allergy, {
					headers: {
						'x-access-token': res,
					},
				})
				.then(res => {
					dispatch(setAddAllergyPending(false));
                    dispatch(setAddAllergySuccess(true, res.data));
                    cb();
				})
				.catch(err => {
					dispatch(setAddAllergyPending(false));
                    dispatch(setAddAllergySuccess(false, null));
					if(err.response && err.response.data) dispatch(setAddAllergyError(err.response.data.message));
				});
		})
	};
}

function setGetAllergiesPending(isGetAllergiesPending) {
	return {
		type: GET_ALLERGIES_PENDING,
		isGetAllergiesPending: isGetAllergiesPending,
	};
}

function setGetAllergiesSuccess(isGetAllergiesSuccess, allergies) {
	return {
		type: GET_ALLERGIES_SUCCESS,
		isGetAllergiesSuccess: isGetAllergiesSuccess,
		allergies,
	};
}

function setGetAllergiesError(getAllergiesError) {
	return {
		type: GET_ALLERGIES_ERROR,
		getAllergiesError: getAllergiesError,
	};
}

export function getAllergies() {
	return dispatch => {
		dispatch(setGetAllergiesPending(true));
		dispatch(setGetAllergiesSuccess(false));
		dispatch(setGetAllergiesError(null));
		AsyncStorage.getItem('id_token').then(res => {
			axios
				.get(`${ROOT_URL}`, {
					headers: {
						'x-access-token': res,
					},
				})
				.then(res => {
                    setTimeout(() => dispatch(setGetAllergiesPending(false)), 1000);
					dispatch(setGetAllergiesSuccess(true, res.data.message));
				})
				.catch(err => {
					dispatch(setGetAllergiesPending(false));
					dispatch(setGetAllergiesSuccess(false, null));
					dispatch(setGetAllergiesError(err.response));
				});
		})
	};
}

function setDeleteAllergyPending(isDeleteAllergyPending) {
	return {
		type: DELETE_ALLERGY_PENDING,
		isDeleteAllergyPending: isDeleteAllergyPending,
	};
}

function setDeleteAllergySuccess(isDeleteAllergySuccess, justDeleteIdx) {
	return {
		type: DELETE_ALLERGY_SUCCESS,
		isDeleteAllergySuccess: isDeleteAllergySuccess,
        justDeleteIdx,
	};
}

function setDeleteAllergyError(deleteAllergyError) {
	return {
		type: DELETE_ALLERGY_ERROR,
		deleteAllergyError: deleteAllergyError,
	};
}

export function deleteAllergy(allergy, cb, idx) {
	return dispatch => {
		dispatch(setDeleteAllergyPending(true));
		dispatch(setDeleteAllergySuccess(false,null));
		dispatch(setDeleteAllergyError(null));
		AsyncStorage.getItem('id_token').then(res => {
			axios
				.delete(`${ROOT_URL}`,{
					headers: {
						'x-access-token': res,
                    },
                    params: allergy
				})
				.then(res => {
					dispatch(setDeleteAllergyPending(false));
					dispatch(setDeleteAllergySuccess(true, idx));
					cb()
				})
				.catch(err => {
					dispatch(setDeleteAllergyPending(false));
					dispatch(setDeleteAllergySuccess(false, null));
					if (err.response && err.response.data) dispatch(setDeleteAllergyError(err.response.data.message));
				});
		})
	};
}