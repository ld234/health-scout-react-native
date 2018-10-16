import axios from 'axios';
import DeviceStorage from '../services/DeviceStorage';
import { AsyncStorage } from 'react-native';

export const UPDATE_VIEWCOUNT_PENDING = 'UPDATE_VIEWCOUNT_PENDING';
export const UPDATE_VIEWCOUNT_SUCCESS = 'UPDATE_VIEWCOUNT_SUCCESS';
export const UPDATE_VIEWCOUNT_ERROR = 'UPDATE_VIEWCOUNT_ERROR';

export const GET_PROFILE_INFO_PENDING ='GET_PROFILE_INFO_PENDING';
export const GET_PROFILE_INFO_SUCCESS ='GET_PROFILE_INFO_SUCCESS';
export const GET_PROFILE_INFO_ERROR ='GET_PROFILE_INFO_ERROR';

export const GET_TESTIMONIAL_PENDING = 'GET_TESTIMONIAL_PENDING';
export const GET_TESTIMONIAL_SUCCESS = 'GET_TESTIMONIAL_SUCCESS';
export const GET_TESTIMONIAL_ERROR = 'GET_TESTIMONIAL_ERROR';

export const SET_CONNECTION_PENDING = 'SET_CONNECTION_PENDING';
export const SET_CONNECTION_SUCCESS = 'SET_CONNECTION_SUCCESS';
export const SET_CONNECTION_ERROR = 'SET_CONNECTION_ERROR';

export const GET_MYPRACTITIONERS_PENDING = 'GET_MYPRACTITIONERS_PENDING'
export const GET_MYPRACTITIONERS_SUCCESS = 'GET_MYPRACTITIONERS_SUCCESS';
export const GET_MYPRACTITIONERS_ERROR= 'GET_MYPRACTITIONERS_ERROR'


const ROOT_URL = 'http://10.0.2.2:8888/patient/pracProfile';
const CONNECT_URL = 'http://10.0.2.2:8888/patient/connect/';

function updateViewCountPending(isUpdateViewCountPending) {
	return {
		type: UPDATE_VIEWCOUNT_PENDING,
		isUpdateViewCountPending: isUpdateViewCountPending,
	};
}

function updateViewCountSuccess(isUpdateViewCountSuccess) {
	return {
		type: UPDATE_VIEWCOUNT_SUCCESS,
		isUpdateViewCountSuccess: isUpdateViewCountSuccess,
	};
}

function updateViewCountError(isUpdateViewCountError) {
	return {
		type: UPDATE_VIEWCOUNT_ERROR,
		isUpdateViewCountError: isUpdateViewCountError,
	};
}


export function updateViewCount(pracUsername) {
	console.log('in update view count', pracUsername);
	return dispatch => {
		dispatch(updateViewCountPending(true));
		dispatch(updateViewCountSuccess(false));
		dispatch(updateViewCountError(null));
		AsyncStorage.getItem('id_token').then(res => {
			axios
				.put(`${ROOT_URL}?pracUsername=${pracUsername}`, {}, {
					headers: {
						'x-access-token': res,
					},
				})
				.then(res => {
					console.log('pracType res ', res.data);
					dispatch(updateViewCountPending(false));
					dispatch(updateViewCountSuccess(true, res.data));
				})
				.catch(err => {
					console.log('update view err', err);
					dispatch(updateViewCountPending(false));
					dispatch(updateViewCountSuccess(false, null));
					dispatch(updateViewCountError(err.response));
				});
		})
	};
}

function getProfileInfoPending(isGetProfileInfoPending) {
	return {
		type: GET_PROFILE_INFO_PENDING,
		isGetProfileInfoPending: isGetProfileInfoPending,
	};
}

function getProfileInfoSuccess(isGetProfileInfoSuccess, qualifications, specialties, generalInfo) {
	return {
		type: GET_PROFILE_INFO_SUCCESS,
		isGetProfileInfoSuccess: isGetProfileInfoSuccess,
		qualifications: qualifications,
		specialties: specialties,
		generalInfo,

	};
}

function getProfileInfoError(isGetProfileInfoError) {
	return {
		type: GET_PROFILE_INFO_ERROR,
		isGetProfileInfoError: isGetProfileInfoError,
	};
}


export function getProfileInfo(pracUsername) {
	console.log('in get profile info', pracUsername);
	return dispatch => {
		dispatch(getProfileInfoPending(true));
		dispatch(getProfileInfoSuccess(false));
		dispatch(getProfileInfoError(null));
		AsyncStorage.getItem('id_token').then(res => {
			let promises=[];
			promises.push(axios.get(`${ROOT_URL}/Qualification`, {
				headers: {
					'x-access-token': res,
				},
				params:{
					pracUsername
				}
			}))
			promises.push(axios.get(`${ROOT_URL}/Specialty` , {
				headers: {
					'x-access-token': res,
				},
				params:{
					pracUsername
				}
			}))
			promises.push(axios.get(`${ROOT_URL}/`, {
				headers: {
					'x-access-token': res,
				},
				params:{
					pracUsername
				}
			}))
			axios.all(promises)
				.then(res => {
					console.log('PROFILE SUCCESS ', res[2].data);
					dispatch(getProfileInfoPending(false));
					dispatch(getProfileInfoSuccess(true, res[0].data, res[1].data, res[2].data[0]));
				})
				.catch(err => {
					console.log('get profileinfo error ', err);
					dispatch(getProfileInfoPending(false));
					dispatch(getProfileInfoSuccess(false, null));
					dispatch(getProfileInfoError(err.response));
				});
		})
	};
}

