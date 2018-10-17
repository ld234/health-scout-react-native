/* * * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Description: reducer for get, delete allergies
 * Created:  2 August 2018
 * Last modified:  5 August 2018
 * * * * * * * * * * * * * * * * * * * * * */

import { ADD_ALLERGY_PENDING, ADD_ALLERGY_SUCCESS, ADD_ALLERGY_ERROR,
    GET_ALLERGIES_PENDING,
    GET_ALLERGIES_SUCCESS,
    GET_ALLERGIES_ERROR,
    DELETE_ALLERGY_PENDING,
    DELETE_ALLERGY_SUCCESS,
    DELETE_ALLERGY_ERROR } from '../actions/allergy.actions';

const INITIAL_STATE = {
    isGetAllergiesPending: false,
	isGetAllergiesSuccess: false,
    getAllergiesError: null,
    allergies: [],
    isAddAllergyPending: false,
	isAddAllergySuccess: false,
    addAllergyError: null,
    isDeteleAllergyPending: false,
	isDeteleAllergySuccess: false,
    deteleAllergyError: null,
    justDeleteIdx: -1,
}

export default function allergyReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
		case GET_ALLERGIES_PENDING:
			return {
				...state,
				isGetAllergiesPending: action.isGetAllergiesPending,
			};
		case GET_ALLERGIES_SUCCESS:
			return {
				...state,
				isGetAllergiesSuccess: action.isGetAllergiesSuccess,
				allergies: action.allergies && action.allergies.length? action.allergies : state.allergies,
			};
		case GET_ALLERGIES_ERROR:
			return {
				...state,
				getAllergiesError: action.getAllergiesError,
            };
        case ADD_ALLERGY_PENDING:
			return {
				...state,
				isAddAllergiesPending: action.isAddAllergyPending,
			};
		case ADD_ALLERGY_SUCCESS:
			return {
				...state,
				isAddAllergySuccess: action.isAddAllergySuccess,
				allergies: action.allergy? [...state.allergies, action.allergy]: state.allergies,
			};
		case ADD_ALLERGY_ERROR:
			return {
				...state,
				addAllergyError: action.addAllergyError,
            };
        case DELETE_ALLERGY_PENDING:
			return {
				...state,
				isDeleteAllergyPending: action.isDeleteAllergyPending,
			};
		case DELETE_ALLERGY_SUCCESS:
			return {
				...state,
				isDeleteAllergySuccess: action.isDeleteAllergySuccess,
				justDeleteIdx: action.justDeleteIdx,
				allergies: Number.isInteger(action.justDeleteIdx) ? 
					state.allergies.filter((item, idx) => idx !== action.justDeleteIdx): 
					state.allergies,
			};
		case DELETE_ALLERGY_ERROR:
			return {
				...state,
				deleteAllergyError: action.deleteAllergyError,
			};
		default:
			return state;
	}
}