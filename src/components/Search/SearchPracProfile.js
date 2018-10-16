import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import PracDetail from '../MyPractitioner/MyPractitionerProfileScreen/MyPracDetailTab';
import ProfileHeader from '../MyPractitioner/MyPractitionerProfileScreen/MyPractionerProfileHeader';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../constants'; 
import { getProfileInfo, setConnection, resetStates } from '../../actions/practitionerProfile.actions';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
// import stripe from 'tipsi-stripe';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Sae } from 'react-native-textinput-effects';
import { MaterialIndicator } from 'react-native-indicators';
import MaterialIconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import _ from 'lodash';
// stripe.setOptions({
// //   merchantId: 'com.healthscout',
//   androidPayMode: 'test',
//   publishableKey: 'pk_test_MtzOuiItf07GsAJgk1AT5KeQ',
// });

import Stripe from 'react-native-stripe-api';
import CreditCard from 'react-native-credit-card';
import {showMessage} from 'react-native-flash-message';

const apiKey = 'pk_test_MtzOuiItf07GsAJgk1AT5KeQ';
const client = new Stripe(apiKey);

// Create a Stripe token with new card infos


const theme = {
  primaryBackgroundColor: '#17ac71',
  secondaryBackgroundColor: 'white',
  primaryForegroundColor: '#17ac71',
  secondaryForegroundColor: 'green',
  accentColor: 'yellow',
  errorColor: 'orange',
  fontFamily: 'Quicksand-Regular',
};

class SearchPracProfile extends Component{
    constructor(props){
        super(props);
        this.state={
            pracInfo : this.props.navigation.getParam(),
            modal: false,
            goal: '',
            conditions:'',
            message:'',
            errors: {},
            cardState: false,
            expMonth: '',
            expYear: '',
            cvv: '',
            cardNum: '',
        }
    }

    componentDidMount(){
        this.props.resetStates();
        this.props.getProfileInfo(this.props.navigation.getParam('pracUsername'));
    }

    validateForm = () => {
        let valid = true;
        const fields = ['goal', 'conditions', 'message'];
        if (!fields.every(name => !_.isEmpty(this.state[name]))) {
            this.onBlur('goal');
            this.onBlur('conditions');
            this.onBlur('message');
            valid = false;
        }
        if (valid) {
            this.setState({cardState: true})
        }
    }

