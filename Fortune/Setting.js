import React, { Component } from 'react';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { StyleSheet, Text, View, TextInput, Button, TouchableWithoutFeedback, Keyboard, SegmentedControlIOS, Picker, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo';

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
        gender: 'm',
        birth: '',
        solarCal: 'solar',
        time: '',
        selectedIndex: 0
    }
    saveInfo = () => {
        this.props.saveInfo(this.state)
    }
    render(){
        const timeList = timeData.map((data, i)=> {
            return(
                <Picker.Item key={i} label={data.text} value={data.value} color='white' />
            )
        })
        return(
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.form}>
                    <View style={styles.gender}></View>
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
                        />
                    </View>
                    <View style={styles.line}>
                        <SegmentedControlIOS
                            values={['양력', '음력', '윤달']}
                            selectedIndex={this.state.selectedIndex}
                            onChange={(index) => {
                                var solarCal = ['Solar', 'lunarGeneral', 'lunarLeap']
                                console.log(index)
                                this.setState({selectedIndex: index, solarCal: solarCal[index]});
                            }}
                            tintColor='#fff'
                        />
                    </View>
                    <View style={styles.time}>
                        <Picker
                            selectedValue={this.state.time}
                            style={styles.picker}
                            onValueChange={(itemValue) => this.setState({time: itemValue})}
                            itemStyle={{color:'#fff'}}
                        >
                        {timeList}
                        </Picker>
                    </View>
                </View>
                </TouchableWithoutFeedback>
                <View style={styles.buttonWrap}>
                    <TouchableOpacity onPress={this.saveInfo}>
                        <Text style={styles.button}>저장</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        flex: 3,
        // alignItems: 'center',
        justifyContent: 'center',
        width: '70%'
    },
    buttonWrap: {
        flex: 1
    },
    button: {
        borderColor: '#fff',
        borderWidth: 1,
        width: 100,
        textAlign: 'center',
        height: 30,
        lineHeight: 35,
        color: '#fff'
    },
    line: {
    },
    birth: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15
    },
    gender: {
    },
    time: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    text: {
        color: '#fff',
        flex: 1
    },
    picker: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#ea838d',
        // height: '20%'
    }

})