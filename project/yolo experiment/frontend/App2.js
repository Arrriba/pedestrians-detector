// App2.js

import React from 'react';

import { StyleSheet, Text, View, TouchableOpacity, Button, Image, PermissionsAndroid } from 'react-native';

// import { ImagePicker } from 'react-native-image-picker';
import {
    launchCamera,
    launchImageLibrary
} from 'react-native-image-picker';
import * as ImagePicker from "react-native-image-picker"

export default class App2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            resourcePath: {},
        };
    }

    componentDidMount = () => {
        this.requestCameraPermission()
    }

    requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "App Camera Permission",
                    message: "App needs access to your camera ",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Camera permission given");
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
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

        launchCamera(options, (response) => { // Use launchImageLibrary to open image gallery
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = {
                    uri: response.uri
                };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    resourcePath: response,
                });
                console.log(source)
            }
        });

        // ImagePicker.showImagePicker(options, res => {
        //     console.log('Response = ', res);
        //     if (res.didCancel) {
        //         console.log('User cancelled image picker');
        //     } else if (res.error) {
        //         console.log('ImagePicker Error: ', res.error);
        //     } else if (res.customButton) {
        //         console.log('User tapped custom button: ', res.customButton);
        //         alert(res.customButton);
        //     } else {
        //         let source = res;
        //         this.setState({
        //             resourcePath: source,
        //         });
        //     }
        // });
    };

    openPicker = () => {
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
        launchCamera(options, (response) => { // Use launchImageLibrary to open image gallery
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = {
                    uri: response.uri
                };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({ resourcePath: response.assets[0] });

                console.log(source)
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    {/* <Image
                        source={{
                            uri: 'data:image/jpeg;base64,' + this.state.resourcePath.data,
                        }}
                        style={{ width: 100, height: 100 }}
                    /> */}
                    <Image
                        source={{ uri: this.state.resourcePath.uri }}
                        style={{ width: 200, height: 200 }}
                    />
                    {/* <Text style={{ alignItems: 'center' }}>
                        {this.state.resourcePath.uri}
                    </Text> */}
                    <Button onPress={() =>
                        ImagePicker.launchImageLibrary(
                            {
                                mediaType: 'photo',
                                includeBase64: false,
                                // maxHeight: 200,
                                // maxWidth: 200,
                            },
                            (response) => {
                                console.log(response);
                                this.setState({ resourcePath: response.assets[0] });
                                console.log(this.state)
                            },
                        )
                    }
                        title="Select Image" />
                    <Button onPress={this.openPicker} title='open camera'></Button>
                    {/* <TouchableOpacity onPress={this.selectFile} style={styles.button}>
                        <Text style={styles.buttonText}>Select File</Text>
                    </TouchableOpacity> */}
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