import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, Platform, Modal, Image, TouchableOpacity, SafeAreaView, View, TextInput } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';

import { PrimaryBtn } from './ButtonsCo';
import { ORDER_STATUS } from '../Const/ConstCt';
import { getMonth } from '../Utils/Utility'

export const DashboardCard = ({ description, title, style, onPress }) => {
    return (
        <View style={[styles.container, styles.boxWithShadow, style]}>
            <Text style={styles.text}>{description}</Text>
            <PrimaryBtn style={styles.button}
                btnTitle={title}
                onPress={onPress} />
        </View>
    )
}

const TEXT3 = 'Shop Chiến Thắng';

const statusStyle = (status) => {
    switch (status) {
        case ORDER_STATUS[1]:
            return { backgroundColor: '#00FA08' }
        case ORDER_STATUS[2]:
            return { backgroundColor: '#EEF21F' }
        case ORDER_STATUS[3]:
            return { backgroundColor: '#BFFF00' }
        case ORDER_STATUS[4]:
            return { backgroundColor: '#E93434' }
        case ORDER_STATUS[5]:
            return { backgroundColor: '#f69110' }
        case ORDER_STATUS[6]:
            return { backgroundColor: '#000' }
        default:
            return { backgroundColor: '#fff' }
    }
}


export const OrderCard = ({
    shop,
    codeNumber,
    codeTransport,
    dateCreate,
    checkbox,
    status,
    id,
    selectID,
    onPress,
    onTickCheckbox,
}) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const orderSelected = selectID == id && styles.orderSelect;
    const textSelected = selectID == id && styles.textSelect;

    useEffect(() => {
        if (!checkbox) {
            setToggleCheckBox(false);
        }
    }, [checkbox])


    const onValueChange = (newValue) => {
        setToggleCheckBox(newValue);
        onTickCheckbox(id, newValue);
    }

    return (
        <TouchableOpacity onPress={onPress}
            style={[styles.orderWrapper, orderSelected]}
        >
            <View style={styles.lineWrapper}>
                <View style={styles.textWrapper}>
                    <Text style={[styles.textShop, textSelected]}>{shop}</Text>
                </View>
                <TouchableOpacity
                    style={[styles.statusWrapper, statusStyle(status)]} />
            </View>
            <Text style={[styles.textCode, textSelected]}>{codeNumber}</Text>
            <Text style={[styles.textsmall, textSelected]}>{codeTransport}</Text>
            <View style={styles.lineWrapper}>
                <View style={styles.textWrapper}>
                    <Text style={[styles.textShop, textSelected]}>{dateCreate}</Text>
                </View>
                {
                    checkbox ?
                        <CheckBox
                            value={toggleCheckBox}
                            onValueChange={onValueChange}
                        /> :
                        null
                }
            </View>
        </TouchableOpacity>
    )
}

export const DateCard = ({ style, title, selectDate, onSelectDate }) => {
    const [show, setShow] = useState(false);
    const [day, setDay] = useState('1')
    const [month, setMonth] = useState('1')
    const [year, setYear] = useState('2020')

    useEffect(() => {
        setDay(selectDate.getDate());
        setMonth(getMonth(selectDate));
        setYear(selectDate.getFullYear())
    }, [selectDate])


    const onChange = (event, date) => {
        // trung07 note: this code prevent datepicker dialog render twice,
        // due to package issue #54
        setShow(Platform.OS === 'ios');
        const currentDate = date || selectDate;
        onSelectDate(currentDate);
    }

    const onPress = () => setShow(true);

    return (
        <View style={[styles.dateCardWrapper, style]} >
            <View style={styles.title}>
                <Text style={styles.textTitle}>
                    {title}
                </Text>
            </View>
            <TouchableOpacity onPress={onPress}
                style={styles.contentWrapper}
            >
                <View style={styles.dateWrapper}>
                    <Text style={styles.textDate}>{day}</Text>
                </View>
                <View style={styles.dateWrapper}>
                    <Text style={styles.textDate}>{month}</Text>
                </View>
                <View style={styles.dateWrapper}>
                    <Text style={styles.textDate}>{year}</Text>
                </View>
            </TouchableOpacity>
            {show && <DateTimePicker
                value={selectDate}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={onChange}
            />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: 117,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 14,
        backgroundColor: '#fff',
    },
    boxWithShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 3,
    },
    text: {
        fontSize: 16,
        textAlign: 'left',
    },
    button: {
        marginTop: 14,
    },

    orderWrapper: {
        paddingTop: 6,
        paddingRight: 6,
        paddingLeft: 16,
        paddingBottom: 20,
        backgroundColor: '#EEEEEE',
        marginHorizontal: 14,
        marginTop: 12,
        borderRadius: 5,
    },
    textShop: { fontSize: 21 },
    textCode: { fontSize: 23, fontWeight: 'bold' },
    textsmall: { fontSize: 16 },
    lineWrapper: { flexDirection: 'row' },
    textWrapper: { flex: 1, minHeight: 32 },
    statusWrapper: {
        width: 37,
        height: 21,
        borderRadius: 3,
        borderBottomLeftRadius: 10,
        backgroundColor: '#00FA08',
        borderWidth: 1,
        borderColor: '#8C8888',
    },
    orderSelect: { backgroundColor: '#0066FF' },
    textSelect: { color: '#fff' },

    dateCardWrapper: {},
    title: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 15,
        backgroundColor: '#0066FF',
        alignSelf: 'baseline',
        paddingBottom: 4,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderColor: '#8C8888',
    },
    textTitle: {
        color: '#fff',
        fontSize: 20,
    },
    contentWrapper: {
        borderRadius: 5,
        height: 58,
        backgroundColor: '#0066FF',
        paddingVertical: 4,
        paddingHorizontal: 8,
        flexDirection: 'row',
    },
    dateWrapper: {
        flex: 1,
        borderRadius: 5,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 12,
        borderWidth: 1,
        borderColor: '#8C8888',
    },
    textDate: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    }
})