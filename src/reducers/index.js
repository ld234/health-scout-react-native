import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
// import { persistReducer } from 'redux-persist';

const rootReducer = combineReducers({
    authState: authReducer
});

export default rootReducer;