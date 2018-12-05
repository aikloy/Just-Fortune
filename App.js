import SvgUri from 'react-native-svg-uri';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import logo from './img/logo.svg'


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SvgUri
          width="114"
          height="131"
          source={logo}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6838E',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
