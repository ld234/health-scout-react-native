import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import {
  Sae,
} from 'react-native-textinput-effects';

export default class TextInputEffectsExample extends Component {
  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        
        <View style={[styles.card2, { backgroundColor: 'white' }]}>
          <Image></Image>
          <Text style={styles.title}>Login</Text>
          <Sae
            label={'Username'}
            iconClass={FontAwesomeIcon}
            iconName={'pencil'}
            iconColor={'#0E72EC'}
          />
          <Sae
            style={styles.input}
            label={'Password'}
            iconClass={FontAwesomeIcon}
            secureTextEntry={true}
          />
        </View>
        
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: 'white',
  },
  content: {
    // not cool but good enough to make all inputs visible when keyboard is active
    paddingBottom: 100,
  },
  card2: {
    padding: 30,
    borderWidth: 1,
    borderColor: '#F3F3F3',
    borderRadius: 10,
    shadowOffset:{  width: 0,  height: 10  },
    shadowColor: '#FAFAFA',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 1,
  },
  input: {
    marginTop: 4,
  },
  title: {
    paddingBottom: 0,
    textAlign: 'center',
    color: '#0E72EC',
    fontSize: 40,
    fontFamily: 'Quicksand-Regular',
  },
});