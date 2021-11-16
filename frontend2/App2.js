import React from 'react'
import { Text, View } from 'react-native'
import * as tf from '@tensorflow/tfjs'
import {loadGraphModel} from '@tensorflow/tfjs-converter';

import { fetch, decodeJpeg, bundleResourceIO } from '@tensorflow/tfjs-react-native';
// import * as fs from 'react-native-fs';
import * as FileSystem from 'expo-file-system';
// import weights from './assets/models/weights.bin'
import { StorageAccessFramework } from 'expo-file-system';
import App3 from './App3';


// const modelJson = require('./assets/models/model.json');
// const weightsJson = require('./assets/weights.bin');
//Loading model from models folder
// const modelJSON = require("./assets/models/model.json");
// const modelWeights = require("./assets/models/group1-shard1of1.bin");
const modelJSON = require("./model/model.json");
// const modelWeights = require("./model/group1-shard1of1.bin");
class App2 extends React.Component {
//   state = {
//     isTfReady: false
//   }
  constructor(props) {
    super(props)  
    this.state = {
        isTfReady: false,
        model: ''
        // jsonModel: modelJson
      }
  }

  getFileUri(name) {
    return FileSystem.documentDirectory + `${encodeURI(name)}.pdf`;
  }

  async componentDidMount() {

    await tf.ready()
    // const model = await tf.loadLayersModel('http://62ea-78-97-238-250.ngrok.io/model.json');
    // console.log("done loading the model")
    // console.log(model)
    // model.summary();

    // var model = await
    // this.loadModel().then(x=> console.log(x)).catch(x=> console.log(x))
    // const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();

    // fs.readFile('./assets/weights.bin').then(res => {
    //     console.log(res)
    // })
    // .catch(err => {
    //     console.log(err.message, err.code);
    // });
    this.setState({ isTfReady: true})
    console.log(this.state.isTfReady)
    // const model = await tf.loadLayersModel(
    //     bundleResourceIO(modelJson));
    // console.log(model)
    // this.loadModel().then(x=> console.log(x))
  }

  loadModel = async () => {
    const model = await tf
      // .loadLayersModel(bundleResourceIO(modelJSON, modelWeights))
      .loadLayersModel('http://62ea-78-97-238-250.ngrok.io/model.json')
      .then(x=> this.setState({model: x}))
      .catch(e => console.log(e));
    console.log("Model loaded!");
    return model;
  };

  render() {
    return (
      <View style={{
        // flex: 1,
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center', 
      }}>
        <Text>
      {this.state.isTfReady ? "Ready" : "Waiting"}
    </Text>
    <Text>
           MODEL: {this.state.model ? "Ready" : "Waiting"}
         </Text>
    <App3></App3>
      </View>
    )
  }
}

export default App2