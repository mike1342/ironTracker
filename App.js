import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainView from './scripts/views/MainView';

export default function App() {
  return (
    <View style={styles.container}>
      <MainView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: "100%",
    height: "100%",
  },
});
