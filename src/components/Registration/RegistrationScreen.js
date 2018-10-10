import React from 'react';
import { TextInput, StyleSheet, Text, View, ImageBackground, Image, Dimensions, 
  TouchableOpacity, TouchableWithoutFeedback, ScrollView, Keyboard, DatePickerAndroid, KeyboardAvoidingView } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import bgImage from '../../../assets/images/background2.jpg';
import logo from '../../../assets/images/healthscout-logo.png';
import { login } from '../../actions/auth.actions';
import { connect } from 'react-redux';
import { Sae } from 'react-native-textinput-effects';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import LinearGradient from 'react-native-linear-gradient';
import { Divider } from 'react-native-elements';
import Drowdown from '../Reusable/Dropdown';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const URL = 'http://localhost:8888/user';


const {width: WIDTH} = Dimensions.get('window');

class RegistrationScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showPassword: true,
      press: false,
      keyboardShow: false,
      username: '',
      password: '',
      dob: '',
      email: '',
      title: '',
      gender: '',
      fName:'',
      lName:'',
      titles : [{
        value: 'Mr.',
      }, {
        value: 'Ms.',
      }, {
        value: 'Mrs.',
      }],
      genders : [{
        value: 'Male',
      }, {
        value: 'Female',
      }, {
        value: 'Others',
      }],
      errors: {},
    }
  }
  static navigationOptions = ({navigation}) => ({
    title: 'Registration',
    headerTitleStyle: {
      flex:1,
      fontFamily: 'Quicksand-Medium',
      fontSize: 24,
      fontWeight: '200',
      textAlign: 'center',
    },
    headerRight: <View />
  })

  showPassword = () => {
    this.setState({showPassword: !this.state.showPassword, press: !this.state.press });
  }

  onFocus = () => {
    this.setState({keyboardShow: true})
  }
  
  onBlur = () => {
    this.setState({keyboardShow: false})
  }

  renderFormBody = () => {
    return (
      <View>
        <TextField 
            label="Username"
            value={this.state.username}
            onChangeText={username => this.setState({ username })}
            textColor="rgba(255,255,255,.7)"
            fontSize={20}
        style={{width: WIDTH -80}}
            baseColor="rgba(255,255,255,.7)"
        />
        <TextField 
            label="Password"
            textColor="rgba(255,255,255,.7)"
            fontSize={20}
            baseColor="rgba(255,255,255,.7)"
            value={this.state.password}
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
        />
        <TextField 
            label="Confirm Password"
            textColor="rgba(255,255,255,.7)"
            fontSize={20}
            baseColor="rgba(255,255,255,.7)"
            value={this.state.confirmPassword}
            secureTextEntry={true}
            onChangeText={confirmPassword => this.setState({ confirmPassword })}
        />
      </View>
    );
  }

  openDatePicker = async () => {
    Keyboard.dismiss();
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        const formattedDay = day.toString().length < 2 ? `0${day}`:day;
        const formattedMonth = month.toString().length < 2? `0${month}` : month;
        this.setState({dob: [formattedDay,month+1, year].join('-')});
        console.log('open succeeded')
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  render() {
    return (
        <ImageBackground source={bgImage} style={styles.backgroundContainer}>
          <ScrollView keyboardDismissMode='on-drag'
            keyboardShouldPersistTaps={'always'} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
            <TouchableWithoutFeedback style={styles.backgroundContainer} onPress={Keyboard.dismiss}>
            <KeyboardAwareScrollView style={{width: WIDTH, paddingLeft: 40, paddingRight: 40, paddingBottom: 90}}>
                {/* <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo}></Image>
                    <Text style={styles.logoText}>Registration</Text>
                </View> */}
                <Sae
                    label={'Username'}
                    iconClass={Ionicons}
                    iconName={'ios-person-outline'}
                    iconColor={'#17ac71'}
                    iconSize={30}
                    inputStyle={{fontFamily: 'Quicksand-Regular', color:'#17ac71'}}
                    // TextInput props
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    returnKeyType='done'
                    onChangeText={username => this.setState({username})}
                />
                <View><Text style={{color:'#ff0000', fontFamily:'Quicksand-Regular'}}></Text></View>
                <Sae
                    label={'Email Address'}
                    iconClass={SimpleLineIcons}
                    iconName={'envelope'}
                    iconColor={'#17ac71'}
                    iconSize={20}
                    inputStyle={{fontFamily: 'Quicksand-Regular', color:'#17ac71'}}
                    // TextInput props
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    keyboardType={'email-address'}
                    returnKeyType='done'
                    onChangeText={email => this.setState({email})}
                />
                <View><Text style={{color:'#ff0000', fontFamily:'Quicksand-Regular'}}></Text></View>
                <Sae
                    label={'Password'}
                    iconClass={Ionicons}
                    iconName={'ios-lock-outline'}
                    iconColor={'#17ac71'}
                    iconSize={20}
                    inputStyle={{fontFamily: 'Quicksand-Regular', color:'#17ac71'}}
                    // TextInput props
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    secureTextEntry={true}
                    returnKeyType='done'
                    onChangeText={password => this.setState({password})}
                />
                <View><Text style={{color:'#ff0000', fontFamily:'Quicksand-Regular'}}></Text></View>
                <Sae
                    label={'Confirm Password'}
                    iconClass={Ionicons}
                    iconName={'ios-lock-outline'}
                    iconColor={'#17ac71'}
                    iconSize={20}
                    inputStyle={{fontFamily: 'Quicksand-Regular', color:'#17ac71'}}
                    // TextInput props
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    secureTextEntry={true}
                    returnKeyType='done'
                    onChangeText={confirmPassword => this.setState({confirmPassword})}
                />
               <View style={{flexDirection:"row"}}>
                    <View>
                        <Sae
                            style={{width: WIDTH/2-45, marginRight: 10}}
                            label={'First Name'}
                            iconClass={SimpleLineIcons}
                            iconName={'pencil'}
                            iconColor={'#17ac71'}
                            iconSize={0}
                            inputStyle={{fontFamily: 'Quicksand-Regular', color:'#17ac71'}}
                            
                            // TextInput props
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            returnKeyType='done'
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                        />
                        <View><Text style={{color:'#ff0000', fontFamily:'Quicksand-Regular'}}></Text></View>
                    </View>
                    <View>
                        <Sae
                            style={{width: WIDTH/2-45}}
                            label={'Last Name'}
                            iconClass={SimpleLineIcons}
                            iconName={'pencil'}
                            iconColor={'#17ac71'}
                            iconSize={0}
                            input
                            inputStyle={{fontFamily: 'Quicksand-Regular', color:'#17ac71'}}
                            // TextInput props
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            returnKeyType='done'
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                        />
                        <View><Text style={{color:'#ff0000', fontFamily:'Quicksand-Regular'}}></Text></View>
                    </View>
                </View>
                <View style={{flexDirection:"row"}}>
                    <View>
                    <Drowdown 
                      containerStyle={{width: WIDTH/2-45, marginRight: 10}}
                      label="Title" 
                      baseColor={'#17ac71'}
                      data={this.state.titles}
                      itemTextStyle={{fontSize: 20}}
                      itemTextStyle={{fontFamily:'Quicksand-Regular', color:'#17ac71'}}
                      returnKeyType='done'
                      onChangeText={title => this.setState({title})}
                    />
                    </View>
                    <View>
                      <Drowdown 
                        containerStyle={{width: WIDTH/2-45, marginRight: 10}}
                        label="Gender" 
                        baseColor={'#17ac71'}
                        data={this.state.genders}
                        itemTextStyle={{fontSize: 20}}
                        itemTextStyle={{fontFamily:'Quicksand-Regular', color:'#17ac71'}}
                        returnKeyType='done'
                      />
                        <View><Text style={{color:'#ff0000', fontFamily:'Quicksand-Regular'}}></Text></View>
                    </View>
                </View>
                <Sae
                  style={{width: WIDTH/2-45, marginRight: 10, top: -15,}}
                  label={'DOB'}
                  iconClass={SimpleLineIcons}
                  iconName={'pencil'}
                  iconColor={'#17ac71'}
                  iconSize={0}
                  inputStyle={{fontFamily: 'Quicksand-Regular', color:'#17ac71'}}
                  
                  // TextInput props
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  onFocus={() => this.openDatePicker()}
                  value={this.state.dob}
                  returnKeyType='done'
              />
              <View><Text style={{color:'#ff0000', fontFamily:'Quicksand-Regular'}}></Text></View>
                
            </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>
          </ScrollView>
            <View>
                <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#021B79','#0575E6' ]}
                    locations={[0,0.7]}
                    style={styles.btnLogin}>
                    <Text style={styles.textLogin}>
                    CREATE ACCOUNT
                    </Text>
                </LinearGradient>
            </View>
        </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    alignItems: 'center',
    width: null,
    height: null,
    justifyContent: 'center',
    backgroundColor: '#0e72ec'
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 0,
  },
  logo: {
    // width: 110,
    // height: 149,
  },
  logoText: {
    color: '#17ac71',
    fontSize: 40,
    fontFamily: 'Quicksand-Regular',
    opacity: 0.7,
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    width: null,
    height: 55,
    borderRadius: 45,
    fontSize: 18,
    fontFamily: 'Quicksand-Bold',
    paddingLeft: 45,
    color: 'rgba(255,255,255,.7)',
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
    marginTop: 10,
    marginBottom: 10,
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
  },
  scrollView: {
    width: null,
    // paddingTop: 45,
    paddingBottom: 50,
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

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen);