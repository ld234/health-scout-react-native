import { TOGGLE_SEARCH_OPTION_MODAL, SET_LOCATION_SEARCH_BAR_FOCUS, SET_LOCATION_SEARCH_QUERY, SET_LOCATION_SUGGESTION_SHOW, 
    SET_LOCATION_LIST, CHOOSE_SEARCH_PRAC_TYPE } from '../actions/render.actions';
const INITIAL_STATE = {
    isSearchOptionModalShown: false,
    searchOptionModalType: null,
    locationSearchQuery: null,
    isLocationSuggestionShown: false,
    locationList: [],
    searchPracType: null,
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
            console.log('inreducer',action.locationList);
            return {
                ...state,
                locationList: action.locationList
            }
        case CHOOSE_SEARCH_PRAC_TYPE:
            return {
                ...state,
                searchPracType: action.searchPracType,
            }
		default:
			return state;
	}
}
