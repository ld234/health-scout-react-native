/* * * * * * * * * * * * * * * * * * * * * *
 * @Tenzin
 * Description: The component for my Practitioner deatil
 * and send back after editing 
 * Created:  7 October 2018
 * Last modified:  10 October 2018
 * * * * * * * * * * * * * * * * * * * * * */

import React, {Component} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import Icon  from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/dist/EvilIcons';
import { Surface} from 'react-native-paper';
import {connect } from 'react-redux';
import {getProfileInfo} from '../../../actions/practitionerProfile.actions';

class MyPracDetailTab extends Component {
    constructor(props){
        super(props);
    }
    
    _renderSpecialities(){
        const specialties = this.props.pracInfo.specialties;

        if(specialties){
            return specialties.map((speciality, idx)=>{
                return(
                <View key={idx} style={styles.specialty}> 
                    <Icon
                        name='plus'
                        color='#green' 
                        style={styles.specialtyIcon}
                    />
                    <Text style={styles.specialtyDetails}>{speciality.specialty}</Text>
                </View>)
            });
        } return null;
    }
    
    _renderQualification(){
        const qualifications = this.props.pracInfo.qualifications;
        if(qualifications){
            return qualifications.map((qualification, idx)=>{
                return(
                <View key={idx} style={styles.qualification}>
                    <Text style={styles.year}>
                        {qualification.graduateYear}
                    </Text>
                    <Text style={styles.qualificationDetail}>
                        {qualification.degree}
                    </Text>
                </View>);
            });
        } return null;
    }
   

    render(){
        const{ businessAddress, serviceProvided, description} = this.props.pracInfo.generalInfo;
        // if(this.props.pracInfo.)
        return(
            <View style={styles.container}>

                <Surface style={styles.wrapper}>
                    
                    <Text style={[styles.title, {alignContent: 'center'}]}>
                        ABOUT DOCTOR
                    </Text>


                    <Text style={styles.description}>
                        {description}
                    </Text>
                </Surface>
                <Surface style={styles.wrapper}>
                    <Text style={[styles.title, {alignContent: 'center'}]}>
                       PRACTICE ADDRESS
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                        <Icon name="location" style={styles.locationIcon}/>
                        <TouchableOpacity>
                            <Text style={styles.address}>{businessAddress}</Text>
                        </TouchableOpacity>
                    </View>
                </Surface>

                <Surface style={styles.wrapper}>
                    <Text style={[styles.title,{flexDirection: 'row'}]}>
                        SPECIALTY
                    </Text>
                    <View>
                        {this._renderSpecialities()}
                    </View>
                </Surface>

                <Surface style={styles.wrapper}>
                    <Text style={[styles.title,{flexDirection: 'row'}]}>
                        SERVICE PROVIDED
                    </Text>
                    <Text style={styles.description}>
                        {serviceProvided}
                    </Text>
                </Surface>
                {/* <View style={styles.hrLine}/> */}

                <Surface style={styles.wrapperLast}>
                    <Text style={[styles.title, {flexDirection: 'row'}]}>
                        QUALIFICATION
                    </Text>
                      {this._renderQualification()}  
                </Surface>



            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: "#efefef",
        flex:1,
        // marginTop:10,
        // paddingLeft: 20,
        // paddingRight: 20
    },
    wrapper:{
        margin:10,
        marginBottom:0,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 3,
    },
    wrapperLast:{
        margin:10,
        backgroundColor: 'white',
        padding: 20,
        elevation: 3,
        borderRadius: 10,
    },

    title:{
        color: '#aaa',
        fontSize: 16,
        fontFamily: 'Quicksand-Bold',
        paddingBottom: 1,

    },
    description:{
        fontSize: 16,
        fontFamily: 'Quicksand-Regular',
    },
    address:{
        fontSize: 16,
        fontFamily: 'Quicksand-Regular',
        textDecorationLine: "underline",
        textShadowColor:"#eaeaea"
    },
    hrLine:{
        marginTop:5,
        marginBottom:5,
        borderBottomColor: '#ccc',
        borderTopWidth: 0,
        borderBottomWidth: 1,
    },
    specialtyIcon:{
        color:'#17ac71',
        top: 3,
        fontSize: 20,
    },
    specialty:{
        paddingVertical:5,
        flexDirection: 'row',
    },
    qualification:{
        flexDirection: 'row',
    },
    year:{
        fontFamily: 'Quicksand-Bold',
        fontSize: 16,
        padding: 15,
        paddingLeft: 25,
    },
    qualificationDetail:{
        fontFamily: 'Quicksand-Medium',
        fontSize: 16,
        padding: 15,
    },
    locationIcon:{
        fontSize: 20,
        top: 5,
        color:'#17ac71',
    },
    specialtyDetails: {
        fontFamily:'Quicksand-Regular',
        fontSize: 16,
    }
    
});


const mapStateToProps = state => {
    return { 
        pracInfo: state.practitionerProfileState,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProfileInfo: username => dispatch(getProfileInfo(username))
    }
}

export default connect(mapStateToProps)(MyPracDetailTab);