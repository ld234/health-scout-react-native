import React from 'react';
import { View, Text, Platform, TouchableWithoutFeedback, Keyboard} from 'react-native';
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
import LinearGradient from 'react-native-linear-gradient';
import SearchBar from '../Search/SearchBar';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchOptionsModalVisible: false,
      activeTab: {
        key: 'profile',
        icon: {name:'ios-person', color: '#17AC71', label: 'profile'},//'#022AD5'},
        label: 'My Profile',
        barColor: '#fefefe',
        pressColor: 'rgba(22, 127, 57, .16)'
      },
      tabs : [
        {
          key: 'profile',
          icon: {name:'user', color: '#17AC71', label: 'profile'},//'#022AD5'},
          label: 'My Profile',
          barColor: '#fff',
          pressColor: 'rgba(22, 127, 57, .16)'
        },
        {
          key: 'documents',
          icon: {name:'docs', color: '#17AC71', label: 'documents'},//'#1458EC'},
          label: 'My Documents',
          barColor: '#fff',
          pressColor: 'rgba(22, 127, 57, .16)'
        },
        {
          key: 'practitioners',
          icon: {name:'people', color: '#17AC71', label: 'practitioners'},//'#1602F7'},
          label: 'My Practitioners',
          barColor: '#fff',
          pressColor: 'rgba(22, 127, 57, .16)'
        },
        {
          key: 'search',
          icon: {name:'magnifier', color: '#17AC71', label: 'search'}, //'#3D09F9'},
          label: 'Find Practitioner',
          barColor: '#fff',
          pressColor: 'rgba(22, 127, 57, .16)'
        },
      ]
    }
  }

  static navigationOptions = ({navigation}) => ({
    title: typeof(navigation.state.params)==='undefined' || typeof(navigation.state.params.title) === 'undefined' ? 'My Profile': navigation.state.params.title,
    headerStyle: {
      height: Platform.OS === 'android' ? 60 + STATUS_BAR_HEIGHT: 0,
      // backgroundColor: '#00CB20',
      backgroundColor: '#17AC71',
      // zIndex: 100,
    },
    header: (props) => (
      <LinearGradient  start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
        locations={[0,0.8]} colors={['#167434','#17AC71']}
        locations={[0,0.9]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
      <View  style={{ backgroundColor: 'transparent', paddingBottom:0, 
        height: typeof(navigation.state.params) === 'undefined' 
        || typeof(navigation.state.params.title) === 'undefined' 
        || navigation.state.params.title === 'My Profile' ? 200 : (navigation.state.params.title === 'Find Practitioner' ? 170: 60) }}>
        <Header backgroundColor='transparent'
          leftComponent={{ icon: 'menu', color: '#fff', size: 30 }}
          centerComponent={{ text: typeof(navigation.state.params)==='undefined' || typeof(navigation.state.params.title) === 'undefined' ? 'My Profile': navigation.state.params.title, 
          style: { color: '#fff', fontSize: 24, fontFamily: 'Quicksand-Medium'} }}
          rightComponent={{ icon: 'more-vert', color: '#fff', size: 30 }}
          outerContainerStyles={{
            borderBottomWidth: 0,
            marginBottom:0,
            height: 60,}}
        />
        {typeof(navigation.state.params) === 'undefined' 
        || typeof(navigation.state.params.title) === 'undefined' 
        || navigation.state.params.title === 'My Profile' ? null : (navigation.state.params.title === 'Find Practitioner' ?  
        <SearchBar />: null)}
       </View>
      </TouchableWithoutFeedback>
      </LinearGradient>),
    headerTitleStyle: {
      marginTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT - 30: 0,
      color: 'white',
      fontFamily: 'Quicksand-Regular',
      fontSize: 24,
      fontWeight: '100',
    },
    headerLeft: <View />
  })

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

const mapDispatchToProps = dispatch => {
  return {
    checkAuth: (cb) => dispatch(checkAuth(cb)),
  }
}
export default connect(null, mapDispatchToProps)(Navigation);