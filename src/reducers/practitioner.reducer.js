/* * * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Description: reducer for get specialty, get pract type and search practitioner
 * Created:  1 October 2018
 * Last modified:  10 October 2018
 * * * * * * * * * * * * * * * * * * * * * */

import {
	GET_SPECIALTY_PENDING,
	GET_SPECIALTY_SUCCESS,
	GET_SPECIALTY_ERROR,
	GET_PRAC_TYPE_SPECIALTY_PENDING,
	GET_PRAC_TYPE_SPECIALTY_SUCCESS,
	GET_PRAC_TYPE_SPECIALTY_ERROR,
	SEARCH_PRAC_PENDING,
	SEARCH_PRAC_SUCCESS,
	SEARCH_PRAC_ERROR
} from '../actions/practitioner.actions';

const INITIAL_STATE = {
	isGetSpecialtyPending: false,
	isGetSpecialtySuccess: false,
	getSpecialtyError: null,
	specialties: [],
	isGetPracTypeSpecialtyPending: false,
	isGetPracTypeSpecialtySuccess: false,
	pracTypeSpecialties: [],
	getPracTypeSpecialtyError: null,
	isSearchPracPending: false,
	isSearchPracSuccess: false,
	searchPracError: null,
	pracSearchResult: [],
};

export default function pracReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case GET_SPECIALTY_PENDING:
			return {
				...state,
				isGetSpecialtyPending: action.isGetSpecialtyPending,
			};
		case GET_SPECIALTY_SUCCESS:
			return {
				...state,
				isGetSpecialtySuccess: action.isGetSpecialtySuccess,
				specialties: action.specialties,
			};
		case GET_SPECIALTY_ERROR:
			return {
				...state,
				getSpecialtyError: action.getSpecialtyError,
			};
		case GET_PRAC_TYPE_SPECIALTY_PENDING:
			return {
				...state,
				isGetPracTypeSpecialtyPending: action.isGetPracTypeSpecialtyPending,
			};
		case GET_PRAC_TYPE_SPECIALTY_SUCCESS:
			return {
				...state,
				isGetPracTypeSpecialtySuccess: action.isGetPracTypeSpecialtySuccess,
				pracTypeSpecialties: action.pracTypeSpecialties,
			};
		case GET_PRAC_TYPE_SPECIALTY_ERROR:
			return {
				...state,
				getPracTypeSpecialtyError: action.getPracTypeSpecialtyError,
			};
		case SEARCH_PRAC_PENDING:
			return {
				...state,
				isSearchPracPending: action.isSearchPracPending,
			}
		case SEARCH_PRAC_SUCCESS:
			return {
				...state,
				isSearchPracSuccess: action.isSearchPracSuccess,
				pracSearchResult: action.pracSearchResult,
			}
		case SEARCH_PRAC_ERROR:
			return {
				...state,
				searchPracError: action.searchPracError,
			}
		default:
			return state;
	}
}
