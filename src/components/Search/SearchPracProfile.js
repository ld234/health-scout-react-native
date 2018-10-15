import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import PracDetail from '../MyPractitioner/MyPractitionerProfileScreen/MyPracDetailTab';
import ProfileHeader from '../MyPractitioner/MyPractitionerProfileScreen/MyPractionerProfileHeader';
import { SCREEN_WIDTH } from '../../constants'; 
import { getProfileInfo, setConnection, resetStates } from '../../actions/practitionerProfile.actions';
import { connect } from 'react-redux';
import stripe from 'tipsi-stripe';
import Ionicon from 'react-native-vector-icons/Ionicons';
stripe.setOptions({
  publishableKey: 'pk_test_OUqtPerqAmIdMxbK8PagM3Ng',
});
const theme = {
  primaryBackgroundColor: 'red',
  secondaryBackgroundColor: 'white',
  primaryForegroundColor: 'blue',
  secondaryForegroundColor: 'green',
  accentColor: 'yellow',
  errorColor: 'orange',
  fontFamily: 'Quicksand-Regular',
};

class SearchPracProfile extends Component{
    constructor(props){
        super(props);
        this.state={
            pracInfo :this.props.navigation.getParam("pracInfo"),
        }
    }

    componentDidMount(){
        this.props.resetStates();
        this.props.getProfileInfo(this.state.pracInfo.pracUsername);
    }

    _renderPaymentModal(){
        const pracUsername = this.state.pracInfo.pracUsername;
        const options = {
            smsAutofillDisabled: true,
            requiredBillingAddressFields: 'zip', // or 'full'
            theme
          };
          stripe.paymentRequestWithCardForm(options)
            .then(response => {
                console.log('Token:',response);
                this.props.setConnection(pracUsername,response.tokenId);
            })
            .catch(error => {
              // Handle error
            });
    }
    static navigationOptions = ({navigation}) => {
        return {
            headerTitleStyle: {flex: 1, textAlign: 'center', fontFamily: 'Quicksand-Medium', fontWeight: '200', fontSize: 24, color:'#17ac71'},
            headerRight: <View></View>,
            headerTransparent: true,
            headerTintColor: '#17ac71',
        }
    }
    render(){
        const pracInfo = this.state.pracInfo;
        const qualifications = this.props.profileState.qualifications;
        const specialities = this.props.profileState.specialities;
        const connect = this.props.profileState.isConnectionSuccess;
        return (
        <ScrollView>
            <ProfileHeader data={pracInfo} />
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
                        <TouchableOpacity onPress={()=>{this._renderPaymentModal()}}>
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
                <PracDetail  qualifications={qualifications} specialities={specialities} pracInfo={pracInfo}/>
            </View>
        </ScrollView>
        );
        
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
})

const mapStateToProps = state => {
    return {
      profileState: state.practitionerProfileState,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProfileInfo: (pracUsername) => dispatch(getProfileInfo(pracUsername)),
        setConnection: (pracUsername, stripeToken) => dispatch(setConnection(pracUsername, stripeToken)),
        resetStates:() => dispatch(resetStates()),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPracProfile);