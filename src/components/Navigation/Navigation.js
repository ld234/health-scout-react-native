/* * * * * * * * * * * * * * * * * * * * * *
 * @Dan @Tenzin
 * Description: the tab function which navigates
 * between overview and prac profile overview
 * Created:  1 August 2018
 * Last modified:  15 October 2018
 * * * * * * * * * * * * * * * * * * * * * */

import * as React from 'react';
import { View, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity} from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';
import MyDocumentsScreen from '../MyDocuments/MyDocumentsScreen';
import MyProfileScreen from '../MyProfile/MyProfileScreen';
import SearchScreen from '../Search/SearchScreen';
import MyPractitioners from '../MyPractitioner/MyPractitionersScreen/MyPractitionersScreen';
import { logout } from '../../actions/auth.actions';
import { connect } from 'react-redux';
import { Header } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import SearchGroup from '../Search/SearchBar';
import { STATUS_BAR_HEIGHT } from '../../constants';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import SearchBar  from '../MyPractitioner/MyPractitionersScreen/SearchBar/SearchBar';
import BottomSheet from 'react-native-js-bottom-sheet'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';


const SearchRoute = (props) => <SearchScreen {...props}/>;

const ProfileRoute = (props) => <MyProfileScreen {...props} />;

const DocumentRoute = (props) => <MyDocumentsScreen {...props} />;

const MyPracRoute = (props) => <MyPractitioners {...props} />;

