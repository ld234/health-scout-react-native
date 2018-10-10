import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, Text, Platform, StyleSheet } from 'react-native';
import { STATUS_BAR_HEIGHT, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants';
import ProfileCard from './ProfileCard';
import LinearGradient from 'react-native-linear-gradient';

class MyProfileScreen extends Component {
    static navigationOptions = () => ({
        title: 'My Profile',
        headerStyle: {
            height: Platform.OS === 'android' ? 43 + STATUS_BAR_HEIGHT: 0,
            backgroundColor: '#007F47',
        },
        headerTitleStyle: {
            marginTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT - 30: 0,
            color: '#fff',
            fontFamily: 'Quicksand-Medium',
            fontSize: 24,
            fontWeight: '200',
        },
        headerLeft: <View />
    })

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'transparent'}}>
                <LinearGradient style={styles.header} 
                    start={{x: 0.0, y: 0.85}} end={{x: 0.7, y: 1.0}}
                    locations={[0,0.8]} colors={['#167434','#17AC71']}
                    locations={[0,0.9]} />
                <View style={{flex: 0.5, flexDirection: 'row',}}>
                    <View style={styles.consultation}> 
                        <ProfileCard title={'Consultation\nHistory'} name={'history'} 
                            onPress={() => this.props.navigation.navigate('ConsultationHistory')}
                        >
                        </ProfileCard>
                    </View>
                    <View style={styles.medication}> 
                        <ProfileCard title={'Medication\nHistory'} name={'pill'} 
                            onPress={() => this.props.navigation.navigate('MedicationHistory')}
                        ></ProfileCard>
                    </View>
                </View>
                <View style={{flex: 0.5, flexDirection: 'row',  top: 10}}>
                    <View style={styles.allergy}> 
                        <ProfileCard title={'Allergy\nHistory'} name={'food-off'} 
                            onPress={() => this.props.navigation.navigate('AllergyHistory')}
                        ></ProfileCard>
                    </View>
                    <View style={styles.family}> 
                        <ProfileCard title={'Family\nHistory'} name={'human-male-female'}
                            onPress={() => this.props.navigation.navigate('FamilyHistory')}
                        ></ProfileCard>
                    </View>
                </View>
                
            
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header:{
        flex: 1, 
        position: 'absolute', 
        top: -(SCREEN_WIDTH *1.28), 
        left: -(SCREEN_WIDTH/2), 
        height:SCREEN_WIDTH*2,
        width: SCREEN_WIDTH*2, 
        borderBottomLeftRadius: SCREEN_WIDTH, 
        borderBottomRightRadius: SCREEN_WIDTH,
    },
    allergy: {
        // flex: 0.5,
        position: 'absolute',
        bottom: SCREEN_HEIGHT * 0.1,
        left: SCREEN_WIDTH * 0.05,
        zIndex: 100,
        paddingLeft: 20,
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 20 ,
        backgroundColor: 'transparent',
        borderRadius: 10,
    },
    family: {
        // flex: 0.5,
        position: 'absolute',
        bottom: SCREEN_HEIGHT * 0.1,
        right: SCREEN_WIDTH * 0.05,
        zIndex: 100,
        paddingLeft: 20,
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 20 ,
        backgroundColor: 'transparent',
        borderRadius: 10,
    },
    consultation :{
        position: 'absolute',
        top: SCREEN_HEIGHT * 0.27,
        left: SCREEN_WIDTH * 0.05,
        zIndex: 100,
        paddingLeft: 20,
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 20 ,
        backgroundColor: 'transparent',
        borderRadius: 10,
    },
    medication: {
        position: 'absolute',
        top: SCREEN_HEIGHT * 0.27,
        right: SCREEN_WIDTH * 0.05,
        zIndex: 100,
        paddingLeft: 20,
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 20 ,
        backgroundColor: 'transparent',
        borderRadius: 10,
    }
})

export default MyProfileScreen;