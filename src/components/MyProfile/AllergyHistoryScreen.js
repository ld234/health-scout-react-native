import React, { Component } from 'react';
import { FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import { SwipeRow } from 'react-native-swipe-list-view';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import { STATUS_BAR_HEIGHT, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants';
import MaterialIconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/SimpleLineIcons';

const BACON_IPSUM =
  'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs.';

const CONTENT = [
  {
    title: 'Aspirin',
    content: BACON_IPSUM,
  },
  {
    title: 'Acetaminophen',
    content: BACON_IPSUM,
  },
  {
    title: 'Alprazolam',
    content: BACON_IPSUM,
  },
  {
    title: 'Ofloxacin',
    content: BACON_IPSUM,
  },
  {
    title: 'Quinidex',
    content: BACON_IPSUM,
  },
];

const SELECTORS = [
  {
    title: 'First',
    value: 0,
  },
  {
    title: 'Third',
    value: 2,
  },
  {
    title: 'None',
  },
];

export default class AllergyHistoryScreen extends Component {
  static navigationOptions = ({navigation}) => {
      return {
          title: 'Allergy History',
          headerTitleStyle: {flex: 1, textAlign: 'center', fontFamily: 'Quicksand-Medium', fontWeight: '200', fontSize: 24, color:'#17ac71'},
          headerRight: <View></View>,
          headerTransparent: true,
          headerTintColor: '#17ac71',
      }
  }
  state = {
    activeSections: [],
    collapsed: true,
  };

  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  setSections = sections => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  renderFormContent = () => {
      return (
          <View styles={style.longModal} >

          </View>
      )
  }

  renderModal = () => {
    return (
        <Modal onBackdropPress={this.props.toggleSearchOptionModal} isVisible={this.props.renderState.isSearchOptionModalShown}>
            {this.renderFormContent()}
        </Modal>
    );
  }

  renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <View style={{flexDirection: 'row'}}>
            <MaterialIconCommunity name={'food-off'} color={'#17ac71'} size={26}></MaterialIconCommunity>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.headerText}>{section.title}</Text>
            </View>
            {isActive? <TouchableOpacity style={{flexDirection: 'row', position: 'absolute', bottom: 0, right: 0 }}>
                <Octicons name={'trash'} color={'#666'} size={26}></Octicons>
            </TouchableOpacity> :null }
        </View>
        {/* <View style={styles.standalone}>
          <SwipeRow leftOpenValue={75} rightOpenValue={-75}>
            <View style={styles.standaloneRowBack}>
              <Text style={styles.backTextWhite}>Left</Text>
              <Text style={styles.backTextWhite}>Right</Text>
            </View>
            <View style={styles.standaloneRowFront}>
                <MaterialIconCommunity name={'food-off'} color={'#17ac71'} size={26}></MaterialIconCommunity>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.headerText}>{section.title}</Text>
                </View>
            </View>
          </SwipeRow>
        </View> */}
      </Animatable.View>
    );
  };

  renderContent(section, _, isActive) {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Animatable.View animation={isActive ? 'fadeIn' : undefined}>
            <View style={{flexDirection: 'row'}}>
                <View style={[styles.contentLeftContainer, styles.separator]}>
                    <Text style={styles.contentTextLeft}>Symptoms</Text>
                </View>
                <View style={[styles.contentContainer, styles.separator]}>
                    <Text style={styles.contentText}>{section.content}</Text>
                </View>
            </View>
        </Animatable.View>
        
      </Animatable.View>
    );
  }

  render() {
    const { activeSections } = this.state;

    return (
        <View style={styles.container}>
            <ScrollView
              style={{marginTop: 60}}
              showsVerticalScrollIndicator={false}  contentContainerStyle={{ paddingBottom: 120  }}>
                <Accordion
                    activeSections={activeSections}
                    sections={CONTENT}
                    touchableComponent={TouchableOpacity}
                    expandMultiple={false}
                    renderHeader={this.renderHeader}
                    renderContent={this.renderContent}
                    duration={400}
                    onChange={this.setSections}
                />
            </ScrollView>
            <FAB 
                icon={({ size, color }) => (
                    <Icon size={28} color={'white'} name="add" />
                )}
                style={styles.fab}
                onPress={() => {
                    console.log('filter button pressed');
                }}
            />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  
  fab: {
    position: 'absolute',
    margin: 20,
    right: 5,
    height: 60,
    borderRadius: 50,
    width: 60,
    bottom: 0,
    backgroundColor: '#17ac71',
    elevation: 5,
  },
  fabWrapper: {
    right: 5,
    height: 60,
    borderRadius: 50,
    width: 60,
    bottom: 0,
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 10,
    width: SCREEN_WIDTH,
    height: 60,
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  headerText: {
    marginLeft: 20,
    fontSize: 20,
    fontWeight: '200',
    fontFamily: 'Quicksand-Regular',
  },
  content: {
    padding: 15,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#fff',
    padding: 10,
  },
  contentText: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 18,
  },
  contentTextLeft:{
    fontFamily: 'Quicksand-Medium',
    textAlign: 'justify',
    fontSize: 18,
  },
  contentContainer: {
    width: SCREEN_WIDTH * 0.64,
    paddingBottom: 10,
    paddingTop: 10,
  },
  contentLeftContainer: {
    width: SCREEN_WIDTH * 0.27,
    paddingBottom: 10,
    paddingTop: 10,
  },
  separator: {
  //   borderBottomColor: '#efefef',
  //   borderBottomWidth: 1,
  //   borderStyle: 'dotted',
  },
  longModal:{
    height: SCREEN_HEIGHT - 200,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 50,
    paddingRight: 5,
  },
});