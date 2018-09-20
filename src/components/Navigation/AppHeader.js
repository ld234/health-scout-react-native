import React from 'react';
import { Header } from 'react-native-elements';

class AppHeader extends React.Component {
  constructor(props){
    super(props);
  }
  
  render() {
    return (
      <Header
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: typeof(this.props.navigation.state.params)==='undefined' || typeof(this.props.navigation.state.params.title) === 'undefined' ? 'My Profile': props.navigation.state.params.title, style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
      />
    );
  }
}

export default AppHeader;