    renderCardForm = () => {
        return (
            <ScrollView
            //   ref={ref => (this.scrollViewRef = ref)}
              keyboardShouldPersistTaps={'always'}
              showsVerticalScrollIndicator={false} 
              style={{position: 'relative'}} 
            //   onScroll={this.handleOnScroll}
              contentContainerStyle={styles.longModal} >
              <View><Text style={{color:'#ff0000', fontFamily:'Quicksand-Regular', textAlign:'center'}}>
                {/* {this.props.con.addFamilyConditionError}  */}
              </Text></View>
              {/* <View style={{flex: 1, heigth: 300}}>
                <CreditCard
                    // type={this.state.type}
                    // imageFront={require('./images/card-front.png')}
                    // imageBack={require('./images/card-back.png')}
                    shiny={false}
                    bar={false}
                    focused={this.state.focused}
                    number={this.state.cardNum}
                    name={this.state.name}
                    expiry={this.state.expMonth+this.state.expYear}
                    cvc={this.state.cvv}/>
              </View> */}
            <View style={{width: SCREEN_WIDTH*0.78, marginRight: 10}}>
            <Sae
                style={{width: SCREEN_WIDTH*0.78, marginRight: 10}}
                label={'Card Number'}
                iconName={'pencil'}
                iconColor={'#17ac71'}
                iconSize={0}
                inputStyle={{fontFamily: 'Quicksand-Regular', color:'#17ac71'}}
                iconClass={MaterialIconCommunity}
                
                // TextInput props
                onBlur={() => this.onBlur('cardNum')}
                onFocus={() => this.onFocus('cardNum')}
                autoCapitalize={'none'}
                autoCorrect={false}
                returnKeyType='done'
                value={!_.isEmpty(this.state.cardNum) ? (this.state.cardNum.match(/[0-9]{1,4}/g)).join(' '): this.state.cardNum}
                onChangeText={cardNum => this.setState({cardNum: cardNum.replace(/\s/g, "").slice(0,16) })}
            />
            <View><Text style={{color:'#ff0000', fontFamily:'Quicksand-Regular', textAlign:'right'}}>{this.state.errors.conditions}</Text></View>
            </View>
            <View style={{flexDirection: 'row'}}>
            <Sae
                style={{width: SCREEN_WIDTH*0.4, marginRight: 10}}
                label={'Exp. Date'}
                iconName={'pencil'}
                iconColor={'#17ac71'}
                iconSize={0}
                inputStyle={{fontFamily: 'Quicksand-Regular', color:'#17ac71'}}
                iconClass={MaterialIconCommunity}
                
                // TextInput props
                autoCapitalize={'none'}
                autoCorrect={false}
                returnKeyType='done'
                value={this.state.expMonth.concat(this.state.expYear)}
                onChangeText={text => {
                    this.setState({expMonth: text.slice(0,2)})
                    this.setState({expYear: text.slice(2,4)})
                }}
                // onBlur={() => { this.onBlur('expYear'); this.onBlur('expMonth'); }}
                // onFocus={() => this.onFocus('expMonth')}
            />
            <View><Text style={{color:'#ff0000', fontFamily:'Quicksand-Regular', textAlign:'right'}}>{this.state.errors.goal}</Text></View>
            <Sae
                style={{width: SCREEN_WIDTH*0.3, marginRight: 10}}
                label={'CVV'}
                iconName={'pencil'}
                iconColor={'#17ac71'}
                iconSize={0}
                inputStyle={{fontFamily: 'Quicksand-Regular', color:'#17ac71'}}
                iconClass={MaterialIconCommunity}
                
                // TextInput props
                autoCapitalize={'none'}
                autoCorrect={false}
                returnKeyType='done'
                value={this.state.cvv}
                onChangeText={cvv => this.setState({cvv})}
                onBlur={() => this.onBlur('cvv')}
                multiline={true}
                onFocus={() => this.onFocus('cvv')}
            />
            <View><Text style={{color:'#ff0000', fontFamily:'Quicksand-Regular', textAlign:'right'}}>{this.state.errors.cvv}</Text></View>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={() => {
                this.submitForm();
            }}>
                <Text style={styles.closeButtonText}>PAY NOW</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => {
                this.toggleModal();
            }}>
                <Text style={styles.cancelButtonText}>CANCEL</Text>
            </TouchableOpacity>
            </ScrollView>
        );
    }

    resetForm = () => {
        this.setState({goal: '', conditions: '', message: '', cardNum: '', expMonth: '', expYear: '', cvv: ''});
    }
 
    toggleModal = () =>this.setState({modal: !this.state.modal});

    onFocus = event => {
        const newErr = _.merge(this.state.errors, { [event]: null });
            this.setState({errors: newErr});
        };
    
    onBlur = value => {
        if (_.isEmpty(this.state[value])) {
            const newErr = _.merge(this.state.errors, { [value]: '*field required' });
            this.setState({ errors: newErr });
        } else {
            const newErr = _.merge(this.state.errors, { [value]: null });
            this.setState({ errors: newErr });
        }
    };

    renderFormContent = () => {
        return (
            <ScrollView
              ref={ref => (this.scrollViewRef = ref)}
              keyboardShouldPersistTaps={'always'}
              showsVerticalScrollIndicator={false} 
              style={{position: 'relative'}} 
              onScroll={this.handleOnScroll}
              contentContainerStyle={styles.longModal} >
              <View><Text style={{color:'#ff0000', fontFamily:'Quicksand-Regular', textAlign:'center'}}>
                {/* {this.props.con.addFamilyConditionError}  */}
              </Text></View>
            <Sae
                style={{width: SCREEN_WIDTH*0.78, marginRight: 10}}
                label={'Health Condition'}
                iconName={'pencil'}
                iconColor={'#17ac71'}
                iconSize={0}
                inputStyle={{fontFamily: 'Quicksand-Regular', color:'#17ac71'}}
                iconClass={MaterialIconCommunity}
                
                // TextInput props
                onBlur={() => this.onBlur('conditions')}
                onFocus={() => this.onFocus('conditions')}
                autoCapitalize={'none'}
                autoCorrect={false}
                returnKeyType='done'
                value={this.state.conditions}
                onChangeText={conditions => this.setState({conditions})}
            />
            <View><Text style={{color:'#ff0000', fontFamily:'Quicksand-Regular', textAlign:'right'}}>{this.state.errors.conditions}</Text></View>
            <Sae
                style={{width: SCREEN_WIDTH*0.78, marginRight: 10}}
                label={'Health Goal'}
                iconName={'pencil'}
                iconColor={'#17ac71'}
                iconSize={0}
                inputStyle={{fontFamily: 'Quicksand-Regular', color:'#17ac71'}}
                iconClass={MaterialIconCommunity}
                
                // TextInput props
                autoCapitalize={'none'}
                autoCorrect={false}
                returnKeyType='done'
                value={this.state.goal}
                onChangeText={goal => this.setState({goal})}
                onBlur={() => this.onBlur('goal')}
                // multiline={true}
                onFocus={() => this.onFocus('goal')}
            />
            <View><Text style={{color:'#ff0000', fontFamily:'Quicksand-Regular', textAlign:'right'}}>{this.state.errors.goal}</Text></View>
            <Sae
                style={{width: SCREEN_WIDTH*0.78, marginRight: 10}}
                label={'Message'}
                iconName={'pencil'}
                iconColor={'#17ac71'}
                iconSize={0}
                inputStyle={{fontFamily: 'Quicksand-Regular', color:'#17ac71'}}
                iconClass={MaterialIconCommunity}
                
                // TextInput props
                autoCapitalize={'none'}
                autoCorrect={false}
                returnKeyType='done'
                value={this.state.message}
                onChangeText={message => this.setState({message})}
                onBlur={() => this.onBlur('message')}
                multiline={true}
                onFocus={() => this.onFocus('message')}
            />
            <View><Text style={{color:'#ff0000', fontFamily:'Quicksand-Regular', textAlign:'right'}}>{this.state.errors.message}</Text></View>
            <TouchableOpacity style={styles.closeButton} onPress={() => {
                this.validateForm();
            }}>
                <Text style={styles.closeButtonText}>CONNECT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => {
              this.toggleModal();
            }}>
                <Text style={styles.cancelButtonText}>CANCEL</Text>
            </TouchableOpacity>
            </ScrollView>
        )
    }

    _renderPaymentModal(){
        const pracUsername = this.props.navigation.getParam('pracUsername');
        const options = {
            smsAutofillDisabled: true,
            requiredBillingAddressFields: 'zip', // or 'full'
            theme
        };
        return (
                <Modal 
                    style={{alignContent:'center', paddingTop: 50}}
                    scrollTo={this.handleScrollTo}
                    onBackButtonPress={this.toggleModal}
                    scrollOffset={this.state.scrollOffset}
                    style={{marginTop: SCREEN_HEIGHT* 0.2}}
                    // onSwipe={this.toggleModal} swipeDirection="up" 
                    onBackdropPress={this.toggleModal} isVisible={this.state.modal}>
                    {this.state.cardState? this.renderCardForm(): this.renderFormContent()}
                </Modal>
            );
        // stripe.paymentRequestWithCardForm()
        //     .then(response => {
        //         console.log('Token:',response);
        //         this.props.setConnection(pracUsername,response.tokenId);
        //     })
        //     .catch(error => {
        //         console.log('Stripe token failed');
        //     });
    }
    static navigationOptions = ({navigation}) => {
        return {
            headerTitleStyle: {flex: 1, textAlign: 'center', fontFamily: 'Quicksand-Medium', fontWeight: '200', fontSize: 24, color:'#17ac71'},
            headerRight: <View></View>,
            headerTransparent: true,
            headerTintColor: 'white',
        }
    }

    submitForm = () => {
        const { cardNum, expMonth, expYear, cvv } = this.state;
        console.log({ cardNum, expMonth, expYear, cvv });
        client.createToken({
            number: cardNum ,
            exp_month: expMonth, 
            exp_year: expYear, 
            cvc: cvv,
        }).then(stripeToken => {
            const pracUsername = this.props.navigation.getParam('pracUsername');
            console.log('stripe token created', stripeToken);
            this.props.setConnection(pracUsername, stripeToken.id, () => {
                this.toggleModal(); 
                showMessage({
                    message: 'Connect successfully.',
                    type: 'success',
                    description: 'Please wait for practitioner to accept your connection.'
                })
            });
            this.resetForm();
        })
    }

    render(){
        if(this.props.profileState.isConnectionError){
            showMessage({
                message: 'Connect Error.',
                type: 'danger',
                description: this.props.profileState.isConnectionError.data? this.props.profileState.setConnectionError.data.message: 'Please check the details you provided.'
            })
        }
        const pracInfo = this.props.profileState.generalInfo;
        const qualifications = this.props.profileState.qualifications;
        const specialities = this.props.profileState.specialities;
        const connect = this.props.profileState.isConnectionSuccess;
        if (this.props.profileState.isGetProfileInfoPending) return <MaterialIndicator color={'#17ac71'} />
        else if (this.props.profileState.isGetProfileInfoSuccess) 
        return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <ProfileHeader />
                <View style={styles.btnContainer}>
                    {connect? 
                        <View
                            style={styles.btnLogin}>
                            <Ionicon name="md-person-add" style={styles.addIcon}/>
                            <Text style={styles.textLogin}>
                            CONNECTED
                            </Text>
                        </View>
                        :
                        <TouchableOpacity onPress={()=>{this.toggleModal()}}>
                        <View
                            style={styles.btnLogin}>
                            <Ionicon name="md-person-add" style={styles.addIcon}/>
                            <Text style={styles.textLogin}>
                            CONNECT
                            </Text>
                        </View>
                        </TouchableOpacity>}
                </View>
            <View style={styles.detail}>
                <PracDetail qualifications={qualifications} specialities={specialities} pracInfo={pracInfo}/>
            </View>
            {this._renderPaymentModal()}
            
        </ScrollView>
        );
        else return <MaterialIndicator color={'#17ac71'} />
        
    }
} 

