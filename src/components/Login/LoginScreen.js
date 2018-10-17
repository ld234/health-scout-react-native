/* * * * * * * * * * * * * * * * * * * * * *
 * @Dan @Tenzin
 * Description: front page for login
 * Created:  1 August 2018
 * Last modified:  29 September 2018
 * * * * * * * * * * * * * * * * * * * * * */

import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TextInput, Dimensions, 
  TouchableOpacity, TouchableWithoutFeedback, ScrollView, Keyboard, Platform} from 'react-native';
import bgImage from '../../../assets/images/background.jpg';
import logo from '../../../assets/images/healthscout-logo.png';
import Icon from 'react-native-vector-icons/Ionicons';
import { login } from '../../actions/auth.actions';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
const {width: WIDTH} = Dimensions.get('window');

class LoginScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showPassword: true,
      press: false,
      keyboardShow: false,
      username: '',
      password: '',
    }
  }
  
  static navigationOptions = {
    header: null
  }

  //resets the state after successfully logged in
  navigate = () => {
    this.setState({username: ''});
    this.setState({password: ''});
    this.props.navigation.navigate('Main');
  }
   

  showPassword = () => {
    this.setState({showPassword: !this.state.showPassword, press: !this.state.press });
  }

  onFocus = () => {
    this.setState({keyboardShow: true})
  }
  onFocus = () => {
    this.setState({keyboardShow: false})
  }

  navigateToRegistration = () => {
    this.props.navigation.navigate('Registration');
  }

  renderFormBody = () => {
    const { username, password } = this.state;
    return (
      <View style={styles.backgroundContainer}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>HealthScout</Text>
        </View>
        <View>
          <Icon name={'ios-person-outline'} size={30} color={'rgba(255,255,255,.7)'} style={styles.inputIcon}/>
          <TextInput style={styles.input}
              placeholder={'Username'}
              value={username}
              placeholderTextColor={'rgba(255,255,255,0.7)'}
              underlineColorAndroid={'transparent'}
              returnKeyType={'next'}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onChangeText={(username) => this.setState({username})}
          ></TextInput>
        </View>
        <View>
          <Icon name={'ios-lock-outline'} size={30} color={'rgba(255,255,255,.7)'} style={styles.inputIcon}/>
          <TextInput style={styles.input}
              placeholder={'Password'}
              value={password}
              placeholderTextColor={'rgba(255,255,255,0.7)'}
              underlineColorAndroid={'transparent'}
              secureTextEntry={this.state.showPassword}
              returnKeyType={'go'}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onChangeText={(password) => this.setState({password})}
          ></TextInput>
          <TouchableOpacity style={styles.btnEye}
              onPress={this.showPassword} >
              <Icon name={this.state.press === false ? 'ios-eye-outline' : 'ios-eye-off-outline'} size={30} color={'rgba(255,255,255,.7)'}/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => this.props.login(this.state.username, this.state.password, () => {
            this.navigate() ;
        })} >
          <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#021B79','#0575E6' ]}
            locations={[0,0.7]}
            style={styles.btnLogin}>
            <Text style={styles.textLogin}>
              LOGIN
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnRegister} onPress={this.navigateToRegistration}>
          <Text style={styles.textLogin}>REGISTER</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    if (this.state.keyboardShow) {
      return (
        <ImageBackground source={bgImage} style={styles.backgroundContainer}>
          <ScrollView keyboardDismissMode='on-drag'
            keyboardShouldPersistTaps={'always'} style={styles.scrollView}>
            <TouchableWithoutFeedback style={styles.backgroundContainer} onPress={Keyboard.dismiss}>
              {this.renderFormBody()}
            </TouchableWithoutFeedback>
          </ScrollView>
        </ImageBackground>
      );
    } else {
      return (
        <ImageBackground source={bgImage} style={styles.backgroundContainer}>
            <TouchableWithoutFeedback style={styles.backgroundContainer} onPress={Keyboard.dismiss}>
              {this.renderFormBody()}
            </TouchableWithoutFeedback>
        </ImageBackground>
      );
    }
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    width: WIDTH - 80,
    borderRadius: 45,
    justifyContent: 'center',
    marginTop: 20,
  },
  backgroundContainer: {
    flex: 1,
    alignItems: 'center',
    width: null,
    height: null,
    justifyContent: 'center',
  },
  logoContainer: {
    paddingTop: 170,
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
  },
  input: {
    width: WIDTH - 80,
    height: 55,
    borderRadius: 45,
    fontSize: 18,
    fontFamily: 'Quicksand-Regular',
    paddingLeft: 45,
    backgroundColor: 'rgba(255,255,255,0.05)',
    color: 'rgba(255,255,255,.7)',
    marginHorizontal: 25,
    marginTop: 15,
  },
  inputIcon: {
    position: 'absolute',
    left: 40,
    top: 27,
  },
  btnEye: {
    position: 'absolute',
    top: 27,
    right: 40,
  },
  btnLogin: {
    width: WIDTH - 80,
    height: 55,
    borderRadius: 45,
    backgroundColor: '#00b6ff',
    justifyContent: 'center',
    marginTop: 20,
    opacity: .8,
  },
  btnRegister: {
    width: WIDTH - 80,
    height: 55,
    borderRadius: 45,
    borderWidth: 1,
    borderColor: '#00b6ff',
    backgroundColor: 'transparent', 
    justifyContent: 'center',
    marginTop: 20,
    opacity: .8,
  },
  textLogin: {
    color: 'rgba(255,255,255,1)',
    fontFamily: 'Quicksand-Regular',
    fontSize: 18,
    textAlign: 'center',
  }
});

const mapStateToProps = state => {
  return {
    authState: state.authState
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password, cb) => dispatch(login(username, password, cb))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);