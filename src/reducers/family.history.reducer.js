/* * * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Description: reducer for add, deleete and get family conditions
 * Created:  6 August 2018
 * Last modified:  12 October 2018
 * * * * * * * * * * * * * * * * * * * * * */

import { ADD_FAMILY_CONDITION_PENDING, ADD_FAMILY_CONDITION_SUCCESS, ADD_FAMILY_CONDITION_ERROR,
    GET_FAMILY_CONDITIONS_PENDING,
    GET_FAMILY_CONDITIONS_SUCCESS,
    GET_FAMILY_CONDITIONS_ERROR,
    DELETE_FAMILY_CONDITION_PENDING,
    DELETE_FAMILY_CONDITION_SUCCESS,
    DELETE_FAMILY_CONDITION_ERROR } from '../actions/family.history.actions';

const INITIAL_STATE = {
    isGetFamilyConditionsPending: false,
	isGetFamilyConditionsSuccess: false,
    getFamilyConditionsError: null,
    familyConditions: [],
    isAddFamilyConditionPending: false,
	isAddFamilyConditionSuccess: false,
    addFamilyConditionError: null,
    isDeteleFamilyConditionPending: false,
	isDeteleFamilyConditionSuccess: false,
    deteleFamilyConditionError: null,
    justDeleteIdx: -1,
}

export default function familyConditionReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
		case GET_FAMILY_CONDITIONS_PENDING:
			return {
				...state,
				isGetFamilyConditionsPending: action.isGetFamilyConditionsPending,
			};
		case GET_FAMILY_CONDITIONS_SUCCESS:
			return {
				...state,
				isGetFamilyConditionsSuccess: action.isGetFamilyConditionsSuccess,
				familyConditions: action.familyConditions && action.familyConditions.length? action.familyConditions : state.familyConditions,
			};
		case GET_FAMILY_CONDITIONS_ERROR:
			return {
				...state,
				getFamilyConditionsError: action.getFamilyConditionsError,
            };
        case ADD_FAMILY_CONDITION_PENDING:
			return {
				...state,
				isAddFamilyConditionsPending: action.isAddFamilyConditionPending,
			};
		case ADD_FAMILY_CONDITION_SUCCESS:
			return {
				...state,
				isAddFamilyConditionSuccess: action.isAddFamilyConditionSuccess,
				familyConditions: action.familyCondition? [...state.familyConditions, action.familyCondition]: state.familyConditions,
			};
		case ADD_FAMILY_CONDITION_ERROR:
			return {
				...state,
				addFamilyConditionError: action.addFamilyConditionError,
            };
        case DELETE_FAMILY_CONDITION_PENDING:
			return {
				...state,
				isDeleteFamilyConditionsPending: action.isDeleteFamilyConditionPending,
			};
		case DELETE_FAMILY_CONDITION_SUCCESS:
			return {
				...state,
				isDeleteFamilyConditionSuccess: action.isDeleteFamilyConditionSuccess,
                justDeleteIdx: action.justDeleteIdx,
                familyConditions: Number.isInteger(action.justDeleteIdx) ? 
					state.familyConditions.filter((item, idx) => idx !== action.justDeleteIdx): 
					state.familyConditions,
			};
		case DELETE_FAMILY_CONDITION_ERROR:
			return {
				...state,
				deleteFamilyConditionError: action.deleteFamilyConditionError,
			};
		default:
			return state;
	}
}