import React, {Component} from 'react';
import { View,Text,ScrollView,StyleSheet } from 'react-native';
// import { Icon } from 'react-native-vector-icons/'
class MyPracDetailTab extends Component {
    state={
        description:"A passionate dietition working in the field for more than ten years and worked with numerous number of clients to solve their health issues",
        test:"Far concluded not his something extremity. Want four we face an he gate. On he of played he ladies answer little though nature. Blessing oh do pleasure as so formerly. Took four spot soon led size you. Outlived it received he material. Him yourself joy moderate off repeated laughter outweigh screened. Not him old music think his found enjoy merry. Listening acuteness dependent at or an. Apartments thoroughly unsatiable terminated sex how themselves. She are ten hours wrong walls stand early. Domestic perceive on an ladyship extended received do. Why jennings our whatever his learning gay perceive. Is against no he without subject. Bed connection unreserved preference partiality not unaffected. Years merit trees so think in hoped we as. Perceived end knowledge certainly day sweetness why cordially. Ask quick six seven offer see among. Handsome met debating sir dwelling age material. As style lived he worse dried. Offered related so visitor we private removed. Moderate do subjects to distance. By spite about do of do allow blush. Additions in conveying or collected objection in. Suffer few desire wonder her object hardly nearer. Abroad no chatty others my silent an. Fat way appear denote who wholly narrow gay settle. Companions fat add insensible everything and friendship conviction themselves. Theirs months ten had add narrow own.   Believing neglected so so allowance existence departure in. In design active temper be uneasy. Thirty for remove plenty regard you summer though. He preference connection astonished on of ye. Partiality on or continuing in particular principles as. Do believing oh disposing to supported allowance we.  Remember outweigh do he desirous no cheerful. Do of doors water ye guest. We if prosperous comparison middletons at. Park we in lose like at no. An so to preferred convinced distrusts he determine. In musical me my placing clothes comfort pleased hearing. Any residence you satisfied and rapturous certainty two. Procured outweigh as outlived so so. On in bringing graceful proposal blessing of marriage outlived. Son rent face our loud near. Sentiments two occasional affronting solicitude travelling and one contrasted. Fortune day out married parties. Happiness remainder joy but earnestly for off. Took sold add play may none him few. If as increasing contrasted entreaties be. Now summer who day looked our behind moment coming. Pain son rose more park way that. An stairs as be lovers uneasy. "

    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    {/* <Icon name={}/> */}
                    <Text style={styles.title}>
                        ABOUT DOCTOR
                    </Text>

                    <View style={styles.hrLine}/>

                    <Text style={styles.description}>
                        {this.state.description}
                    </Text>
                </View>


                <View style={styles.wrapper}>
                    <Text style={styles.title}>
                        SPECIALTY
                    </Text>
                    <Text></Text>
                </View>

                {/* <View style={styles.hrLine}/> */}

                <View style={styles.wrapperLast}>
                    <Text style={styles.title}>
                        QUALIFICATION
                    </Text>
                    <Text></Text>
                </View>



            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        // marginTop:10,
        // paddingLeft: 20,
        // paddingRight: 20
    },
    wrapper:{
        margin:10,
        marginBottom:0,
        backgroundColor: 'white',
        padding: 20,
        alignItems: 'center',
        // borderLeftColor:'green',
        // borderLeftWidth:20,
        // elevation:1
    },
    wrapperLast:{
        margin:10,
        backgroundColor: 'white',
        padding: 20,
        // borderLeftColor:'green',
        // borderLeftWidth:20,
        // elevation:1
    },
    title:{
        color: '#aaa',
        fontSize: 15,
        fontFamily: 'Quicksand-Bold',
        paddingBottom: 1
    },
    description:{
        fontSize: 12,
        fontFamily: 'Quicksand-light',
    },
    hrLine:{
        marginTop:5,
        marginBottom:5,
        borderBottomColor: '#ccc',
        borderTopWidth: 0,
        borderBottomWidth: 1,
    }
    
});

export default MyPracDetailTab;