import React from 'react'
import { StyleSheet, Text, Image, TouchableOpacity, SafeAreaView, View, TextInput } from 'react-native'
import Svg, { Circle } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';

export const RoundIcon = ({ style, source, size, svgsize, svgfillcolor }) => {
    return (
        <View style={[styles.svgwrapper, style]} >
            <Svg style={[
                styles.svgcontainer,
                { width: svgsize, height: svgsize }
            ]}
                viewBox='0 0 100 100'
            >
                <View style={styles.imagecontainer}>
                    <Image style={[
                        styles.image,
                        { width: size, height: size }
                    ]}
                        source={source} />
                </View>
                <Circle
                    cx="50%"
                    cy="50%"
                    r="48"
                    stroke='#cccccc'
                    strokeWidth='2'
                    fill={svgfillcolor} />
            </Svg>
        </View>
    )
}

const styles = StyleSheet.create({
    // icon style 
    svgwrapper: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    svgcontainer: {  },
    image: { resizeMode: 'cover' },
    imagecontainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
})