/* * * * * * * * * * * * * * * * * * * * * *
 * @Tenzin
 * Description: Parent component containing the tab 
 * Created:  7 August 2018
 * Last modified:  14 October 2018
 * * * * * * * * * * * * * * * * * * * * * */

import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View,ScrollView,StyleSheet,Dimensions } from 'react-native';
import ProfileHeader from './MyPractionerProfileHeader';
import ProfileTab from './MyPractitionerProfileTab';
import { getProfileInfo } from '../../../actions/practitionerProfile.actions';
import {MaterialIndicator} from 'react-native-indicators';

class MyPractitionerProfileScreen extends Component {
    state = {
        enabled:true
    };
    static navigationOptions = ({navigation}) => { 
        return { 
            headerTransparent: true, headerStyle: { borderBottomWidth: 0, },
            headerTintColor: 'white',
            
        } 
    }
    //enables the outer view scroll, result in disabling the inner scroll
    enableScroll =() =>{
        this.setState({ enabled:true });
    }
    //disables the outer view scroll, resulting in enabling the inner scroll
    disableScroll(){
        this.setState({ enabled:false });
    }

    //gets profile info
    componentDidMount() {
        this.props.getProfileInfo(this.props.navigation.getParam('pracUsername'));
    }

    render() {
        if (this.props.pracProfileState.isGetProfileInfoPending) return <MaterialIndicator color={'#17ac71'} />
        else if (this.props.pracProfileState.isGetProfileInfoSuccess) 
        return (
            <ScrollView 
                scrollEnabled={this.state.enabled}
                onScroll={(e)=>{
                    var windowHeight = Dimensions.get('window').height,
                        offset = e.nativeEvent.contentOffset.y;
                    if(offset >= 300){
                        this.disableScroll();
                    }
                }}
                showsVerticalScrollIndicator={false}
                style={styles.scrollStyle}>
                    <ProfileHeader />
                    <View style={styles.profileTab}>
                        <ProfileTab enableScroll={()=>this.enableScroll()} {...this.props} />
                    </View>
            </ScrollView>
        )
        return  <MaterialIndicator color={'#17ac71'} />;
    }
}

const styles = StyleSheet.create({
    profileTab:{
        flex:1,
        position:'relative',
        top: -55,
        zIndex:100,
    },
    scrollStyle:{
        height: 1200,
        backgroundColor: '#fff'
    }
})


const mapStateToProps = state => {
    return {
        pracProfileState: state.practitionerProfileState,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProfileInfo: (pracUsername) => dispatch(getProfileInfo(pracUsername)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPractitionerProfileScreen);