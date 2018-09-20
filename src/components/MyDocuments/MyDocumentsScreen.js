import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, Text, Platform } from 'react-native';
import { STATUS_BAR_HEIGHT } from '../../constants';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';


class MyProfileScreen extends Component {
    static navigationOptions = () => ({
        title: 'My Documents',
    })

    render() {
        return (
            <View>
                <Text>My Documents</Text>
            </View>
        )
    }
}

export default MyProfileScreen;