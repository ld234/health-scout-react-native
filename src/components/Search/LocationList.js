import React from 'react';
import { TouchableOpacity, Text, View, FlatList, Keyboard} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import { setLocationSuggestionShow,setLocationSearchQuery, setCoord } from '../../actions/render.actions';

class MyListItem extends React.PureComponent {
    _onPress = () => {
      this.props.onPressItem(this.props.id);
    };
  
    render() {
      const textColor = this.props.selected ? "red" : "black";
      return (
        <TouchableOpacity onPress={this._onPress}>
          <View style={{height: 60, justifyContent: 'center', paddingLeft: 50, borderBottomColor: '#eee', borderBottomWidth: 1}}>
            <MaterialCommunityIcon color={'#17ac71'} name={'map-marker-outline'} size={24} style={{position:'absolute', top: 18, left: 10}} />
            <Text style={{ color: textColor, fontFamily:'Quicksand-Regular', fontSize: 20 }}>
              {this.props.id}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  }
  
class LocationList extends React.PureComponent {
    state = {selected: (new Map(): Map<string, boolean>), lat: 0, lng: 0};
  
    _keyExtractor = (item, index) => item.id;
  
    _onPressItem = (id, lat, lng) => {
      console.log(id, lat, lng);
      this.props.setCoord(lat,lng);
      this.props.setLocationSuggestionShow(false);
      this.props.setLocationSearchQuery(id);
      Keyboard.dismiss();
    };
  
    _renderItem = ({item}) => (
      <MyListItem
        id={item.id}
        onPressItem={(id) => this._onPressItem(item.id, item.lat, item.lng)}
        selected={!!this.state.selected.get(item.id)}
        title={item.title}
      />
    );
  
    render() {
      return (
        <FlatList
          ref={(ref) => { this.flatListRef = ref; }}
          keyboardShouldPersistTaps={'always'}
          showsVerticalScrollIndicator={false}
          data={ this.props.renderState.locationList.map(loc => { return { id : `${loc.placeName}, ${loc.adminCode1} ${loc.postalcode}`, lat: loc.lat, lng: loc.lng }} )}
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
  }
}

const mapDispatchToProps = dispatch => {
    return {
        setLocationSearchQuery: (query) => dispatch(setLocationSearchQuery(query)),
        setLocationSuggestionShow: (bool) => dispatch(setLocationSuggestionShow(bool)),
        setCoord: (lat,lng) => dispatch(setCoord(lat, lng)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationList);