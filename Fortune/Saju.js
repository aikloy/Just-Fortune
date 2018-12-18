import SvgUri from 'react-native-svg-uri';
import React, { Component } from 'react';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Image } from 'react-native';
import Modal from "react-native-modal";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

let originalGetDefaultProps = Text.defaultProps;
Text.defaultProps = { ...(Text.defaultProps || {}), allowFontScaling: false }

export default class Saju extends Component {

//     constructor() {
//         super();
//         Text.defaultProps.allowFontScaling=false;
// }

    state = {
        selectedIndex: 0,
        readMoreBlock1: -1,
        readMoreBlock2: -1,
        modalVisible1: false,
        modalVisible2: false,
    }

    readMoreToday = (i, e) => {
        if ( i === 0 ){
            if(this.state.readMoreBlock1 === i){
                this.setState({
                    readMoreBlock1: -1,
                    modalVisible1: false
                })
            }else{
                this.setState({
                    readMoreBlock1: i,
                    modalVisible1: false
                })
            }
        }else{
            this.setState({
                readMoreBlock1: i,
                modalVisible1: true
            })
        }
    }

    readMoreTomorrow = (i, e) => {
        if ( i === 0 ){
            if(this.state.readMoreBlock2 === i){
                this.setState({
                    readMoreBlock2: -1,
                    modalVisible2: false
                })
            }else{
                this.setState({
                    readMoreBlock2: i,
                    modalVisible2: false
                })
            }
        }else{
            this.setState({
                readMoreBlock2: i,
                modalVisible2: true
            })
        }
    }

    makeKeyword = (data) =>{
        let arr = [];
        let temp = data.split('<b>');
        let temp1 = temp[1].split('</b>');
        arr.push(temp[0]);
        arr.push(temp1[0]);
        arr.push(temp1[1]);
        return arr
    }

    setModalVisibleToday = (visible) => {
        this.setState({modalVisible1: visible});
    }    

    setModalVisibleTomorrow = (visible) => {
        this.setState({modalVisible2: visible});
    }    

    render(){
        const { love, money, study, total, work, setting, logo_width } = this.props;
        const data = this.props.fortuneData;
        if(data !== undefined){
        const day = data.day
        const month = data.month
        const tomorrow = data.tomorrow
        const {selectedIndex, readMoreBlock1, readMoreBlock2, modalVisible1, modalVisible2} = this.state;
        const arrToday = this.makeKeyword(day.content[0].keyword);
        const arrTomorrow = this.makeKeyword(tomorrow.content[0].keyword);

        const dailyView = (
            <ScrollView style={styles.scrollBox}>
                <TouchableOpacity style={readMoreBlock1 === 0 ? styles.fortuneBlockMore : styles.fortuneBlock} onPress={this.readMoreToday.bind(this, 0)}>
                    <View style={styles.nameWrap}>
                        <Text allowFontScaling={false} style={styles.name}>{day.content[0].name}</Text>
                    </View>
                    <View style={styles.txtWrap}>
                        {arrToday.length > 0 ?
                            <View style={styles.title}>
                                <Text allowFontScaling={false} style={styles.titleText}>{arrToday[0]}</Text>
                                <Text allowFontScaling={false} style={styles.titleText}>{arrToday[1]}</Text>
                                <Text allowFontScaling={false} style={styles.titleText}>{arrToday[2]}</Text>
                            </View>:null
                        }
                        <Text allowFontScaling={false} style={styles.descText}>{day.content[0].desc}</Text>
                    </View>
                    {readMoreBlock1 !== 0 ? <Text style={styles.moreButton}>Read More!</Text> : null}
                </TouchableOpacity>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <TouchableOpacity style={styles.fortuneBlockHalf} onPress={this.readMoreToday.bind(this, 1)}>
                        <View style={styles.nameWrap}>
                            <Text allowFontScaling={false} style={styles.name}>{day.content[1].name}</Text>
                        </View>
                        <View style={styles.txtWrap}>
                            <Text allowFontScaling={false} style={styles.descText}>{day.content[1].desc}</Text>
                        </View>
                        <Text allowFontScaling={false} style={styles.moreButton}>Read More!</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fortuneBlockHalf} onPress={this.readMoreToday.bind(this, 2)}>
                        <View style={styles.nameWrap}>
                            <Text allowFontScaling={false} style={styles.name}>{day.content[2].name}</Text>
                        </View>
                        <View style={styles.txtWrap}>
                            <Text allowFontScaling={false} style={styles.descText}>{day.content[2].desc}</Text>
                        </View>
                        <Text allowFontScaling={false} style={styles.moreButton}>Read More!</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <TouchableOpacity style={styles.fortuneBlockHalf} onPress={this.readMoreToday.bind(this, 3)}>
                        <View style={styles.nameWrap}>
                            <Text allowFontScaling={false} style={styles.name}>{day.content[3].name}</Text>
                        </View>
                        <View style={styles.txtWrap}>
                            <Text allowFontScaling={false} style={styles.descText}>{day.content[3].desc}</Text>
                        </View>
                        <Text allowFontScaling={false} style={styles.moreButton}>Read More!</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fortuneBlockHalf} onPress={this.readMoreToday.bind(this, 4)}>
                        <View style={styles.nameWrap}>
                            <Text allowFontScaling={false} style={styles.name}>{day.content[4].name}</Text>
                        </View>
                        <View style={styles.txtWrap}>
                            <Text allowFontScaling={false} style={styles.descText}>{day.content[4].desc}</Text>
                        </View>
                        <Text allowFontScaling={false} style={styles.moreButton}>Read More!</Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    isVisible={modalVisible1}
                    style={{alignItems: 'center',justifyContent: 'center'}}
                    onBackdropPress={() => this.setState({ modalVisible1: false })}
                    // onSwipe={() => this.setState({ modalVisible1: false })}
                    onBackButtonPress={() => this.setState({ modalVisible1: false })}
                >
                    <ScrollView>
                    {readMoreBlock1 !== -1 ? <View style={styles.modalStyle}>
                        <View style={styles.nameWrap}>
                            <Text allowFontScaling={false} style={styles.name}>{day.content[readMoreBlock1].name}</Text>
                        </View>
                        <View style={styles.txtWrap}>
                            <Text allowFontScaling={false} style={styles.descText}>{day.content[readMoreBlock1].desc}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                            this.setModalVisibleToday(!modalVisible1);
                            }}
                        >
                            <Text allowFontScaling={false} style={styles.modalCloseButton} >닫기</Text>
                        </TouchableOpacity>
                    </View> : ''}
                    </ScrollView>
                </Modal>                
            </ScrollView>
        )
        const tomorrowView = (
            <ScrollView style={styles.scrollBox}>
                <TouchableOpacity style={readMoreBlock2 === 0 ? styles.fortuneBlockMore : styles.fortuneBlock} onPress={this.readMoreTomorrow.bind(this, 0)}>
                    <View style={styles.nameWrap}>
                        <Text allowFontScaling={false} style={styles.name}>{tomorrow.content[0].name}</Text>
                    </View>
                    <View style={styles.txtWrap}>
                        {arrTomorrow.length > 0 ?
                            <View style={styles.title}>
                                <Text allowFontScaling={false} style={styles.titleText}>{arrTomorrow[0]}</Text>
                                <Text allowFontScaling={false} style={styles.titleText}>{arrTomorrow[1]}</Text>
                                <Text allowFontScaling={false} style={styles.titleText}>{arrTomorrow[2]}</Text>
                            </View>:null
                        }
                        <Text allowFontScaling={false} style={styles.descText}>{tomorrow.content[0].desc}</Text>
                    </View>
                    {readMoreBlock2 !== 0 ? <Text style={styles.moreButton}>Read More!</Text> : null}
                </TouchableOpacity>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <TouchableOpacity style={styles.fortuneBlockHalf} onPress={this.readMoreTomorrow.bind(this, 1)}>
                        <View style={styles.nameWrap}>
                            <Text allowFontScaling={false} style={styles.name}>{tomorrow.content[1].name}</Text>
                        </View>
                        <View style={styles.txtWrap}>
                            <Text allowFontScaling={false} style={styles.descText}>{tomorrow.content[1].desc}</Text>
                        </View>
                        <Text allowFontScaling={false} style={styles.moreButton}>Read More!</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fortuneBlockHalf} onPress={this.readMoreTomorrow.bind(this, 2)}>
                        <View style={styles.nameWrap}>
                            <Text allowFontScaling={false} style={styles.name}>{tomorrow.content[2].name}</Text>
                        </View>
                        <View style={styles.txtWrap}>
                            <Text allowFontScaling={false} style={styles.descText}>{tomorrow.content[2].desc}</Text>
                        </View>
                        <Text allowFontScaling={false} style={styles.moreButton}>Read More!</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <TouchableOpacity style={styles.fortuneBlockHalf} onPress={this.readMoreTomorrow.bind(this, 3)}>
                        <View style={styles.nameWrap}>
                            <Text allowFontScaling={false} style={styles.name}>{tomorrow.content[3].name}</Text>
                        </View>
                        <View style={styles.txtWrap}>
                            <Text allowFontScaling={false} style={styles.descText}>{tomorrow.content[3].desc}</Text>
                        </View>
                        <Text allowFontScaling={false} style={styles.moreButton}>Read More!</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fortuneBlockHalf} onPress={this.readMoreTomorrow.bind(this, 4)}>
                        <View style={styles.nameWrap}>
                            <Text allowFontScaling={false} style={styles.name}>{tomorrow.content[4].name}</Text>
                        </View>
                        <View style={styles.txtWrap}>
                            <Text allowFontScaling={false} style={styles.descText}>{tomorrow.content[4].desc}</Text>
                        </View>
                        <Text allowFontScaling={false} style={styles.moreButton}>Read More!</Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    isVisible={modalVisible2}
                    style={{alignItems: 'center',justifyContent: 'center'}}
                    onBackdropPress={() => this.setState({ modalVisible: false })}
                    // onSwipe={() => this.setState({ modalVisible: false })}
                    onBackButtonPress={() => this.setState({ modalVisible: false })}
                >
                    <ScrollView>
                    {readMoreBlock2 !== -1 ? <View style={styles.modalStyle}>
                        <View style={styles.nameWrap}>
                            <Text allowFontScaling={false} style={styles.name}>{tomorrow.content[readMoreBlock2].name}</Text>
                        </View>
                        <View style={styles.txtWrap}>
                            <Text allowFontScaling={false} style={styles.descText}>{tomorrow.content[readMoreBlock2].desc}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                            this.setModalVisibleTomorrow(!modalVisible2);
                            }}
                        >
                            <Text allowFontScaling={false} style={styles.modalCloseButton} >닫기</Text>
                        </TouchableOpacity>
                    </View> : ''}
                    </ScrollView>
                </Modal>                
            </ScrollView>
        )
        const monthView = (
            <ScrollView style={styles.scrollBox}>
                <TouchableOpacity style={styles.fortuneBlockMore}>
                    <View style={styles.nameWrap}>
                        <Text allowFontScaling={false} style={styles.name}>{month.content[0].name}</Text>
                    </View>
                    <View style={styles.txtWrap}>
                        <Text allowFontScaling={false} style={styles.descText}>{month.content[0].desc}</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        )
        const userInfoTitle = day.title.replace('생,', '\n')

        return(
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <View>
                        <Image
                            style={{width: wp(25)}}
                            resizeMode={'contain'}
                            source={logo_width}
                        />
                    </View>
                    <TouchableOpacity onPress={this.props.changeUserInfo}>
                        <View style={styles.setting}>
                            <SvgUri
                                width="20"
                                height="20"
                                svgXmlData={setting}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.userInfo}>
                    <Text allowFontScaling={false} style={styles.userInfoTitle}>{userInfoTitle}</Text>
                </View>
                <SegmentedControlTab
                    tabsContainerStyle={{borderTopLeftRadius:0, marginBottom: wp(3)}}
                    values={['오늘의운세', '내일의운세', '이달의운세']}
                    selectedIndex={selectedIndex}
                    onTabPress={this.changeView}
                    tabTextStyle={{color:'#fff', fontSize: 10}}
                    tabStyle={{backgroundColor:'transparent', borderColor:'rgba(255,255,255,0.2)'}}
                    activeTabStyle={{backgroundColor:'rgba(255,255,255,0.2)'}}
                    activeTabTextStyle={{color:'#fff'}}
                    allowFontScaling={false}
                />
                {selectedIndex === 0 ? dailyView
                :
                <ScrollView style={styles.scrollBox}>
                {selectedIndex === 1 ? tomorrowView : monthView}
                </ScrollView>}
            </View>
        )}else{
            return(
            <View style={styles.container}>
            </View>
            )
        }
    }

    changeView = (index) => {
        // const index = e.nativeEvent.selectedSegmentIndex
        console.log(index)
        this.setState({selectedIndex: index});
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        paddingTop: hp(5),
        paddingLeft: wp(5),
        paddingRight: wp(5),
        paddingBottom: 0,
        width: wp(100),
    },
    topBar: {
        height:hp(5),
        width: wp(90),   
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    setting: {
        // padding: wp(3),
        alignItems: 'center',
        justifyContent: 'center',      
    },
    userInfo: {
        paddingBottom: hp(5),
        paddingTop:  hp(3),
        alignItems: 'center',
        justifyContent: 'center',
        width: wp(90)   
    },
    userInfoTitle: {
        color: '#dbdbdb',
        textAlign: 'center',
        fontSize: hp(2)
    },
    scrollBox: {
        height: hp(70),
        marginBottom: hp(5)
    },
    fortuneBlock: {
        paddingTop: wp(3),
        paddingLeft: wp(2),
        paddingRight: wp(2),
        paddingBottom: hp(2),
        backgroundColor: '#fff',
        marginBottom: wp(3),
        height: hp(22),
        position: 'relative',
        overflow:'hidden',
    },
    fortuneBlockMore: {
        paddingTop: wp(2),
        paddingLeft: wp(2),
        paddingRight: wp(2),
        paddingBottom: wp(2),
        backgroundColor: '#fff',
        marginBottom: wp(3),
    },
    fortuneBlockHalf: {
        width: '48%',
        paddingTop: wp(3),
        paddingLeft: wp(2),
        paddingRight: wp(2),
        paddingBottom: hp(2),
        backgroundColor: '#fff',
        marginBottom: wp(3),
        height: hp(22),
        position: 'relative',
        overflow:'hidden',
    },
    fortuneBlockMoreHalf: {
        width: '48%',
        paddingTop: wp(2),
        paddingLeft: wp(2),
        paddingRight: wp(2),
        paddingBottom: wp(2),
        backgroundColor: '#fff',
        marginBottom: wp(3),
    },
    nameWrap: {
        borderBottomColor: '#425060',
        borderBottomWidth:1,
        paddingBottom: wp(2),
        paddingLeft: wp(2),
    },
    name: {
        borderRadius: 5,
        fontSize: wp(4.5),
        overflow:'hidden',
        color:'#425060',
    },
    txtWrap: {
        padding: wp(2),
        overflow:'hidden'
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',   
        paddingBottom: wp(2),
    },
    titleText: {
        color:'#4f72b3',
        fontSize:wp(4)
    },
    descText: {
        color:'#515151',
        lineHeight:wp(5),
        fontSize:wp(3.5)
    },
    moreButton: {
        position:'absolute',
        bottom: 0,
        width: '106%',
        textAlign: 'center',
        padding: wp(2),
        backgroundColor: '#fff',
        borderRadius: 5,
        fontSize: 10,
        overflow:'hidden',
        // borderWidth: 1,
        // borderColor: '#fff',
        // color:'#ea838d',
        color: '#515151',
        // fontWeight: 'bold'
    },
    modalStyle: {
        backgroundColor:'#fff',
        width: wp(80),
        padding: 20
    },
    modalCloseButton: {
        padding: 10,
        // backgroundColor: '#4f72b3',
        borderColor: '#4f72b3',
        borderWidth: 1,
        // color: '#fff',
        color: '#4f72b3',
        textAlign: 'center'
    }
})