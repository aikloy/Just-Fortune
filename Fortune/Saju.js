import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo';

export default class Saju extends Component {
    render(){
        return(
            <LinearGradient 
                colors={['#b481e8', '#ea838d']} 
                style={styles.container}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})