/* * * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Description: The bar for searching practitioner by radius etc
 * Created:  5 October 2018
 * Last modified:  10 October 2018
 * * * * * * * * * * * * * * * * * * * * * */


import React from 'react';
import { StyleSheet, View,  } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { SCREEN_WIDTH } from '../../constants';
import SearchOptions from './SearchOptions';
import {connect} from 'react-redux';
import axios from 'axios';
import { setLocationSearchBarFocus, setLocationSearchQuery,setLocationSuggestionShow, setLocationList } from '../../actions/render.actions';
import { searchPracByRadius } from '../../actions/practitioner.actions';

class SeachGroup extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        firstQuery: '',
    };
  }

  //gets the longitude, lattitude of the input suburb from external api 
  getLocationList = (q) => {
    if(q.length)
        return axios.get('http://api.geonames.org/postalCodeLookupJSON',{
            params:{
                placename: q,
                country: 'AU', 
                username: 'ldt999'
            }
        })
        .then (result => {
            this.props.setLocationList(result.data.postalcodes)
        })
        .catch (err => console.log(err));
    else {
        this.props.setLocationList([])
        return [];
    }
  }

  submitQuery = () => {
    this.props.searchPracByRadius(this.props.renderState.selectedRadius, this.props.renderState.lat, this.props.renderState.lng);
  }

  render() {
    const { firstQuery } = this.state;
    return (
        <View>
            <SearchBar
                style={styles.searchBar}
                platform="android"
                returnKeyType='search'
                inputContainerStyle={styles.inputContainer}
                containerStyle={styles.searchBar}
                inputStyle={styles.input}
                value={this.props.renderState.locationSearchQuery}
                onChangeText={(query) => {
                    this.props.setLocationSearchQuery(query);
                    this.getLocationList(query);
                }}
                onFocus={() => {
                    this.setState({ focused: true});
                    this.props.setLocationSearchBarFocus(true);
                    this.props.setLocationSuggestionShow(true);
                }}
                onBlur={() => {
                    this.setState({ focused: false})
                    this.props.setLocationSearchBarFocus(false);
                    this.props.setLocationSuggestionShow(false);
                }}
                onSubmitEditing={this.submitQuery}
                searchIcon={
                    <Icon
                    name='search'
                    type='evilicon'
                    color="rgba(0, 0, 0, 0.54)"
                    size={25}
                    />
                }
                placeholder='Enter your postcode or suburb...' />
            <SearchOptions />
         </View>
    );
  }
}




const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: 'transparent',
        marginTop: 0,
        paddingTop:0,
        paddingBottom: 0,
        marginLeft: 5,
        marginRight: 5,
        paddingRight: 25,
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        position: 'absolute',
        top: -10,
    },
    input: {
        backgroundColor: 'transparent',
        fontSize: 20,
        fontFamily: 'Quicksand-Regular',
        color: '#666',
        height: 55,
        marginLeft: 10,
        paddingBottom:14,
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
    },
    searchBar:{
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
        elevation: 1,
        backgroundColor: '#fff',
        height: 53,
        borderRadius: 30,
        width: SCREEN_WIDTH - 10,

    }
})

const mapStateToProps = state => {
    return {
        renderState: state.renderSearchState,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLocationSearchBarFocus: (focused) => dispatch(setLocationSearchBarFocus(focused)),
        setLocationSearchQuery: (query) => dispatch(setLocationSearchQuery(query)),
        setLocationSuggestionShow: (bool) => dispatch(setLocationSuggestionShow(bool)),
        setLocationList: (list ) => dispatch(setLocationList(list)),
        searchPracByRadius: (r, lat, lng) => dispatch(searchPracByRadius(r,lat,lng)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeachGroup);