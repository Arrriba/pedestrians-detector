import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image, PermissionsAndroid, Alert, ActivityIndicator } from 'react-native';
import {
    // launchCamera,
    launchImageLibrary
} from 'react-native-image-picker';
// import * as ImagePicker from "react-native-image-picker"
import * as ImagePicker from 'expo-image-picker';


export default class App3 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            initialState: true,
            resourcePath: {},
            blobImg: '',
            isLoading: false
        };
    }

    componentDidMount = () => {
        this.requestCameraPermission()
    }

    requestCameraPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
    };

    selectFile = () => {
        var options = {
            title: 'Select Image',
            customButtons: [
                {
                    name: 'customOptionKey',
                    title: 'Choose file from Custom Option'
                },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.launchImageLibraryAsync(
            {
                ...options,
                mediaType: 'photo',
                includeBase64: false,
            }
            ,
            (response) => {
                console.log(response)
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    const source = {
                        uri: response.assets[0].uri
                    };

                    this.setState({
                        resourcePath: response.assets[0],
                        isLoading: true,
                        initialState: false
                    });
                    this.getPhoto()
                }
            }
        )

    };

    pickImage = async () => {
        this.setState({
            isLoading: true,
            initialState: false
        })
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
        //   aspect: [4, 3],
        //   quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          this.setState({resourcePath: result, isLoading:false })
        }
      };

    takePhoto = async () => {
        this.setState({
            isLoading: true,
            initialState: false
        })
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
          //   aspect: [4, 3],
          //   quality: 1,
          });
      
          console.log(result);
      
          if (!result.cancelled) {
            this.setState({resourcePath: result, isLoading:false })
          }
    }
    openCamera = () => {
        console.log("open Picker")

        var options = {
            title: 'Select Image',
            customButtons: [
                {
                    name: 'customOptionKey',
                    title: 'Choose file from Custom Option'
                },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchCameraAsync(options, (response) => { // Use launchImageLibrary to open image gallery
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = {
                    uri: response.assets[0].uri
                };
                this.setState({ resourcePath: response, initialState: false });
                console.log(source)
            }
        });
    }

    // http://62ea-78-97-238-250.ngrok.io

    fetchWeights = async () => {
        let body = new FormData();
        body.append('image', { uri: this.state.resourcePath.uri, name: 'photo.png', filename: 'imageName.png', type: 'image/png' });

        fetch('http://62ea-78-97-238-250.ngrok.io/model.json', {
            method: 'GET',
            // headers: {
            //     "Content-Type": "multipart/form-data",
            // },
            // body: body
        })
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                console.log(res)
                // let base = res
                // var img = 'data:' + 'image/png' + ';base64,' + base
                // this.setState({ blobImg: img, isLoading: false })
            })
            .catch((err) => {
                console.log(err)
                this.setState({ isLoading: false })

            })
    }

    getPhoto = () => {
        let body = new FormData();
        body.append('image', { uri: this.state.resourcePath.uri, name: 'photo.png', filename: 'imageName.png', type: 'image/png' });

        fetch('http://0d85-84-117-102-43.ngrok.io/image', {
            method: 'POST',
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: body
        })
            .then((res) => {
                return res.text()
            })
            .then((res) => {

                let base = res
                var img = 'data:' + 'image/png' + ';base64,' + base
                this.setState({ blobImg: img, isLoading: false })
            })
            .catch((err) => {
                console.log(err)
                this.setState({ isLoading: false })

            })
    }

    render() {
        return (
            <View style={styles.container} >
                <View style={styles.container}>
                    {/* {this.state.initialState ?
                        <Image
                            source={require('./images/pedestrians.gif')}
                            style={{ width: 200, height: 200 }}
                        /> : null
                    } */}
                    {
                        this.state.isLoading ?
                            <ActivityIndicator size="large" color="#00ff00" />
                            : null
                    }
                    {this.state.blobImg ? <Image
                        source={{ uri: this.state.blobImg }}
                        style={{ height: 200, width: 200 }}
                    /> : <Image
                        source={{ uri: this.state.resourcePath.uri }}
                        style={{ width: 200, height: 200 }}
                    />}
                    <View style={styles.btnsContainer}>
                        {/* <TouchableOpacity onPress={this.selectFile} style={styles.button}>
                            <Text style={styles.buttonText}>Select Image</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.openCamera} style={styles.button}>
                            <Text style={styles.buttonText}>Open camera</Text>
                        </TouchableOpacity> */}
                        <Button onPress={this.pickImage} title="Select Image" />
                        <Button onPress={this.takePhoto} title='open camera'></Button>
                        <Button onPress={this.fetchWeights} title='get model'></Button>

                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    btnsContainer: {
        // flex: 1,
        flexDirection: 'row',
        padding: 20,
        // justifyContent: 'center',
        backgroundColor: '#fff'
    },
    button: {
        width: 250,
        height: 60,
        backgroundColor: '#3740ff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginBottom: 12
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 15,
        color: '#fff'
    }
});