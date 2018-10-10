export const TOGGLE_SEARCH_OPTION_MODAL = 'TOGGLE_SEARCH_OPTION_MODAL';
export const SET_LOCATION_SEARCH_BAR_FOCUS = 'SET_LOCATION_SEARCH_BAR_FOCUS';
export const SET_LOCATION_SEARCH_QUERY = 'SET_LOCATION_SEARCH_QUERY';
export const SET_LOCATION_SUGGESTION_SHOW = 'SET_LOCATION_SUGGESTION_SHOW';
export const SET_LOCATION_LIST = 'SET_LOCATION_LIST';
export const CHOOSE_SEARCH_PRAC_TYPE = 'CHOOSE_SEARCH_PRAC_TYPE';

export function toggleSearchOptionModal(modalType) {
    return dispatch => dispatch({
        type: TOGGLE_SEARCH_OPTION_MODAL,
        modalType,
    });
}

export function setLocationSearchBarFocus(isLocationSearchBarFocus) {
    return dispatch => dispatch({
        type: SET_LOCATION_SEARCH_BAR_FOCUS,
        isLocationSearchBarFocus,
    });
}

export function setLocationSearchQuery(query) {
    return dispatch => dispatch({
        type: SET_LOCATION_SEARCH_QUERY,
        locationSearchQuery: query,
    })
}

export function setLocationSuggestionShow(isLocationSuggestionShown) {
    return dispatch => dispatch({
        type: SET_LOCATION_SUGGESTION_SHOW,
        isLocationSuggestionShown,
    })
}

export function setLocationList(locationList) {
    return dispatch => dispatch({
        type: SET_LOCATION_LIST,
        locationList,
    });
}

export function setSearchPracType(searchPracType) {
    return dispatch => dispatch({
        type: CHOOSE_SEARCH_PRAC_TYPE,
        searchPracType,
    });
}