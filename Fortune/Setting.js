import SvgUri from 'react-native-svg-uri';
import React, { Component } from 'react';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, SegmentedControlIOS, Picker, TouchableHighlight  } from 'react-native';
import { LinearGradient } from 'expo';
// import male_normal from '../img/male_normal.svg';
// import male_active from '../img/male_active.svg';
// import female_normal from '../img/female_normal.svg';
// import female_active from '../img/female_active.svg';

const timeData = [
    {
        value: '',
        text: '모름'
    },{
        value: 0,
        text: '자시(子時) 23:30~01:29'
    },{
        value: 1,
        text: '축시(丑時) 01:30~03:29'
    },{
        value: 2,
        text: '인시(寅時) 03:30~05:29'
    },{
        value: 3,
        text: '묘시(卯時) 05:30~07:29'
    },{
        value: 4,
        text: '진시(辰時) 07:30~09:29'
    },{
        value: 5,
        text: '사시(巳時) 09:30~11:29'
    },{
        value: 6,
        text: '오시(午時) 11:30~13:29'
    },{
        value: 7,
        text: '미시(未時) 13:30~15:29'
    },{
        value: 8,
        text: '신시(申時) 15:30~17:29'
    },{
        value: 9,
        text: '유시(酉時) 17:30~19:29'
    },{
        value: 10,
        text: '술시(戌時) 19:30~21:29'
    },{
        value: 11,
        text: '해시(亥時) 21:30~23:29'
    }
]

export default class Setting extends Component {
    state = {
        gender: this.props.userInfo.gender,
        birth: this.props.userInfo.birth,
        solarCal: this.props.userInfo.solarCal,
        time: this.props.userInfo.time,
        selectedIndex: this.props.userInfo.selectedIndex
    }
    componentWillReceiveProps=(nextProps)=>{
        if(nextProps.userInfo !== this.state){
            this.setState(nextProps.userInfo)
        }
    }
    
    selectGender = (gender) => {
        // console.log(gender)
        Keyboard.dismiss()
        this.setState({
            gender: gender
        })
    }
    render(){
        const { female_active, female_normal, male_active, male_normal } = this.props;
        console.log(this.props.userInfo)
        const timeList = timeData.map((data, i)=> {
            return(
                <Picker.Item key={i} label={data.text} value={data.value} color='#ea838d' />
            )
        })
        return(
            <View style={styles.container}>
                <TouchableWithoutFeedback style={{borderWidth:1, borderColor:'blue'}} onPress={Keyboard.dismiss}>
                    <View style={styles.form}>
                        <View style={styles.gender}>
                            <TouchableOpacity style={styles.img} onPress={()=>this.selectGender('m')}>
                            <SvgUri
                                width="70"
                                height="70"
                                source={this.state.gender === 'm' ? male_active : male_normal}
                            />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.img} onPress={()=>this.selectGender('f')}>
                            <SvgUri
                                width="70"
                                height="70"
                                source={this.state.gender === 'f' ? female_active : female_normal}
                            />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.birth}>
                            <Text style={styles.text}>생년월일  </Text>
                            <TextInput 
                                onChangeText={(birth) => this.setState({birth})}
                                value={this.state.birth}
                                keyboardType={'number-pad'}
                                style= {{width:'70%', borderBottomColor:'rgba(255,255,255,0.5)', borderBottomWidth: 1, textAlign:'center', color:'#fff'}}
                                placeholder = '예) 19001101'
                                maxLength = {8}
                                onSubmitEditing={Keyboard.dismiss}
                                underlineColorAndroid={"transparent"}
                            />
                        </View>
                        <SegmentedControlTab
                            values={['양력', '음력', '윤달']}
                            selectedIndex={this.state.selectedIndex}
                            onTabPress={this.changeSolar}
                            tabTextStyle={{color:'#fff'}}
                            tabStyle={{backgroundColor:'#ea838d',borderColor:'#fff'}}
                            activeTabStyle={{backgroundColor:'#fff'}}
                            activeTabTextStyle={{color:'#ea838d'}}
                        />
                        <View style={styles.birth}>
                            <Text style={styles.text}>생시  </Text>
                            <View style={{width:'70%', height:"20%", textAlign:'center'}}>
                            <Picker
                                selectedValue={this.state.time}
                                style={styles.picker}
                                onValueChange={(itemValue) => this.setState({time: itemValue})}
                                // itemStyle={{color:'#ea838d'}}
                                // textStyle={{fontSize:8}} 
                                // mode={"dropdown"}
                            >
                            {timeList}
                            </Picker>
                            </View>
                        </View>
                        
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback style={{borderWidth:1, borderColor:'red'}} onPress={this.saveInfo}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>저장</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }

    
    changeSolar = (index) => {
        Keyboard.dismiss()
        // const index = e.nativeEvent.selectedSegmentIndex
        // console.log(index)
        var solarCal = ['Solar', 'lunarGeneral', 'lunarLeap']
        this.setState({selectedIndex: index, solarCal: solarCal[index]});
    }

    saveInfo = () => {
        console.log(this.state)
        this.props.saveInfo(this.state)
    }
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: 0,
    },
    form: {
        flex: 3,
        // alignItems: 'center',
        justifyContent: 'center',
        width: 200,
    },
    buttonText: {
        padding: 20,
        color: '#ea838d'
    },
    button: {
        marginBottom: 30,
        width: 260,
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    line: {
    },
    birth: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        width: 200
    },
    gender: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around', 
        paddingBottom: 20,  
    },
    time: {
        // alignItems: 'center',
        // justifyContent: 'center',
        // position: 'relative',
    },
    text: {
        color: '#fff',
        flex: 1
    },
    picker: {
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // right: 0,
        backgroundColor: '#fff',
        height: '100%',
        // borderColor: "#fff",
        // borderBottomWidth: 1,
    }

})