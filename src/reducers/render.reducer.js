/* * * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Description: reducer for
 * Created:  5 August 2018
 * Last modified:  10 October 2018
 * * * * * * * * * * * * * * * * * * * * * */

import { TOGGLE_SEARCH_OPTION_MODAL, SET_LOCATION_SEARCH_BAR_FOCUS, SET_LOCATION_SEARCH_QUERY, SET_LOCATION_SUGGESTION_SHOW, 
    SET_LOCATION_LIST, CHOOSE_SEARCH_PRAC_TYPE, SET_SELECTED_SPECIALTY_LIST , SET_SELECTED_RADIUS, SET_SELECTED_SORT_OPTION,
    SET_COORD } from '../actions/render.actions';
const INITIAL_STATE = {
    isSearchOptionModalShown: false,
    searchOptionModalType: null,
    locationSearchQuery: null,
    isLocationSuggestionShown: false,
    locationList: [],
    searchPracType: null,
    selectedSpecialties: [],
    selectedRadius: 5,
    selectedSortOption: 0,
    lat: 0,
    lng: 0,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
        case TOGGLE_SEARCH_OPTION_MODAL:
			return {
				...state,
                isSearchOptionModalShown: !state.isSearchOptionModalShown,
                searchOptionModalType: action.modalType
            };
        case SET_LOCATION_SEARCH_BAR_FOCUS:
            return {
                ...state,
                isLocationSearchBarFocus: action.isLocationSearchBarFocus,
            }
        case SET_LOCATION_SEARCH_QUERY:
            return {
                ...state,
                locationSearchQuery: action.locationSearchQuery,
            }
        case SET_LOCATION_SUGGESTION_SHOW:
            return {
                ...state,
                isLocationSuggestionShown: action.isLocationSuggestionShown,
            }
        case SET_LOCATION_LIST:
            return {
                ...state,
                locationList: action.locationList
            }
        case CHOOSE_SEARCH_PRAC_TYPE:
            return {
                ...state,
                searchPracType: action.searchPracType,
            }
        case SET_SELECTED_SPECIALTY_LIST:
            return {
                ...state,
                selectedSpecialties: action.selectedSpecialties,
            }
        case SET_SELECTED_RADIUS:
            return {
                ...state,
                selectedRadius: action.selectedRadius,
            }
        case SET_SELECTED_SORT_OPTION:
            return {
                ...state,
                selectedSortOption: action.selectedSortOption,
            }
        case SET_COORD:
            return {
                ...state,
                lat: action.lat,
                lng: action.lng,
            }
		default:
			return state;
	}
}
