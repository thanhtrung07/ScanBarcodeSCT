import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
// import { openRealm, getTheState, updateTheState, initTheState } from '../Services/StgOrderCodeSv';
const text = 'Chức năng này đang trong quá trình phát triển';

const AppSc = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>{text} </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default AppSc; 