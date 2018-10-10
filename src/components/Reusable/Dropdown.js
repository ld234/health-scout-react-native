import React, { Component } from 'react';
import { Dropdown } from 'react-native-material-dropdown';

export default class AppDrowpdown extends Component {
    render() {
        let data = [{
        value: 'Mr.',
        }, {
        value: 'Ms.',
        }, {
        value: 'Mrs.',
        }];
    
        return (
        <Dropdown
            {...this.props}
        />
        );
    }
}