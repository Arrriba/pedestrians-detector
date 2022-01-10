import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainPage from './MainPage'
import { LogBox } from 'react-native';

// Ignore log notification by message
LogBox.ignoreLogs(['tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead']);
export default function App() {
  return (
    <View style={styles.container}>
    <MainPage/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center', 
    textAlign:'center',
    alignContent:'center'
  },
});
