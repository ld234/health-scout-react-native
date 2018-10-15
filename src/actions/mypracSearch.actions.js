export const SET_SEARCH_QUERY = "SET_SEARCH_QUERY";
export const SET_PRACSUGGESTION_ONSHOW = "SET_PRACSUGGESTION_ONSHOW";

export function setSearchQuery(searchQuery) {
    return dispatch => dispatch({
        type: SET_SEARCH_QUERY,
        searchQuery: searchQuery,
    });
}

export function setPracSuggestionOnShow(isPracSuggestionOnShow){
    return dispatch => dispatch({
        type: SET_PRACSUGGESTION_ONSHOW,
        isPracSuggestionOnShow: isPracSuggestionOnShow,
    });
}