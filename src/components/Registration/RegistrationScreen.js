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
import Dropdown from '../Reusable/Dropdown';
import ImagePicker from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import { getUserDetails } from  '../../actions/user.actions';
import axios from 'axios'; 
import _ from 'lodash';
import { Surface} from 'react-native-paper';
import {SCREEN_WIDTH , SCREEN_HEIGHT} from '../../constants';

const URL = 'http://10.0.2.2:8888/user/patient';


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
      avatarSource: '',
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
      err: '',
    }
  }
  static navigationOptions = ({navigation}) => ({
    title: '',
    headerTitleStyle: {flex: 1, textAlign: 'center', fontFamily: 'Quicksand-Medium', fontWeight: '200', fontSize: 24, color:'#17ac71'},
    headerTransparent: true,
    headerTintColor: '#17ac71',
    headerRight: <View />
  })

  showPassword = () => {
    this.setState({showPassword: !this.state.showPassword, press: !this.state.press });
  }

  onFocus = event => {
    const newErr = _.merge(this.state.errors, { [event]: '' });
		this.setState({errors: newErr } );
  };
  

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validateForm = () => {
    const fields = ['username', 'email', 'fName', 'lName', 'dob', 'title', 'gender', 'password', 'confirmPassword'];
    if (!fields.every(name => !_.isEmpty(this.state[name])) || !fields.every(name => _.isEmpty(this.state.errors[name]))) {
      console.log('errors', this.state.errors);
      console.log('state', this.state);
      console.log('not working');
      fields.forEach(field => { 
        this.onFocus(field); 
        this.onBlur(field) });
    } else {
      console.log('errors', this.state.errors);
      this.submitForm();
    }
  };

  resetForm = () => {
    const fields = ['username', 'email', 'fName', 'lName', 'dob', 'title', 'gender', 'password', 'confirmPassword'];
    fields.forEach( field => this.setState({[field] : ''}));
  }

	onBlur = value => {
		if (_.isEmpty(this.state[value])) {
			const newErr = _.merge(this.state.errors, { [value]: '*field required' });
			this.setState({ errors: newErr });
    } else if( value === 'password' &&  !this.state.password.match('^(?=.{8,})(?=.*[0-9].*)(?=.*[A-Za-z].*).*$')) {
      const newErr = _.merge(this.state.errors, { [value]: '*password must be at least 8 characters long, contain both letters and digits' });
      this.setState({ errors: newErr });
    } else if ('confirmPassword' === value) {
      if (this.state.confirmPassword !== this.state.password){
        const newErr = _.merge(this.state.errors, { confirmPassword: '*password does not match', password: '*password does not match' });
			  this.setState({ errors: newErr });
      } else {
        const newErr = _.merge(this.state.errors, { confirmPassword: '', password: '' });
			  this.setState({ errors: newErr });
      }
    } else if (value === 'email' && !this.validateEmail(this.state.email)){
        const newErr = _.merge(this.state.errors, { [value]: '*invalid email address' });
			  this.setState({ errors: newErr });
    } else {
			const newErr = _.merge(this.state.errors, { [value]: '' });
			this.setState({ errors: newErr });
		}
  };

  renderFormBody = () => {
    return (
      <View style={{flex: 1, paddingLeft: 20, 
      paddingRight: 20, paddingBottom: 40, marginRight: 0, marginBottom: 0, borderRadius: 10, backgroundColor: 'transparent' }}>
        <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logo}></Image>
            <Text style={styles.logoText}>Registration</Text>
        </View>
        <View><Text style={{color:'#ff0000', fontFamily:'Quicksand-Regular', textAlign:'center'}}>{this.state.err}</Text></View>
        <Sae
            label={'Username'}
            iconClass={Ionicons}
            iconName={'ios-person-outline'}
            iconColor={'#999'}
            iconSize={30}
            inputStyle={{fontFamily: 'Quicksand-Regular', color:'#09402A'}}
            // TextInput props
            autoCapitalize={'none'}
            autoCorrect={false}
            returnKeyType='done'
            value={this.state.username}
            onBlur={() => this.onBlur('username')}
            onFocus={() => this.onFocus('username')}
            onChangeText={username => this.setState({username})}
        />
        <View><Text style={{color:'#ff0000', fontFamily:'Quicksand-Regular', textAlign:'right'}}>{this.state.errors.username}</Text></View>
        <Sae
            label={'Email Address'}
            iconClass={SimpleLineIcons}
            iconName={'envelope'}
            iconColor={'#999'}
            iconSize={20}
            inputStyle={{fontFamily: 'Quicksand-Regular', color:'#09402A'}}
            // TextInput props
            autoCapitalize={'none'}
            autoCorrect={false}
            keyboardType={'email-address'}
            returnKeyType='done'
            onChangeText={email => this.setState({email})}
            value={this.state.email}
            onBlur={() => this.onBlur('email')}
            onFocus={() => this.onFocus('email')}
        />
        <View><Text style={{color:'#ff0000', fontFamily:'Quicksand-Regular', textAlign:'right'}}>{this.state.errors.email}</Text></View>
        <Sae
            label={'Password'}
            iconClass={Ionicons}
            iconName={'ios-lock-outline'}
            iconColor={'#999'}
            iconSize={20}
            inputStyle={{fontFamily: 'Quicksand-Regular', color:'#09402A'}}
            // TextInput props
            autoCapitalize={'none'}
            autoCorrect={false}
            secureTextEntry={true}
            returnKeyType='done'
            onChangeText={password => this.setState({password})}
            value={this.state.password}
            onBlur={() => this.onBlur('password')}
            onFocus={() => this.onFocus('password')}
        />
        <View><Text style={{color:'#ff0000', fontFamily:'Quicksand-Regular', textAlign:'right'}}>{this.state.errors.password}</Text></View>
        <Sae
            label={'Confirm Password'}
            iconClass={Ionicons}
            iconName={'ios-lock-outline'}
            iconColor={'#999'}
            iconSize={20}
            inputStyle={{fontFamily: 'Quicksand-Regular', color:'#09402A'}}
            // TextInput props
            autoCapitalize={'none'}
            autoCorrect={false}
            secureTextEntry={true}
            returnKeyType='done'
            onChangeText={confirmPassword => this.setState({confirmPassword})}
            value={this.state.confirmPassword}
            onBlur={() => this.onBlur('confirmPassword')}
            onFocus={() => this.onFocus('confirmPassword')}
        />
        <View><Text style={{color:'#ff0000', fontFamily:'Quicksand-Regular', textAlign:'right'}}>{this.state.errors.confirmPassword}</Text></View>
        <View style={{flexDirection:"row"}}>
            <View>
                <Sae
                    style={{width: WIDTH/2-45, marginRight: 10}}
                    label={'First Name'}
                    iconClass={SimpleLineIcons}
                    iconName={'pencil'}
                    iconColor={'#999'}
                    iconSize={0}
                    inputStyle={{fontFamily: 'Quicksand-Regular', color:'#09402A'}}
                    
                    // TextInput props
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    returnKeyType='done'
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    onChangeText={fName => this.setState({fName})}
                    value={this.state.fName}
                    onBlur={() => this.onBlur('fName')}
                    onFocus={() => this.onFocus('fName')}
                />
                <View><Text style={{color:'#ff0000', fontFamily:'Quicksand-Regular', textAlign:'right'}}>{this.state.errors.fName}</Text></View>
            </View>
            <View>
                <Sae
                    style={{width: WIDTH/2-45}}
                    label={'Last Name'}
                    iconClass={SimpleLineIcons}
                    iconName={'pencil'}
                    iconColor={'#999'}
                    iconSize={0}
                    input
                    inputStyle={{fontFamily: 'Quicksand-Regular', color:'#09402A'}}
                    // TextInput props
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    returnKeyType='done'
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    onChangeText={lName => this.setState({lName})}
                    value={this.state.lName}
                    onBlur={() => this.onBlur('lName')}
                    onFocus={() => this.onFocus('lName')}
                />
                <View><Text style={{color:'#ff0000', fontFamily:'Quicksand-Regular', textAlign:'right'}}>{this.state.errors.lName}</Text></View>
            </View>
        </View>
        <View style={{flexDirection:"row",marginTop: 10}}>
            <View>
              <Dropdown 
                containerStyle={{width: WIDTH/2-45, marginRight: 5, marginBottom: 5}}
                label="Title" 
                baseColor={'#999'}
                data={this.state.titles}
                itemTextStyle={{fontSize: 20}}
                itemTextStyle={{fontFamily:'Quicksand-Regular', color:'#09402A'}}
                returnKeyType='done'
                onChangeText={title => this.setState({title})}
                onBlur={() => this.onBlur('title')}
                onFocus={() => { this.onFocus('title'); Keyboard.dismiss()}}
              />
              <View><Text style={{color:'#ff0000', fontFamily:'Quicksand-Regular', 
                textAlign:'right', paddingRight: 10}}>{this.state.errors.title}</Text></View>
            </View>
            <View>
              <Dropdown 
                containerStyle={{width: WIDTH/2-45, marginRight: 10}}
                label="Gender" 
                baseColor={'#999'}
                data={this.state.genders}
                itemTextStyle={{fontSize: 20}}
                itemTextStyle={{fontFamily:'Quicksand-Regular', color:'#09402A'}}
                returnKeyType='done'
                onChangeText={gender => this.setState({gender})}
                onBlur={() => this.onBlur('gender')}
                onFocus={() => {this.onFocus('gender'); Keyboard.dismiss();}}
              />
              <View><Text style={{color:'#ff0000', fontFamily:'Quicksand-Regular', 
                textAlign:'right', paddingRight: 10}}>{this.state.errors.gender}</Text></View>
            </View>
        </View>
        <Sae
          style={{width: WIDTH/2-45, marginRight: 10, top:-10,}}
          label={'DOB'}
          iconClass={SimpleLineIcons}
          iconName={'pencil'}
          iconColor={'#999'}
          iconSize={0}
          inputStyle={{fontFamily: 'Quicksand-Regular', color:'#09402A'}}
          
          // TextInput props
          autoCapitalize={'none'}
          autoCorrect={false}
          onFocus={() => this.openDatePicker()}
          value={this.state.dob}
          returnKeyType='done'
        />
        <View><Text style={{color:'#ff0000', fontFamily:'Quicksand-Regular', textAlign:'right'}}>{this.state.errors.dob}</Text></View>
        <Sae
          style={{ top:-5,}}
          label={'Profile Picture'}
          iconClass={SimpleLineIcons}
          iconName={'pencil'}
          iconColor={'#999'}
          iconSize={0}
          inputStyle={{fontFamily: 'Quicksand-Regular', color:'#09402A'}}
          
          // TextInput props
          autoCapitalize={'none'}
          autoCorrect={false}
          onFocus={() => this.openImagePicker()}
          // onBlur={() => this.onBlur('profilePic')}
          value={this.state.avatarSource.uri}
          returnKeyType='done'
        />
        <View><Text style={{color:'#ff0000', fontFamily:'Quicksand-Regular', textAlign:'right'}}>{this.state.errors.profilePic}</Text></View>
    </View>
    );
  }

  openImagePicker = () => {
    Keyboard.dismiss();
    const options = {
      title: 'Select profile picture',
      // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { 
          uri: response.uri, 
          name: response.fileName,
          type: response.type, };
        
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    
        this.setState({
          avatarSource: source,
        });
      }
    });
  }

  submitForm = () => {
    const { email, username, password, avatarSource, dob, gender, fName, lName, title } = this.state;
    let formdata = new FormData();

    formdata.append('email', email);
    formdata.append('username', username);
    formdata.append('password', password);
    formdata.append('dob', dob);
    formdata.append('title', title)
    formdata.append('gender',gender);
    formdata.append('fName', fName);
    formdata.append('lName', lName);
    if (!_.isEmpty(this.state.avatarSource))
      formdata.append('profilePic', avatarSource);
    this.userDetailsCheck()
    .then(res => {
      const resArray = res && res.data;
      if (resArray.length !== 0) {
        this.setState({ err: 'Username or email already existed.' });
        this.scrollViewRef.scrollTo({x: 0, y: 0, animated: true});
      } else{
        axios.post(URL, formdata)
        .then(res => {
          console.log('successful creation');
          this.resetForm();
        })
        .catch(err => {
          if (err.response && err.response.data)
            this.setState({err: err.response.data.message})
          this.scrollViewRef.scrollTo({x: 0, y: 0, animated: true});
          console.log('reg err', err);
        });
      }
    })
    .catch(({ response }) => {
      console.log('username error', response);
      const errorMsg = response && response.data && response.data.message;
      this.setState({ err: errorMsg }, () => {
        this.scrollViewRef.scrollTo({x: 0, y: 0, animated: true});
      });
    });
    
  }

  userDetailsCheck = () => {
    return axios({
			method: 'post',
			url: 'http://10.0.2.2:8888/user/checkUserDetails',
			data: {
				username: this.state.username,
				email: this.state.email,
			},
		})
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
        this.setState({dob: [formattedDay,month+1, year].join('-')});
      } 
      this.onBlur('dob');
      
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  render() {
    return (
        <ImageBackground source={''} style={styles.backgroundContainer}>
          <LinearGradient style={{
            position:'absolute',
            top:0,
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT*.3,
          }} start={{x: 0.0, y: 0.85}} end={{x: 0.7, y: 1.0}}
          locations={[0,0.4]} colors={['#167434','#17AC71']}
          locations={[0.4,0.9]} >
          </LinearGradient>
                    
          <Surface style={{width: WIDTH*0.9, height: SCREEN_HEIGHT *0.74, marginTop:60, paddingBottom: 0,  borderRadius: 20, backgroundColor: '#FFF', elevation: 10} }>
          <ScrollView 
            ref={ref => this.scrollViewRef = ref}
            style={{marginLeft:0, marginRight: 0}}
            keyboardShouldPersistTaps={'always'} 
            showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
            <TouchableWithoutFeedback style={styles.backgroundContainer} onPress={Keyboard.dismiss}>
              {this.renderFormBody()}
            </TouchableWithoutFeedback>
          </ScrollView>
          </Surface>
            <View style={{alignItems: 'center', height: 100, position: 'relative',bottom:-10}}>
              <TouchableOpacity onPress={() => {
                this.validateForm();
              }}>
                <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#021B79','#0575E6' ]}
                    locations={[0,0.7]}
                    style={styles.btnLogin}>
                    <Text style={styles.textLogin}>
                    CREATE ACCOUNT
                    </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          
        </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    alignItems: 'center',
    width: SCREEN_WIDTH,
    height: null,
    justifyContent: 'center',
    // alignSelf: 'stretch',//TODO: Importate para que la imagen abarque toda la pantalla
    backgroundColor : 'transparent',
  },
  contentContainer: {
    flex : 1,
    // paddingHorizontal: 20,
    // paddingVertical: 20,
    overflow:'visible',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  logoContainer: {
    paddingTop: 40,
    alignItems: 'center',
    marginBottom: 0,
  },
  logo: {
    width: 72,
    height: 98,
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
    login: (username, password, cb) => dispatch(login(username, password, cb)),
    // getUserDetails: (cb) => dispatch(getUserDetails(cb)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen);