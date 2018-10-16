import React from 'react';
import { TouchableOpacity, Text, View, FlatList, Keyboard} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import { setLocationSuggestionShow,setLocationSearchQuery, setCoord } from '../../actions/render.actions';
import { searchPracByRadius } from '../../actions/practitioner.actions';

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
      if (id === 'Your location') {
        navigator.geolocation.getCurrentPosition((obj) => {
          console.log('My location', obj);
          this.props.setCoord(obj.coords.latitude, obj.coords.longitude);
          this.props.setLocationSuggestionShow(false);
          this.props.setLocationSearchQuery(id);
          this.props.searchPracByRadius(this.props.renderState.selectedRadius, obj.coords.latitude, obj.coords.longitude);
          Keyboard.dismiss();
        }, (err) => console.log('err: ', err),  { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 });
      } else {
        this.props.setCoord(lat,lng);
        this.props.setLocationSuggestionShow(false);
        this.props.setLocationSearchQuery(id);
        this.props.searchPracByRadius(this.props.renderState.selectedRadius, lat,lng);
        Keyboard.dismiss();
      }
    };
  
    _renderItem = ({item}) => (
      <MyListItem
        id={item.id}
        onPressItem={() => this._onPressItem(item.id, item.lat, item.lng)}
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
          data={ [{id: 'Your location', lat: 0, lng: 0 }].concat(this.props.renderState.locationList.map(loc => { 
            return { 
              id : `${loc.placeName}, ${loc.adminCode1} ${loc.postalcode}`, 
              lat: loc.lat, 
              lng: loc.lng }
            }))}
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
        searchPracByRadius: (r, lat, lng) => dispatch(searchPracByRadius(r, lat,lng)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationList);