import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  processColor,
  PermissionsAndroid,
  AsyncStorage,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings(["Warning: isMounted(...) is deprecated"]);
import LinearGradient from 'react-native-linear-gradient';
import { Header } from 'react-native-elements';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FA from 'react-native-vector-icons/FontAwesome';
import RNFetchBlob from 'rn-fetch-blob';
import PSPDFKitView from "react-native-pspdfkit";
import { MaterialIndicator } from 'react-native-indicators';
import { showMessage } from 'react-native-flash-message';
import { sendDocument } from '../../actions/document.actions';
import { connect } from 'react-redux';

const pspdfkitColor = "#17ac71";

async function requestExternalStoragePermission(callback) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Write external storage permission granted");
        callback();
      } else {
        console.log("Write external storage permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
}

class PdfViewScreen extends Component<{}> {
    static navigationOptions = ({ navigation }) => {
      const params = navigation.state.params || {};
      return {
        // title: navigation.state.params['title'],
        header: (props) => {
          return (
          <LinearGradient  start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
          locations={[0,0.8]} colors={['#167434','#17AC71' ]}
                locations={[0,0.9]}>
          <View style={{ backgroundColor: 'transparent', paddingBottom:0, height: 60 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <Header backgroundColor='transparent'
                leftComponent={(<TouchableOpacity 
                  onPress={() => navigation.goBack()}>
                      <MaterialIcon name='arrow-back' color= '#fff' size={30} />
                  </TouchableOpacity>)}
                centerComponent={{ 
                  text: navigation.state.params.title, 
                  style: { color: '#fff', fontSize: 24, fontFamily: 'Quicksand-Medium'} }}
                rightComponent={navigation.state.params.readOnly? null: (<TouchableOpacity 
                  onPress={() => params.handleAnnotationButtonPress()}>
                    <MaterialIcon name='more-vert' color= '#fff' size={30} />
                  </TouchableOpacity>)}
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
          }</View>
          </LinearGradient>
        )},
        headerRight: (
          <Button
            onPress={() => params.handleAnnotationButtonPress()}
            title="Annotations"
          />
        )
      };
    };
    constructor(props) {
      super(props);
      this.state = {
        currentPageIndex: 0,
        pageCount: 0,
        annotationCreationActive: false,
        annotationEditingActive: false,
        permissionGranted: false,
        canBeOpened: false,
        filePath: '',
        fileCache: null, 
        // showFooter: false,
      };
      requestExternalStoragePermission(() => {
        this.setState({permissionGranted : true}, () => {
          this.handleFileFetch();
        })
      });
      
    }
  
    componentWillMount() {
      this.props.navigation.setParams({
        handleAnnotationButtonPress: () => {
          if (
            this.state.annotationCreationActive ||
            this.state.annotationEditingActive
          ) {
            this.refs.pdfView.exitCurrentlyActiveMode();
          } else {
            this.refs.pdfView.enterAnnotationCreationMode();
          }
        }
      });
    }

    handleFileFetch = () => {
      console.log('component did mount', this.state.permissionGranted);
      const url = this.props.navigation.getParam('readOnly') ? 
        `https://10.0.2.2:9000/clients/profile/exchangeDocument/patient/viewSentDocument?title=${this.props.navigation.getParam('title')}&pracUsername=${this.props.navigation.getParam('pracUsername')}` : 
        `http://10.0.2.2:8888/${this.props.navigation.getParam('file')}`
      if(this.state.permissionGranted) {
        AsyncStorage.getItem('id_token').then(res => {
          const dirs = RNFetchBlob.fs.dirs;
          RNFetchBlob
          .config({
            // add this option that makes response data to be stored as a file,
            // this is much more performant.
            fileCache : true,
            appendExt : 'pdf',
            trusty: true,
            // addAndroidDownloads : {
            //   useDownloadManager : true,
            //   notification : true,
            //   path : dirs.DownloadDirs + '/testfile.pdf',
            // }
          })
          .fetch('GET', url,{
            'x-access-token': res,
          })
          .then((res) => {
            // the temp file path
            console.log('file', res);
            console.log('The file saved to ', res.path())
            this.setState({canBeOpened: true, filePath: res.path(), fileCache: res});
          })
          .catch(err => console.log('err fetching file', err));
        }).catch(err => console.log('err async storage', err));
      }
      else{
        console.log('permission not granted');
      }
    }

    saveCurrentDocument = () => {
      this.refs.pdfView.saveCurrentDocument();
    }

    _onDocumentSave = () => {
      console.log('save document');
      const filename = this.state.filePath.split('/');
      this.props.sendDocument({
        pracUsername: this.props.navigation.getParam('pracUsername'),
        title: this.props.navigation.getParam('title'),
        file: this.state.filePath,
        filename: filename[filename.length-1],
        justSendIdx:this.props.navigation.getParam('justSendIdx'),
      });
    }

    _onDocumentSaveFailed = () => {
      console.log('Failed to save document');
      this.state.fileCache.flush();
      showMessage({
        message: "Save Document Error",
        description: "An error occurred while trying to save document. Please try again later.",
        type: "danger",
        // floating: true,
        icon: 'auto',
        hideStatusBar: true,
      });
      setTimeout(() => this.props.navigation.goBack(), 2000);
    }
  
    render() {
      let buttonTitle = "";
      if (this.state.annotationCreationActive) {
        buttonTitle = "Exit Annotation Creation Mode";
      } else if (this.state.annotationEditingActive) {
        buttonTitle = "Exit Annotation Editing Mode";
      } else {
        buttonTitle = "Enter Annotation Creation Mode";
      }
      if (!this.state.canBeOpened) return <MaterialIndicator color={'#17ac71'} />
      else if (this.props.documentState.isSendDocumentPending) {
        return <MaterialIndicator color={'#17ac71'} />;
      } else if (this.props.documentState.isSendDocumentSuccess){
        this.state.fileCache.flush();
        showMessage({
          message: "Send Document Success",
          description: 'Your document has been sent successfully to your practitioner.',
          type: "success",
          // floating: true,
          icon: 'auto',
          hideStatusBar: true,
        })
        setTimeout(() => this.props.navigation.goBack(), 2000);
        return null;
      }
      return (
        <View style={{ flex: 1 }}>
          {this.state.permissionGranted ? 
          <PSPDFKitView
            ref="pdfView"
            document={this.state.filePath}
            configuration={{
              backgroundColor: processColor("#17ac71"),
              showThumbnailBar: "none",
              enableAnnotationEditing: true,
              showPageNumberOverlay: false,
              grayScale: true,
              showPageLabels: true,
              showShareAction: true,
              showPrintAction: true,
            }}
            pageIndex={this.state.currentPageIndex}
            fragmentTag="PDF1"
            onStateChanged={event => {
              this.setState({
                currentPageIndex: event.currentPageIndex,
                pageCount: event.pageCount,
                annotationCreationActive: event.annotationCreationActive,
                annotationEditingActive: event.annotationEditingActive
              });
            }}
            onDocumentSaved={() => this._onDocumentSave()}
            onDocumentSaveFailed={this._onDocumentSaveFailed}
            style={{ flex: 1, color: pspdfkitColor }}
          /> : null}
          <View
            style={{
              borderTopWidth: 0.5,
              borderTopColor: '#ddd',
              flexDirection: "row",
              height: 50,
              alignItems: "center",
              padding: 10
            }}
          >
            <Text style={{ flex: 1, fontFamily: 'Quicksand-Regular', color:'#666',fontSize: 16 }}>
              {"Page " +
                (this.state.currentPageIndex + 1) +
                " of " +
                this.state.pageCount}
            </Text>
            <View>
              <TouchableOpacity disabled={this.state.currentPageIndex == 0}
                onPress={() => {
                this.setState(previousState => {
                  return {
                    currentPageIndex: previousState.currentPageIndex - 1
                  };
                });
              }}>
                <MaterialIcon
                  name={'navigate-before'}
                  color={this.state.currentPageIndex == 0? '#ddd': '#17ac71'}
                  size={54}
                  
                  disabled={this.state.currentPageIndex == 0}
                  title="Previous Page"
                />
              </TouchableOpacity>
            </View>
            <View style={{ marginLeft: 10 }}>
              <TouchableOpacity disabled={this.state.currentPageIndex == this.state.pageCount - 1}
                onPress={() => {
                  this.setState(previousState => {
                    return {
                      currentPageIndex: previousState.currentPageIndex + 1
                    };
                  });
              }} >
                <MaterialIcon
                  name={'navigate-next'}
                  color={this.state.currentPageIndex == this.state.pageCount - 1? '#ddd': '#17ac71'}
                  size={54}
                />
              </TouchableOpacity>
            </View>
            {this.props.navigation.getParam('readOnly')? null :
            <View style={{ marginLeft: 10 }}>
              
              <TouchableOpacity onPress={() => {
                this.saveCurrentDocument();
              }}>
                <FA
                  name='send'
                  size={28}
                  color='#17ac71'
                />
              </TouchableOpacity>
            </View>}
          </View>
        </View>
      );
    }
}

const mapStateToProps = state => {
  return {
    documentState: state.documentState,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sendDocument: formdata => dispatch(sendDocument(formdata)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PdfViewScreen);