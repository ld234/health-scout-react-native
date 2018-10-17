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
        this.state={
            description:"A passionate dietition working in the field for more than ten years and worked with numerous number of clients to solve their health issues",
            test:"Far concluded not his something extremity. Want four we face an he gate. On he of played he ladies answer little though nature. Blessing oh do pleasure as so formerly. Took four spot soon led size you. Outlived it received he material. Him yourself joy moderate off repeated laughter outweigh screened. Not him old music think his found enjoy merry. Listening acuteness dependent at or an. Apartments thoroughly unsatiable terminated sex how themselves. She are ten hours wrong walls stand early. Domestic perceive on an ladyship extended received do. Why jennings our whatever his learning gay perceive. Is against no he without subject. Bed connection unreserved preference partiality not unaffected. Years merit trees so think in hoped we as. Perceived end knowledge certainly day sweetness why cordially. Ask quick six seven offer see among. Handsome met debating sir dwelling age material. As style lived he worse dried. Offered related so visitor we private removed. Moderate do subjects to distance. By spite about do of do allow blush. Additions in conveying or collected objection in. Suffer few desire wonder her object hardly nearer. Abroad no chatty others my silent an. Fat way appear denote who wholly narrow gay settle. Companions fat add insensible everything and friendship conviction themselves. Theirs months ten had add narrow own.   Believing neglected so so allowance existence departure in. In design active temper be uneasy. Thirty for remove plenty regard you summer though. He preference connection astonished on of ye. Partiality on or continuing in particular principles as. Do believing oh disposing to supported allowance we.  Remember outweigh do he desirous no cheerful. Do of doors water ye guest. We if prosperous comparison middletons at. Park we in lose like at no. An so to preferred convinced distrusts he determine. In musical me my placing clothes comfort pleased hearing. Any residence you satisfied and rapturous certainty two. Procured outweigh as outlived so so. On in bringing graceful proposal blessing of marriage outlived. Son rent face our loud near. Sentiments two occasional affronting solicitude travelling and one contrasted. Fortune day out married parties. Happiness remainder joy but earnestly for off. Took sold add play may none him few. If as increasing contrasted entreaties be. Now summer who day looked our behind moment coming. Pain son rose more park way that. An stairs as be lovers uneasy. ",
            address:"Northfields Ave, Wollongong NSW 2522",
        }
    }

    _renderSpecialities(){
        const specialties = this.props.pracInfo.specialties;
        console.log('specialties2:',specialties);

        if(specialties){
            console.log('rend')
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
        console.log('qualifications',qualifications);
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
        // borderLeftColor:'green',
        // borderLeftWidth:10,
    },
    wrapperLast:{
        margin:10,
        backgroundColor: 'white',
        padding: 20,
        elevation: 3,
        borderRadius: 10,
        // borderLeftColor:'green',
        // borderLeftWidth:10,

        // borderLeftColor:'green',
        // borderLeftWidth:20,
        // elevation:1
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
        // alignItems: 'flex-start',
        // fontFamily: 'Quicksand-Regular',
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