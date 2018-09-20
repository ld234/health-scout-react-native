import React from 'react';
import { StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Icon } from 'react-native-elements'

export default class MyComponent extends React.Component {
  state = {
    firstQuery: '',
  };

  render() {
    const { firstQuery } = this.state;
    return (
        <SearchBar
            style={styles.searchBar}
            platform="android"
            // clearIcon={false}
            // cancelIcon={false}
            containerStyle={styles.searchBar}
            inputStyle={styles.input}
            searchIcon={
                <Icon
                  name='search'
                  type='evilicon'
                  color="rgba(0, 0, 0, 0.54)"
                  size={25}
                  
                />
              }
            placeholder='Scout practitioners...' />
    );
  }
}

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: '#fff',
        marginTop: 0,
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
    },
    input: {
        backgroundColor: '#fff',
        fontSize: 20,
        fontFamily: 'Quicksand-Medium',
        color: '#666',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
    },
    searchBar:{
        marginBottom: 0,
        elevation: 1,
        backgroundColor: '#fff',
        height: 60

        // border: 'none',
        // fontFamily: 'Quicksand-Regular',
        // fontSize: 20
    }
})