import React, {Component} from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Button } from 'react-native-paper';
import {SCREEN_WIDTH} from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { toggleSearchOptionModal } from '../../actions/render.actions';


class SearchOptions extends Component{
    constructor(props){
        super(props);
    }
    
    render() {
        return ( 
        <View style={styles.buttonWrapper}>
            <LinearGradient  start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
                locations={[0,0.7]} colors={['#fff','#fff' ]}
                style={styles.gradientButton}>
                <Button style={styles.button} color={'#17AC71'} mode="outlined" onPress={() => this.props.toggleSearchOptionModal(0)}>
                    Prac. Type
                </Button>
            </LinearGradient>
            <LinearGradient  start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
                locations={[0,0.7]} colors={['#fff','#fff' ]}
                style={styles.gradientButton}>
                <Button style={styles.button}  disabled={false} color={'#17AC71'} mode="outlined" onPress={() => this.props.toggleSearchOptionModal(1)}>
                    Specialty
                </Button>
            </LinearGradient>
            <LinearGradient  start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
                locations={[0,0.7]} colors={['#fff','#fff' ]}
                style={styles.gradientButton}>
                <Button style={styles.button} color={'#17AC71'} mode="outlined" onPress={() => this.props.toggleSearchOptionModal(2)}>
                    Distance
                </Button>
            </LinearGradient>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonWrapper:{
        // flex: 1,
        flexDirection: 'row',
        // paddingBottom: 10,
        // paddingTop: 5,
        // backgroundColor: '#f6f6f6',
        width: SCREEN_WIDTH,
    },
    button: {
        width: SCREEN_WIDTH/3 - 10,
        height: 45,
        marginLeft:0,
        marginLeft: 0,
        borderRadius: 40,
        borderWidth: 0,
        borderColor: 'transparent',
    },
    gradientButton:{
        width: SCREEN_WIDTH/3 - 11,
        height: 40,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 40,
    }
});

const mapStateToProps = state => {
    return {
      renderState: state.renderSearchState,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleSearchOptionModal: (modalType) => dispatch(toggleSearchOptionModal(modalType)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchOptions);