import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import renderReducer from './render.reducer';
import practitionerReducer from './practitioner.reducer'
// import { persistReducer } from 'redux-persist';

const rootReducer = combineReducers({
    authState: authReducer,
    renderSearchState: renderReducer,
    practitionerState: practitionerReducer,
});

export default rootReducer;