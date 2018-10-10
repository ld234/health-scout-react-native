import React, { Component } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import PracCard from '../../Search/PracCard';

const data = {
    "pracUsername": "ldt999",
    "pracType": "Dietitian",
    "serviceProvided": "Weight loss",
    "businessAddress": "21 Keira St, Wollongong, NSW 2500",
    "description": 'hello word',
    "rating": "2.75",
    "User": {
        "title": "Ms.",
        "fName": "Dan",
        "lName": "Tran",
        "profilePic": "/profilePics/ldt999-1534066039817.png"
    },
    "Specialties": [
        {
            "specialty": "Allergy and food sensitivity"
        },
        {
            "specialty": "Coeliac disease (Gluten free)"
        },
        {
            "specialty": "Community education"
        },
        {
            "specialty": "Liver disease"
        },
        {
            "specialty": "Osteoporosis"
        }
    ]
}

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
                <PracCard data={data} />
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
