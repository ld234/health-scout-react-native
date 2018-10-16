import React, { Component } from 'react';
import { FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants';
import MaterialIconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/SimpleLineIcons';
import { connect } from 'react-redux';
import { addFamilyCondition, deleteFamilyCondition, getFamilyConditions } from '../../actions/family.history.actions';
import { Sae } from 'react-native-textinput-effects';
import _ from 'lodash';

class FamilyHistoryScreen extends Component {
  static navigationOptions = ({navigation}) => {
      return {
          title: 'Family History',
          headerTitleStyle: {flex: 1, textAlign: 'center', fontFamily: 'Quicksand-Medium', fontWeight: '200', fontSize: 24, color:'#17ac71'},
          headerRight: <View></View>,
          headerTransparent: true,
          headerTintColor: '#17ac71',
      }
  }
  state = {
    activeSections: [],
    collapsed: true,
    familyRelation: '',
    modal: false,
    familyCondition: '',
    errors: {},
    selectedItem: null,
  };

  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  toggleDialog = (item) => this.setState({dialog : !this.state.dialog, selectedItem: item});

  onFocus = event => {
    const newErr = _.merge(this.state.errors, { [event]: null });
		this.setState({errors: newErr } );
	};

	onBlur = value => {
		if (_.isEmpty(this.state[value])) {
			const newErr = _.merge(this.state.errors, { [value]: '*field required' });
			this.setState({ errors: newErr });
		} else {
			const newErr = _.merge(this.state.errors, { [value]: null });
			this.setState({ errors: newErr });
		}
  };

  validateForm = () => {
    let valid = true;
    const fields = ['familyRelation', 'familyCondition'];
    if (!fields.every(name => !_.isEmpty(this.state[name]))) {
      this.onBlur('familyRelation');
      this.onBlur('familyCondition');
      valid = false;
    }
    if (valid) {
      const { familyRelation, familyCondition } = this.state;
      this.props.addFamilyCondition({ familyRelation, familyCondition } , this.toggleModal);
      this.resetForm();
    }
  }

  resetForm = () =>{
    this.setState({errors: {}});
    this.setState({
      familyCondition:'',
      familyRelation: '',
    })
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
              {this.props.familyConditionState.addFamilyConditionError}
            </Text></View>
          <Sae
              style={{width: SCREEN_WIDTH*0.78, marginRight: 10}}
              label={'Medical Condition'}
              iconName={'pencil'}
              iconColor={'#17ac71'}
              iconSize={0}
              inputStyle={{fontFamily: 'Quicksand-Regular', color:'#17ac71'}}
              iconClass={MaterialIconCommunity}
              
              // TextInput props
              onBlur={() => this.onBlur('familyCondition')}
              onFocus={() => this.onFocus('familyCondition')}
              autoCapitalize={'none'}
              autoCorrect={false}
              returnKeyType='done'
              value={this.state.familyCondition}
              onChangeText={familyCondition => this.setState({familyCondition})}
          />
          <View><Text style={{color:'#ff0000', fontFamily:'Quicksand-Regular', textAlign:'right'}}>{this.state.errors.familyCondition}</Text></View>
          <Sae
              style={{width: SCREEN_WIDTH*0.78, marginRight: 10}}
              label={'Family Relationship'}
              iconName={'pencil'}
              iconColor={'#17ac71'}
              iconSize={0}
              inputStyle={{fontFamily: 'Quicksand-Regular', color:'#17ac71'}}
              iconClass={MaterialIconCommunity}
              
              // TextInput props
              autoCapitalize={'none'}
              autoCorrect={false}
              returnKeyType='done'
              value={this.state.familyRelation}
              onChangeText={familyRelation => this.setState({familyRelation})}
              onBlur={() => this.onBlur('familyRelation')}
              onFocus={() => this.onFocus('familyRelation')}
          />
          <View><Text style={{color:'#ff0000', fontFamily:'Quicksand-Regular', textAlign:'right'}}>{this.state.errors.familyRelation}</Text></View>
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
          style={{marginTop: SCREEN_HEIGHT* 0.2}}
          // onSwipe={this.toggleModal} swipeDirection="up" 
          onBackdropPress={this.toggleModal} isVisible={this.state.modal}>
            {this.renderFormContent()}
        </Modal>
    );
  }

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
              <View style={{flex:0.6, width:SCREEN_WIDTH*0.9, justifyContent: 'center', paddingLeft: 10, paddingRight: 10}}>
                <Text style={!this.props.familyConditionState.deleteFamilyConditionError? styles.dialogText: [styles.dialogText, {color: '#f00'}]}>
                  {!this.props.familyConditionState.deleteFamilyConditionError? 
                  'Are you sure you want to delete this medical condition from your family history?': 
                  this.props.familyConditionState.deleteFamilyConditionError}
                </Text>
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={() => {
                  const { familyRelation, familyCondition } = this.state.selectedItem;
                  let idx = this.props.familyConditionState.familyConditions.findIndex(item => item.familyRelation === familyRelation && item.familyCondition === familyCondition);
                  this.props.deleteFamilyCondition({ familyRelation, familyCondition }, this.toggleDialog, idx);
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

  componentDidMount(){
    this.props.getFamilyConditions();
  }

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
            <MaterialIconCommunity name={'human-male-female'} color={'#17ac71'} size={26}></MaterialIconCommunity>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.headerText}>{section.familyCondition}</Text>
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
                <MaterialIconCommunity name={'human-male-female'} color={'#17ac71'} size={26}></MaterialIconCommunity>
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
    console.log('section', section);
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Animatable.View animation={isActive ? 'fadeIn' : undefined}>
            <View style={{flexDirection: 'row'}}>
                <View style={[styles.contentLeftContainer, styles.separator]}>
                    <Text style={styles.contentTextLeft}>Family Relationship</Text>
                </View>
                <View style={[styles.contentContainer, styles.separator]}>
                    <Text style={styles.contentText}>{section.familyRelation}</Text>
                </View>
            </View>
        </Animatable.View>
      </Animatable.View>
    );
  }

  render() {
    const { activeSections } = this.state;
    console.log('content',this.props.familyConditionState.familyConditions);
    return (
        <View style={styles.container}>
            <ScrollView 
              style={{marginTop: 60}}
              showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
                <Accordion
                    activeSections={activeSections}
                    sections={this.props.familyConditionState.familyConditions}
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
    width: SCREEN_WIDTH * 0.4,
    paddingBottom: 10,
    paddingTop: 10,
  },
  contentLeftContainer: {
    width: SCREEN_WIDTH * 0.5,
    paddingBottom: 10,
    paddingTop: 10,
  },
  separator: {
    // borderBottomColor: '#efefef',
    // borderBottomWidth: 1,
  },
  longModal:{
    height: SCREEN_HEIGHT - 400,
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
    familyConditionState: state.familyConditionState,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addFamilyCondition: (med,cb) => dispatch(addFamilyCondition(med,cb)),
    deleteFamilyCondition: (med, cb, idx) => dispatch(deleteFamilyCondition(med,cb,idx)),
    getFamilyConditions: () => dispatch(getFamilyConditions()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FamilyHistoryScreen);