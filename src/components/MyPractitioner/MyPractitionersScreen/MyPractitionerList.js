import React, { Component } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import PracCard from './MyPracCard';
import { getMyPractitioners, updateViewCount } from '../../../actions/practitionerProfile.actions';
import { connect } from 'react-redux';

class MyPractitionerList extends Component {
    constructor(props){
        super(props);
        props = this.props;
    }

    componentDidMount() {
        this.props.getMyPractitioners();
    }

    onPracSelected = (prac) => {
        console.log('Prac profile',prac);
        this.props.navigation.navigate('PracProfile', prac);
        // this.props.practitionerProfileState.myPractitioners;
    }
    
    renderPractioners() {
        const myPractitioners = this.props.practitionerProfileState.myPractitioners;
        console.log('prac state', myPractitioners);
        const searchQuery = this.props.searchState.searchQuery;
        console.log('search query', searchQuery);
        if(searchQuery && searchQuery.length > 0 && myPractitioners.length &&  myPractitioners.length  > 0){
            let result = myPractitioners.filter( practitioner => practitioner.fName.toLowerCase().match(`^.*${searchQuery.toLowerCase()}.*$`) ||
                practitioner.lName.toLowerCase().match(`^.*${searchQuery.toLowerCase()}.*$`) || 
                `${practitioner.fName} ${practitioner.lName}`.toLowerCase().match(`^.*${searchQuery.toLowerCase()}.*$`));
            console.log('filter', result);
            return result.map((practitioner, idx) => {
                if (idx=== 0) {
                    return(
                        <TouchableOpacity key={practitioner.pracUsername} onPress={() => this.onPracSelected(practitioner)}>
                            <PracCard data={practitioner} top={true} bottom={false} />
                        </TouchableOpacity>
                    );
                } else if (idx === myPractitioners.length - 1){
                    return (
                        <TouchableOpacity key={practitioner.pracUsername} onPress={() => this.onPracSelected(practitioner)}>
                            <PracCard data={practitioner} top={false} bottom={true} />
                        </TouchableOpacity>
                    )
                } else {
                    return (
                        <TouchableOpacity key={practitioner.pracUsername} onPress={() => this.onPracSelected(practitioner)}>
                            <PracCard data={practitioner} top={false} bottom={false} />
                        </TouchableOpacity>
                    )
                }
            });
        }
        else {
            return myPractitioners.map((practitioner, idx) => {
                if (idx=== 0) {
                    return(
                        <TouchableOpacity key={practitioner.pracUsername} onPress={() => this.onPracSelected(practitioner)}>
                            <PracCard data={practitioner} top={true} bottom={false} />
                        </TouchableOpacity>
                    );
                } else if (idx === myPractitioners.length - 1){
                    return (
                        <TouchableOpacity key={practitioner.pracUsername} onPress={() => this.onPracSelected(practitioner)}>
                            <PracCard data={practitioner} top={false} bottom={true} />
                        </TouchableOpacity>
                    )
                } else {
                    return (
                        <TouchableOpacity key={practitioner.pracUsername} onPress={() => this.onPracSelected(practitioner)}>
                            <PracCard data={practitioner} top={false} bottom={false} />
                        </TouchableOpacity>
                    )
                }
            });
        }
        // else {
        //     if(myPractitioners){
        //         return myPractitioners.map((practitioner, idx) => {
        //             if(idx === 0 ){
        //                 return(
        //                     <TouchableOpacity key={practitioner.pracUsername} onPress={()=>this.onPracSelected(practitioner.title)}>
        //                         <PracCard data={practitioner} top={true} bottom={false} />
        //                     </TouchableOpacity>
        //                     )
        //                 }
        //             else if (idx === practitioner.length - 1){
        //                 return(
        //                     <TouchableOpacity key={practitioner.pracUsername} onPress={()=>this.onPracSelected(practitioner.title)}>
        //                         <PracCard data={practitioner} top={false} bottom={true}/>
        //                     </TouchableOpacity>
        //                 )
        //             }
        //             else{
        //                 return (
        //                 <TouchableOpacity key={practitioner.pracUsername} onPress={()=>this.onPracSelected(practitioner.title)}>
        //                     <PracCard data={practitioner} top={false} bottom={false}/>
        //                 </TouchableOpacity>
        //                 )
        //             }
        //         });
        //     }
        //     else{
        //         return null;
        //     }
        // }
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
        updateViewCount: (prac) => dispatch(updateViewCount(prac)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPractitionerList);

