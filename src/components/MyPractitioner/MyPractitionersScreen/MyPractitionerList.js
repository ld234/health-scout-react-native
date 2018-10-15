import React, { Component } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import PracCard from './MyPracCard';
import { getMyPractitioners } from '../../../actions/practitionerProfile.actions';
import { connect } from 'react-redux';



class MyPractitionerList extends Component {
    constructor(props){
        super(props);
        props = this.props;
    }
    componentDidMount() {
        this.props.getMyPractitioners();
    }

    onContactSelected(pracUsername) {
        this.props.navigation.navigate('PracProfile', pracUsername);
        // this.props.practitionerProfileState.myPractitioners;

    }
    renderPractioners() {
        const myPractitioners = this.props.practitionerProfileState.myPractitioners;
        const searchQuery = this.props.searchState.searchQuery;

        if(searchQuery){
            let result = myPractitioners.filter( practitioner => practitioner.fName.match(`^.*${searchQuery}.*`)
            return myPractitioners.filter((practitioner, idx) => {
                if()
                return(
                    <TouchableOpacity key={practitioner.pracUsername} onPress={()=>this.onContactSelected(practitioner.title)}>
                    <PracCard data={practitioner} top={true} bottom={false} />
                    </TouchableOpacity>
                );
            }
        }
        else {
            if(myPractitioners){
                return myPractitioners.map((practitioner, idx) => {
                    if(idx === 0 ){
                        return(
                            <TouchableOpacity key={practitioner.pracUsername} onPress={()=>this.onContactSelected(practitioner.title)}>
                                <PracCard data={practitioner} top={true} bottom={false} />
                            </TouchableOpacity>
                            )
                        }
                    else if (idx === practitioner.length - 1){
                        return(
                            <TouchableOpacity key={practitioner.pracUsername} onPress={()=>this.onContactSelected(practitioner.title)}>
                                <PracCard data={practitioner} top={false} bottom={true}/>
                            </TouchableOpacity>
                        )
                    }
                    else{
                        return (
                        <TouchableOpacity key={practitioner.pracUsername} onPress={()=>this.onContactSelected(practitioner.title)}>
                            <PracCard data={practitioner} top={false} bottom={false}/>
                        </TouchableOpacity>
                        )
                    }
                });
            }
            else{
                return null;
            }
        }
    }
    render() {  
        console.log(this.props.practitionerProfileState.myPractitioners);  
        return (
            <ScrollView>
                {this.renderPractioners()}
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    return {
        practitionerProfileState: state.practitionerProfileState,
        searchState: state.mypracSearchState,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getMyPractitioners: () => dispatch(getMyPractitioners()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPractitionerList);

