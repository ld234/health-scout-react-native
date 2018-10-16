import axios from 'axios';
import DeviceStorage from '../services/DeviceStorage';
import { AsyncStorage } from 'react-native';

export const ADD_MEDICATION_PENDING = 'ADD_MEDICATION_PENDING';
export const ADD_MEDICATION_SUCCESS = 'ADD_MEDICATION_SUCCESS';
export const ADD_MEDICATION_ERROR = 'ADD_MEDICATION_ERROR';
export const GET_MEDICATIONS_PENDING = 'GET_MEDICATIONS_PENDING';
export const GET_MEDICATIONS_SUCCESS = 'GET_MEDICATIONS_SUCCESS';
export const GET_MEDICATIONS_ERROR = 'GET_MEDICATIONS_ERROR';
export const DELETE_MEDICATION_PENDING = 'DELETE_MEDICATION_PENDING';
export const DELETE_MEDICATION_SUCCESS = 'DELETE_MEDICATION_SUCCESS';
export const DELETE_MEDICATION_ERROR = 'DELETE_MEDICATION_ERROR';

const ROOT_URL = 'http://10.0.2.2:8888/patient/medicalDetails/medication';

function setAddMedicationPending(isAddMedicationPending) {
	return {
		type: ADD_MEDICATION_PENDING,
		isAddMedicationPending: isAddMedicationPending,
	};
}

function setAddMedicationSuccess(isAddMedicationSuccess, med) {
	return {
		type: ADD_MEDICATION_SUCCESS,
		isAddMedicationSuccess: isAddMedicationSuccess,
		medication: med,
	};
}

function setAddMedicationError(addMedicationError) {
	return {
		type: ADD_MEDICATION_ERROR,
		addMedicationError: addMedicationError,
	};
}

export function addMedication(med,cb) {
	return dispatch => {
		dispatch(setAddMedicationPending(true));
		dispatch(setAddMedicationSuccess(false));
		dispatch(setAddMedicationError(null));
		AsyncStorage.getItem('id_token').then(res => {
			axios
				.post(`${ROOT_URL}`, med, {
					headers: {
						'x-access-token': res,
					},
				})
				.then(res => {
					dispatch(setAddMedicationPending(false));
                    dispatch(setAddMedicationSuccess(true, res.data));
                    cb();
				})
				.catch(err => {
					dispatch(setAddMedicationPending(false));
                    dispatch(setAddMedicationSuccess(false, null));
					if(err.response && err.response.data) dispatch(setAddMedicationError(err.response.data.message));
				});
		})
	};
}

function setGetMedicationsPending(isGetMedicationsPending) {
	return {
		type: GET_MEDICATIONS_PENDING,
		isGetMedicationsPending: isGetMedicationsPending,
	};
}

function setGetMedicationsSuccess(isGetMedicationsSuccess, medications) {
	return {
		type: GET_MEDICATIONS_SUCCESS,
		isGetMedicationsSuccess: isGetMedicationsSuccess,
		medications,
	};
}

function setGetMedicationsError(getMedicationsError) {
	return {
		type: GET_MEDICATIONS_ERROR,
		getMedicationsError: getMedicationsError,
	};
}

export function getMedications() {
	return dispatch => {
		dispatch(setGetMedicationsPending(true));
		dispatch(setGetMedicationsSuccess(false));
		dispatch(setGetMedicationsError(null));
		AsyncStorage.getItem('id_token').then(res => {
			axios
				.get(`${ROOT_URL}`, {
					headers: {
						'x-access-token': res,
					},
				})
				.then(res => {
                    setTimeout(() => dispatch(setGetMedicationsPending(false)), 1000);
					dispatch(setGetMedicationsSuccess(true, res.data.message));
				})
				.catch(err => {
					dispatch(setGetMedicationsPending(false));
					dispatch(setGetMedicationsSuccess(false, null));
					dispatch(setGetMedicationsError(err.response));
				});
		})
	};
}

function setDeleteMedicationPending(isDeleteMedicationPending) {
	return {
		type: DELETE_MEDICATION_PENDING,
		isDeleteMedicationPending: isDeleteMedicationPending,
	};
}

function setDeleteMedicationSuccess(isDeleteMedicationSuccess, justDeleteIdx) {
	return {
		type: DELETE_MEDICATION_SUCCESS,
		isDeleteMedicationSuccess: isDeleteMedicationSuccess,
        justDeleteIdx,
	};
}

function setDeleteMedicationError(deleteMedicationError) {
	return {
		type: DELETE_MEDICATION_ERROR,
		deleteMedicationError: deleteMedicationError,
	};
}

export function deleteMedication(med,cb, idx) {
	return dispatch => {
		dispatch(setDeleteMedicationPending(true));
		dispatch(setDeleteMedicationSuccess(false, null));
		dispatch(setDeleteMedicationError(null));
		AsyncStorage.getItem('id_token').then(res => {
			axios
				.delete(`${ROOT_URL}`, {
					headers: {
						'x-access-token': res,
                    },
                    params: med,
				})
				.then(res => {
					dispatch(setDeleteMedicationPending(false));
                    dispatch(setDeleteMedicationSuccess(true, idx));
                    cb();
				})
				.catch(err => {
					dispatch(setDeleteMedicationPending(false));
					dispatch(setDeleteMedicationSuccess(false, null));
					if (err.response && err.response.data) dispatch(setDeleteMedicationError(err.response.data.message));
				});
		})
	};
}