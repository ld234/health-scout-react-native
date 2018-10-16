// import React, {Component} from 'react';
// import { connect } from 'react-redux';
// import { View, Text, Platform , StyleSheet, Button, ScrollView } from 'react-native';
// import { STATUS_BAR_HEIGHT , SCREEN_WIDTH, SCREEN_HEIGHT } from '../../constants';
// import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
// import PDFKit from './PDFKit';
// import { createStackNavigator } from 'react-navigation';
// import PDFView from './PDFViewScreen';
// import { TabView, TabBar, SceneMap, PagerPan } from 'react-native-tab-view';
// import LinearGradient from 'react-native-linear-gradient';


// class MyDocumentScreen extends Component {
//     static navigationOptions = () => ({

//     })

//     constructor(props) {
//         super(props);
//         this.state = {
//             index: 0,
//             routes: [
//               { key: 'first', title: 'New', icon:'list' },
//               { key: 'second', title: 'NONE', icon:'description' },
//             ],
//         };
//     }
//     FirstRoute = () => (
//         <View style={styles.scrollContainer}>
//             <ScrollView>
//                 <Text>First Route</Text>
//             </ScrollView>
//         </View>
//     );
//     SecondRoute = () => (
//         <View style={styles.scrollContainer}>
//             <ScrollView>
//                 <Text>Second Route</Text>
//             </ScrollView>
//         </View>
//     );
    
//     renderPager = props => (
//         <PagerPan {...props} />
//     );

//     renderTabBar=(props) =>{ 
//         const inputRange = props.navigationState.routes.map((x, i) => i);

//         return (
//             <TabBar
//                 {...props}
//                 style={styles.tabBarMain}
//                 scrollEnabled={true}
//                 tabStyle={styles.tabBar}
//                 indicatorStyle={styles.tabItemActive}
//             />
//         );
//      };

//     render() {
//         return (
//             <View style={styles.container}>
//                 <LinearGradient style={styles.header} 
//                     start={{x: 0.0, y: 0.85}} end={{x: 0.7, y: 1.0}}
//                     locations={[0,0.8]} colors={['#167434','#17AC71']}
//                     locations={[0,0.9]} />
//                 <View style={styles.tabWrapper}>
//                     <TabView
//                         navigationState={this.state}
//                         renderScene={SceneMap({
//                             first: this.FirstRoute,
//                             second: this.SecondRoute,
//                         })}
//                         renderTabBar={this.renderTabBar}
//                         renderPager={this.renderPager}
//                         onIndexChange={index => this.setState({ index })}
//                         initialLayout={{ width: SCREEN_WIDTH, height:SCREEN_HEIGHT -60 }}
//                     />
//                 </View>
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },
//     header:{
//         height: 120 , 
//         position: 'relative', 
//         top: 0, 
//         left: 0, 
//     },
//     tabWrapper:{
//         position: 'absolute',
//         top: 76,
//         zIndex: 10,
//     },
//     // header: {
//     //     paddingTop: 10,
//     // },
//     tabBarMain:{
//         backgroundColor: 'transparent'
//     },
//     tabBar: {
//         width: SCREEN_WIDTH /2,
//     },
//     tabItemActive: {
//         backgroundColor:'white',
//         padding:2
//     },
//     tabItem: {
//         flex: 1,
//         alignItems: 'center',
//         padding: 16,
//     },
//     tabBarText:{
//         fontSize: 15,
//         fontFamily: 'Quicksand-light',
//     },
//     scrollContainer:{
//         // flex:1,
//         // height:SCREEN_HEIGHT,
//         // backgroundColor:"#eee"
//     }
// })
// export default MyDocumentScreen;

import * as React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import LinearGradient from 'react-native-linear-gradient';
import { STATUS_BAR_HEIGHT , SCREEN_WIDTH, SCREEN_HEIGHT } from '../../constants';
import NewDocumentList from './NewDocumentList';
import SentDocumentList from './SentDocumentList';
import { YellowBox } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

// const FirstRoute = (props) => (
//     <View style={[styles.scene, { backgroundColor: '#fff' }]} >
//         <NewDocumentList {...props} />
//     </View>
// );



class MyDocumentsScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'new documents' },
        { key: 'second', title: 'sent documents' },
      ],
    };
  }

  FirstRoute = (props) => (
    <View style={[styles.scene, { backgroundColor: '#fff' }]} >
        <NewDocumentList {...this.props} />
    </View>
  );

  SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#fff' }]} >
      <SentDocumentList {...this.props} />
    </View>
  );

  _handleIndexChange = index => this.setState({ index });

  _renderTabBar = props => <TabBar {...props} style={styles.header} indicatorStyle={styles.tabItemActive} />
        // <View>
        //     <View style={styles.tabContainer}>
                // <TabBar {...props} style={styles.header} />
        //     </View>
        // </View>;

  _renderScene = SceneMap({
    first: this.FirstRoute,
    second: this.SecondRoute,
  });

  _handleIndexChange = (index) => this.setState({index});

  render() {
    console.log('navigation:' ,this.props.navigation);
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
          <LinearGradient style={styles.gradientHeader} 
          start={{x: 0.0, y: 0.85}} end={{x: 0.7, y: 1.0}}
          locations={[0,0.8]} colors={['#167434','#17AC71']}
          locations={[0,0.9]} />
          <TabView
              style={{position: 'relative', top: -50, height: SCREEN_HEIGHT}}
              navigationState={this.state}
              renderScene={this._renderScene}
              renderTabBar={this._renderTabBar}
              onIndexChange={this._handleIndexChange}
              initialLayout={{
                  width: SCREEN_WIDTH,
                  height: SCREEN_HEIGHT - 120,
              }}
          />
          <View style={styles.footer}>
             <Ionicons 
              style={{position: 'absolute', bottom: 13, left: !this.state.index? SCREEN_WIDTH/3.4: SCREEN_WIDTH/4.3}} 
              name={'ios-notifications-outline'} 
              size={24} color={'#17ac71'} />
            {this.props.documentState.isGetReceivedDocumentsPending ?
              <Text style={styles.footerText}>Loading...</Text>:
              ( !this.state.index?
              <Text style={styles.footerText}>You have {this.props.documentState.receivedDocs.length} forms to be completed.</Text> :
              (this.props.documentState.isGetSentDocumentsPending? 
              <Text style={styles.footerText}>Loading...</Text>:
              <Text style={styles.footerText}>You have {this.props.documentState.sentDocuments.length} forms completed and sent.</Text>))
            }
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    // flex: 1,
    // position:'ab',
    // width: SCREEN_WIDTH,
    // height: 200,
    paddingTop:0,
    marginTop:0,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  gradientHeader:{
    paddingTop: 110
  },
  tabContainer:{
    position:'relative',
    // top: -55,
    height: 60,
    zIndex:1
  },
  tabBody:{
    // position:'ablsolute',
    // top: -55,
    // backgroundColor: 'black',
    height: 60,
    zIndex:1
  },
  header: {
    backgroundColor:'transparent',
    // backgroundColor: 'red',
  },
  tabItemActive: {
    backgroundColor:'white',
    padding:2
  },
  footerText: {
    textAlign: 'right',
    fontFamily: 'Quicksand-Regular',
    fontSize: 16,
    color: '#666',
    marginRight: 10,
    flexDirection: 'row',
  },
  footer: {
    position: 'absolute', 
    bottom: 0, 
    height: 55, 
    width: SCREEN_WIDTH, 
    justifyContent: 'center'}
});

const mapStateToProps = state => {
  return {
    documentState: state.documentState,
  }
}

export default connect(mapStateToProps)(MyDocumentsScreen);