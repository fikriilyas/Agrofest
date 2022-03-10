'use strict';
import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, Alert, TextInput} from 'react-native';
import { RNCamera } from 'react-native-camera';

export default class ExampleApp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      barcode: '',
      cameraType: 'back',
      text: 'Scan Barcode',
      torchMode: 'off',
      type: '',
      host:''
    };
  }


  barcodeReceived(e) {
    if (e.barcodes[0].data !== this.state.barcode || e.barcodes[0].type !== this.state.type){
      this.setState({
        barcode: e.barcodes[0].data,
        text: `${e.barcodes[0].data} (${e.barcodes[0].type})`,
        type: e.barcodes[0].type,
      });
      fetch(this.state.host, {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
          body: JSON.stringify({
          "data" : e.barcodes
        }),
      });
      alert(e.barcodes[0].data)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={this.barcodeReceived.bind(this)}
        />
          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TextInput
          style={{height: 40}}
          placeholder="Type here to translate!"
          onChangeText={(host) => this.setState({host})}
          value={this.state.host}
        />
        <Text style={{padding: 10, fontSize: 42}}>
          {this.state.text.split(' ').map((word) => word && 'Change').join(' ')}
        </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

AppRegistry.registerComponent('App', () => ExampleApp);
