import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View,ScrollView,StyleSheet,Dimensions } from 'react-native';
import ProfileHeader from './MyPractionerProfileHeader';
import ProfileTab from './MyPractitionerProfileTab';

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
    render() {
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
                style={styles.scrollStyle}>
                    <ProfileHeader />
                    <View style={styles.profileTab}>
                        <ProfileTab enableScroll={()=>this.enableScroll()} />
                    </View>
            </ScrollView>
        )
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
        height: 1300,
    }
// profileHeader:{
//     position:'absolute',
//     zIndex:0
// }
})

export default MyPractitionerProfileScreen;