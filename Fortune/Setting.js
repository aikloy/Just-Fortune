import SvgUri from 'react-native-svg-uri';
import React, { Component } from 'react';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Image, TouchableHighlight  } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Modal from "react-native-modal";
// import { throws } from 'assert';

let originalGetDefaultPropsText = Text.defaultProps;
Text.defaultProps = function() {
    return {
        ...originalGetDefaultPropsText,
        allowFontScaling: false,
    };
};

let originalGetDefaultPropsTextInput = TextInput.defaultProps;
TextInput.defaultProps = function() {
    return {
        ...originalGetDefaultPropsTextInput,
        allowFontScaling: false,
    };
};

const timeData = [
    {
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
        timeText: this.props.userInfo.timeText,
        solarCal: this.props.userInfo.solarCal,
        time: this.props.userInfo.time,
        selectedIndex: this.props.userInfo.selectedIndex,
        isVisible: false
    }
    // componentWillReceiveProps=(nextProps)=>{
    //     if(nextProps.userInfo !== this.state){
    //         this.setState(nextProps.userInfo)
    //     }
    // }
    
    selectGender = (gender) => {
        // console.log(gender)
        Keyboard.dismiss()
        this.setState({
            gender: gender
        })
    }

    toggleModal = (visible) => {
        this.setState({
            isVisible: visible
        })
    }

    render(){
        const { female_active, female_normal, male_active, male_normal, button_save } = this.props;
        console.log(this.props.userInfo)
        const timeList = timeData.map((data, i)=> {
            return(
                <TouchableOpacity key={i} style={styles.timeItemWrap} onPress={()=>this.setState({time: data.value, timeText:data.text, isVisible:false})}>
                <Text style={styles.timeItem}>{data.text}</Text>
                </TouchableOpacity>
            )
        })
        return(
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.form}>
                        <View style={styles.gender}>
                            <TouchableOpacity style={styles.img} onPress={()=>this.selectGender('m')}>
                            <SvgUri
                                width="70"
                                height="70"
                                svgXmlData={this.state.gender === 'm' ? male_active : male_normal}
                            />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.img} onPress={()=>this.selectGender('f')}>
                            <SvgUri
                                width="70"
                                height="70"
                                svgXmlData={this.state.gender === 'f' ? female_active : female_normal}
                            />
                            </TouchableOpacity>
                        </View>
                        <SegmentedControlTab
                            tabsContainerStyle={{borderRadius:0, marginBottom: wp(5)}}
                            values={['양력', '음력', '윤달']}
                            selectedIndex={this.state.selectedIndex}
                            onTabPress={this.changeSolar}
                            tabTextStyle={{color:'#fff'}}
                            tabStyle={{backgroundColor:'transparent', borderColor:'rgba(255,255,255,0.2)'}}
                            activeTabStyle={{backgroundColor:'rgba(255,255,255,0.2)'}}
                            activeTabTextStyle={{color:'#fff'}}
                        />
                        <View style={styles.birth}>
                            <Text style={styles.text}>생년월일  </Text>
                            <TextInput 
                                onChangeText={(birth) => this.setState({birth: birth})}
                                value={this.state.birth}
                                keyboardType={'number-pad'}
                                style= {{width:'70%', borderBottomColor:'rgba(255,255,255,0.5)', borderBottomWidth: 1, textAlign:'center', color:'#fff'}}
                                placeholder = '예) 19001101'
                                maxLength = {8}
                                onSubmitEditing={Keyboard.dismiss}
                                underlineColorAndroid={"transparent"}
                            />
                        </View>
                        <View style={styles.birth}>
                            <Text style={styles.text}>생시  </Text>
                            <TouchableOpacity onPress={()=>this.toggleModal(true)} style= {{width:'70%', height: wp(8), backgroundColor:'rgba(255,255,255,0.5)'}}>
                                <Text style= {{textAlign:'center', color:'#fff', height: wp(8), lineHeight: wp(10)}}>
                                    {this.state.timeText}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Modal
                            isVisible={this.state.isVisible}
                            style={{alignItems: 'center',}}
                            onBackdropPress={() => this.toggleModal(false)}
                            // onSwipe={() => this.setState({ isVisible: false })}
                            onBackButtonPress={() =>  this.toggleModal(false)}
                        >
                            <View style={styles.modalStyle}>
                               {timeList}
                            </View>
                        </Modal>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback style={{marginBottom:hp(30),}} onPress={this.saveInfo}>
                    <Image
                        style={{width: wp(50)}}
                        resizeMode={'contain'}
                        source={button_save}
                    />
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
        paddingTop: hp(30),
    },
    form: {
        // alignItems: 'center',
        justifyContent: 'center',
        width: 200,
    },
    buttonText: {
        padding: 20,
        color: '#fff'
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
        backgroundColor: 'rgba(255,255,255,0.3)',
        height: '100%',
        // borderColor: "#fff",
        // borderBottomWidth: 1,
    },
    modalStyle: {
        backgroundColor:'#fff',
        width: wp(80),
        padding: 20
    },
    timeItem:{
        padding: wp(2),
        color:'#515151',
    },
    timeItemWrap: {
        borderBottomColor: '#fff',
        borderBottomWidth:1
    }
})