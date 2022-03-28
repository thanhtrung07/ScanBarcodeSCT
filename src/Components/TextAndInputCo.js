import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, SafeAreaView, View, TextInput } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import Svg, { Circle } from 'react-native-svg';

import { RoundIcon } from '../Components/PicturesCo';
import DownArrowImg from '../Assets/Icons/downward-arrow.png';


export const SimpleInput = ({ style, onChangeText, value, placeholder }) => {
    
}

export const RoundText = ({ style, onValueChange, value, placeholder }) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.inputWrapper}>
                <TextInput placeholder={placeholder}
                    value={value}
                    autoCapitalize='characters'
                    onChangeText={onValueChange}
                    style={styles.text} />
            </View>
        </View>
    )
}


const renderIcon = () => {
    return (
        <Image style={{ width: 22, height: 22, resizeMode: 'cover' }}
            source={DownArrowImg} />
    )
}

export const RoundPickerSelect = ({ style, items, placeholder, onValueChange, itemPicked }) => {

    return (
        <View style={style}>
            <RNPickerSelect style={pickerSelectStyles}
                placeholder={{ label: placeholder, value: null }}
                useNativeAndroidPickerStyle={false}
                value={itemPicked}
                onValueChange={onValueChange}
                Icon={renderIcon}
                items={items}
            />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 28,
        paddingLeft: 26,
        borderWidth: 1,
        borderColor: '#0066FF',
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 20,
    },
    inputWrapper: {
        flex: 1,
        marginVertical: 3,
    }
})

// styling picker select
const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {
        fontSize: 20,
        color: '#707070',
        backgroundColor: '#fff',
        paddingVertical: 13,
        borderWidth: 1,
        borderColor: '#0066FF',
        borderRadius: 28,
        paddingLeft: 30,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    iconContainer: {
        top: 18,
        right: 20,
    },
})