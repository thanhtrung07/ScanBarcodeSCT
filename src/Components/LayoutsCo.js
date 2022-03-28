import React from 'react'
import { StyleSheet, Text, Image, TouchableOpacity, SafeAreaView, View, TextInput } from 'react-native'
import Svg, { Circle } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';

export const BottomStick = ({style, children }) => {
    return (
        <View style={[styles.bottomStick, style]} >
            {children }
        </View>
    )
}

const styles = StyleSheet.create({
    bottomStick: {
        position: 'absolute',
        alignSelf: 'flex-start',
        bottom: 0,
        flexDirection: 'row',
        flex: 1,
    },
})