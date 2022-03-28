import React, { useState, useEffect, useRef } from 'react';
import {
    Text, View, Button, KeyboardAvoidingView, Platform, TextInput, StyleSheet, ToastAndroid, PermissionsAndroid
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import InputDataSc from './InputDataSc';
import { AcceptInputBtn, CancelInputBtn } from '../Components/ButtonsCo'

// import { getShopById, getShopBySource, openRealm, getListShop, initShops, addIncrement, getList } from '../Services/StgOrderCodeSv';
import { openRealm, closeRealm } from '../Services/RealmSchema';
import { assignOrderRealm, addIncrement, } from '../Services/StgOrderSv';
import { assignShopRealm, getListShop, getShopById, initShops, getShopBySource } from '../Services/StgShopSv';

import { ECOM, SHOPS, ORDER_FIELD, ORDER_STATUS } from '../Const/ConstCt';
import { TOAST_ACCEPT_FAIL } from '../Const/ViStrCt';

const shopsForPicker = (shops) => {
    let items = shops.map((ele, index) => ({
        label: ele.name, value: ele._id
    }))
    return items;
}

const AppSc = ({ navigation, route }) => {
    const { codeNumb, delivCode, eCom } = route.params;
    const [shops, setShops] = useState([]);

    const inputOrder = useRef({
        shopId: 0,
        orderCode: codeNumb,
        shippingCode: delivCode,
        dateCreate: new Date(),
        status: ORDER_STATUS[0],
        dateRecord: new Date(),
        logistic: '',
    });

    useEffect(() => {
        openRealm().then(realm => {
            assignOrderRealm(realm);
            assignShopRealm(realm);
            let sortShops
            if (eCom === ECOM[0] || eCom === ECOM[1]) {
                sortShops = [...getShopBySource(eCom)];
            } else {
                sortShops = [...getListShop()];
            }
            setShops(sortShops);
        }).catch(err => console.log('Fail to open Realm: ', err));
        return () => closeRealm();
    }, [])

    const handleAccept = () => {
        const data = {
            shop: getShopById(inputOrder.current.shopId),
            orderCode: inputOrder.current.orderCode,
            shippingCode: inputOrder.current.shippingCode,
            dateCreate: inputOrder.current.dateCreate,
            status: inputOrder.current.status,
            dateRecord: inputOrder.current.dateRecord,
            logistic: inputOrder.current.logistic,
        }
        if (addIncrement(data)) {
            navigation.navigate('RNCScanText');
        }
        else {
            ToastAndroid.show(
                TOAST_ACCEPT_FAIL,
                ToastAndroid.SHORT
            )
        }
    }

    const handleCancel = () => {
        navigation.navigate('RNCScanText');
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <LinearGradient style={styles.background}
                colors={['#5B57C5', '#8B88D5', '#2E2C63']}>
                <InputDataSc inputOrder={inputOrder}
                    shopItems={shopsForPicker(shops)} />
                <AcceptInputBtn style={styles.accept}
                    onPress={handleAccept} />
                <CancelInputBtn onPress={handleCancel} />
            </LinearGradient>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    bigContainer: { flex: 1 },
    container: { flex: 1 },
    background: {
        flex: 1,
        paddingHorizontal: '7.5%',
        paddingTop: 14,
    },
    accept: {
        marginTop: 40,
    }
})

export default AppSc;