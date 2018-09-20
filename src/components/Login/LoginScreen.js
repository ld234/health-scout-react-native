import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TextInput, Dimensions, 
  TouchableOpacity, TouchableWithoutFeedback, ScrollView, Keyboard, Platform} from 'react-native';
import bgImage from '../../../assets/images/login-background2.png';
import logo from '../../../assets/images/healthscout-logo.png';
import Icon from 'react-native-vector-icons/Ionicons';
import { login } from '../../actions/auth.actions';
import { connect } from 'react-redux';

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

  // componentDidMount () {
  //   this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
  //   this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  // }

  // componentWillUnmount () {
  //   this.keyboardDidShowListener.remove();
  //   this.keyboardDidHideListener.remove();
  // }

  // _keyboardDidShow = () => {
  //   this.setState({ keyboardShow: !this.state.keyboardShow})
  // }

  // _keyboardDidHide = () => {
  //   this.setState({ keyboardShow: !this.state.keyboardShow})
  // }

  showPassword = () => {
    this.setState({showPassword: !this.state.showPassword, press: !this.state.press });
  }

  onFocus = () => {
    this.setState({keyboardShow: true})
  }
  onFocus = () => {
    this.setState({keyboardShow: false})
  }

  renderFormBody = () => {
    return (
      <View style={styles.backgroundContainer}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo}></Image>
          <Text style={styles.logoText}>HealthScout</Text>
        </View>
        <View>
          <Icon name={'ios-person-outline'} size={30} color={'rgba(255,255,255,.7)'} style={styles.inputIcon}/>
          <TextInput style={styles.input}
              placeholder={'Username'}
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
        <TouchableOpacity style={styles.btnLogin} onPress={() => this.props.login(this.state.username, this.state.password, () => {
            this.props.navigation.navigate('Main');
            console.log('called');
          })}>
          <Text style={styles.textLogin}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnRegister}>
          <Text style={styles.textLogin}>REGISTER</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    if (this.state.keyboardShow) {
      return (
        <ImageBackground source={bgImage} style={styles.backgroundContainer}>
          {/* <KeyboardAvoidingView  keyboardVerticalOffset={0} behavior="padding" enabled style={styles.backgroundContainer}> */}
          <ScrollView style={styles.scrollView}>
            <TouchableWithoutFeedback style={styles.backgroundContainer} onPress={Keyboard.dismiss}>
              {this.renderFormBody()}
            </TouchableWithoutFeedback>
          </ScrollView>
          {/* </KeyboardAvoidingView> */}
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
  scrollView: {

  },
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
    backgroundColor: 'transparent', //'#00b6ff',
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