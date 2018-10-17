import { ADD_MEDICATION_PENDING, ADD_MEDICATION_SUCCESS, ADD_MEDICATION_ERROR,
    GET_MEDICATIONS_PENDING,
    GET_MEDICATIONS_SUCCESS,
    GET_MEDICATIONS_ERROR,
    DELETE_MEDICATION_PENDING,
    DELETE_MEDICATION_SUCCESS,
    DELETE_MEDICATION_ERROR } from '../actions/medication.actions';

const INITIAL_STATE = {
    isGetMedicationsPending: false,
	isGetMedicationsSuccess: false,
    getMedicationsError: null,
    medications: [],
    isAddMedicationPending: false,
	isAddMedicationSuccess: false,
    addMedicationError: null,
    isDeteleMedicationPending: false,
	isDeteleMedicationSuccess: false,
    deteleMedicationError: null,
    justDeleteIdx: -1,
}

export default function medicationReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
		case GET_MEDICATIONS_PENDING:
			return {
				...state,
				isGetMedicationsPending: action.isGetMedicationsPending,
			};
		case GET_MEDICATIONS_SUCCESS:
			return {
				...state,
				isGetMedicationsSuccess: action.isGetMedicationsSuccess,
				medications: action.medications && action.medications.length? action.medications : state.medications,
			};
		case GET_MEDICATIONS_ERROR:
			return {
				...state,
				getMedicationsError: action.getMedicationsError,
            };
        case ADD_MEDICATION_PENDING:
			return {
				...state,
				isAddMedicationsPending: action.isAddMedicationPending,
			};
		case ADD_MEDICATION_SUCCESS:
			return {
				...state,
				isAddMedicationSuccess: action.isAddMedicationSuccess,
				medications: action.medication? [...state.medications, action.medication]: state.medications,
			};
		case ADD_MEDICATION_ERROR:
			return {
				...state,
				addMedicationError: action.addMedicationError,
            };
        case DELETE_MEDICATION_PENDING:
			return {
				...state,
				isDeleteMedicationsPending: action.isDeleteMedicationPending,
			};
		case DELETE_MEDICATION_SUCCESS:
			console.log('just delete', action.justDeleteIdx);
			return {
				...state,
				isDeleteMedicationSuccess: action.isDeleteMedicationSuccess,
				justDeleteIdx: action.justDeleteIdx,
				medications: Number.isInteger(action.justDeleteIdx) ? 
					state.medications.filter((item, idx) => idx !== action.justDeleteIdx): 
					state.medications,
			};
		case DELETE_MEDICATION_ERROR:
			return {
				...state,
				deleteMedicationError: action.deleteMedicationError,
			};
		default:
			return state;
	}
}