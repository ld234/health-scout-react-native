import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, Text, Platform } from 'react-native';
import { STATUS_BAR_HEIGHT } from '../../constants';

class MyProfileScreen extends Component {
    static navigationOptions = () => ({
        title: 'My Profile',
        headerStyle: {
            height: Platform.OS === 'android' ? 43 + STATUS_BAR_HEIGHT: 0,
            backgroundColor: '#007F47',
        },
        headerTitleStyle: {
            marginTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT - 30: 0,
            color: 'white',
            fontFamily: 'Quicksand-Medium',
            fontSize: 24,
            fontWeight: '200',
        },
        headerLeft: <View />
    })

    render() {
        return (
            <View>
                
            </View>
        )
    }
}

export default MyProfileScreen;