const styles = StyleSheet.create({
    btnContainer:{
        height: 70,
        zIndex: 1,
        position: 'relative',
        top: -85,
        width: SCREEN_WIDTH,
        // textAlign: 'center',
        flex:1,
        alignItems:'center',
        justifyContent:'center',    
    },
    btnLogin: {
        width: SCREEN_WIDTH - 190,
        height: 45,
        borderRadius: 45,
        backgroundColor: 'white',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems:'center',
        marginTop: 20,
        elevation: 5
    },
    textLogin: {
        color:'#17ac71',
        fontFamily: 'Quicksand-Medium',
        fontSize: 18,
        textAlign: 'center',
        paddingLeft: 10,
    },
    detail:{
        position: 'relative',
        top: -80,
    },
    addIcon:{
        fontSize:20,
        color: '#17ac71'
    },
    longModal:{
        height: SCREEN_HEIGHT - 300,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        paddingLeft: 25,
        paddingTop: 5,
        paddingBottom: 50,
        paddingRight: 25,
    },
    closeButtonText:{
        fontFamily: 'Quicksand-Medium',
        fontSize: 16,
        color: '#17ac71',
        position:'absolute',
        right: 0,
    },
    cancelButtonText:{
        fontFamily: 'Quicksand-Medium',
        fontSize: 16,
        color: '#17ac71',
        position:'absolute',
        right: 0,
    },
    cancelButton: {
        width: 65,
        height: 50,
        alignItems: 'center',
        position: 'absolute',
        right: 100,
        bottom: -5,
    },
    closeButton: {
        width: 95,
        height: 50,
        alignItems: 'center',
        position: 'absolute',
        right: 15,
        bottom: -5,
    },
})

const mapStateToProps = state => {
    return {
      profileState: state.practitionerProfileState,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProfileInfo: (pracUsername) => dispatch(getProfileInfo(pracUsername)),
        setConnection: (pracUsername, stripeToken, callback) => dispatch(setConnection(pracUsername, stripeToken, callback)),
        resetStates:() => dispatch(resetStates()),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPracProfile);