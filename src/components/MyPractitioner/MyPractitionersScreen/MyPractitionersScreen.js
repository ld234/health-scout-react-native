/* * * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Description: a parent container for the connected practitioner list
 * Created:  5 August 2018
 * Last modified:  10 October 2018
 * * * * * * * * * * * * * * * * * * * * * */

import React, {Component} from 'react';
import { View } from 'react-native';
import MyPractitionerList from './MyPractitionerList';

export default class MyPractitionersScreen extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <MyPractitionerList navigation ={this.props.navigation}/>
            </View>
        )
    };
};