/* * * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Description: Container page for new document request recieved by practitioner
 * and send back after editing 
 * Created:  29 August 2018
 * Last modified:  15 October 2018
 * * * * * * * * * * * * * * * * * * * * * */


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

  //sets componenent to be displayed in first tab
  FirstRoute = (props) => (
    <View style={[styles.scene, { backgroundColor: '#fff' }]} >
        <NewDocumentList {...this.props} />
    </View>
  );

  //sets componenent to be displayed in first tab
  SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#fff' }]} >
      <SentDocumentList {...this.props} />
    </View>
  );

  _handleIndexChange = index => this.setState({ index });

  //render tab bar style 
  _renderTabBar = props => <TabBar {...props} style={styles.header} indicatorStyle={styles.tabItemActive} />
   
  //bind the contents of tab to the tab itself
  _renderScene = SceneMap({
    first: this.FirstRoute,
    second: this.SecondRoute,
  });

  _handleIndexChange = (index) => this.setState({index});

  render() {
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
    height: 60,
    zIndex:1
  },
  tabBody:{
    height: 60,
    zIndex:1
  },
  header: {
    backgroundColor:'transparent',
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