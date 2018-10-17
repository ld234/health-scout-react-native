/* * * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Description: function that 
 * Created:  5 August 2018
 * Last modified:  10 October 2018
 * * * * * * * * * * * * * * * * * * * * * */

import React from 'react';
import { StyleSheet, View,  } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { SCREEN_WIDTH } from '../../../../constants';
import {connect} from 'react-redux';
import axios from 'axios';
import { setSearchQuery, setPracSuggestionOnShow } from '../../../../actions/mypracSearch.actions';
class SeachGroup extends React.Component {
  constructor(props){
    super(props);
    
  }

  //shows suggestion of practitioner name based on query
  render() {
    return (
        <View>
            <SearchBar
                style={styles.searchBar}
                platform="android"
                returnKeyType='search'
                inputContainerStyle={styles.inputContainer}
                containerStyle={styles.searchBar}
                inputStyle={styles.input}
                value={this.props.searchState.searchQuery}
                onChangeText={(query) => {
                    this.props.setPracSuggestionOnShow(true);
                    this.props.setSearchQuery(query);
                }}
                onFocus={() => {
                    this.props.setPracSuggestionOnShow(true);
                }}
                onBlur={() => {
                    this.props.setPracSuggestionOnShow(false);
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
        searchState: state.mypracSearchState,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setPracSuggestionOnShow: (boolVal) => dispatch(setPracSuggestionOnShow(boolVal)),
        setSearchQuery:(q) => dispatch(setSearchQuery(q)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeachGroup);