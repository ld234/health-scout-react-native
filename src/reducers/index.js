/* * * * * * * * * * * * * * * * * * * * * *
 * @Dan @Tenzin
 * Description: reducer for
 * Created:  5 August 2018
 * Last modified:  14 October 2018
 * * * * * * * * * * * * * * * * * * * * * */

import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import renderReducer from './render.reducer';
import practitionerReducer from './practitioner.reducer';
import medicationReducer from './medication.reducer';
import familyReducer from './family.history.reducer';
import allergyReducer from './allergy.reducer';
import consultationReducer from './consultation.reducer';
import documentReducer from './document.reducer';
import practitionerProfileReducer from './practitionerProfile.reducer';
import mypracSearchState from './mypracSearch.reducer';
// import { persistReducer } from 'redux-persist';

const rootReducer = combineReducers({
    authState: authReducer,
    renderSearchState: renderReducer,
    practitionerState: practitionerReducer,
    medicationState: medicationReducer,
    familyConditionState: familyReducer,
    allergyState: allergyReducer,
    consultationState: consultationReducer,
    documentState: documentReducer,
    practitionerProfileState:practitionerProfileReducer,
    mypracSearchState: mypracSearchState
});

export default rootReducer;