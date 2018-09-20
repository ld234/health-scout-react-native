import React from 'react';
import { View, Text, Platform, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import { STATUS_BAR_HEIGHT } from '../../constants';
import BottomNavigation, {IconTab} from 'react-native-material-bottom-navigation';
import PropTypes from 'prop-types';
import MyDocumentsScreen from '../MyDocuments/MyDocumentsScreen';
import MyProfileScreen from '../MyProfile/MyProfileScreen';
import SearchScreen from '../Search/SearchScreen';
import { checkAuth } from '../../actions/auth.actions';
import { connect } from 'react-redux';
import { Header } from 'react-native-elements';

class Navigation extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: typeof(navigation.state.params)==='undefined' || typeof(navigation.state.params.title) === 'undefined' ? 'My Profile': navigation.state.params.title,
    headerStyle: {
      height: Platform.OS === 'android' ? 60 + STATUS_BAR_HEIGHT: 0,
      backgroundColor: '#00CB20',
    },
    header: (props) => (
      <View style={{ backgroundColor: '#47BD5D', paddingBottom:0}}>
        <Header backgroundColor='#47BD5D'
          leftComponent={{ icon: 'menu', color: '#fff', size: 30 }}
          centerComponent={{ text: typeof(navigation.state.params)==='undefined' || typeof(navigation.state.params.title) === 'undefined' ? 'My Profile': navigation.state.params.title, 
          style: { color: '#fff', fontSize: 24, fontFamily: 'Quicksand-Medium'} }}
          rightComponent={{ icon: 'more-vert', color: '#fff', size: 30 }}
          outerContainerStyles={{
            borderBottomWidth: 0,
            marginBottom:0,
            height: 60,}}
        />
      </View>),
    headerTitleStyle: {
      marginTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT - 30: 0,
      color: 'white',
      fontFamily: 'Quicksand-Regular',
      fontSize: 24,
      fontWeight: '100',
    },
    headerLeft: <View />
  })
  constructor(props) {
    super(props);
    this.state = {
      activeTab: {
        key: 'profile',
        icon: {name:'ios-person', color: '#00CC3A', label: 'profile'},//'#022AD5'},
        label: 'My Profile',
        barColor: '#fefefe',
        pressColor: 'rgba(22, 127, 57, .16)'
      },
      tabs : [
        {
          key: 'profile',
          icon: {name:'user', color: '#00CC3A', label: 'profile'},//'#022AD5'},
          label: 'My Profile',
          barColor: '#fff',
          pressColor: 'rgba(22, 127, 57, .16)'
        },
        {
          key: 'documents',
          icon: {name:'docs', color: '#00CC3A', label: 'documents'},//'#1458EC'},
          label: 'My Documents',
          barColor: '#fff',
          pressColor: 'rgba(22, 127, 57, .16)'
        },
        {
          key: 'practitioners',
          icon: {name:'people', color: '#00CC3A', label: 'practitioners'},//'#1602F7'},
          label: 'My Practitioners',
          barColor: '#fff',
          pressColor: 'rgba(22, 127, 57, .16)'
        },
        {
          key: 'search',
          icon: {name:'magnifier', color: '#00CC3A', label: 'search'}, //'#3D09F9'},
          label: 'Find Practitioner',
          barColor: '#fff',
          pressColor: 'rgba(22, 127, 57, .16)'
        },
      ]
    }
  }

  
  renderIcon = icon => ({ isActive }) => {
    const { name } = icon;
    switch(name){
      case 'people':
        return <SimpleLineIcon size={26} color={isActive? icon.color : '#aaa'} name={icon.name} />;
      case 'magnifier':
        return (<SimpleLineIcon size={26} color={isActive? icon.color : '#aaa'} name={icon.name} />);
      case 'user':
        return (<SimpleLineIcon size={26} color={isActive? icon.color : '#aaa'} name={icon.name} />);
      case 'docs':
        return <SimpleLineIcon size={26} color={isActive? icon.color : '#aaa'} name={icon.name} />;
    }
  }
  
  renderTab = ({ tab, isActive }) => (
    <IconTab
      isActive={isActive}
      key={tab.key}
      renderIcon={this.renderIcon(tab.icon)}
      iconAnimation={progress => ({
        transform: [
          {
            scale: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.15]
            })
          }
        ],
        opacity: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5, 1]
        })
      })}
    />
  )

  renderContent = () => {
    switch(this.state.activeTab.key){
      case 'profile':
        return <MyProfileScreen />;
      case 'documents':
        return <MyDocumentsScreen />;
      case 'search':
        return <SearchScreen />;
    }
  }

  handleTabPress = (activeTab) => {
    const {setParams} = this.props.navigation;
    setParams({ title: activeTab.label });
    this.setState({ activeTab });
  }
  
  render() {
    return (
      <View style={{ flex: 1}}>
        <View style={{ flex: 1 }}>
          {this.renderContent()}
        </View>
        <BottomNavigation
          onTabPress={(activeTab) => this.handleTabPress(activeTab)}
          renderTab={this.renderTab}
          tabs={this.state.tabs}
        />
      </View>
    )
  }
}

Navigation.propTypes = {
  component: PropTypes.element,
}
/*
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import MyProfile from '../MyProfile/MyProfileScreen';
import MyDocuments from '../MyDocuments/MyDocumentsScreen';

export default createMaterialBottomTabNavigator({
  MyProfile: { screen: MyProfile },
  MyDocuments: { screen: MyDocuments },
}, {
  initialRouteName: 'MyProfile',
  activeTintColor: '#00CC3A',
  inactiveTintColor: '#f0edf6',
  barStyle: { backgroundColor: '#fff', height: 60},
  labeled: false,
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      return <SimpleLineIcon color={tintColor} size={24} name={'user'} />;
    },
  })
});
*/

const mapDispatchToProps = dispatch => {
  return {
    checkAuth: (cb) => dispatch(checkAuth(cb)),
  }
}
export default connect(null,mapDispatchToProps)(Navigation);