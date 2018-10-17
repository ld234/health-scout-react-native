/* * * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Description: Drop down component
 * between overview and prac profile overview
 * Created:  5 October 2018
 * Last modified:  10 October 2018
 * * * * * * * * * * * * * * * * * * * * * */

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