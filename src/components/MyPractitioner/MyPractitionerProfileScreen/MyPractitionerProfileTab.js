/* * * * * * * * * * * * * * * * * * * * * *
 * @Tenzin
 * Description: the tab function which navigates
 * between overview and prac profile overview
 * Created:  7 October 2018
 * Last modified:  12 October 2018
 * * * * * * * * * * * * * * * * * * * * * */

import * as React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Animated, ScrollView} from 'react-native';
import { TabView, TabBar, SceneMap, PagerPan } from 'react-native-tab-view';
import PractitionerDetail from './MyPracDetailTab';
import PractitionerPastConsultations from './MyPracPastConsultationTab';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../../constants';
  
  
  export default class TabViewExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
              { key: 'first', title: 'Overview', icon:'list' },
              { key: 'second', title: 'Past Consultation', icon:'description' },
            ],
          };
      }
      //sets the first tab
    FirstRoute = () => (
        <View style={styles.scrollContainer}>
            <ScrollView showsVerticalScrollIndicator={false} onScroll={(e)=>{
                    var windowHeight = Dimensions.get('window').height,
                        height = e.nativeEvent.contentSize.height,
                        offset = e.nativeEvent.contentOffset.y;
                    if( e.nativeEvent.contentOffset.y == 0 ){
                        this.props.enableScroll();
                    }
                }}>
                <PractitionerDetail/>
            </ScrollView>
        </View>
    );
    //sets second tab
    SecondRoute = () => (
        <View style={styles.scrollContainer}>
            <ScrollView showsVerticalScrollIndicator={false} onScroll={(e)=>{
                    var windowHeight = Dimensions.get('window').height,
                        height = e.nativeEvent.contentSize.height,
                        offset = e.nativeEvent.contentOffset.y;

                    if( e.nativeEvent.contentOffset.y == 0  ){
                        this.props.enableScroll();
                    }
                }}>
                <PractitionerPastConsultations {...this.props} />
            </ScrollView>
        </View>
    );
    
    renderPager = props => (
        <PagerPan {...props} />
    );
  
    //customize the tab bar
    renderTabBar=(props) =>{ 
        const inputRange = props.navigationState.routes.map((x, i) => i);

        return (
            <TabBar
            {...props}
            style={styles.tabBarMain}
            scrollEnabled={true}
            tabStyle={styles.tabBar}
            indicatorStyle={styles.tabItemActive}
            />
        );
     };
    
    render() {
      return (
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            first: this.FirstRoute,
            second: this.SecondRoute,
          })}
          renderTabBar={this.renderTabBar}
          renderPager={this.renderPager}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get('window').width, height:Dimensions.get('window').height }}
        />
      );
    }
  }


const styles = StyleSheet.create({
    scene: {
      flex: 1,
    },
    header: {
      paddingTop: 10,
    },
    container: {
        flex: 1,
      },
    tabBarMain:{
        backgroundColor: 'transparent'

    },
    tabBar: {
        width: SCREEN_WIDTH /2,
    },
    tabItemActive: {
        backgroundColor:'white',
        padding:2
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
    tabBarText:{
        fontSize: 15,
        fontFamily: 'Quicksand-light',
    },
    scrollContainer:{
        flex:1,
        height:550,
        backgroundColor:"#eee"
    }
  });

