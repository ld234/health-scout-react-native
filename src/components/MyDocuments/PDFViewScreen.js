import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  NativeModules,
  processColor,
  PermissionsAndroid,
} from "react-native";
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings(["Warning: isMounted(...) is deprecated"]);

import PSPDFKitView from "react-native-pspdfkit";

const pspdfkitColor = "#267AD4";

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

export default class PdfViewScreen extends Component<{}> {
    static navigationOptions = ({ navigation }) => {
      const params = navigation.state.params || {};

      return {
        title: "Event Listeners",
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
      };
      requestExternalStoragePermission(() => this.setState({permissionGranted : true}));
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
  
    render() {
      let buttonTitle = "";
      if (this.state.annotationCreationActive) {
        buttonTitle = "Exit Annotation Creation Mode";
      } else if (this.state.annotationEditingActive) {
        buttonTitle = "Exit Annotation Editing Mode";
      } else {
        buttonTitle = "Enter Annotation Creation Mode";
      }
  
      return (
        <View style={{ flex: 1 }}>
          {this.state.permissionGranted ? 
          <PSPDFKitView
            ref="pdfView"
            document="file:///sdcard/Annual Report.pdf"
            configuration={{
              backgroundColor: processColor("lightgrey"),
              showThumbnailBar: "scrollable"
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
            style={{ flex: 1, color: pspdfkitColor }}
          /> : null}
          <View
            style={{
              flexDirection: "row",
              height: 40,
              alignItems: "center",
              padding: 10
            }}
          >
            <Text style={{ flex: 1 }}>
              {"Page " +
                (this.state.currentPageIndex + 1) +
                " of " +
                this.state.pageCount}
            </Text>
            <View>
              <Button
                onPress={() => {
                  this.setState(previousState => {
                    return {
                      currentPageIndex: previousState.currentPageIndex - 1
                    };
                  });
                }}
                disabled={this.state.currentPageIndex == 0}
                title="Previous Page"
              />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Button
                onPress={() => {
                  this.setState(previousState => {
                    return {
                      currentPageIndex: previousState.currentPageIndex + 1
                    };
                  });
                }}
                disabled={this.state.currentPageIndex == this.state.pageCount - 1}
                title="Next Page"
              />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Button
                onPress={() => {
                  this.setState(previousState => {
                    return {
                      currentPageIndex: previousState.currentPageIndex + 1
                    };
                  });
                }}
                disabled={this.state.currentPageIndex == this.state.pageCount - 1}
                title="Save"
              />
            </View>
          </View>
        </View>
      );
    }
  }

