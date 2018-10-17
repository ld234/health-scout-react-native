/* * * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Description: main search screen
 * Created:  28 August 2018
 * Last modified:  13 October 2018
 * * * * * * * * * * * * * * * * * * * * * */

import React from 'react';
import {TouchableOpacity, View, TouchableWithoutFeedback, Keyboard} from 'react-native';
import PracCard from './PracCard';
import { connect } from 'react-redux';
import { toggleSearchOptionModal, setSearchPracType, setSelectedSpecialties, setSelectedSortOption } from '../../actions/render.actions';
import { getPracTypeSpecialties } from '../../actions/practitioner.actions';
import Modal from 'react-native-modal';
import {Surface} from 'react-native-paper';
import LocationList from './LocationList';
import SpecialtyList from './SpecialtyList';
import DistanceList from './DistanceList';
import FilterButton from './FilterButton';
import { updateViewCount } from '../../actions/practitionerProfile.actions';

import { ScrollView, StyleSheet, Image, Text } from 'react-native';
import {
    DotIndicator,
  } from 'react-native-indicators';

import logo from '../../../assets/images/healthscout-logo.png'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants';
import {
    MKRadioButton,
    MKColor,
    setTheme,
  } from 'react-native-material-kit';

setTheme({radioStyle: {
 fillColor: '#17ac71ee',
 borderOnColor: '#17ac71ee',
 borderOffColor: '#17ac7166',
 rippleColor: `rgba(${MKColor.RGBTeal},.15)`,
}});

import { PermissionsAndroid } from 'react-native';

//gets permission to acces location
async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'HealthScout Location Permission',
        'message': 'HealthScout needs access to your location.'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera")
    } else {
      console.log("Camera permission denied")
    }
  } catch (err) {
    console.warn(err)
  }
}

requestLocationPermission();
  
class SearchScreen extends React.Component {
    constructor(props) {
        super(props);
        this.radioGroup = new MKRadioButton.Group();
        this.radioGroup2 = new MKRadioButton.Group();
        this.state = {
            isModalVisible: false,
            value: 0,
            selectedSortOption: this.props.renderState.selectedSortOption,
            specialties: [],
            pracType: null,
            specialty: null,
            radius: 10,
            openSearch: true,
            selected: (new Map(): Map<string, boolean>)
        }
    }

    _onChecked = (checked, pracType) => {
        if(checked){
            this.setState({pracType});
        }
    }

    _renderFAB = () => {
        return <FilterButton />
    }

    deleteSpecialty = (id) =>{
        this.setState((state) => {
            const selected = new Map(state.selected);
            selected.delete(id);
            return {selected};
        });
    }

    renderPracTypeRadioGroup = () =>{
        return (
            <View style={styles.modal}>
                <View style={{flex: 0.45, width: SCREEN_WIDTH * 0.6, alignItems: 'flex-start'}}>
                    <View style={{flex: 0.33, flexDirection: 'row', justifyContent: 'center'}}>
                        <MKRadioButton
                            group={this.radioGroup}
                            checked={this.props.renderState.searchPracType === 'Dietitian' ? true: false}
                            onCheckedChange={(event) => this._onChecked(event.checked, 'Dietitian')}
                        />
                        <Text style={this.state.pracType !== 'Dietitian'? 
                            styles.optionText : styles.activeText}>Dietitian</Text>
                    </View>
                    <View style={{flex: 0.33, flexDirection: 'row', justifyContent: 'center'}}>
                        <MKRadioButton 
                            group={this.radioGroup}
                            checked={this.props.renderState.searchPracType === 'Physiotherapist' ? true: false}
                            onCheckedChange={(event) => this._onChecked(event.checked, 'Physiotherapist')}
                        />
                        <Text style={this.state.pracType !== 'Physiotherapist'? 
                            styles.optionText : styles.activeText}>Physiotherapist</Text>
                    </View>
                    <View style={{flex: 0.33, flexDirection: 'row', justifyContent: 'center'}}>
                        <MKRadioButton 
                            group={this.radioGroup}
                            checked={this.props.renderState.searchPracType === 'Exercise Physiologist' ? true: false}
                            onCheckedChange={(event) => this._onChecked(event.checked, 'Exercise Physiologist')}
                        />
                        <Text style={this.state.pracType !== 'Exercise Physiologist'? 
                            styles.optionText : styles.activeText}>
                            Exercise Physiologist
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.cancelButton} onPress={() => {
                    this.props.toggleSearchOptionModal();
                    this.setState({pracType: null});
                }}>
                    <Text style={styles.cancelButtonText}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeButton} onPress={() => {
                    this.props.setSearchPracType(this.state.pracType);
                    this.props.getPracTypeSpecialties(this.state.pracType);
                    this.props.toggleSearchOptionModal();
                }}>
                    <Text style={styles.closeButtonText}>SELECT</Text>
                </TouchableOpacity>
            </View>
        );
    }
//render distance option
    renderDistanceList = () => {
        return (
            <View style={styles.listModal}>
                <DistanceList />
                <TouchableOpacity style={styles.closeButton} onPress={() => this.props.toggleSearchOptionModal()}>
                    <Text style={styles.closeButtonText}>CLOSE</Text>
                </TouchableOpacity>
            </View>)
    }

    //render the speciality list
    renderSpecialtyList = () => {
        if(this.props.pracState.isGetPracTypeSpecialtysPending){
            return <View><Text>Fetching data...</Text></View>
        }
        else if(!(this.props.pracState.pracTypeSpecialties && this.props.pracState.pracTypeSpecialties.length)){
            return (
                <View style={styles.modal}>
                    <SpecialtyList />
                    <TouchableOpacity style={styles.closeButton} onPress={() => this.props.toggleSearchOptionModal()}>
                        <Text style={styles.closeButtonText}>OK</Text>
                    </TouchableOpacity>
                </View>)
        }
        else {
            return (
                <View style={styles.listModal}>
                    <SpecialtyList selectedList={Array.from(this.state.selected.keys())? Array.from(this.state.selected.keys()): []} 
                        callback={(id) => this._onPressItem(id)}
                        delete={(id) => this.deleteSpecialty(id)} />
                    <TouchableOpacity style={styles.cancelButton} onPress={() => this.props.toggleSearchOptionModal()}>
                        <Text style={styles.cancelButtonText}>CANCEL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.closeButton} onPress={() => {
                        this.props.toggleSearchOptionModal();
                        this.props.setSelectedSpecialties(Array.from(this.state.selected.keys()));
                    }}>
                        <Text style={styles.closeButtonText}>SELECT</Text>
                    </TouchableOpacity>
                </View>)
        }
    }

    _onOptionChecked = (checked, opt) => {
        if(checked)
            this.setState({selectedSortOption: opt});
    }

    renderSortOptions = () => {
        return (
            <View style={styles.modal}>
                <View style={{flex: 0.45, width: SCREEN_WIDTH * 0.6, alignItems: 'flex-start'}}>
                    <View style={{flex: 0.33, flexDirection: 'row', justifyContent: 'center'}}>
                        <MKRadioButton
                            group={this.radioGroup}
                            checked={this.state.selectedSortOption === 0 ? true: false}
                            onCheckedChange={(event) => this._onOptionChecked(event.checked, 0)}
                        />
                        <Text style={this.state.selectedSortOption !== 0? 
                            styles.optionText : styles.activeText}>Shortest Distance</Text>
                    </View>
                    <View style={{flex: 0.33, flexDirection: 'row', justifyContent: 'center'}}>
                        <MKRadioButton 
                            group={this.radioGroup}
                            checked={this.state.selectedSortOption === 1 ? true: false}
                            onCheckedChange={(event) => this._onOptionChecked(event.checked, 1)}
                        />
                        <Text style={this.state.selectedSortOption !== 1? 
                            styles.optionText : styles.activeText}>Highest Rating</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.closeButton} onPress={() => {
                    this.props.setSelectedSortOption(this.state.selectedSortOption);
                    this.props.toggleSearchOptionModal();
                }}>
                    <Text style={styles.closeButtonText}>SELECT</Text>
                </TouchableOpacity>
            </View>
        )
    }

    renderModal = (modalType) => {
        switch(modalType) {
            case 0:
                return (
                    <Modal 
                        onBackButtonPress={this.props.toggleSearchOptionModal}
                        onBackdropPress={this.props.toggleSearchOptionModal} isVisible={this.props.renderState.isSearchOptionModalShown}>
                        {this.renderPracTypeRadioGroup()}
                    </Modal>
                );
            case 1:
                return (
                    <Modal 
                        onBackButtonPress={this.props.toggleSearchOptionModal}
                        onBackdropPress={this.props.toggleSearchOptionModal} isVisible={this.props.renderState.isSearchOptionModalShown}>
                        {this.renderSpecialtyList()}
                    </Modal>
                );
            case 2: 
                return (
                    <Modal onBackButtonPress={this.props.toggleSearchOptionModal}
                        onBackButtonPress={this.props.toggleSearchOptionModal}
                        onBackdropPress={this.props.toggleSearchOptionModal} isVisible={this.props.renderState.isSearchOptionModalShown}>
                        {this.renderDistanceList()}
                    </Modal>
                );
            case 3:
                return (
                    <Modal onBackButtonPress={this.props.toggleSearchOptionModal}
                        onBackdropPress={() => {
                        this.props.toggleSearchOptionModal();
                        this.props.setSelectedSortOption(this.state.selectedSortOption);
                    }} isVisible={this.props.renderState.isSearchOptionModalShown}>
                        {this.renderSortOptions()}
                    </Modal>
                )
            default:
                return null;
        }
    }

    _renderLocationList = () => {
        const listLength = this.props.renderState.locationList.length;
        const height = Number.isInteger(listLength) && listLength <= 4 ?  (listLength+1)*60 : 300;
        if(listLength)
        return (
            <Surface style={{
                borderColor: '#ddd',
                borderRadius: 3,
                borderWidth: 1,
                width: SCREEN_WIDTH -10, 
                marginLeft: 5, 
                backgroundColor: '#fff', 
                position: 'absolute', 
                top: 5, 
                zIndex: 3000,
                elevation: 4,
                height: height
            }}>
                <LocationList />
            </Surface>);
        else return null;
    }
   
    _onPressItem = (id) => {
      // updater functions are preferred for transactional updates
      this.setState((state) => {
        // copy the map rather than modifying state.
        const selected = new Map(state.selected);
        selected.set(id, true);
        return {selected};
      });
      Keyboard.dismiss();
    };

    onPracSelected = item => {
        this.props.navigation.navigate('SearchPracProfile', item);
        this.props.updateViewCount(item.pracUsername);
    }

    render() {
        const specialties = this.props.renderState.selectedSpecialties ? this.props.renderState.selectedSpecialties : [];
        let list = this.props.pracState.pracSearchResult.map(item => {
            if(item.rating == null) 
                return {...item, rating: 0};
            return item;
        })
            .filter(prac => specialties.every(sp => (prac.Specialties ? prac.Specialties: []).map(s => s.specialty).includes(sp))).filter(prac => prac.distance <= this.props.renderState.selectedRadius);
        if (this.props.renderState.searchPracType && this.props.renderState.searchPracType.length) {
            list = list.filter(prac => prac.pracType.toLowerCase() === this.props.renderState.searchPracType.toLowerCase());
        }
        if (this.props.renderState.selectedSortOption == 0){
            list = list.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance)).slice();
        } else if (this.props.renderState.selectedSortOption == 1){
            list = list.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating)).slice();
        }
        if (this.props.pracState.isSearchPracPending){
            return (
                <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo}></Image>
                    <Text style={styles.text}>Scouting for practitioner...</Text>
                    <DotIndicator color='#17ac71' size={12} animationDuration={1000} />
                </View>
            );
        }
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{flex:1}}>
                <View style={styles.screenContent}>
                    
                    <ScrollView style={styles.screenContent} showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps={'always'} contentContainerStyle={styles.scrollViewContent}>
                        
                        <View >
                            {list.map((item, idx) => {
                                if (idx ===  0 ) {
                                    return (
                                    <TouchableOpacity key={item.pracUsername}
                                        onPress={()=>this.onPracSelected(item)}>
                                        <PracCard data={item} top={true} bottom={false} /> 
                                    </TouchableOpacity> );
                                }
                                else if (idx === list.length - 1) {
                                    return (<TouchableOpacity 
                                        onPress={()=>this.onPracSelected(item)} key={item.pracUsername}>
                                        <PracCard data={item} top={false} bottom={true} /> 
                                    </TouchableOpacity> );
                                }
                                else {
                                    return (<TouchableOpacity 
                                        onPress={()=>this.onPracSelected(item)} key={item.pracUsername}>
                                        <PracCard data={item} top={false} bottom={false} /> 
                                    </TouchableOpacity>);
                                }
                            })}
                        </View>
                       
                    </ScrollView>
                    
                    {this.renderModal(this.props.renderState.searchOptionModalType)}
                    {this.props.renderState.isLocationSuggestionShown ? 
                        this._renderLocationList() : null}
                    {this._renderFAB()}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    overlay:{
        borderColor: '#ddd',
        borderRadius: 3,
        borderWidth: 1,
        // height: 300,
        width: SCREEN_WIDTH -10, 
        marginLeft: 5, 
        backgroundColor: '#fff', 
        position: 'absolute', 
        top: 5, 
        zIndex: 3000,
        elevation: 4,
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
        right: 90,
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
    optionText:{
        fontFamily: 'Quicksand-Regular',
        fontSize: 20,
        paddingBottom: 4,
    },
    activeText:{
        fontFamily: 'Quicksand-Medium',
        fontSize: 20,
        paddingBottom: 4,
        color: '#17ac71',
    },
    listModal:{
        height: SCREEN_HEIGHT - 200,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        paddingLeft: 5,
        paddingTop: 5,
        paddingBottom: 50,
        paddingRight: 5,
    },
    modal:{
        height: SCREEN_HEIGHT - 400,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    screenContent:{
        paddingBottom: 0,
        flex:1,
    },
    scrollViewContent: {
        flexGrow: 1,
        // flexDirection: 'row',
    },
    logo: {
        width: 112,
        height: 149,
        marginBottom: 10
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: SCREEN_HEIGHT * 0.1
    },
    text: {
        fontFamily: 'Quicksand-Medium',
        color:'#17ac71',
        marginBottom: 20,
        marginTop: 0,
        fontSize: 20
    }
});


const mapStateToProps = state => {
    return {
      renderState: state.renderSearchState,
      pracState: state.practitionerState,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleSearchOptionModal: (modalType) => dispatch(toggleSearchOptionModal(modalType)),
        getPracTypeSpecialties: (pracType) => dispatch(getPracTypeSpecialties(pracType)),
        setSearchPracType: (pracType) => dispatch(setSearchPracType(pracType)),
        setSelectedSpecialties: (list) => dispatch(setSelectedSpecialties(list)),
        setSelectedSortOption: (n) => dispatch(setSelectedSortOption(n)),
        updateViewCount: (prac) => dispatch(updateViewCount(prac)),
    }
}

  

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);