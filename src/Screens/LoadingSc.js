import React, { useState, useEffect } from 'react'
import { ImageBackground, Platform, ActivityIndicator, StyleSheet, Button, Text, TouchableOpacity, SafeAreaView, View, TextInput } from 'react-native'
// import { openRealm, getTheState, updateTheState, initTheState } from '../Services/StgOrderCodeSv';
import { StackActions } from '@react-navigation/native';

import { assignStateRealm, getTheState, initTheState, updateTheState } from '../Services/StgStateSv';
import { assignShopRealm, initShops } from '../Services/StgShopSv';
import { closeRealm, openRealm } from '../Services/RealmSchema';

import background from '../Assets/Backgrounds/sct_img_blur.png';
import { SHOPS } from '../Const/ConstCt';
import { delay } from '../Utils/Utility';

const AppSc = ({ navigation }) => {
    const [processText, setProcessText] = useState('');

    useEffect(() => {
        async function initAppState() {
            try {
                const tick = Date.now();
                const realm = await openRealm();
                assignStateRealm(realm);
                assignShopRealm(realm);

                let theState = getTheState();
                let initedShop = false;
                if (!theState) {
                    initTheState();
                } else {
                    initedShop = theState.initedShop;
                }

                if (!initedShop) {
                    if (initShops(SHOPS))
                        updateTheState({ initedShop: true })
                }

                console.log(getTheState());
                const executeTime = Date.now() - tick;
                await delay(500 - executeTime);
            } catch (error) {
                console.log('Error while initialing: ', error)
            }
        }
        initAppState().then(() => {
            navigation.dispatch(StackActions.replace('Dashboard'));
        })
        return () => closeRealm()
    }, [])

    return (
        <View style={styles.container}>
            <ImageBackground source={background}
                resizeMode="cover"
                style={styles.image} >
                <View style={styles.spinerWrapper}>
                    <ActivityIndicator
                        size={Platform.OS === 'ios' ? 'large' : 55}
                    />
                    <Text style={styles.text}>{processText} </Text>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
    },
    spinerWrapper: {
        width: '80%',
        backgroundColor: 'rgba(121, 122, 127, 0.15)',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        marginTop: 8,
    }
})

export default AppSc; 