import React from 'react';
import PracCard from './PracCard';
import SearchBar from './SearchBar';
import { ScrollView, StyleSheet, View, Image, Text } from 'react-native';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator
  } from 'react-native-indicators';

import logo from '../../../assets/images/healthscout-logo.png'
import { SCREEN_HEIGHT } from '../../constants';
  
class SearchScreen extends React.Component {
    render() {
        const list = [0,1,2];
        if (!this.props.searchState){
            return (
                <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo}></Image>
                    <Text style={styles.text}>Scouting for practitioner...</Text>
                    <DotIndicator color='#47BD5D' size={12} animationDuration={1500} />
                </View>
                
            );
        }
        return (
            <View style={styles.screenContent}>
                <SearchBar />
                <ScrollView style={styles.screenContent} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
                    {list.map((item, idx) => {
                        if (idx ===  0 )
                            return <PracCard top={true} bottom={false} key={item} />;
                        else if (idx === list.length - 1)
                            return <PracCard top={false} bottom={true} key={item} />;
                        else 
                            return <PracCard top={false} bottom={false} key={item} />;
                    })}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    screenContent:{
        paddingBottom: 60,
    },
    scrollViewContent: {
        flexGrow: 1,
        // flexDirection: 'row',
    },
    logo: {
        width: 110,
        height: 149,
        marginBottom: 10
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: SCREEN_HEIGHT * 0.2
    },
    text: {
        fontFamily: 'Quicksand-Medium',
        color:'#47BD5D',
        marginBottom: 20,
        marginTop: 0,
        fontSize: 20
    }
})

export default SearchScreen;