import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, Text, Platform } from 'react-native';
import SearchBar from './SearchBar/SearchBar';
import MyPractitionerList from './MyPractitionerList';
class MyPractitionersScreen extends Component {
    // componentDidMount(){
    //     console.log(this.props.navigation);
    // }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <MyPractitionerList navigation ={this.props.navigation}/>
            </View>
        )
    }
}

export default MyPractitionersScreen;