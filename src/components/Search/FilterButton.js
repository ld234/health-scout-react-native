/* * * * * * * * * * * * * * * * * * * * * *
 * @Dan
 * Description: Customised Filter button
 * Created:  5 October 2018
 * Last modified:  10 October 2018
 * * * * * * * * * * * * * * * * * * * * * */

import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { toggleSearchOptionModal } from '../../actions/render.actions';
import { connect } from 'react-redux';

class FilterGroup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false,
        }
    }
    render(){
        return (
            <FAB
                style={styles.fab}
                icon={({ size, color }) => (
                    <Icon size={28} color={'white'} name="filter-list" />
                )}
                onPress={() => {
                    this.props.toggleSearchOptionModal(3);
                }}
            />);
    }
};

export default connect(null, dispatch => {
    return { toggleSearchOptionModal: (number) => dispatch(toggleSearchOptionModal(number)), }
})(FilterGroup);

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 20,
    right: 5,
    height: 60,
    borderRadius: 50,
    width: 60,
    bottom: 0,
    backgroundColor: '#17ac71',
    elevation: 5,
  },
})
