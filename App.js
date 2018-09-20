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
// import { Font } from 'expo';
import {
  createStackNavigator
} from 'react-navigation';
import './src/services/ReactotronConfig';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const persistor = persistStore(store);

const MainNavigator = createStackNavigator({
  Splash: { screen: Splash },
  Main: { screen: Navigation },
  Login: { screen: LoginScreen },
},
{
  headerMode: 'screen',
  cardStyle: { backgroundColor: '#FFFFFF' },
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
          <MainNavigator></MainNavigator>
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
