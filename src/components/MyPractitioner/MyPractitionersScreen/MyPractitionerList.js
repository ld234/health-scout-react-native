import React, { Component } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import PracCard from '../../Search/PracCard';

class MyPractitionerList extends Component {
    constructor(props){
        super(props);
        this.state = {
            practitioners: [],
        };
        props = this.props;
    }
    componentWillMount() {
    console.log('ComponentwillMount in AlbumList');  
    axios.get('https://rallycoding.herokuapp.com/api/music_albums')
        .then(response => this.setState({ practitioners: response.data }));
    }

    onContactSelected(pracUsername) {
        this.props.navigation.navigate('PracProfile', pracUsername);
    }
    renderPractioners() {
        return this.state.practitioners.map(practitioner => 
            <TouchableOpacity key={practitioner.title} onPress={()=>this.onContactSelected(practitioner.title)}>
                <PracCard />
            </TouchableOpacity>
            );
    }
    render() {  
        console.log(this.state.practitioners);  
        return (
            <ScrollView>
                {this.renderPractioners()}
            </ScrollView>
        );
    }

}

export default MyPractitionerList;
