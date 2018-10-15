import React from 'react';
import { TouchableOpacity, Text, View, FlatList, Keyboard, ScrollView, StyleSheet} from 'react-native';
import FA from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import {SCREEN_HEIGHT , SCREEN_WIDTH} from '../../constants';
import { getReceivedDocuments } from '../../actions/document.actions';
import { MaterialIndicator } from 'react-native-indicators';

class MyListItem extends React.PureComponent {
    _onPress = () => {
      this.props.onPressItem(this.props.id);
    };
  
    render() {
      console.log(this.props);
      const textColor = "#666";
      const font = 'Quicksand-Regular' //: 'Quicksand-Regular';
      return (
        <TouchableOpacity key={this.props.title} onPress={this._onPress}>
          <View style={{height: 80,  justifyContent: 'center', paddingLeft: 50, borderBottomColor: '#eee', borderBottomWidth: 1}}>
            <FA color={'#ee0000'} name={'file-pdf-o'} size={26} style={{position:'absolute', top: 27, left: 10}} />
            <View style={{flex: 1, flexDirection:'row', justifyContent: 'center', }}>
                <View style={{flex: 1, justifyContent: 'center', }}>
                    <Text style={{ color: textColor, fontFamily:font, fontSize: 20, }}>
                        {this.props.title}
                    </Text>
                    <Text style={{ color: textColor, fontFamily:font, fontSize: 14,textAlign:'left', paddingRight: 13 }}>
                        {this.props.doctorName}
                    </Text>
                </View>
                
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  }
  
class NewDocumentList extends React.Component {
    constructor(props){
        super(props);
        this.state = {selected: -1, modal: false, selectedDoc: {} };
    }
    _keyExtractor = (item, index) => `${item.title}_${item.pracUsername}`;
  
    _onPressItem = (id) => {
        this.toggleModal();
        const fields = id.split('_');
        const idx = this.props.documentState.receivedDocs.findIndex(item => fields[0] === item.title && fields[0] && item.pracUsername === fields[1]);
        if (idx >= 0) {
            this.setState({selectedDoc: {...this.props.documentState.receivedDocs[idx], justSendIdx: idx, readOnly: true}})
        }
    };

    toggleModal = () => {
        this.setState({modal: !this.state.modal, });
    }
  
    _renderItem = ({item}) => (
        <MyListItem
            id={`${item.title}_${item.pracUsername}`}
            onPressItem={this._onPressItem}
            title={item.title}
            doctorName={item.doctorName}
        />
    );

    renderContent = () =>{
        return (
            <View style={styles.longModal}>
                <ScrollView>
                    <View style={{flex: 1}}>
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionHeaderText}>
                                    DOCUMMENT TITLE
                                </Text>
                            </View>
                            <View style={styles.sectionBody}>
                                <Text style={styles.sectionBodyText}>
                                    {this.state.selectedDoc.title}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionHeaderText}>
                                    DESCRIPTION
                                </Text>
                            </View>
                            <View style={styles.sectionBody}>
                                <Text style={styles.sectionBodyText}>
                                    {this.state.selectedDoc.description}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionHeaderText}>
                                    REQUESTED BY
                                </Text>
                            </View>
                            <View style={styles.sectionBody}>
                                <Text style={styles.sectionBodyText}>
                                    {this.state.selectedDoc.doctorName}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionHeaderText}>
                                    DATE COMPLETED
                                </Text>
                            </View>
                            <View style={styles.sectionBody}>
                                <Text style={styles.sectionBodyText}>
                                    {this.state.selectedDoc.doctorName}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionHeaderText}>
                                    STATUS
                                </Text>
                            </View>
                            <View style={styles.sectionBody}>
                                <Text style={styles.sectionBodyText}>
                                    {this.state.selectedDoc.status? 'Viewed': 'Pending'}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.closeButton} onPress={() => {
                    this.props.navigation.navigate('PDFView', this.state.selectedDoc);
                    this.toggleModal();
                }}>
                    <Text style={styles.closeButtonText}>VIEW</Text>
                </TouchableOpacity>
            </View>
        )
    }

    renderModal = () => {
        return (
            <Modal 
              style={{alignContent:'center', paddingTop: 50}}
              scrollTo={this.handleScrollTo}
              onBackButtonPress={this.toggleModal}
              scrollOffset={this.state.scrollOffset}
              style={{marginTop: SCREEN_HEIGHT* 0.15}}
              // onSwipe={this.toggleModal} swipeDirection="up" 
              onBackdropPress={this.toggleModal} isVisible={this.state.modal} >
                {this.renderContent()}
            </Modal>
        );
    }

    componentDidMount() {
        this.props.getReceivedDocuments();
    }

  
    render() {
        if (this.props.documentState.isGetReceivedDocumentsPending) return <MaterialIndicator color='#17ac71' />
        return (
            <View>
                <FlatList
                    contenContainerStyle={{justifyContent:'center', flex: 1}}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={'always'}
                    data={this.props.documentState.receivedDocs}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
                {this.renderModal()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    longModal:{
        height: SCREEN_HEIGHT - 300,
        width: SCREEN_WIDTH*0.9,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        paddingLeft: 25,
        paddingTop: 25,
        paddingBottom: 25,
        paddingRight: 25,
        top: -30,
    },
    section : {
        marginTop: 30,
    },
    sectionHeader: {

    },
    sectionHeaderText: {
        fontFamily: 'Quicksand-Medium',
        fontSize: 16,
        marginBottom: 5,
    },
    sectionBody: {

    },
    sectionBodyText: {
        fontFamily: 'Quicksand-Regular',
        fontSize: 20,
    },
    closeButtonText:{
        fontFamily: 'Quicksand-Medium',
        fontSize: 16,
        color: '#17ac71',
        position:'absolute',
        right: 0,
    },
    closeButton: {
        width: 65,
        height: 50,
        alignItems: 'center',
        position: 'absolute',
        right: 20,
        bottom: -5,
    },
})

const mapStateToProps = state => {
  return{
    documentState: state.documentState,
  }
}

const mapDispatchToProps = dispatch => {
    return {
        getReceivedDocuments: () => dispatch(getReceivedDocuments()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDocumentList);