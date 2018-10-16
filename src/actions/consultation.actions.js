import axios from 'axios';
import { AsyncStorage } from 'react-native';

export const GET_CONSULTATIONS_PENDING = 'GET_CONSULTATIONS_PENDING';
export const GET_CONSULTATIONS_SUCCESS = 'GET_CONSULTATIONS_SUCCESS';
export const GET_CONSULTATIONS_ERROR = 'GET_CONSULTATIONS_ERROR';

const ROOT_URL = 'http://10.0.2.2:8888/patient/medicalDetails/consultation';

function setGetConsultationsPending(isGetConsultationsPending) {
	return {
		type: GET_CONSULTATIONS_PENDING,
		isGetConsultationsPending: isGetConsultationsPending,
	};
}

function setGetConsultationsSuccess(isGetConsultationsSuccess, consultations) {
	return {
		type: GET_CONSULTATIONS_SUCCESS,
		isGetConsultationsSuccess: isGetConsultationsSuccess,
		consultations,
	};
}

function setGetConsultationsError(getConsultationsError) {
	return {
		type: GET_CONSULTATIONS_ERROR,
		getConsultationsError: getConsultationsError,
	};
}

export function getConsultations() {
	return dispatch => {
		dispatch(setGetConsultationsPending(true));
		dispatch(setGetConsultationsSuccess(false));
		dispatch(setGetConsultationsError(null));
		AsyncStorage.getItem('id_token').then(res => {
			axios
				.get(`${ROOT_URL}`, {
					headers: {
						'x-access-token': res,
                    },
				})
				.then(res => {
                    setTimeout(() => dispatch(setGetConsultationsPending(false)), 1000);
					dispatch(setGetConsultationsSuccess(true, res.data.message));
				})
				.catch(err => {
					dispatch(setGetConsultationsPending(false));
					dispatch(setGetConsultationsSuccess(false, null));
					dispatch(setGetConsultationsError(err.response));
				});
		})
	};
}