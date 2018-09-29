import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  NativeModules,
  Text,
  TouchableHighlight,
  View,
  PermissionsAndroid
} from "react-native";

var PSPDFKit = NativeModules.PSPDFKit;

const DOCUMENT = "file:///sdcard/Download/testfile-2.pdf";
const CONFIGURATION = {
  scrollContinuously: false,
  showPageNumberOverlay: true,
  pageScrollDirection: "vertical"
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