class MyComponent extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'profile', title: 'My Profile', icon: <SimpleLineIcon size={23} name={'user'} color={'white'} />, color: '#377F63' },
      { key: 'documents', title: 'My Documents', icon:  <SimpleLineIcon size={23} name={'docs'} color={'white'} />,color: '#1BCC86' },
      { key: 'myprac', title: 'My Practitioners', icon: <SimpleLineIcon size={23} name={'people'} color={'white'} />,color: '#17AC71' },
      { key: 'search', title: 'Find Practitioner', icon: <SimpleLineIcon size={23} name={'magnifier'} color={'#fff'} />, color: '#117F54' },
    ],
  };
   _signout = () =>{
      this.props.logout();
      this.props.navigation.navigate('Login');
    }

  _renderIcon = ({route, focused, color}) =>{
    return route.icon;
  }
  static navigationOptions = ({navigation}) => {
    if (typeof(navigation.state.params)==='undefined' || 
    typeof(navigation.state.params.title) === 'undefined' || 
    navigation.state.params.title === 'My Profile')
    {
      return {
        title: 'My Profile',
        headerTransparent: true,
        headerLeft: <MaterialIcon name="menu" style={{color: 'transparent', marginLeft: 10, marginTop: 5,}} size={30}></MaterialIcon>,
        headerTitleStyle: {flex: 1, textAlign: 'center', fontFamily: 'Quicksand-Medium', fontWeight: '200', fontSize: 24, color:'#fff'},
        headerRight: <TouchableOpacity onPress={ () => navigation.state.params.handleThis()}><MaterialIcon name={'more-vert'} style={{color: 'white', marginRight: 10, marginTop: 5,}} size={30}></MaterialIcon></TouchableOpacity>,
        headerStyle: {
          borderBottomWidth: 0,
        }
      };
  } else if (navigation.state.params.title === 'My Documents'){
    return {
      title: 'My Documents',
      headerTransparent: true,
      headerLeft: <MaterialIcon name="menu" style={{color: 'transparent', marginLeft: 10, marginTop: 5,}} size={30}></MaterialIcon>,
      headerTitleStyle: {flex: 1, textAlign: 'center', fontFamily: 'Quicksand-Medium', fontWeight: '200', fontSize: 24, color:'#fff'},
      headerRight: <MaterialIcon name={'more-vert'} style={{color: 'transparent', marginRight: 10, marginTop: 5,}} size={30}></MaterialIcon>,
      headerStyle: {
        borderBottomWidth: 0,
      }
    };
  } else {
  return {
    title: typeof(navigation.state.params)==='undefined' || typeof(navigation.state.params.title) === 'undefined' ? 'My Profile': navigation.state.params.title,
    headerStyle: {
      height: Platform.OS === 'android' ? 60 + STATUS_BAR_HEIGHT: 0,
      // backgroundColor: '#00CB20',
      backgroundColor: '#17AC71',
      // zIndex: 100,
    },
    header: (props) => (
      <LinearGradient  start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
      locations={[0,0.8]} colors={['#167434','#17AC71' ]}
            locations={[0,0.9]}>
      <View style={{ backgroundColor: 'transparent', paddingBottom:0, 
        height: typeof(navigation.state.params) === 'undefined' 
        || typeof(navigation.state.params.title) === 'undefined' 
        || navigation.state.params.title === 'My Profile' ? 200 : (navigation.state.params.title === 'Find Practitioner' ? 170: (navigation.state.params.title === 'My Practitioners' ? 120: 60)) }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Header backgroundColor='transparent'
            leftComponent={{ icon: 'menu', color: 'transparent', size: 30 }}
            centerComponent={{ text: typeof(navigation.state.params)==='undefined' || typeof(navigation.state.params.title) === 'undefined' ? 'My Profile': navigation.state.params.title, 
            style: { color: '#fff', fontSize: 24, fontFamily: 'Quicksand-Medium'} }}
            rightComponent={{ icon: 'more-vert', color: 'transparent', size: 30 }}
            outerContainerStyles={{
              borderBottomWidth: 0,
              marginBottom:0,
              height: 60,}}
          />
        </TouchableWithoutFeedback>
        {typeof(navigation.state.params) === 'undefined' 
        || typeof(navigation.state.params.title) === 'undefined' 
        || navigation.state.params.title === 'My Profile' ? null : (navigation.state.params.title === 'Find Practitioner' ?  
        <SearchGroup />: 
        (navigation.state.params.title ==='My Practitioners'? <SearchBar /> : null))
        }
       
      </View>
      </LinearGradient>
      // : null
      ),
    headerTitleStyle: {
      marginTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT - 30: 0,
      color: 'white',
      fontFamily: 'Quicksand-Regular',
      fontSize: 24,
      fontWeight: '100',
    },
    headerLeft: <View />
  }}}

  bottomSheet: BottomSheet

  _onPressButton = () => {
    this.bottomSheet.open()
  }
  componentDidMount() {
    this.props.navigation.setParams({
        handleThis: this._onPressButton
    });
  }

  _handleIndexChange = index => {
    this.setState({ index });
    const {setParams} = this.props.navigation;
    setParams({ title: this.state.routes[index].title });
  }

  _renderScene = BottomNavigation.SceneMap({
    profile: (props) => <ProfileRoute {...this.props} />,
    documents: (props) => <DocumentRoute {...this.props} />,
    myprac: (props) => <MyPracRoute {...this.props} />,
    search: (props) => <SearchRoute {...this.props} />
  });

  render() {
    return (
      <View style={{flex: 1}}>
        <BottomNavigation
          labeled={true}
          navigationState={this.state}
          onIndexChange={this._handleIndexChange}
          renderScene={this._renderScene}
          renderIcon={this._renderIcon}
        />
        <BottomSheet
          ref={(ref: BottomSheet) => {
              this.bottomSheet = ref
          }}
          // itemDivider={3}
          backButtonEnabled={true}
          coverScreen={false}
          height={200}
          fontFamily={"Quicksand"}
          title={"                     Are you sure you want to sign out?"}
          // title="Create"
          options={[
              {
              title: 'Signout',
              icon: (
                  <Ionicons
                  name="ios-log-out"
                  color="#17ac71"
                  size={30}
                  />
              ),
              onPress: () => this._signout()
              },
          ]}
          isOpen={false}
          />
      </View>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
  }
}
export default connect(null, mapDispatchToProps)(MyComponent)