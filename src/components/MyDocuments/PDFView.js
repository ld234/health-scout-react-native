import PDFView from 'react-native-view-pdf';
import React from 'react';
import { View, Platform, Text, PermissionsAndroid, TouchableOpacity } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf-lib';

async function requestWriteExternalStoragePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        'title': 'HealthScout Write File Permission',
        'message': 'HealthScout needs permission to download files',
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      let dirs = RNFetchBlob.fs.dirs
      // RNFetchBlob
      //   .config({
      //     // add this option that makes response data to be stored as a file,
      //     // this is much more performant.
      //     fileCache : true,
      //     addAndroidDownloads : {
      //       useDownloadManager : true,
      //       notification : true,
      //       path : dirs.DownloadDir + '/testfile.pdf',
      //     }
      //   })
      //   .fetch('GET', 'http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf', {
      //     //some headers ..
      //   })
      //   .then((res) => {
      //     // the temp file path
      //     console.log(res);
      //     console.log('The file saved to ', res.path())
      //   })
      //   .catch(err => console.log('err', err))
    } else {
      console.log("Access to write file is denied.")
    }
  } catch (err) {
    console.warn(err)
  }
}

let filePermissionGranted = false;
async function requestReadExternalStorage() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        'title': 'HealthScout Read File Permission',
        'message': 'HealthScout needs permission to access files',
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      filePermissionGranted =  !filePermissionGranted;
    } else {
      console.log("Access to write file is denied.");
    }
  } catch (err) {
    console.warn(err)
  }
}

requestWriteExternalStoragePermission();
requestReadExternalStorage();
const resources = {
  file: Platform.OS === 'ios' ? 'food_questionnaire.pdf' : '/sdcard/Download/testfile-2.pdf',
  // url: 'https://arcane-forest-37823.herokuapp.com/clients/profile/exchangeDocument/single?patientUsername=hg1234&title=demo',
  url: 'https://www.ato.gov.au/assets/0/104/2244/2335/35c234b5-6918-4dd0-a3db-95edfd76adc0.pdf',
  // url: 'http://www.iaeng.org/publication/WCECS2010/WCECS2010_pp162-168.pdf',
  base64: 'hi'
};

export default class PDFFile extends React.Component {
  state = {
    edited : 0,
  }
  editPDF = async (x, y) => {
    const page1 = PDFPage
    .modify(0)
    .drawText('HELLO WORLD!', {
      x: x,
      y: y,
      color: '#000099',
    });
    const existingPDF = '/sdcard/Download/testfile-2.pdf';
    PDFDocument
      .modify(existingPDF)
      .modifyPages(page1)
      .write() // Returns a promise that resolves with the PDF's path
      .then(path => {
        this.setState({edited: this.state.edited+1}, () => console.log(this.state.edited));
        console.log('PDF modified at: ' + path);
      });
  }

  handlePress = (evt)=>{
    console.log(`x coord = ${evt.nativeEvent.locationX}`);
    console.log(`y coord = ${evt.nativeEvent.locationY}`);
    this.editPDF(evt.nativeEvent.locationX, evt.nativeEvent.locationX);
  }

  render() {
    const resourceType = 'file';
    // this.editPDF();
    return (
        <TouchableOpacity style={{ flex: 1, height: null}} onPress={(evt) => this.handlePress(evt) } >
          <PDFView
            fadeInDuration={250.0}
            style={{ flex: 1, backgroundColor:'#ffffff' }}
            resource={resources[resourceType]}
            resourceType={resourceType}
            onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
            onError={(error) => console.log('Cannot render PDF', error)}
          /> 
        </TouchableOpacity>
    );
  }
}