import * as React from 'react';
import { View, Platform, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';
import MyDocumentsScreen from '../MyDocuments/MyDocumentsScreen';
import MyProfileScreen from '../MyProfile/MyProfileScreen';
import SearchScreen from '../Search/SearchScreen';
import MyPractitioners from '../MyPractitioner/MyPractitionersScreen/MyPractitionersScreen';
import { checkAuth } from '../../actions/auth.actions';
import { connect } from 'react-redux';
import { Header } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import SearchGroup from '../Search/SearchBar';
import { STATUS_BAR_HEIGHT } from '../../constants';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import SearchBar  from '../MyPractitioner/MyPractitionersScreen/SearchBar/SearchBar';
import { StackNavigator } from 'react-navigation';

// export const MyPractitionerStack = StackNavigator({
//   MyPracList: {
//     screen: (props) => <MyPractitioners />,
//     // screen: MyPractitioners,

//     navigationOptions: {
//       header: null
//     }
//   },
//   PracDetail:{
//     screen: MyPractitionerDetail,
//     navigationOptions: {
//       header: null
//     }
//   },
// })

const SearchRoute = () => <SearchScreen />;

const ProfileRoute = () => <MyProfileScreen />;

const DocumentRoute = () => <MyDocumentsScreen />;

const MyPracRoute = (props) => <MyPractitioners {...props} />;

export default class MyComponent extends React.Component {
 

 

  state = {
    index: 0,
    routes: [
      { key: 'music', title: 'My Profile', icon: <SimpleLineIcon size={23} name={'user'} color={'white'} />, color: '#377F63' },
      { key: 'albums', title: 'My Documents', icon:  <SimpleLineIcon size={23} name={'docs'} color={'white'} />,color: '#04AC51' },
      { key: 'myprac', title: 'My Practitioners', icon: <SimpleLineIcon size={23} name={'people'} color={'white'} />,color: '#17AC71' },
      { key: 'recents', title: 'Find Practitioner', icon: <SimpleLineIcon size={23} name={'magnifier'} color={'#fff'} />, color: '#117F54' },
    ],
    displayHeader: true,
  };

  componentDidMount() {
    console.log('Navigation.js ', this.props.navigation);
  }
  // displayHeaderHandler = (displayHeader) => {
  //   this.setState({displayHeader});
  // }

  _renderIcon = ({route, focused, color}) =>{
    return route.icon;
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
      // this.state.displayHeader? 
      <LinearGradient  start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
      locations={[0,0.8]} colors={['#167434','#17AC71' ]}
            locations={[0,0.9]}>
      <View style={{ backgroundColor: 'transparent', paddingBottom:0, 
        height: typeof(navigation.state.params) === 'undefined' 
        || typeof(navigation.state.params.title) === 'undefined' 
        || navigation.state.params.title === 'My Profile' ? 200 : (navigation.state.params.title === 'Find Practitioner' ? 170: (navigation.state.params.title === 'My Practitioners' ? 120: 60)) }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
  })

  _handleIndexChange = index => {
    this.setState({ index });
    const {setParams} = this.props.navigation;
    setParams({ title: this.state.routes[index].title });
  }

  _renderScene = BottomNavigation.SceneMap({
    music: ProfileRoute,
    albums: DocumentRoute,
    myprac: (props) => <MyPracRoute {...this.props} />,
    recents: SearchRoute,
  });

  render() {
    return (
      <BottomNavigation
        labeled={true}
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
        renderIcon={this._renderIcon}
      />
    );
  }
}