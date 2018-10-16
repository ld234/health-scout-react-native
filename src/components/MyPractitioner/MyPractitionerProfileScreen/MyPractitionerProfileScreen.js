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
    enableScroll =() =>{
        console.log('enable scroll');
        this.setState({ enabled:true });
    }

    disableScroll(){
        console.log('disabled scroll');
        this.setState({ enabled:false });
    }

    componentDidMount() {
        this.props.getProfileInfo(this.props.navigation.getParam('pracUsername'));
        console.log('fired get prac profile');
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
// profileHeader:{
//     position:'absolute',
//     zIndex:0
// }
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