import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import App4 from './App4'
import { LogBox } from 'react-native';

// Ignore log notification by message
LogBox.ignoreLogs(['tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead']);
export default function App() {
  return (
    <View style={styles.container}>
    <App4/>
    </View>
  );
}

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

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
