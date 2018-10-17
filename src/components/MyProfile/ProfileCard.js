/* * * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Description: Settings and customiseing the card to be displayed
 * Created:  6 August 2018
 * Last modified:  10 August 2018
 * * * * * * * * * * * * * * * * * * * * * */

import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Surface, } from 'react-native-paper';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class ProfileCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Surface style={styles.card}>
                <TouchableOpacity onPress={this.props.onPress} style={{flex:1, position: 'relative', alignItems: 'center', justifyContent: 'center', width: SCREEN_WIDTH* 0.35,}}>
                    <Icon name={this.props.name} color={'#17ac71'} size={70} />
                    <Text style={styles.text}>{this.props.title}</Text>
                </TouchableOpacity>
            </Surface>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        height: SCREEN_WIDTH * 0.35,
        width: SCREEN_WIDTH * 0.35,
        elevation: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        zIndex: 200,
    },
    text: {
        fontFamily: 'Quicksand-Regular',
        textAlign: 'center',
    }
})

export default ProfileCard;