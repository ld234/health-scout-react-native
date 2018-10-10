import React from 'react';
import { StyleSheet, View,  } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { SCREEN_WIDTH } from '../../../../constants';
import {connect} from 'react-redux';
import axios from 'axios';
import { setLocationSearchBarFocus, setLocationSearchQuery,setLocationSuggestionShow, setLocationList } from '../../../../actions/render.actions';

class SeachGroup extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        firstQuery: '',
    };
  }

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
            console.log('result',result);
            // this.props.setLocationList(result.data.postalcodes)
        })
        .catch (err => console.log(err));
    else {
        // this.props.setLocationList([])
        return [];
    }
  }

  render() {
    const { firstQuery } = this.state;
    return (
        <View>
            <SearchBar
                style={styles.searchBar}
                platform="android"
                // clearIcon={false}
                // cancelIcon={false}
                returnKeyType='search'
                inputContainerStyle={styles.inputContainer}
                containerStyle={styles.searchBar}
                inputStyle={styles.input}
                // value={this.props.renderState.locationSearchQuery}
                onChangeText={(query) => {
                    // this.props.setLocationSearchQuery(query);
                    // this.getLocationList(query);
                }}
                onFocus={() => {
                    // this.setState({ focused: true});
                    // this.props.setLocationSearchBarFocus(true);
                    // this.props.setLocationSuggestionShow(true);
                }}
                onBlur={() => {
                    // this.setState({ focused: false})
                    // this.props.setLocationSearchBarFocus(false);
                    // this.props.setLocationSuggestionShow(false);
                }}
                searchIcon={
                    <Icon
                    name='search'
                    type='evilicon'
                    color="rgba(0, 0, 0, 0.54)"
                    size={25}
                    />
                }
                placeholder='Search practitioners...' />
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
        // paddingTop: 0,
        // marginTop: 0,
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
        // backgroundColor: 'green',
        // border: 'none',
        // fontFamily: 'Quicksand-Regular',
        // fontSize: 20
    }
})

const mapStateToProps = state => {
    return {
        // renderState: state.renderSearchState,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // setLocationSearchBarFocus: (focused) => dispatch(setLocationSearchBarFocus(focused)),
        // setLocationSearchQuery: (query) => dispatch(setLocationSearchQuery(query)),
        // setLocationSuggestionShow: (bool) => dispatch(setLocationSuggestionShow(bool)),
        // setLocationList: (list ) => dispatch(setLocationList(list))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeachGroup);