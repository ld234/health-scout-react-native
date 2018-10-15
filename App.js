import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import reduxThunk from 'redux-thunk';
// import reduxLogger from 'redux-logger';
import reducers from './src/reducers';

import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/components/Login/LoginScreen';
import Splash from './src/components/Login/Splash';
import Navigation from './src/components/Navigation/Navigation';
import MedicationHistoryScreen from './src/components/MyProfile/MedicationHistoryScreen';
import FamilyHistoryScreen from './src/components/MyProfile/FamilyHistoryScreen';
import AllergyHistoryScreen from './src/components/MyProfile/AllergyHistoryScreen';
import ConsultationHistoryScreen from './src/components/MyProfile/ConsultationHistoryScreen';
import MyPractitionerProfile from './src/components/MyPractitioner/MyPractitionerProfileScreen/MyPractitionerProfileScreen';
import PDFViewScreen from './src/components/MyDocuments/PDFViewScreen';
import MyDocumentsScreen from './src/components/MyDocuments/MyDocumentsScreen';
import FlashMessage from "react-native-flash-message";
// import { Font } from 'expo';
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
    // primary: '#3498db',
    // accent: '#f1c40f',
  }
};


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const persistor = persistStore(store);


// export const MyPractitionerStack = StackNavigator({
//   MyPracList: {
//     screen: (props) => <MyPractitioners />,
//     // screen: MyPractitioners,

//     navigationOptions: {
//       header: null
//     }
//   },
//   PracDetail:{
//     screen: MyPractitionerDetail,
//     navigationOptions: {
//       header: null
//     }
//   },
// })

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
  MyDocuments: { screen: MyDocumentsScreen }
  // PracSearchProfile: { screen: PracSearchProfileScreen },
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

  /*async*/ 
  componentDidMount() {
    // await Font.loadAsync({
    //   'Quicksand-Light': require('./assets/fonts/Quicksand-Light.ttf'),
    //   'Quicksand': require('./assets/fonts/Quicksand-Regular.ttf'),
    //   'Quicksand-Medium': require('./assets/fonts/Quicksand-Medium.ttf'),
    //   'Quicksand-Bold': require('./assets/fonts/Quicksand-Bold.ttf'),
    // });
    this.setState({ fontLoaded: true });
  }

  render() {
    // let screen = this.state.currentScreen === 'Splash' ? <Splash /> : <LoginScreen />;
    // if (this.state.fontLoaded)
    //   return screen;
    // else 
    //   return null;
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

/*
    (<View style={styles.container}>
        <AppTextInput placeholder="username"></AppTextInput>
        <AppTextInput placeholder="password"></AppTextInput>
        <Button
          onPress={() => this.handlePress()}
          title="Login"
          padding="20px">
        </Button>
      </View>
    );
    */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
