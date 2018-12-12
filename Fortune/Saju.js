import SvgUri from 'react-native-svg-uri';
import React, { Component } from 'react';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { StyleSheet, Text, TouchableOpacity, View, SegmentedControlIOS, ScrollView, WebView } from 'react-native';
// import love from '../img/love.svg';
// import money from '../img/money.svg';
// import study from '../img/study.svg';
// import total from '../img/total.svg';
// import work from '../img/work.svg';
// import setting from '../img/setting.svg';

export default class Saju extends Component {
    state = {
        selectedIndex: 0,
        readMoreBlock: ''
    }

    readMore = (i, e) => {
        this.setState({
            readMoreBlock: i
        })
    }
    render(){
        const { love, money, study, total, work, setting } = this.props;
        const data = this.props.fortuneData;
        if(data !== undefined){
        const day = data.day
        const month = data.month
        const tomorrow = data.tomorrow
        const {selectedIndex, readMoreBlock} = this.state;
        const dailyView = day.content.map(({desc, keyword, name}, i)=>{
            let arr = [];
            if(keyword !== undefined){
                let temp = keyword.split('<b>');
                let temp1 = temp[1].split('</b>');
                arr.push(temp[0]);
                arr.push(temp1[0]);
                arr.push(temp1[1]);
            }
            let img;
            switch (name){
                case '총운':
                img = total;
                break;
                case '애정운':
                img = love;
                break;
                case '재물운':
                img = money;
                break;
                case '직장운':
                img = work;
                break;
                case '학업.시험운':
                img = study;
                break;
                default:
                img = '';
                break;
            }
            if(i !== 5)
            if (i % 2 !== 0){
                return(
                    <TouchableOpacity key={i} style={readMoreBlock === i ? styles.fortuneBlockMore : styles.fortuneBlock} onPress={this.readMore.bind(this, i)}>
                        <View style={styles.txtWrap}>
                            {arr.length > 0 ?
                                <View style={styles.title}>
                                <Text style={{color:'#fff',fontSize:13}}>{arr[0]}</Text>
                                <Text style={{color:'#fff',fontSize:16, fontWeight:'bold'}}>{arr[1]}</Text>
                                <Text style={{color:'#fff',fontSize:13}}>{arr[2]}</Text>
                                </View>:null
                            }
                            <Text style={{color:'#fff',lineHeight:20}}>{desc}</Text>
                        </View>
                        <View style={styles.imgWrap}>
                            <SvgUri
                                width="60"
                                height="60"
                                source={img}
                            />
                            <Text style={styles.name}>{name}</Text>
                        </View>
                        {readMoreBlock !== i ? <Text style={styles.moreButton}>Read More!</Text> : null}
                    </TouchableOpacity>
                )
            }else{
                return(
                    <TouchableOpacity key={i} style={readMoreBlock === i ? styles.fortuneBlockMore : styles.fortuneBlock} onPress={this.readMore.bind(this, i)}>
                        <View style={styles.imgWrap}>
                            <SvgUri
                                width="60"
                                height="60"
                                source={img}
                            />
                            <Text style={styles.name}>{name}</Text>
                        </View>
                        <View style={styles.txtWrap}>
                            {arr.length > 0 ?
                                <View style={styles.title}>
                                <Text style={{color:'#fff',fontSize:13}}>{arr[0]}</Text>
                                <Text style={{color:'#fff',fontSize:16, fontWeight:'bold'}}>{arr[1]}</Text>
                                <Text style={{color:'#fff',fontSize:13}}>{arr[2]}</Text>
                                </View>:null
                            }
                            <Text style={{color:'#fff',lineHeight:20}}>{desc}</Text>
                        </View>
                        {readMoreBlock !== i ? <Text style={styles.moreButton}>Read More!</Text> : null}
                    </TouchableOpacity>
                )
            }
            
        })
        const tomorrowView = tomorrow.content.map(({desc, keyword, name}, i)=>{
            let arr = [];
            if(keyword !== undefined){
                let temp = keyword.split('<b>');
                let temp1 = temp[1].split('</b>');
                arr.push(temp[0]);
                arr.push(temp1[0]);
                arr.push(temp1[1]);
            }
            let img;
            switch (name){
                case '총운':
                img = total;
                break;
                case '애정운':
                img = love;
                break;
                case '재물운':
                img = money;
                break;
                case '직장운':
                img = work;
                break;
                case '학업.시험운':
                img = study;
                break;
                default:
                img = '';
                break;
            }
            if(i !== 5)
            if (i % 2 !== 0){
                return(
                    <TouchableOpacity key={i} style={readMoreBlock === i ? styles.fortuneBlockMore : styles.fortuneBlock} onPress={this.readMore.bind(this, i)}>
                        <View style={styles.txtWrap}>
                            {arr.length > 0 ?
                                <View style={styles.title}>
                                <Text style={{color:'#fff',fontSize:13}}>{arr[0]}</Text>
                                <Text style={{color:'#fff',fontSize:16, fontWeight:'bold'}}>{arr[1]}</Text>
                                <Text style={{color:'#fff',fontSize:13}}>{arr[2]}</Text>
                                </View>:null
                            }
                            <Text style={{color:'#fff',lineHeight:20}}>{desc}</Text>
                        </View>
                        <View style={styles.imgWrap}>
                            <SvgUri
                                width="60"
                                height="60"
                                source={img}
                            />
                            <Text style={styles.name}>{name}</Text>
                        </View>
                        {readMoreBlock !== i ? <Text style={styles.moreButton}>Read More!</Text> : null}
                    </TouchableOpacity>
                )
            }else{
                return(
                    <TouchableOpacity key={i} style={readMoreBlock === i ? styles.fortuneBlockMore : styles.fortuneBlock} onPress={this.readMore.bind(this, i)}>
                        <View style={styles.imgWrap}>
                            <SvgUri
                                width="60"
                                height="60"
                                source={img}
                            />
                            <Text style={styles.name}>{name}</Text>
                        </View>
                        <View style={styles.txtWrap}>
                            {arr.length > 0 ?
                                <View style={styles.title}>
                                <Text style={{color:'#fff',fontSize:13}}>{arr[0]}</Text>
                                <Text style={{color:'#fff',fontSize:16, fontWeight:'bold'}}>{arr[1]}</Text>
                                <Text style={{color:'#fff',fontSize:13}}>{arr[2]}</Text>
                                </View>:null
                            }
                            <Text style={{color:'#fff',lineHeight:20}}>{desc}</Text>
                        </View>
                        {readMoreBlock !== i ? <Text style={styles.moreButton}>Read More!</Text> : null}
                    </TouchableOpacity>
                )
            }
        })
        const monthView = month.content.map(({desc, name}, i)=>{
            let img;
            switch (name){
                case '총운':
                img = total;
                break;
                case '애정운':
                img = love;
                break;
                case '재물운':
                img = money;
                break;
                case '직장운':
                img = work;
                break;
                case '학업.시험운':
                img = study;
                break;
                default:
                img = '';
                break;
            }
            return(
                <View key={i} style={styles.fortuneBlockMore}>
                    <View style={styles.imgWrap}>
                    <SvgUri
                        width="60"
                        height="60"
                        source={img}
                    />
                    <Text style={styles.name}>{name}</Text>
                    </View>
                    <View style={styles.txtWrap}>
                    <Text style={{color:'#fff',lineHeight:20}}>{desc}</Text>
                    </View>
                </View>
            )
        })

        return(
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <Text style={styles.userInfo}>{day.title}</Text>
                    
                    <TouchableOpacity onPress={this.props.changeUserInfo}>
                    <View style={styles.setting}>
                    <SvgUri
                        width="20"
                        height="20"
                        source={setting}
                    />
                    </View>
                    </TouchableOpacity>
                    </View>
                <SegmentedControlTab
                    values={['오늘의운세', '내일의운세', '이달의운세']}
                    selectedIndex={selectedIndex}
                    onTabPress={this.changeView}
                    tabTextStyle={{color:'#fff'}}
                    tabStyle={{backgroundColor:'#ea838d',borderColor:'#fff'}}
                    activeTabStyle={{backgroundColor:'#fff'}}
                    activeTabTextStyle={{color:'#ea838d'}}
                />
                {selectedIndex === 0 ? 
                <ScrollView style={styles.scrollBox}>
                {dailyView}
                </ScrollView> :
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
        // alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 0,
    },
    setting: {
        color:'#333',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',   
    },
    topBar: {
        // flex:1,
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    scrollBox: {
        paddingTop: 20,
        paddingBottom: 10,
    },
    imgWrap: {
        alignItems: 'center',
        justifyContent: 'center', 
        width: '25%'  
    },
    txtWrap: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingTop: 10,
        width: '75%' ,
        height:'100%',
        overflow:'hidden',
    },
    userInfo: {
        color: '#fff',
        paddingBottom: 10
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',   
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        marginTop: -10,
    },
    fortuneBlock: {
        flex:1,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 30,
        borderColor: '#fff',
        borderBottomWidth: 1,
        marginBottom: 10,
        flexDirection: 'row',
        height: 100,
        position: 'relative',
        overflow:"hidden"
        // justifyContent: 'space-between',
    },
    fortuneBlockMore: {
        flex:1,
        // paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        borderColor: '#fff',
        borderBottomWidth: 1,
        marginBottom: 0,
        flexDirection: 'row',
    },
    moreButton: {
        position:'absolute',
        bottom: 5,
        left: '50%',
        textAlign: 'center',
        marginLeft: -18,
        paddingTop: 3,
        paddingLeft: 3,
        paddingRight: 3,
        paddingBottom: 3,
        // backgroundColor: '#fff',
        borderRadius: 5,
        fontSize: 10,
        overflow:'hidden',
        // borderWidth: 1,
        // borderColor: '#fff',
        // color:'#ea838d',
        color: '#fff',
        // fontWeight: 'bold'
    },
    name: {
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
        backgroundColor: '#fff',
        borderRadius: 5,
        fontSize: 12,
        overflow:'hidden',
        // borderWidth: 1,
        // borderColor: '#fff',
        color:'#ea838d',
        // color: '#fff',
        // fontWeight: 'bold'
    }
})