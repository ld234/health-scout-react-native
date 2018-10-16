import {
    UPDATE_VIEWCOUNT_PENDING,
    UPDATE_VIEWCOUNT_ERROR,
    UPDATE_VIEWCOUNT_SUCCESS,
    GET_PROFILE_INFO_PENDING,
    GET_PROFILE_INFO_SUCCESS,
    GET_PROFILE_INFO_ERROR ,
    GET_TESTIMONIAL_PENDING,
    GET_TESTIMONIAL_SUCCESS,
	GET_TESTIMONIAL_ERROR,
	SET_CONNECTION_PENDING,
	SET_CONNECTION_SUCCESS,
	SET_CONNECTION_ERROR,
	GET_MYPRACTITIONERS_PENDING,
	GET_MYPRACTITIONERS_SUCCESS,
	GET_MYPRACTITIONERS_ERROR,
} from '../actions/practitionerProfile.actions';

const INITIAL_STATE = {
    isUpdateViewCountPending: false,
    isUpdateViewCountSuccess: false,
    isUpdateViewCountError: false,
    isGetProfileInfoPending:false,
    isGetProfileInfoSuccess: false,
    isGetProfileInfoError: false,
    isGetTestimonialPending: false,
    isGetTestimonialSuccess: false,
    isGetTestimonialPending: false,
    isGetTestimonialError: false,
    testimonial:[],
    qualifications: [],
	specialties: [],
	generalInfo: {},
	isConnectionPending:false,
	isConnectionSuccess:false,
	isConnectionError:false,
	isGetMyPractitionersPending: false,
	isGetMyPractitionersSuccess: false,
	isGetMyPractitionersError: false,
	myPractitioners:[],
}

export default function pracProfileReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case UPDATE_VIEWCOUNT_PENDING:
			return {
				...state,
				isUpdateViewCountPending: action.isUpdateViewCountPending,
			};
		case UPDATE_VIEWCOUNT_SUCCESS:
			return {
				...state,
				isUpdateViewCountSuccess: action.isUpdateViewCountSuccess,
			};
		case UPDATE_VIEWCOUNT_ERROR:
			return {
				...state,
				isUpdateViewCountError: action.isUpdateViewCountError,
			};
		case GET_PROFILE_INFO_PENDING:
			return {
				...state,
                isGetProfileInfoPending: action.isGetProfileInfoPending,
                
			};
		case GET_PROFILE_INFO_SUCCESS:
			console.log('action', action);
			return {
				...state,
				isGetProfileInfoSuccess: action.isGetProfileInfoSuccess,
                qualifications: action.qualifications? action.qualifications: state.qualifications,
				specialties: action.specialties ? action.specialties: state.specialties,
				generalInfo: action.generalInfo ? action.generalInfo: state.generalInfo,
			};
		case GET_PROFILE_INFO_ERROR:
			return {
				...state,
				isGetProfileInfoError: action.isGetProfileInfoError,
			};
		case GET_TESTIMONIAL_PENDING:
			return {
				...state,
				isGetTestimonialPending: action.isGetTestimonialPending,
			}
		case GET_TESTIMONIAL_SUCCESS:
			return {
				...state,
				isGetTestimonialSuccess: action.isGetTestimonialSuccess,
				testimonial: action.testimonial,
			}
		case GET_TESTIMONIAL_ERROR:
			return {
				...state,
				isGetTestimonialError: action.isGetTestimonialError,
			}
		case SET_CONNECTION_PENDING:
			return {
				...state,
				isConnectionPending: action.isConnectionPending,
			}
		case SET_CONNECTION_SUCCESS:
			return {
				...state,
				isConnectionSuccess: action.isConnectionSuccess,
			}
		case SET_CONNECTION_ERROR:
			return {
				...state,
				isConnectionError: action.isConnectionError,
			}
		case GET_MYPRACTITIONERS_PENDING:
			return {
				...state,
				isGetMyPractitionersPending: action.isGetMyPractitionersPending,
			}
		case GET_MYPRACTITIONERS_SUCCESS:
			return {
				...state,
				isGetMyPractitionersSuccess: action.isGetMyPractitionersSuccess,
				myPractitioners: action.myPractitioners && action.myPractitioners.length ?  action.myPractitioners : state.myPractitioners,
			}
		case GET_MYPRACTITIONERS_ERROR:
			return {
				...state,
				isGetMyPractitionersError: action.isGetMyPractitionersError,
			}
		default:
			return state;
	}
}
