/* * * * * * * * * * * * * * * * * * * * * *
 * @Tenzin
 * Description: The component containing past consultation list in accordian
 * and send back after editing 
 * Created:  7 October 2018
 * Last modified:  12 October 2018
 * * * * * * * * * * * * * * * * * * * * * */

import React, { Component } from 'react';
import Modal from 'react-native-modal';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import { STATUS_BAR_HEIGHT, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants';
import MaterialIconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect} from 'react-redux';
import { MaterialIndicator } from 'react-native-indicators';
import { getConsultations } from '../../../actions/consultation.actions';

class MyPracPastConsultationTab extends Component {
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
  //render the header of the accordian
  renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <View style={{flexDirection: 'row'}}>
            <MaterialIconCommunity name={'history'} color={'#17ac71'} size={26}></MaterialIconCommunity>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.headerText}>{section.title}</Text>
            </View>
        </View>
      </Animatable.View>
    );
  };

  //renders the body of accordion
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
                    <Text style={styles.contentTextLeft}>Date</Text>
                </View>
                <View style={[styles.contentContainer, styles.separator]}>
                    <Text style={styles.contentText}>{section.consultDate}</Text>
                </View>
            </View>
            <View style={{flexDirection: 'row'}}>
                <View style={[styles.contentLeftContainer, styles.separator]}>
                    <Text style={styles.contentTextLeft}>Summary</Text>
                </View>
                <View style={[styles.contentContainer, styles.separator]}>
                    <Text style={styles.contentText}>{section.summary}</Text>
                </View>
            </View>
            <View style={{flexDirection: 'row'}}>
                <View style={[styles.contentLeftContainer]}>
                    <Text style={styles.contentTextLeft}>Intervention</Text>
                </View>
                <View style={[styles.contentContainer]}>
                    <Text style={styles.contentText}>{section.intervention}</Text>
                </View>
            </View>
        </Animatable.View>
      </Animatable.View>
    );
  }
 
  componentDidMount() {
    this.props.getConsultations();
  }

  render() {
    const { activeSections } = this.state;
    if (this.props.consultationState.consultations.length)
    return (
        <View style={styles.container}>
          
          <Accordion
              activeSections={activeSections}
              sections={this.props.consultationState.consultations.filter(c => c.pracUsername === this.props.navigation.getParam('pracUsername'))}
              touchableComponent={TouchableOpacity}
              expandMultiple={false}
              renderHeader={this.renderHeader}
              renderContent={this.renderContent}
              duration={400}
              onChange={this.setSections}
          />
            
        </View>
    );
    else if (this.props.consultationState.consultations.length === 0)
      return null;
    else
      return <MaterialIndicator color='#17ac71' />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  nullContainer:{
    backgroundColor: '#eee',
    height: 10
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
    width: SCREEN_WIDTH * 0.63,
    paddingBottom: 10,
    paddingTop: 10,
  },
  contentLeftContainer: {
    width: SCREEN_WIDTH * 0.3,
    paddingBottom: 10,
    paddingTop: 10,
  },
  separator: {
    borderBottomColor: '#efefef',
    borderBottomWidth: 1,
    borderStyle: 'dotted',
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

const mapStateToProps = state=>{
  return {
    consultationState: state.consultationState,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getConsultations: () => dispatch(getConsultations()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyPracPastConsultationTab);