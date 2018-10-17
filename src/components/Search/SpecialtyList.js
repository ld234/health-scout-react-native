/* * * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Description: the tab function which navigates
 * between overview and prac profile overview
 * Created:  25 August 2018
 * Last modified:  10 October 2018
 * * * * * * * * * * * * * * * * * * * * * */

import React from 'react';
import { TouchableOpacity, Text, View, FlatList, Keyboard} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';

class MyListItem extends React.PureComponent {
    _onPress = () => {
      this.props.onPressItem(this.props.id);
    };
  
    render() {
      const textColor = this.props.selected? "#17ac71" : "#666";
      const font = this.props.selected? 'Quicksand-Medium' : 'Quicksand-Regular';
      return (
        <TouchableOpacity onPress={this._onPress}>
          <View style={{height: 60, justifyContent: 'center', paddingLeft: 50, borderBottomColor: '#eee', borderBottomWidth: 1}}>
            <MaterialCommunityIcon color={'#17ac71'} name={'leaf'} size={24} style={{position:'absolute', top: 18, left: 10}} />
            <Text style={{ color: textColor, fontFamily:font, fontSize: 20 }}>
              {this.props.id}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  }
  
class SpecialtyList extends React.PureComponent {
    state = {selected: (new Map(): Map<string, boolean>)};
  
    _keyExtractor = (item, index) => item.id;
  
    _onPressItem = (id) => {
      // updater functions are preferred for transactional updates
      this.setState((state) => {
        // copy the map rather than modifying state.
        const selected = new Map(state.selected);
        selected.set(id, !selected.get(id)); // toggle
        if (selected.get(id))
          this.props.callback(id);
        else
          this.props.delete(id);
        return {selected};
      });
      Keyboard.dismiss();
    };
  
    _renderItem = ({item}) => (
      <MyListItem
        id={item.id}
        onPressItem={this._onPressItem}
        selected={this.state.selected.get(item.id)}
        title={item.title}
      />
    );

    componentDidMount() {
      if(Array.isArray(this.props.selectedList) )
        this.props.selectedList.forEach(item => this._onPressItem(item));
    }
  
    render() {
      if(this.props.pracState.pracTypeSpecialties && this.props.pracState.pracTypeSpecialties.length)
        return (
          <FlatList
            contenContainerStyle={{justifyContent:'center', flex: 1}}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'always'}
            data={this.props.pracState.pracTypeSpecialties.map(loc => { return { id : loc.specialtyName}} )}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        );
      else return( <View style={{flex: 1, justifyContent: 'center', alignItems:'center', }}>
        <Text style={{fontSize: 20, fontFamily: 'Quicksand-Regular', color: '#FF4123'}}>Please choose a practitioner type.</Text>
      </View>)
    }
}

const mapStateToProps = state => {
  return{
    renderState: state.renderSearchState,
    pracState: state.practitionerState,
  }
}

export default connect(mapStateToProps)(SpecialtyList);