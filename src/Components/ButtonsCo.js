import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, Image, TouchableOpacity, SafeAreaView, View, TextInput } from 'react-native'
import Svg, { Circle } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';

import { BTN_ACCEPT } from '../Const/ViStrCt';
import CameraIg from '../Assets/Icons/camera.png';
import CrossImg from '../Assets/Icons/cross.png';
import ListImg from '../Assets/Icons/list.png';
import LoupeImg from '../Assets/Icons/loupe.png';

export const ScanButton = ({ style, onPress }) => {
    return (
        <View style={[styles.svgwrapper, style]} >
            <Svg style={styles.svgcontainer} viewBox='0 0 100 100'>
                <View style={styles.imagecontainer}>
                    <Image style={styles.image}
                        source={CameraIg} />
                </View>
                <Circle onPress={onPress}
                    cx="50%"
                    cy="50%"
                    r="45"
                    stroke="#F2AC57"
                    strokeWidth="3"
                    fill="#F1951F" />
            </Svg>
        </View>
    )
}

export const PrimaryBtn = ({ btnTitle, style, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}
            style={[styles.buttonPrimary, style]} >
            <Text style={[styles.textbtn, styles.textbtnFontColor]}>
                {btnTitle}
            </Text>
        </TouchableOpacity>
    );
}

export const LinearBtn = ({ style, colors, onPress, content }) => {
    return (
        <LinearGradient style={{ flex: 1 }}
            colors={colors} >
            <TouchableOpacity style={[styles.buttonLinear, style]}
                onPress={onPress} >
                <Text style={styles.textbtn}>{content}</Text>
            </TouchableOpacity>
        </LinearGradient>
    )
}

export const DateBtn = ({ date, onPress, style }) => {
    return (
        <TouchableOpacity style={[styles.buttonDate, style]}
            onPress={onPress} >
            <Text style={styles.textBtnDate}>
                {date}
            </Text>
        </TouchableOpacity>
    )
}

export const ChangeStatusBtn = ({ onPress, style }) => {
    return (
        <TouchableOpacity style={[styles.btnChgStatus, style]}
            onPress={onPress} >
            <Image style={styles.imgChgStatus}
                source={ListImg} />
        </TouchableOpacity>
    )
}

export const SearchBtn = ({ onPress, style }) => {
    return (
        <TouchableOpacity style={[styles.btnSearch, style]}
            onPress={onPress} >
            <Image style={styles.imgSearch}
                source={LoupeImg} />
        </TouchableOpacity>
    )
}

export const BottomBtn = ({ onPress, style, source, title, useable }) => {
    let deactive = useable ? {} : { opacity: 0.5 }
    return (
        <TouchableOpacity onPress={onPress}
            style={[styles.bottomBtnWrapper, deactive, style]}
            disabled={!useable}
        >
            <Image source={source}
                style={styles.imageBtnBottom} />
            <Text style={styles.textBtnBottom} >
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export const AcceptInputBtn = ({ onPress, style }) => {
    return (
        <TouchableOpacity onPress={onPress}
            style={[styles.acceptBtn, style]} >
            <Text style={styles.textBtnDate}>
                {BTN_ACCEPT}
            </Text>
        </TouchableOpacity>
    )
}

export const CancelInputBtn = ({ onPress, style }) => {
    return (
        <TouchableOpacity onPress={onPress}
            style={[styles.cancelBtn, style]}
        >
            <Image source={CrossImg}
                style={styles.imageCancelBtn} />
        </TouchableOpacity>
    )
}

export const BasicBtn = ({ style, color, onPress, title }) => {
    return (
        <TouchableOpacity style={[styles.buttonBasic, style]}
            onPress={onPress} >
            <Text style={[styles.textbtn, { color: color }]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    svgwrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 170
    },
    svgcontainer: { width: 164, height: 164 },
    image: { width: 94, height: 95, resizeMode: 'cover' },
    imagecontainer: {
        width: '100%',
        height: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonPrimary: {
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#1492E6',
        justifyContent: 'center',
    },
    textbtn: {
        textAlign: 'center',
        fontSize: 20,
    },
    textbtnFontColor: {
        color: '#fff',
    },

    buttonLinear: {
        padding: 10,
        justifyContent: 'center',
        borderWidth: 1,
    },

    buttonDate: {
        backgroundColor: '#7B79CB',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 52,
        minWidth: 191,
    },
    textBtnDate: {
        color: '#fff',
        fontSize: 24,
    },

    imgChgStatus: { width: 30, height: 30, resizeMode: 'cover' },
    btnChgStatus: {
        minWidth: 98,
        minHeight: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#F4F2F2',
    },

    imgSearch: { width: 29, height: 29, resizeMode: 'cover' },
    btnSearch: {
        minWidth: 45,
        minHeight: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#F4F2F2',
    },

    bottomBtnWrapper: {
        flex: 1,
        alignItems: 'center',
        minHeight: 68,
    },
    // imagewrapper: {},
    imageBtnBottom: { width: 40, height: 40, resizeMode: 'cover' },
    textBtnBottom: { textAlign: 'center', },

    acceptBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        borderRadius: 29,
        borderColor: '#fff',
        borderWidth: 2,
        backgroundColor: '#449D44'
    },

    cancelBtn: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        alignSelf: 'flex-start',
    },
    // imagewrapper: {},
    imageCancelBtn: { width: 60, height: 60, resizeMode: 'cover' },

    buttonBasic: {
        flex: 1,
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#1492E6',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#8C8888',
    },
})