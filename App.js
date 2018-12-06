import SvgUri from 'react-native-svg-uri';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import logo from './img/logo.svg';
import aicloy from './img/aicloy.svg';
import { Saju } from './Fortune';


export default class App extends Component {
  state = {
    isLoaded: true
  }
  render() {
    const { isLoaded } = this.state;
    return (
      <View style={styles.wrap}>
        { isLoaded ? <Saju /> : 
        <View style={styles.container}>
          <View style={styles.logo}>
            <SvgUri
              width="114"
              height="130"
              source={logo}
            />
          </View>
          <View style={styles.bottomlogo}>
            <SvgUri
              width="100"
              height="26"
              source={aicloy}
            />
          </View>
        </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#ea838d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    flex: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomlogo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
