import React, { useState, useEffect } from 'react';
import {
    Text, View, ScrollView, Button, TextInput, StyleSheet, ToastAndroid, PermissionsAndroid
} from 'react-native';

import { DashboardCard } from '../Components/CardsCo';
import { ScanButton } from '../Components/ButtonsCo';
import { SCAN_DECRIPTION, CARD_BTNTEXTS, CARD_DES_STRINGS } from '../Const/ViStrCt';
// import { initShops, openRealm, getListShop } from '../Services/StgOrderCodeSv';

const AppSc = ({ navigation, route }) => {

    const onScanButtonPress = () => {
        navigation.navigate('RNCScanText');
    }

    const onCardBtnPress = (index) => {
        switch (index) {
            case 0:
                navigation.navigate('OrderCodes');
                break;
            case 1:
                navigation.navigate('ConfigShops');
                break;
            case 2:
                navigation.navigate('ExternalStorage');
                break;
            case 3:
                navigation.navigate('Mainteaning');
                break;
            default:
                break;
        }
    }

    const renderGroupCard = () => {
        return CARD_DES_STRINGS.map((des, index) =>
            <DashboardCard key={index}
                style={styles.card}
                description={des}
                title={CARD_BTNTEXTS[index]}
                onPress={() => onCardBtnPress(index)} />
        )
    }

    return (
        <ScrollView >
            <ScanButton style={styles.scanbtnWraper}
                onPress={onScanButtonPress} />
            <Text style={styles.text}>{SCAN_DECRIPTION}</Text>
            <View style={styles.cardsWrapper}>
                {renderGroupCard()}
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    scanbtnWraper: {
        marginTop: 26,
    },
    text: { fontSize: 20, textAlign: 'center' },
    card: { marginHorizontal: '6%', marginVertical: 5 },
    cardsWrapper: { paddingBottom: 10 }
})

export default AppSc;