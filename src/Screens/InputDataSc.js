import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, Image, TouchableOpacity, SafeAreaView, View, TextInput } from 'react-native'

import { RoundText, RoundPickerSelect } from '../Components/TextAndInputCo'
import { DateCard } from '../Components/CardsCo';
import { DATE_CREATE, DATE_RECORD, SHOP_PLACEHOLDER, STATUS_PLACEHOLDER, NUMBER_PLACEHOLDER, TRANSPORT_PLACEHOLDER } from '../Const/ViStrCt';
import { ORDER_STATUS, FORM_MODE1 } from '../Const/ConstCt';

const statusForPicker = () => {
    let items = ORDER_STATUS.map((ele, index) => ({
        label: ele, value: ele
    }))
    return items;
}

const statusItems = statusForPicker();

export const AppCo = ({ mode, shopItems, inputOrder, extraData }) => {
    const [shopID, setShopID] = useState(inputOrder.current.shopId);
    const [numberCode, setNumberCode] = useState(inputOrder.current.orderCode);
    const [transportCode, setTransportCode] = useState(inputOrder.current.shippingCode);
    const [status, setStatus] = useState(inputOrder.current.status);
    const [dateCreate, setDateCreate] = useState(inputOrder.current.dateCreate);
    const [dateRecord, setDateRecord] = useState(inputOrder.current.dateRecord);

    useEffect(() => {
        if (!mode) {
            let id = shopItems[0] && shopItems[0].value
            setShopID(id);
            inputOrder.current.shopId = id;
        }
    }, [shopItems])

    useEffect(() => {
        if (extraData) {
            setShopID(inputOrder.current.shopId)
            setNumberCode(inputOrder.current.orderCode)
            setTransportCode(inputOrder.current.shippingCode)
            setStatus(inputOrder.current.status)
            setDateCreate(inputOrder.current.dateCreate)
            setDateRecord(inputOrder.current.dateRecord)
        }
    }, [extraData])

    const onChangeShopID = (value) => {
        setShopID(value);
        inputOrder.current.shopId = value;
    }

    const onChangeStatus = (value) => {
        setStatus(value);
        inputOrder.current.status = value;
    }

    const onChangeNumberCode = (text) => {
        setNumberCode(text);
        inputOrder.current.orderCode = text;
    }

    const onChangeTransportCode = (text) => {
        setTransportCode(text);
        inputOrder.current.shippingCode = text;
    }

    const onChangeDateCreate = (date) => {
        setDateCreate(date);
        inputOrder.current.dateCreate = date;
    }

    const onChangeDateRecord = (date) => {
        setDateRecord(date);
        inputOrder.current.dateRecord = date;
    }

    return (
        <View>
            <RoundPickerSelect style={styles.roundText}
                onValueChange={onChangeShopID}
                items={shopItems}
                placeholder={SHOP_PLACEHOLDER}
                itemPicked={shopID}
            />
            <RoundText value={numberCode}
                onValueChange={onChangeNumberCode}
                style={styles.roundText}
                placeholder={NUMBER_PLACEHOLDER}
            />
            <RoundText style={styles.roundText}
                value={transportCode}
                onValueChange={onChangeTransportCode}
                placeholder={TRANSPORT_PLACEHOLDER}
            />
            <RoundPickerSelect style={styles.roundText}
                onValueChange={onChangeStatus}
                items={statusItems}
                placeholder={STATUS_PLACEHOLDER}
                itemPicked={status}
            />
            <DateCard style={styles.card}
                title={DATE_CREATE}
                selectDate={dateCreate}
                onSelectDate={onChangeDateCreate} />
            <DateCard style={styles.card}
                title={DATE_RECORD}
                selectDate={dateRecord}
                onSelectDate={onChangeDateRecord} />
        </View>
    )
}

const styles = StyleSheet.create({
    roundText: {
        marginTop: 12,
    },
    card: { marginTop: 14 }
})

export default AppCo;