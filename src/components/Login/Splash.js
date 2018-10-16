import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, Button } from 'react-native';
import bgImage from '../../../assets/images/background.jpg';
import logo from '../../../assets/images/healthscout-logo.png';


import { connect } from 'react-redux';
import { checkAuth } from '../../actions/auth.actions';

class Splash extends React.Component {
  static navigationOptions ={
    header: null
  }
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.checkAuth((route) => this.navigate(route));
  }

  navigate = (route) => {
    setTimeout(() => this.props.navigation.navigate(route));
  }

  render() {
    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}> Welcome to HealthScout</Text>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => {
  return {
    authState: state.authState
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAuth: (cb) => dispatch(checkAuth(cb)),
  }
}

export default connect(null, mapDispatchToProps)(Splash);

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    alignItems: 'center',
    width: null,
    height: null,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 110,
    height: 149,
  },
  logoText: {
    color: '#fff',
    fontSize: 40,
    fontFamily: 'Quicksand-Regular',
    opacity: 0.7,
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
});
