import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import renderReducer from './render.reducer';
import practitionerReducer from './practitioner.reducer'
import practitionerProfileReducer from './practitionerProfile.reducer';
import mypracSearchState from './mypracSearch.reducer';
// import { persistReducer } from 'redux-persist';

const rootReducer = combineReducers({
    authState: authReducer,
    renderSearchState: renderReducer,
    practitionerState: practitionerReducer,
    practitionerProfileState:practitionerProfileReducer,
    mypracSearchState: mypracSearchState
});

export default rootReducer;