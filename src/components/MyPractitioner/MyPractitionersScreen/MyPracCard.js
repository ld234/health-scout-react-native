import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Card, Title, Paragraph, TouchableRipple, Text } from 'react-native-paper';
import { SCREEN_WIDTH } from '../../../constants';

const URL = 'http://10.0.2.2:8888'

const MyPracCard = (props) => {
    console.log('Hello');
    return (
        <TouchableRipple rippleColor="rgba(200, 200, 200, .32)">
        <Card elevation={2} style={props.top ? styles.cardTop : (props.bottom?  styles.cardBottom : styles.card)}>
            <Card.Content>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={styles.cardLeft}>
                        <Image
                            style={styles.avatar}
                            source={{uri:props.data.profilePic ?  `${URL}${props.data.User.profilePic}` :
                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSODALYDYo2dqN0DG_kPNi2X7EAy1K8SpRRZQWkNv9alC62IHggOw'}}
                            resizeMode='cover'
                            borderRadius={50} />
                    </View>
                    <View>
                        <Title style={styles.cardTitle}>{`${props.data.title} ${props.data.fName} ${props.data.lName}`}</Title>
                        <Title style={styles.cardSubtitle}>{props.data.pracType}</Title>
                        <Paragraph style={styles.cardContent}>{props.data.lastVisited? props.data.lastVisited: ''}</Paragraph>
                    </View>
                </View>
            </Card.Content>
            <Card.Actions style={styles.cardAction}>
                <TouchableRipple
                    borderless
                    onPress={() => console.log('Pressed')}
                    rippleColor="rgba(200, 200, 200, .32)"
                >
                    <Text style={styles.actionText}>More</Text>
                </TouchableRipple>
                
            </Card.Actions>
        </Card>
        </TouchableRipple>
    );
}

const styles = StyleSheet.create({
    avatar: {width: SCREEN_WIDTH*0.25, height: SCREEN_WIDTH*0.25, marginRight: 20},
    card: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 15,
        marginRight: 15,
    },
    cardTop: {
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 15,
        marginRight: 15,
    },
    cardBottom: {
        marginTop: 10,
        marginBottom: 20,
        marginLeft: 15,
        marginRight: 15,
    },
    cardTitle: {
        fontFamily: 'Quicksand-Regular',
        fontSize: 24,
    },
    cardSubtitle: {
        fontFamily: 'Quicksand-Light',
        fontSize: 18,
        paddingBottom: 4,
    },
    cardContent: {
        fontFamily: 'Quicksand-Regular',
        fontSize: 18,
        width: 0.58 * SCREEN_WIDTH,
    },
    cardAction: {
        marginLeft: 13,
        paddingLeft: 300,
        paddingRight: 3,
        paddingTop: 5,
        paddingBottom: 5,
        marginBottom: 10,
    },
    actionText: {
        fontFamily: 'Quicksand-Medium',
        color: '#17ac71',
        fontSize: 18,
    },
    cardLeft: {
        width: 0.29*SCREEN_WIDTH
    }
});

export default MyPracCard;