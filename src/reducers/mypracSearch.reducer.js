/* * * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Description: reducer for set search query and set state of 
 * if prac suggestion is on show
 * Created:  4 August 2018
 * Last modified:  13 October 2018
 * * * * * * * * * * * * * * * * * * * * * */

import { 
    SET_SEARCH_QUERY,
    SET_PRACSUGGESTION_ONSHOW
 } from '../actions/mypracSearch.actions';
const INITIAL_STATE = {
    searchQuery: '',
    isPracSuggestionOnShow: false,
}

export default function pracProfileReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case SET_SEARCH_QUERY:
			return {
				...state,
				searchQuery: action.searchQuery,
            };
        case SET_PRACSUGGESTION_ONSHOW:
        return {
            ...state,
            isPracSuggestionOnShow: action.isPracSuggestionOnShow,
        };
		default:
			return state;
	}
}
