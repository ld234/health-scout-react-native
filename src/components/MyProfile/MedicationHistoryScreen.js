/* * * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Description: enables to view, add, delete medical history
 * Created:  2 August 2018
 * Last modified:  10 October 2018
 * * * * * * * * * * * * * * * * * * * * * */

import React, { Component } from 'react';
import { FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import { Sae } from 'react-native-textinput-effects';
import moment from 'moment';
import {
  MaterialIndicator,
} from 'react-native-indicators';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  DatePickerAndroid,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants';
import MaterialIconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/SimpleLineIcons';
import { addMedication, getMedications, deleteMedication } from '../../actions/medication.actions';
import { connect } from 'react-redux';
import _ from 'lodash';


class MedicationHistoryScreen extends Component {
  static navigationOptions = ({navigation}) => {
      return {
          title: 'Medication History',
          headerTitleStyle: {flex: 1, textAlign: 'center', fontFamily: 'Quicksand-Medium', fontWeight: '200', fontSize: 24, color:'#17ac71'},
          headerRight: <View></View>,
          headerTransparent: true,
          headerTintColor: '#17ac71',
      }
  }
  state = {
    activeSections: [],
    collapsed: true,
    fillDate: '',
    modal: false,
    dialog: false,
    errors: {},
  };
  
  //expands the accordion of the selected medication history
  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  toggleDialog = (item) => this.setState({dialog : !this.state.dialog, selectedItem: item});

    //sets selected accordion
  setSections = sections => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  onFocus = event => {
    const newErr = _.merge(this.state.errors, { [event]: null });
		this.setState({errors: newErr } );
	};

  //checks input value
	onBlur = value => {
		if (_.isEmpty(this.state[value])) {
			const newErr = _.merge(this.state.errors, { [value]: '*field required' });
			this.setState({ errors: newErr });
		} else {
			const newErr = _.merge(this.state.errors, { [value]: null });
			this.setState({ errors: newErr });
		}
  };
  
  //validate form before sending to server
  validateForm = () => {
    let valid = true;
    const fields = ['fillDate', 'medication'];
    if (Number.isInteger(parseInt(this.state.quantity))){
    } else {
      const newErr = _.merge(this.state.errors, { quantity: '*invalid value' });
      this.setState({ errors: newErr });
      valid = false;
    }
    if (!fields.every(name => !_.isEmpty(this.state[name]))) {
      this.onBlur('fillDate');
      this.onBlur('medication');
      valid = false;
    }
    if (valid) {
      const { fillDate, medication, dosageForm, strength, quantity } = this.state;
      const obj = { fillDate, medication };
      if (dosageForm) obj['dosageForm'] = dosageForm;
      if (strength) obj['strength'] = strength;
      if (quantity) obj['quantity'] = quantity;
      this.props.addMedication(obj, this.toggleModal);
      this.resetForm();
    }
  }
  
  resetForm = () =>{
    this.setState({errors: {}});
    this.setState({
      fillDate: '', 
      medication: '', 
      dosageForm: '', 
      strength: '', 
      quantity: '',
    })
  }

//sets the date via android date picker
  openDatePicker = async () => {
    Keyboard.dismiss();
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: new Date(),
        maxDate: new Date(),
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        const formattedDay = day.toString().length < 2 ? `0${day}`:day;
        const formattedMonth = month.toString().length < 2? `0${month}` : month;
        this.setState({fillDate: [formattedDay,month+1, year].join('-')});
        this.onBlur('fillDate');
      } else {
        this.onBlur('fillDate');
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  handleOnScroll = event => {
    this.setState({
      scrollOffset: event.nativeEvent.contentOffset.y
    });
  };

  renderFormContent = () => {
      return (
          <ScrollView
            ref={ref => (this.scrollViewRef = ref)}
            keyboardShouldPersistTaps={'always'}
            showsVerticalScrollIndicator={false} 
            style={{position: 'relative'}} 
            onScroll={this.handleOnScroll}
            contentContainerStyle={styles.longModal} >
            <View><Text style={{color:'#ff0000', fontFamily:'Quicksand-Regular', textAlign:'center'}}>
              {this.props.medicationState.addMedicationError}
            </Text></View>
            <Sae
              style={{width: SCREEN_WIDTH*0.78, marginRight: 10}}
              label={'Fill Date'}
              iconName={'pencil'}
              iconClass={MaterialIconCommunity}
              iconColor={'#17ac71'}
              iconSize={0}
              inputStyle={{fontFamily: 'Quicksand-Regular', color:'#17ac71'}}
              
              autoCapitalize={'none'}
              autoCorrect={false}
              returnKeyType='done'
              onFocus={() => this.openDatePicker()}
              onBlur={() => this.onBlur('fillDate')}
              value={this.state.fillDate}
              onChangeText={fillDate => this.setState({fillDate})}
          />
          <View><Text style={{color:'#ff0000', fontFamily:'Quicksand-Regular', textAlign:'right'}}>{this.state.errors.fillDate}</Text></View>
          <Sae
              style={{width: SCREEN_WIDTH*0.78, marginRight: 10}}
              label={'Medication'}
              iconName={'pencil'}
              iconColor={'#17ac71'}
              iconSize={0}
              inputStyle={{fontFamily: 'Quicksand-Regular', color:'#17ac71'}}
              iconClass={MaterialIconCommunity}
              
              // TextInput props
              autoCapitalize={'none'}
              autoCorrect={false}
              returnKeyType='done'
              onFocus={() => this.onFocus('medication')}
              onBlur={() => this.onBlur('medication')}
              value={this.state.medication}
              onChangeText={medication => this.setState({medication})}
          />
          <View><Text style={{color:'#ff0000', fontFamily:'Quicksand-Regular', textAlign:'right'}}>{this.state.errors.medication}</Text></View>
          <Sae
              style={{width: SCREEN_WIDTH*0.78, marginRight: 10}}
              label={'Strength'}
              iconName={'pencil'}
              iconColor={'#17ac71'}
              iconSize={0}
              inputStyle={{fontFamily: 'Quicksand-Regular', color:'#17ac71'}}
              iconClass={MaterialIconCommunity}
              
              // TextInput props
              autoCapitalize={'none'}
              autoCorrect={false}
              returnKeyType='done'
              value={this.state.strength}
              onChangeText={strength => this.setState({strength})}
          />
          <View><Text style={{color:'#ff0000', fontFamily:'Quicksand-Regular', textAlign:'right'}}></Text></View>
          <Sae
              style={{width: SCREEN_WIDTH*0.78, marginRight: 10}}
              label={'Dosage Form'}
              iconName={'pencil'}
              iconColor={'#17ac71'}
              iconSize={0}
              inputStyle={{fontFamily: 'Quicksand-Regular', color:'#17ac71'}}
              iconClass={MaterialIconCommunity}
              
              // TextInput props
              autoCapitalize={'none'}
              autoCorrect={false}
              returnKeyType='done'
              value={this.state.dosageForm}
              onChangeText={dosageForm => this.setState({dosageForm})}
          />
          <View><Text style={{color:'#ff0000', fontFamily:'Quicksand-Regular', textAlign:'right'}}></Text></View>
          <Sae
              style={{width: SCREEN_WIDTH*0.78, marginRight: 10}}
              label={'Quantity'}
              iconName={'pencil'}
              iconColor={'#17ac71'}
              iconSize={0}
              inputStyle={{fontFamily: 'Quicksand-Regular', color:'#17ac71'}}
              iconClass={MaterialIconCommunity}
              
              // TextInput props
              autoCapitalize={'none'}
              autoCorrect={false}
              returnKeyType='done'
              value={this.state.quantity}
              onChangeText={quantity => this.setState({quantity})}
          />
          <View><Text style={{color:'#ff0000', fontFamily:'Quicksand-Regular', textAlign:'right'}}>{this.state.errors.quantity}</Text></View>
          <TouchableOpacity style={styles.closeButton} onPress={() => {
              this.validateForm();
          }}>
              <Text style={styles.closeButtonText}>ADD</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => {
            this.toggleModal();
          }}>
              <Text style={styles.cancelButtonText}>CANCEL</Text>
          </TouchableOpacity>
          </ScrollView>
      )
  }

  toggleModal = () => this.setState({modal: !this.state.modal})

  renderModal = () => {
    return (
        <Modal 
          style={{alignContent:'center', paddingTop: 50}}
          scrollTo={this.handleScrollTo}
          onBackButtonPress={this.toggleModal}
          scrollOffset={this.state.scrollOffset}
          // onSwipe={this.toggleModal} swipeDirection="up" 
          onBackdropPress={this.toggleModal} isVisible={this.state.modal}>
            {this.renderFormContent()}
        </Modal>
    );
  }
  //dialog box for deleting selected medication history
  renderDialog = () => {
    return (
        <Modal 
          style={{alignContent:'center',paddingTop:0}}
          onBackButtonPress={this.toggleDialog}
          onBackdropPress={this.toggleDialog} isVisible={this.state.dialog}>
            <View style={styles.dialog}>
              <View style={{flex:1, width: SCREEN_WIDTH*.9 }}>
              <View style={styles.dialogHeader}>
                <Text style={styles.dialogHeaderText}>CONFIRM MEDICATION DELETE</Text>
              </View>
              <View style={{flex:0.6, width:SCREEN_WIDTH*0.9, justifyContent: 'center'}}>
                <Text style={!this.props.medicationState.deleteMedicationError? styles.dialogText: [styles.dialogText, {color: '#f00'}]}>
                  {!this.props.medicationState.deleteMedicationError? 
                  'Are you sure you want to delete this medication?': 
                  this.props.medicationState.deleteMedicationError}
                </Text>
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={() => {
                  const { fillDate, medication } = this.state.selectedItem;
                  let idx = this.props.medicationState.medications.findIndex(item => item.fillDate === fillDate && item.medication === medication);
                  this.props.deleteMedication({ fillDate: moment(fillDate, 'DD-MM-YYYY').format('YYYY-MM-DD'), medication }, this.toggleDialog, idx);
              }}>
                  <Text style={styles.closeButtonText}>OK</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => {
                this.toggleDialog();
              }}>
                  <Text style={styles.cancelButtonText}>CANCEL</Text>
              </TouchableOpacity>
              </View>
            </View>
        </Modal>
    );
  }

  handleScrollTo = p => {
    if (this.scrollViewRef) {
      this.scrollViewRef.scrollTo(p);
    }
  };

  renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <View style={{flexDirection: 'row'}}>
            <MaterialIconCommunity name={'pill'} color={'#17ac71'} size={26}></MaterialIconCommunity>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.headerText}>{section.medication}</Text>
            </View>
            {isActive? 
            <TouchableOpacity 
              onPress={() => this.toggleDialog(section)}
              style={{flexDirection: 'row', position: 'absolute', bottom: 0, right: 0 }}>
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
                <MaterialIconCommunity name={'pill'} color={'#17ac71'} size={26}></MaterialIconCommunity>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.headerText}>{section.title}</Text>
                </View>
            </View>
          </SwipeRow>
        </View> */}
      </Animatable.View>
    );
  };

  componentDidMount(){
    this.props.getMedications();
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
                    <Text style={styles.contentTextLeft}>Fill Date</Text>
                </View>
                <View style={[styles.contentContainer, styles.separator]}>
                    <Text style={styles.contentText}>{section.fillDate}</Text>
                </View>
            </View>
            <View style={{flexDirection: 'row'}}>
                <View style={[styles.contentLeftContainer, styles.separator]}>
                    <Text style={styles.contentTextLeft}>Strength</Text>
                </View>
                <View style={[styles.contentContainer, styles.separator]}>
                    <Text style={styles.contentText}>{section.strength}</Text>
                </View>
            </View>
            <View style={{flexDirection: 'row'}}>
                <View style={[styles.contentLeftContainer, styles.separator]}>
                    <Text style={styles.contentTextLeft}>Dosage Form</Text>
                </View>
                <View style={[styles.contentContainer, styles.separator]}>
                    <Text style={styles.contentText}>{section.dosageForm}</Text>
                </View>
            </View>
            <View style={{flexDirection: 'row'}}>
                <View style={[styles.contentLeftContainer]}>
                    <Text style={styles.contentTextLeft}>Quantity</Text>
                </View>
                <View style={[styles.contentContainer]}>
                    <Text style={styles.contentText}>{section.quantity}</Text>
                </View>
            </View>
        </Animatable.View>
      </Animatable.View>
    );
  }

  render() {
    const { activeSections } = this.state;
    if (this.props.isGetMedicationsPending) return <MaterialIndicator color='#17ac71' />
    return (
        <View style={styles.container}>
            <ScrollView 
              keyboardDismissMode='on-drag'
              keyboardShouldPersistTaps={'always'}
              style={{marginTop: 60}}
              showsVerticalScrollIndicator={false} 
              ontentContainerStyle={{ paddingBottom: 120 }}>
                <Accordion
                  activeSections={activeSections}
                  sections={this.props.medicationState.medications}
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
                  this.toggleModal();
                }}
            />
            {this.renderModal()}
            {this.renderDialog()}
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
    width: SCREEN_WIDTH * 0.5,
    paddingBottom: 10,
    paddingTop: 10,
  },
  contentLeftContainer: {
    width: SCREEN_WIDTH * 0.4,
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
    width: SCREEN_WIDTH*0.9,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    paddingLeft: 25,
    paddingTop: 5,
    paddingBottom: 50,
    paddingRight: 25,
  },
  closeButtonText:{
    fontFamily: 'Quicksand-Medium',
    fontSize: 16,
    color: '#17ac71',
    position:'absolute',
    right: 0,
  },
  cancelButtonText:{
    fontFamily: 'Quicksand-Medium',
    fontSize: 16,
    color: '#17ac71',
    position:'absolute',
    right: 0,
  },
  cancelButton: {
    width: 65,
    height: 50,
    alignItems: 'center',
    position: 'absolute',
    right: 70,
    bottom: -5,
  },
  closeButton: {
    width: 65,
    height: 50,
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    bottom: -5,
  },
  dialog: {
    top: -20,
    height: SCREEN_HEIGHT * 0.3,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent:'center',
    alignItems: 'center',
  },
  dialogText: {
    textAlign: 'center',
    fontFamily: 'Quicksand-Regular',
    fontSize: 18,
  },
  dialogHeader: {
    height: 65, 
    backgroundColor: '#17ac71', 
    top: 0, 
    position: 'relative', 
    borderTopRightRadius: 10, 
    borderTopLeftRadius: 10,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  dialogHeaderText: {
    fontFamily: 'Quicksand-Medium',
    color: '#fff',
    fontSize: 20,
  }
});

const mapStateToProps = state => {
  return {
    medicationState: state.medicationState,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addMedication: (med,cb) => dispatch(addMedication(med,cb)),
    deleteMedication: (med, cb, idx) => dispatch(deleteMedication(med,cb,idx)),
    getMedications: () => dispatch(getMedications()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MedicationHistoryScreen);