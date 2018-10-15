import React, {Component} from 'react';
import { ScrollView, StyleSheet,Image, View, Text, Platform,TouchableWithoutFeedback, Keyboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const URL = 'http://10.0.2.2:8888';

const MyPractitionerProfileHeader = (props) => {
        return (
            <View style={styles.profileHeaderContainer}>
                <LinearGradient  start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}locations={[0,0.8]} colors={['#167434','#17AC71' ]}locations={[0,0.9]} style={styles.profileGradient}>
                <Image
                    style={styles.profilePic}
                    source={{uri:`${URL}${props.data.User.profilePic}`}}
                />
                <Text 
                    style={styles.profileName}>
                    {props.data.User.fName} {props.data.User.lName}
                </Text>
                <Text
                    style={styles.practitionerType}>
                    {props.data.pracType}
                </Text>
                {/* <Icon name={}/> */}
                </LinearGradient>
                
            </View>
        )
}

const styles = StyleSheet.create({
    profilePic:{
        height:150,
        width:150,
        borderRadius:150,
        borderWidth: 5,
        borderColor:'white',
    },
    profileName:{
        paddingTop: 15,
        fontSize: 25,
        fontFamily: 'Quicksand-Medium',
        color: 'white',
    },
    practitionerType:{
        fontSize:15,
        color: 'white',
        fontFamily: 'Quicksand-Regular',
    },
    profileGradient:{
        height: 360,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
   
})

export default MyPractitionerProfileHeader;