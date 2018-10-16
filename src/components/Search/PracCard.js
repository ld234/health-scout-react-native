import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, TouchableRipple, Text } from 'react-native-paper';
import StarRating from '../Reusable/AppStarRating';
import { SCREEN_WIDTH } from '../../constants';

const URL = 'http://10.0.2.2:8888'

class PracCard extends React.Component {
    render() {
        return (
            <Card elevation={2} style={this.props.top ? styles.cardTop : (this.props.bottom?  styles.cardBottom : styles.card)}>
                <Card.Content>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={styles.cardLeft}>
                            <Image
                                style={styles.avatar}
                                source={{uri: this.props.data.profilePic ?  `${URL}${this.props.data.profilePic}` :
                                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSODALYDYo2dqN0DG_kPNi2X7EAy1K8SpRRZQWkNv9alC62IHggOw'}}
                                resizeMode='cover'
                                borderRadius={50} />
                            <View style={styles.starRating}>
                                <StarRating rating={this.props.data.rating} starSize={20} />
                            </View>
                        </View>
                        <View>
                            <Title style={styles.cardTitle}>{`${this.props.data.title} ${this.props.data.fName} ${this.props.data.lName}`}</Title>
                            <Title style={styles.cardSubtitle}>{this.props.data.pracType}</Title>
                            <Paragraph style={styles.cardContent}>{this.props.data.description.slice(0,60)}{this.props.data.description.length > 60? '...': ''}</Paragraph>
                        </View>
                    </View>
                    
                </Card.Content>
                <Card.Actions style={styles.cardAction}>
                    <Text style={styles.distanceText}>Distance: {this.props.data.distance.toString().slice(0,6)}km</Text>
                    {/* <TouchableRipple
                        borderless
                        onPress={() => console.log('Pressed')}
                        rippleColor="rgba(200, 200, 200, .32)"
                    >
                        <Text style={styles.actionText}>More</Text>
                    </TouchableRipple> */}
                    
                </Card.Actions>
            </Card>
        );
    }
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
        // paddingLeft: 300,
        paddingRight: 3,
        paddingTop: 5,
        paddingBottom: 5,
        marginBottom: 10,
        flexDirection: 'row',
    },
    actionText: {
        fontFamily: 'Quicksand-Medium',
        color: '#17ac71',
        fontSize: 18,
        position: 'relative',
        right: 100,
    },
    starRating: {
        width: 0.25*SCREEN_WIDTH,
        marginTop: 10
    },
    cardLeft: {
        width: 0.29*SCREEN_WIDTH
    },
    distanceText: {
        fontFamily: 'Quicksand-Regular',
        fontSize: 16,
        color: '#999',
        textAlign: 'right',
    }
});

export default PracCard;