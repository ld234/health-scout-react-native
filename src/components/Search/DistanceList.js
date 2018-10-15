import React from 'react';
import { TouchableOpacity, Text, View, FlatList, Keyboard} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import { toggleSearchOptionModal, setSelectedRadius } from '../../actions/render.actions';

class MyListItem extends React.PureComponent {
    _onPress = () => {
      this.props.onPressItem(this.props.id);
    };
  
    render() {
      console.log('two things', this.props.selectedRadius,parseInt(this.props.id.slice(0,this.props.id.length - 3)), this.props.selectedRadius === parseInt(this.props.id.slice(0,this.props.id.length - 3)));
      const color = this.props.selectedRadius === parseInt(this.props.id.slice(0,this.props.id.length - 3))? '#17ac71':'#666';
      const font = this.props.selectedRadius === parseInt(this.props.id.slice(0,this.props.id.length - 3))? 'Quicksand-Medium':'Quicksand-Regular';
      return (
        <TouchableOpacity onPress={this._onPress}>
          <View style={{height: 60, justifyContent: 'center', paddingLeft: 50, borderBottomColor: '#eee', borderBottomWidth: 1}}>
            <MaterialCommunityIcon color={color} name={'google-nearby'} size={24} style={{position:'absolute', top: 18, left: 10}} />
            <Text style={{ color, fontFamily: font, fontSize: 20 }}>
              {this.props.id}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  }
  
class DistanceList extends React.PureComponent {
    state = {selected: (new Map(): Map<string, boolean>)};
  
    _keyExtractor = (item, index) => item.id;
  
    _onPressItem = (id) => {
      // updater functions are preferred for transactional updates
      this.setState((state) => {
        // copy the map rather than modifying state.
        const selected = new Map(state.selected);
        selected.set(id, !selected.get(id)); // toggle
        return {selected};
      });
      this.props.setSelectedRadius(parseInt(id.slice(0,id.length-3)));
      this.props.toggleSearchOptionModal();
    };
  
    _renderItem = ({item}) => (
      <MyListItem
        selectedRadius={this.props.renderState.selectedRadius}
        id={item.id}
        onPressItem={this._onPressItem}
        selected={!!this.state.selected.get(item.id)}
        title={item.title}
      />
    );
  
    render() {
      console.log('pracState', this.props.renderState);
      return (
        <FlatList
          initialScrollIndex={this.props.renderState.selectedRadius/5 - 1}
          ref={(ref) => { this.flatListRef = ref; }}
          getItemLayout={(data, index) => (
            {length: 60, offset: 60 * index, index}
          )}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'always'}
          data={Array.apply(null, {length: 30}).map((loc, idx) => { return { id : `${(idx+1)*5} km` }} ).concat({id: '150+ km'})}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      );
    }
}

const mapStateToProps = state => {
  return{
    renderState: state.renderSearchState,
    pracState: state.practitionerState,
  }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleSearchOptionModal: () => dispatch(toggleSearchOptionModal()),
        setSelectedRadius: (r) => dispatch(setSelectedRadius(r)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DistanceList);