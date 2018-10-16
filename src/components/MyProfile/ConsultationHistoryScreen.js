import React, { Component } from 'react';
import { FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants';
import MaterialIconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import { getConsultations } from '../../actions/consultation.actions';
import { connect } from 'react-redux';

class ConsultationHistoryScreen extends Component {
  static navigationOptions = ({navigation}) => {
      return {
          title: 'Consultation History',
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

  componentDidMount() {
    this.props.getConsultations();
  }

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
            <View style={{flexDirection: 'row'}}>
                <View style={[styles.contentLeftContainer]}>
                    <Text style={styles.contentTextLeft}>Practitioner</Text>
                </View>
                <View style={[styles.contentContainer]}>
                    <Text style={styles.contentText}>{`${section.pracTitle} ${section.fName} ${section.lName} - ${section.pracType}`}</Text>
                </View>
            </View>
        </Animatable.View>
      </Animatable.View>
    );
  }

  renderModal = () => {
    // return (
    //     <Modal 
    //       style={{alignContent:'center',paddingTop:0}}
    //       onBackButtonPress={this.toggleDialog}
    //       onBackdropPress={this.toggleDialog} isVisible={this.state.dialog}>
    //         <View style={styles.dialog}>
    //           <View style={{flex:1, width: SCREEN_WIDTH*.9 }}>
    //           <View style={styles.dialogHeader}>
    //             <Text style={styles.dialogHeaderText}>CONFIRM MEDICATION DELETE</Text>
    //           </View>
    //           <View style={{flex:0.6, width:SCREEN_WIDTH*0.9, justifyContent: 'center', paddingLeft: 10, paddingRight: 10}}>
    //             <Text style={!this.props.allergyState.deleteAllergyError? styles.dialogText: [styles.dialogText, {color: '#f00'}]}>
    //               {!this.props.allergyState.deleteAllergyError? 
    //               'Are you sure you want to delete this allergy from your allergy history?': 
    //               this.props.allergyState.deleteAllergyError}
    //             </Text>
    //           </View>
    //           <TouchableOpacity style={styles.closeButton} onPress={() => {
    //               const { symptom, allergy } = this.state.selectedItem;
    //               let idx = this.props.allergyState.allergies.findIndex(item => item.allergy === allergy);
    //               this.props.deleteAllergy({ allergy }, this.toggleDialog, idx);
    //           }}>
    //               <Text style={styles.closeButtonText}>OK</Text>
    //           </TouchableOpacity>
    //           <TouchableOpacity style={styles.cancelButton} onPress={() => {
    //             this.toggleDialog();
    //           }}>
    //               <Text style={styles.cancelButtonText}>CANCEL</Text>
    //           </TouchableOpacity>
    //           </View>
    //         </View>
    //     </Modal>
    // );
  }

  render() {
    const { activeSections } = this.state;
    console.log('cons', this.props.consultationState.consultations);
    return (
        <View style={styles.container}>
            <ScrollView 
              style={{marginTop: 60}}
              showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120}}>
                <Accordion
                    activeSections={activeSections}
                    sections={this.props.consultationState.consultations}
                    touchableComponent={TouchableOpacity}
                    expandMultiple={false}
                    renderHeader={this.renderHeader}
                    renderContent={this.renderContent}
                    duration={400}
                    onChange={this.setSections}
                />
                
            </ScrollView>
            {/* <FAB 
                  icon={({ size, color }) => (
                      <Icon size={28} color={'white'} name="filter-list" />
                  )}
                  style={styles.fab}
                  onPress={() => {
                    this.toggleModal();
                }}
            /> */}
            {this.renderModal()}
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

const mapStateToProps = state => {
  return {
    consultationState: state.consultationState,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getConsultations: () => dispatch(getConsultations()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConsultationHistoryScreen);