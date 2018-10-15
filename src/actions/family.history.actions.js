import axios from 'axios';
import DeviceStorage from '../services/DeviceStorage';
import { AsyncStorage } from 'react-native';

export const ADD_FAMILY_CONDITION_PENDING = 'ADD_FAMILY_CONDITION_PENDING';
export const ADD_FAMILY_CONDITION_SUCCESS = 'ADD_FAMILY_CONDITION_SUCCESS';
export const ADD_FAMILY_CONDITION_ERROR = 'ADD_FAMILY_CONDITION_ERROR';
export const GET_FAMILY_CONDITIONS_PENDING = 'GET_FAMILY_CONDITIONS_PENDING';
export const GET_FAMILY_CONDITIONS_SUCCESS = 'GET_FAMILY_CONDITIONS_SUCCESS';
export const GET_FAMILY_CONDITIONS_ERROR = 'GET_FAMILY_CONDITIONS_ERROR';
export const DELETE_FAMILY_CONDITION_PENDING = 'DELETE_FAMILY_CONDITION_PENDING';
export const DELETE_FAMILY_CONDITION_SUCCESS = 'DELETE_FAMILY_CONDITION_SUCCESS';
export const DELETE_FAMILY_CONDITION_ERROR = 'DELETE_FAMILY_CONDITION_ERROR';

const ROOT_URL = 'http://10.0.2.2:8888/patient/medicalDetails/familyHistory';

function setAddFamilyConditionPending(isAddFamilyConditionPending) {
	return {
		type: ADD_FAMILY_CONDITION_PENDING,
		isAddFamilyConditionPending: isAddFamilyConditionPending,
	};
}

function setAddFamilyConditionSuccess(isAddFamilyConditionSuccess, med) {
	return {
		type: ADD_FAMILY_CONDITION_SUCCESS,
		isAddFamilyConditionSuccess: isAddFamilyConditionSuccess,
		familyCondition: med,
	};
}

function setAddFamilyConditionError(addFamilyConditionError) {
	return {
		type: ADD_FAMILY_CONDITION_ERROR,
		addFamilyConditionError: addFamilyConditionError,
	};
}

export function addFamilyCondition(med,cb) {
	return dispatch => {
		dispatch(setAddFamilyConditionPending(true));
		dispatch(setAddFamilyConditionSuccess(false));
		dispatch(setAddFamilyConditionError(null));
		AsyncStorage.getItem('id_token').then(res => {
			axios
				.post(`${ROOT_URL}`, med, {
					headers: {
						'x-access-token': res,
					},
				})
				.then(res => {
					dispatch(setAddFamilyConditionPending(false));
                    dispatch(setAddFamilyConditionSuccess(true, res.data));
                    cb();
				})
				.catch(err => {
					dispatch(setAddFamilyConditionPending(false));
                    dispatch(setAddFamilyConditionSuccess(false, null));
					if(err.response && err.response.data) dispatch(setAddFamilyConditionError(err.response.data.message));
				});
		})
	};
}

function setGetFamilyConditionsPending(isGetFamilyConditionsPending) {
	return {
		type: GET_FAMILY_CONDITIONS_PENDING,
		isGetFamilyConditionsPending: isGetFamilyConditionsPending,
	};
}

function setGetFamilyConditionsSuccess(isGetFamilyConditionsSuccess, familyConditions) {
	return {
		type: GET_FAMILY_CONDITIONS_SUCCESS,
		isGetFamilyConditionsSuccess: isGetFamilyConditionsSuccess,
		familyConditions,
	};
}

function setGetFamilyConditionsError(getFamilyConditionsError) {
	return {
		type: GET_FAMILY_CONDITIONS_ERROR,
		getFamilyConditionsError: getFamilyConditionsError,
	};
}

export function getFamilyConditions() {
	return dispatch => {
		dispatch(setGetFamilyConditionsPending(true));
		dispatch(setGetFamilyConditionsSuccess(false));
		dispatch(setGetFamilyConditionsError(null));
		AsyncStorage.getItem('id_token').then(res => {
			axios
				.get(`${ROOT_URL}`, {
					headers: {
						'x-access-token': res,
					},
				})
				.then(res => {
                    setTimeout(() => dispatch(setGetFamilyConditionsPending(false)), 1000);
					dispatch(setGetFamilyConditionsSuccess(true, res.data.message));
				})
				.catch(err => {
					console.log(err);
					dispatch(setGetFamilyConditionsPending(false));
					dispatch(setGetFamilyConditionsSuccess(false, null));
					dispatch(setGetFamilyConditionsError(err.response));
				});
		})
	};
}

function setDeleteFamilyConditionPending(isDeleteFamilyConditionPending) {
	return {
		type: DELETE_FAMILY_CONDITION_PENDING,
		isDeleteFamilyConditionPending: isDeleteFamilyConditionPending,
	};
}

function setDeleteFamilyConditionSuccess(isDeleteFamilyConditionSuccess, justDeleteIdx) {
	return {
		type: DELETE_FAMILY_CONDITION_SUCCESS,
		isDeleteFamilyConditionSuccess: isDeleteFamilyConditionSuccess,
        justDeleteIdx,
	};
}

function setDeleteFamilyConditionError(deleteFamilyConditionError) {
	return {
		type: DELETE_FAMILY_CONDITION_ERROR,
		deleteFamilyConditionError: deleteFamilyConditionError,
	};
}

export function deleteFamilyCondition(famCond, cb, idx) {
	console.log(famCond);
	return dispatch => {
		dispatch(setDeleteFamilyConditionPending(true));
		dispatch(setDeleteFamilyConditionSuccess(false,null));
		dispatch(setDeleteFamilyConditionError(null));
		AsyncStorage.getItem('id_token').then(res => {
			axios
				.delete(`${ROOT_URL}`,{
					headers: {
						'x-access-token': res,
                    },
                    params: famCond
				})
				.then(res => {
					dispatch(setDeleteFamilyConditionPending(false));
					dispatch(setDeleteFamilyConditionSuccess(true, idx));
					cb()
				})
				.catch(err => {
					dispatch(setDeleteFamilyConditionPending(false));
					dispatch(setDeleteFamilyConditionSuccess(false, null));
					if (err.response && err.response.data) dispatch(setDeleteFamilyConditionError(err.response.data.message));
				});
		})
	};
}