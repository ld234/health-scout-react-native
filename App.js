/* * * * * * * * * * * * * * * * * * * * * *
 * @Dan @Tenzin
 * Description: reducer for
 * Created:  5 August 2018
 * Last modified:  10 October 2018
 * * * * * * * * * * * * * * * * * * * * * */
import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import reduxThunk from 'redux-thunk';
import reducers from './src/reducers';

import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/components/Login/LoginScreen';
import Splash from './src/components/Login/Splash';
import Navigation from './src/components/Navigation/Navigation';
import MedicationHistoryScreen from './src/components/MyProfile/MedicationHistoryScreen';
import FamilyHistoryScreen from './src/components/MyProfile/FamilyHistoryScreen';
import AllergyHistoryScreen from './src/components/MyProfile/AllergyHistoryScreen';
import ConsultationHistoryScreen from './src/components/MyProfile/ConsultationHistoryScreen';

import SearchPracProfile from './src/components/Search/SearchPracProfile';
import MyPractitionerProfile from './src/components/MyPractitioner/MyPractitionerProfileScreen/MyPractitionerProfileScreen';
import PaymentPage from './src/components/Search/PaymentPage';

import PDFViewScreen from './src/components/MyDocuments/PDFViewScreen';
import MyDocumentsScreen from './src/components/MyDocuments/MyDocumentsScreen';
import FlashMessage from "react-native-flash-message";

import {
  createStackNavigator
} from 'react-navigation';
import './src/services/ReactotronConfig';
import RegistrationScreen from './src/components/Registration/RegistrationScreen';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  fonts:  {
    ...DefaultTheme.fonts,
    regular: 'Quicksand-Regular',
    medium: 'Quicksand-Medium',
  },
  colors: {
    ...DefaultTheme.colors,
  }
};


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const persistor = persistStore(store);


const MainNavigator = createStackNavigator({
  Splash: { screen: Splash },
  Main: { screen: Navigation },
  Login: { screen: LoginScreen },
  Registration: { screen : RegistrationScreen },
  MedicationHistory: { screen: MedicationHistoryScreen },
  FamilyHistory: { screen: FamilyHistoryScreen},
  ConsultationHistory: { screen: ConsultationHistoryScreen },
  AllergyHistory: { screen: AllergyHistoryScreen },
  PracProfile: { screen: MyPractitionerProfile },
  PDFView: {screen: PDFViewScreen},
  MyDocuments: { screen: MyDocumentsScreen },
  SearchPracProfile:{ screen: SearchPracProfile },
  PaymentPage:{ screen: PaymentPage},
},
{
  headerMode: 'screen',
  cardStyle: { backgroundColor: '#FFFFFF' },
  tintColor: 'white',
})

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fontLoaded: false,
    };
  }
 
  componentDidMount() {
    this.setState({ fontLoaded: true });
  }

  render() {
    if (this.state.fontLoaded)
      return (
        <Provider store={store}>
          <PaperProvider theme={theme}>
            <MainNavigator></MainNavigator>
            <FlashMessage position="top" />
          </PaperProvider>
        </Provider>
      )
    else return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
