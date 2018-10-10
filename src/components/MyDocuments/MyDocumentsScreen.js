import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, Text, Platform } from 'react-native';
import { STATUS_BAR_HEIGHT } from '../../constants';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import PDFKit from './PDFKit';
import { createStackNavigator } from 'react-navigation';
import PDFView from './PDFViewScreen';
import { Button } from 'react-native';

class MyDocumentScreen extends Component {
    static navigationOptions = () => ({
        title: 'My Documents',
        header: null,
    })

    render() {
        return (
            <Button onPress={() => this.props.navigation.navigate('PDFView')} title={'Press me'}></Button>
        )
    }
}


const navigator = createStackNavigator({
    MyDocuments: { screen: MyDocumentScreen },
    PDFView: { screen: PDFView },
}, {
    initialRoute: MyDocumentScreen,
});


export default navigator;