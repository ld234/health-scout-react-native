/* * * * * * * * * * * * * * * * * * * * * *
 * @Tenzin
 * Description: Reusable header section of profile with images etc
 * and send back after editing 
 * Created:  7 October 2018
 * Last modified:  10 October 2018
 * * * * * * * * * * * * * * * * * * * * * */

import React, {Component} from 'react';
import { ScrollView, StyleSheet,Image, View, Text, Platform,TouchableWithoutFeedback, Keyboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {connect } from 'react-redux';
import { MaterialIndicator } from 'react-native-indicators';

//for getting images from backend
const URL = 'http://10.0.2.2:8888';


// renders the top half of the profile
class MyPractitionerProfileHeader extends Component {
    constructor(props){
        super(props);
    }
    
    render() {
        if(this.props.pracProfileState.isGetProfileInfoPending) return <MaterialIndicator color="#17ac71" />
        return (
            <View style={styles.profileHeaderContainer}>
                <LinearGradient  start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}locations={[0,0.8]} colors={['#167434','#17AC71' ]}locations={[0,0.9]} style={styles.profileGradient}>
                <Image
                    style={styles.profilePic}
                    source={{uri:`${URL}${this.props.pracProfileState.generalInfo.User.profilePic}`}}
                />
                <Text 
                    style={styles.profileName}>
                    {this.props.pracProfileState.generalInfo.User.title} {this.props.pracProfileState.generalInfo.User.fName} {this.props.pracProfileState.generalInfo.User.lName}
                </Text>
                <Text
                    style={styles.practitionerType}>
                    {this.props.pracProfileState.generalInfo.pracType}
                </Text>
                </LinearGradient>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    profilePic:{
        height:150,
        width:150,
        borderRadius:150,
        borderWidth: 5,
        borderColor:'white',
    },
    profileName:{
        paddingTop: 15,
        fontSize: 25,
        fontFamily: 'Quicksand-Medium',
        color: 'white',
    },
    practitionerType:{
        fontSize:15,
        color: 'white',
        fontFamily: 'Quicksand-Regular',
    },
    profileGradient:{
        height: 360,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
   
})

const mapStateToProps = state =>{
    return {
        pracProfileState: state.practitionerProfileState,
    }
}

export default connect(mapStateToProps)( MyPractitionerProfileHeader);