function getTestimonialPending(isGetTestimonialPending) {
	return {
		type: GET_TESTIMONIAL_PENDING,
		isGetTestimonialPending: isGetTestimonialPending,
	};
}

function getTestimonialSuccess(isGetTestimonialSuccess) {
	return {
		type: GET_TESTIMONIAL_success,
		isGetTestimonialSuccess: isGetTestimonialSuccess,
	};
}

function getTestimonialError(isGetTestimonialError) {
	return {
		type: GET_TESTIMONIAL_ERROR,
		isGetTestimonialError: isGetTestimonialError,
	};
}


export function getTestimonial(pracUsername) {
	console.log('in get profile info', pracUsername);
	return dispatch => {
		dispatch(getTestimonialPending(true));
		dispatch(getTestimonialSuccess(false));
		dispatch(getTestimonialError(null));
		AsyncStorage.getItem('id_token').then(res => {
			axios
				.get(`${ROOT_URL}?${pracUsername}`, {
					headers: {
						'x-access-token': res,
					},
				})
				.then(res => {
					console.log('pracType res ', res.data);
					dispatch(getTestimonialPending(false));
					dispatch(getTestimonialSuccess(true, res.data));
				})
				.catch(err => {
					dispatch(getTestimonialPending(false));
					dispatch(getTestimonialSuccess(false, null));
					dispatch(getTestimonialError(err.response));
				});
		})
	};
}


function setConnectionPending(isConnectionPending) {
	return {
		type: SET_CONNECTION_PENDING,
		isConnectionPending: isConnectionPending,
	};
}

function setConnectionSuccess(isConnectionSuccess) {
	return {
		type: SET_CONNECTION_SUCCESS,
		isConnectionSuccess: isConnectionSuccess,
	};
}

function setConnectionError(isConnectionError) {
	return {
		type: SET_CONNECTION_ERROR,
		isConnectionError: isConnectionError,
	};
}

export function resetStates(){
	return dispatch => {
		dispatch(setConnectionPending(false));
		dispatch(setConnectionSuccess(false));
		dispatch(setConnectionError(false));
	}
}

export function setConnection(pracUsername, stripeToken, cb) {
	console.log('SET CONNECTION', pracUsername);
	return dispatch => {
		dispatch(setConnectionPending(true));
		dispatch(setConnectionSuccess(false));
		dispatch(setConnectionError(null));
		AsyncStorage.getItem('id_token').then(res => {
			axios
				.post(`${CONNECT_URL}`,{pracUsername, stripeToken}, {
					headers: {
						'x-access-token': res,
					},
				})
				.then(res => {
					console.log('connect res ', res.data);
					dispatch(setConnectionPending(false));
					dispatch(setConnectionSuccess(true));
					getMyPractitioners();
					if (cb) cb();
				})
				.catch(err => {
					console.log('connect err ', err);
					dispatch(setConnectionPending(false));
					dispatch(setConnectionSuccess(false, null));
					dispatch(setConnectionError(err.response));
				});
		})
	};
}


function getMyPractitionersPending(isGetMyPractitionersPending) {
	return {
		type: GET_MYPRACTITIONERS_PENDING,
		isGetMyPractitionersPending: isGetMyPractitionersPending,
	};
}

function getMyPractitionersSuccess(isGetMyPractitionersSuccess, myPractitioners) {
	return {
		type: GET_MYPRACTITIONERS_SUCCESS,
		isGetMyPractitionersSuccess: isGetMyPractitionersSuccess,
		myPractitioners: myPractitioners,
	};
}

function getMyPractitionersError(isGetMyPractitionersError) {
	return {
		type: GET_MYPRACTITIONERS_ERROR,
		isGetMyPractitionersError: isGetMyPractitionersError,
	};
}

export function getMyPractitioners() {
	console.log('get my practitioners');
	return dispatch => {
		dispatch(getMyPractitionersPending(true));
		dispatch(getMyPractitionersSuccess(false));
		dispatch(getMyPractitionersError(null));
		AsyncStorage.getItem('id_token').then(res => {
			axios
				.get(`${ROOT_URL}/all`,{
					headers: {
						'x-access-token': res,
					},
				})
				.then(res => {
					console.log('connect res ', res.data);
					dispatch(getMyPractitionersPending(false));
					dispatch(getMyPractitionersSuccess(true, res.data));
				})
				.catch(err => {
					console.log('connect err ', err);
					dispatch(getMyPractitionersPending(false));
					dispatch(getMyPractitionersSuccess(false, null));
					dispatch(getMyPractitionersError(err.response));
				});
		})
	};
}