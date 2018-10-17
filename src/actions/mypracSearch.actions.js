/* * * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Description: Action for setting the search query states for my practitioners
 * Created: 24 September 2018
 * Last modified:  28 September 2018
 * * * * * * * * * * * * * * * * * * * * * */

export const SET_SEARCH_QUERY = "SET_SEARCH_QUERY";
export const SET_PRACSUGGESTION_ONSHOW = "SET_PRACSUGGESTION_ONSHOW";

//sets the search query 
export function setSearchQuery(searchQuery) {
    return dispatch => dispatch({
        type: SET_SEARCH_QUERY,
        searchQuery: searchQuery,
    });
}

//sets a boolean of if Practitioner location suggestion is on show
export function setPracSuggestionOnShow(isPracSuggestionOnShow){
    return dispatch => dispatch({
        type: SET_PRACSUGGESTION_ONSHOW,
        isPracSuggestionOnShow: isPracSuggestionOnShow,
    });
}