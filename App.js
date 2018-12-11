import SvgUri from 'react-native-svg-uri';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, AsyncStorage } from 'react-native';
import logo from './img/logo.svg';
import aicloy from './img/aicloy.svg';
import { Saju, Setting } from './Fortune';


export default class App extends Component {
  state = {
    isLoaded: false,
    isLogin: false,
    userInfo: '',
    fortuneData: ''
  }

  componentDidMount =() => {
    this.loadInfo()
  }

  loadInfo = async () => {
    try {
      const userInfo = await AsyncStorage.getItem('userInfo');
      const parsedUserInfo = JSON.parse(userInfo)
      if(parsedUserInfo !== null && parsedUserInfo  !== undefined){
        this.setState({
          isLogin: true,
          userInfo: parsedUserInfo
        })
        this.getData();
      }else{
        this.setState({
          isLogin: false,
          isLoaded: true,
          userInfo: ''
        })
      }
    } catch(err) {
      this.setState({
        isLogin: false,
      })
      console.log(err)
    } 
  }

  changeUserInfo = () => {
    this.setState({
      isLogin: false
    })
  }

  getData = () => {
    const userInfo = this.state.userInfo;
    fetch(`https://m.search.naver.com/p/csearch/dcontent/external_api/json_todayunse_v2.naver?_callback=window.__jindo2_callback._fortune_my_0&gender=${userInfo.gender}&birth=${userInfo.birth}&solarCal=${userInfo.solarCal}&time=${userInfo.time}`)
    .then((response)=>{
      let data = JSON.stringify(response._bodyInit)
      let temp = data.replace('window.__jindo2_callback._fortune_my_0(','');
      let temp1 = temp.replace(');','');
      let temp2 = temp1.replace('  ','');
      let unse = JSON.parse(temp2)
      let unse1 = eval("("+unse+")")
      this.setState({
        fortuneData: unse1.result,
        isLoaded: true
      })
    })
  }

  saveInfo = (data)=>{
    const stringData = JSON.stringify(data)
    AsyncStorage.setItem('userInfo', stringData)
    this.loadInfo()
  }

  render() {
    const { isLoaded, isLogin, userInfo } = this.state;
    if(isLogin){
      return (
        <View style={styles.wrap}>
          { isLoaded ? 
          <Saju
           changeUserInfo={this.changeUserInfo}
           fortuneData={this.state.fortuneData}
          /> : 
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
    }else{
      return (
        <View style={styles.wrap}>
          { isLoaded ? 
            <Setting
            saveInfo={this.saveInfo}
            userInfo={this.state.userInfo}
          /> : 
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
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#ea838d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
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
