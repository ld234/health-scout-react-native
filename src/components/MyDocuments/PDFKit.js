import React, { Component } from "react";
import {
  StyleSheet,
  NativeModules,
  Text,
  TouchableHighlight,
  View,
  PermissionsAndroid
} from "react-native";

var PSPDFKit = NativeModules.PSPDFKit;
import RNFetchBlob from 'rn-fetch-blob';

async function requestWriteExternalStoragePermission() {
  console.log('requesting write permission');
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
      RNFetchBlob
        .config({
          // add this option that makes response data to be stored as a file,
          // this is much more performant.
          fileCache : true,
          addAndroidDownloads : {
            useDownloadManager : true,
            notification : true,
            // path : dirs.DownloadDirs + '/testfile.pdf',
          }
        })
        .fetch('GET', 'http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf', {
          //some headers ..
        })
        .then((res) => {
          // the temp file path
          console.log(res);
          console.log('The file saved to ', res.path());
          this.setState({res});
        })
        .catch(err => console.log('err', err))
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

const DOCUMENT = "/data/user/0/com.healthscout/files/RNFetchBlobTmp_wmlfhwr1cmsf93dtrw27o.pdf";
const CONFIGURATION = {
  scrollContinuously: false,
  showPageNumberOverlay: true,
  pageScrollDirection: "vertical",
  enableAnnotationEditing: true,
  showAnnotationListAction: true,
};

// Change 'YourApp' to your app's name.
export default class PDFKit extends Component<{}> {
  _onPressButton() {
    requestExternalStoragePermission();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{PSPDFKit.versionString}</Text>
        <TouchableHighlight onPress={this._onPressButton}>
          <Text style={styles.text}>Tap to Open Document</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

async function requestExternalStoragePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Write external storage permission granted");
      PSPDFKit.present(DOCUMENT, CONFIGURATION);
    } else {
      console.log("Write external storage permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});