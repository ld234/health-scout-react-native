import {
    GET_CONSULTATIONS_PENDING,
    GET_CONSULTATIONS_SUCCESS,
    GET_CONSULTATIONS_ERROR,} from '../actions/consultation.actions';

const INITIAL_STATE = {
    isGetConsultationsPending: false,
	isGetConsultationsSuccess: false,
    getConsultationsError: null,
    consultations: [],
}

export default function consultationReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
		case GET_CONSULTATIONS_PENDING:
			return {
				...state,
				isGetConsultationsPending: action.isGetConsultationsPending,
			};
		case GET_CONSULTATIONS_SUCCESS:
			return {
				...state,
				isGetConsultationsSuccess: action.isGetConsultationsSuccess,
				consultations: action.consultations && action.consultations.length? action.consultations : state.consultations,
			};
		case GET_CONSULTATIONS_ERROR:
			return {
				...state,
				getConsultationsError: action.getConsultationsError,
            };
		default:
			return state;
	}
}