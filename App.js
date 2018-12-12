import SvgUri from 'react-native-svg-uri';
import logo from './assets/img/logo.svg';
import aicloy from './assets/img/aicloy.svg';
import male_normal from './assets/img/male_normal.svg';
import male_active from './assets/img/male_active.svg';
import female_normal from './assets/img/female_normal.svg';
import female_active from './assets/img/female_active.svg';
import love from './assets/img/love.svg';
import money from './assets/img/money.svg';
import study from './assets/img/study.svg';
import total from './assets/img/total.svg';
import work from './assets/img/work.svg';
import setting from './assets/img/setting.svg';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, AsyncStorage } from 'react-native';
import { Asset, AppLoading } from 'expo';
import { Saju, Setting } from './Fortune';

export default class App extends Component {
  state = {
    isLoaded: false,
    isLogin: false,
    userInfo: '',
    fortuneData: undefined
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
      })
    })
  }

  async loadResources() {
    const images = [
      logo,
      love,
      money,
      study,
      total,
      work,
      setting,
      male_normal,
      male_active,
      female_normal,
      female_active,
    ];

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages)

  }

  saveInfo = (data)=>{
    const stringData = JSON.stringify(data)
    AsyncStorage.setItem('userInfo', stringData)
    this.loadInfo()
  }

  render() {
    const { isLoaded, isLogin, userInfo } = this.state;
    if(isLoaded){
      return (
        <View style={styles.wrap}>
          { isLogin ? 
          <Saju
           changeUserInfo={this.changeUserInfo}
           fortuneData={this.state.fortuneData}
           love={love}
           money={money}
           study={study}
           total={total}
           work={work}
           setting={setting}
          /> : 
          <Setting
            saveInfo={this.saveInfo}
            userInfo={this.state.userInfo}
            male_normal={male_normal}
            male_active={male_active}
            female_normal={female_normal}
            female_active={female_active}
          />}
        </View>
      );
    }else{
      return (
        <AppLoading
          startAsync={this.loadResources}
          onFinish={() => this.setState({isLoaded: true})}
          onError={console.warn}
        />
        // <View style={styles.wrap}>
        //   <View style={styles.container}>
        //     <View style={styles.logo}>
        //       <SvgUri
        //         width="114"
        //         height="130"
        //         source={logo}
        //       />
        //     </View>
        //     <View style={styles.bottomlogo}>
        //       <SvgUri
        //         width="100"
        //         height="26"
        //         source={aicloy}
        //       />
        //     </View>
        //   </View>
        // </View>
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
