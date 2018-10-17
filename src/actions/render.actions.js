/* * * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Description: Sets the higher states for search modal toggles and search filtration options
 * Created: 28 September 2018
 * Last modified:  3 October 2018
 * * * * * * * * * * * * * * * * * * * * * */


export const TOGGLE_SEARCH_OPTION_MODAL = 'TOGGLE_SEARCH_OPTION_MODAL';
export const SET_LOCATION_SEARCH_BAR_FOCUS = 'SET_LOCATION_SEARCH_BAR_FOCUS';
export const SET_LOCATION_SEARCH_QUERY = 'SET_LOCATION_SEARCH_QUERY';
export const SET_LOCATION_SUGGESTION_SHOW = 'SET_LOCATION_SUGGESTION_SHOW';
export const SET_LOCATION_LIST = 'SET_LOCATION_LIST';
export const CHOOSE_SEARCH_PRAC_TYPE = 'CHOOSE_SEARCH_PRAC_TYPE';
export const SET_SELECTED_SPECIALTY_LIST = 'SET_SELECTED_SPECIALTY_LIST';
export const SET_SELECTED_RADIUS = 'SET_SELECTED_RADIUS';
export const SET_SELECTED_SORT_OPTION = 'SET_SELECTED_SORT_OPTION';
export const SET_COORD = 'SET_COORD';

//toggles the search option model
export function toggleSearchOptionModal(modalType) {
    return dispatch => dispatch({
        type: TOGGLE_SEARCH_OPTION_MODAL,
        modalType,
    });
}

//sets the longitute and lattitude value of a suburb the user typed in
export function setCoord(lat, lng) {
    return dispatch => dispatch({
        type: SET_COORD,
        lat, 
        lng
    });
}

//sets the state of selected specialty for search
export function setSelectedSpecialties(list){
    return dispatch => dispatch({
        type: SET_SELECTED_SPECIALTY_LIST,
        selectedSpecialties: list,
    })
}

//sets the sort option chosen by user
export function setSelectedSortOption(s){
    return dispatch => dispatch({
        type: SET_SELECTED_SORT_OPTION,
        selectedSortOption: s,
    })
}

//sets the radius chosen by user
export function setSelectedRadius(radius){
    return dispatch => dispatch({
        type: SET_SELECTED_RADIUS,
        selectedRadius: radius,
    })
}

//sets the state of if location bar is selected
export function setLocationSearchBarFocus(isLocationSearchBarFocus) {
    return dispatch => dispatch({
        type: SET_LOCATION_SEARCH_BAR_FOCUS,
        isLocationSearchBarFocus,
    });
}

//sets the user typed search query
export function setLocationSearchQuery(query) {
    return dispatch => dispatch({
        type: SET_LOCATION_SEARCH_QUERY,
        locationSearchQuery: query,
    })
}

//sets if location suggestion is on show
export function setLocationSuggestionShow(isLocationSuggestionShown) {
    return dispatch => dispatch({
        type: SET_LOCATION_SUGGESTION_SHOW,
        isLocationSuggestionShown,
    })
}

//sets the states of the suggested location 
export function setLocationList(locationList) {
    return dispatch => dispatch({
        type: SET_LOCATION_LIST,
        locationList,
    });
}

//set the state of prac type to be searched
export function setSearchPracType(searchPracType) {
    return dispatch => dispatch({
        type: CHOOSE_SEARCH_PRAC_TYPE,
        searchPracType,
    });
}