import React, { useState, useEffect, useRef } from 'react';
import {
    ToastAndroid, StyleSheet, Alert, Text, View, Platform, KeyboardAvoidingView, Button, TextInput, TouchableOpacity, ScrollView, FlatList
} from 'react-native';
import Modal from "react-native-modal";
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';

// import { getShopById, openRealm, getById, getListShop, getList, addIncrement, deleteById, deleteAll, getOneShop, updateObject, getByDateRecord } from '../Services/StgOrderCodeSv';

import { openRealm, closeRealm } from '../Services/RealmSchema';
import { assignOrderRealm, getByCode, getById, addIncrement, deleteById, updateObject, getByDateRecord, } from '../Services/StgOrderSv';
import { assignShopRealm, getListShop, getShopById } from '../Services/StgShopSv';
import { getMMDDYYYYStr, shopsForPicker } from '../Utils/Utility';

import { FORM_MODE1, ORDER_MODEL, ORDER_FIELD, ORDER_STATUS } from '../Const/ConstCt';
import { TOAST_ACCEPT, TOAST_ACCEPT_FAIL, BTN_ACCEPT, BTN_CANCEL, CHECKBOX_TIP, BTN_BOTTOMS, ALERT_DEL_TITLE, ALERT_DEL_MSG, SEARCH_NOT_FOUND } from '../Const/ViStrCt';

import InputDataSc from '../Screens/InputDataSc';
import { BasicBtn, DateBtn, ChangeStatusBtn, SearchBtn, BottomBtn } from '../Components/ButtonsCo';
import { BottomStick } from '../Components/LayoutsCo';
import { OrderCard } from '../Components/CardsCo';

import HomeImg from '../Assets/Icons/home.png';
import PlusImg from '../Assets/Icons/plus.png';
import PencilImg from '../Assets/Icons/pencil.png';
import DelImg from '../Assets/Icons/delete.png';

const DATA = [
    {
        _id: 1,
        shop: { name: 'Shop Chiến Thắng' },
        orderCode: '123456789',
        shippingCode: '123456789VNA',
        dateCreate: new Date('1/13/2021'),
        status: ORDER_STATUS[0],
        dateRecord: new Date('2/9/2021'),
    }, {
        _id: 2,
        shop: { name: 'Shop Chiến Thắng' },
        orderCode: '123456789',
        shippingCode: '123456789VNA',
        dateCreate: new Date('1/1/2021'),
        status: ORDER_STATUS[0],
        dateRecord: new Date('2/9/2021'),
    }, {
        _id: 3,
        shop: { name: 'Shop Chiến Thắng' },
        orderCode: '123456789',
        shippingCode: '123456789VNA',
        dateCreate: new Date('1/1/2021'),
        status: ORDER_STATUS[0],
        dateRecord: new Date('2/9/2021'),
    }, {
        _id: 4,
        shop: { name: 'Shop Chiến Thắng' },
        orderCode: '123456789',
        shippingCode: '123456789VNA',
        dateCreate: new Date('1/1/2021'),
        status: ORDER_STATUS[0],
        dateRecord: new Date('2/9/2021'),
    },
]

const AppSc = ({ navigation, route }) => {
    const [visible, setVisible] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectID, setSelectID] = useState(-1);
    // const [listIndex, setListIndex] = useState(0);
    const [dataOrder, setdataOrder] = useState([]);
    const [mode, setMode] = useState(null);
    const [shops, setShops] = useState([]);
    const [dateView, setDateView] = useState(() => {
        return new Date(getMMDDYYYYStr(new Date()))
    });
    const [show, setShow] = useState(false);
    const [searchCode, setSearchCode] = useState('');
    const [searchAlertVisible, setSearchAlertVisible] = useState(false);

    const inputOrder = useRef({
        shopId: 0,
        orderCode: "",
        shippingCode: "",
        dateCreate: new Date(),
        status: ORDER_STATUS[0],
        dateRecord: new Date(),
    });
    let checkboxArray = useRef([]);
    let launched = useRef(true);
    let searchCodeShow = useRef(searchCode);

    useEffect(() => {
        openRealm().then((realm) => {
            assignOrderRealm(realm);
            assignShopRealm(realm);
            setShops(getListShop());
            updateOnDateViewPress();
            launched.current = false;
        }
        ).catch(err => console.log('Fail to open Realm: ', err));
        // return () => { closeRealm() };
    }, [])

    useEffect(() => {
        if (!launched.current) updateOnDateViewPress();
    }, [dateView])

    useEffect(() => {
        setVisible(false);
        checkboxArray.current = [];
    }, [dataOrder])

    const resetInputOrder = () => {
        inputOrder.current.shopId = 0;
        inputOrder.current.orderCode = "";
        inputOrder.current.shippingCode = "";
        inputOrder.current.dateCreate = new Date();
        inputOrder.current.status = ORDER_STATUS[0];
        inputOrder.current.dateRecord = new Date();
    }

    const updateOnDateViewPress = () => {
        setdataOrder(getByDateRecord(dateView));
        setSearchCode('');
        setSearchAlertVisible(false);
    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const onOrderPress = (id, index) => {
        setSelectID(id);
    }

    const onDateViewPress = () => {
        setShow(true);
    }

    const naviHome = () => {
        navigation.navigate('Dashboard');
    }

    const onChangeStatusPress = () => {
        if (visible) {
            for (const item of checkboxArray.current) {
                updateObject(item, { status: ORDER_STATUS[1] })
            }
            checkboxArray.current = [];
        }
        setVisible(!visible);
    }

    const onTickCheckbox = (id, checkboxValue) => {
        if (checkboxValue) {
            checkboxArray.current.push(id);
        } else {
            checkboxArray.current = checkboxArray.current.filter(item => item != id);
        }
    }

    const onAddOrderPress = () => {
        resetInputOrder();
        toggleModal();
        setMode(null);
    }

    const onModifyOrderPress = () => {
        const order = getById(selectID);
        if (order) {
            inputOrder.current.shopId = order.shop._id;
            inputOrder.current.orderCode = order.orderCode;
            inputOrder.current.shippingCode = order.shippingCode;
            inputOrder.current.dateCreate = order.dateCreate;
            inputOrder.current.status = order.status;
            inputOrder.current.dateRecord = order.dateRecord;
            toggleModal();
            setMode(FORM_MODE1);
        }
    }

    const onAcceptPress = () => {
        const data = {
            shop: getShopById(inputOrder.current.shopId),
            orderCode: inputOrder.current.orderCode,
            shippingCode: inputOrder.current.shippingCode,
            dateCreate: inputOrder.current.dateCreate,
            status: inputOrder.current.status,
            dateRecord: inputOrder.current.dateRecord,
        }
        if (mode == FORM_MODE1) {
            if (updateObject(selectID, data)) {
                toggleModal();
                setdataOrder(getByDateRecord(dateView));
            }
            else {
                ToastAndroid.show(
                    TOAST_ACCEPT_FAIL,
                    ToastAndroid.SHORT
                )
            }
        }
        else {
            if (addIncrement(data)) {
                toggleModal();
            }
            else {
                ToastAndroid.show(
                    TOAST_ACCEPT_FAIL,
                    ToastAndroid.SHORT
                )
            }
        }
    }

    const handleDeleteOrder = () => {
        if (deleteById(selectID)) {
            setSelectID(-1);
            resetInputOrder();
        }
    }

    const onDeletePress = () =>
        Alert.alert(
            ALERT_DEL_TITLE,
            ALERT_DEL_MSG,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: handleDeleteOrder,
                }
            ]
        );

    const onChangeText = (text) => {
        setSearchCode(text);
    }

    const onSearchPress = () => {
        if (!searchCode) setSearchAlertVisible(false);
        else {
            const data = getByCode(searchCode.toUpperCase());
            setdataOrder(data);
            if (data.length == 0) {
                setSearchAlertVisible(true);
                searchCodeShow.current = searchCode;
            }
            else setSearchAlertVisible(false);
        }
    }

    const onChangeDateView = (event, date) => {
        // trung07 note: this code prevent datepicker dialog render twice,
        // due to package issue #54
        setShow(Platform.OS === 'ios');
        const currentDate = date || dateView;
        setDateView(currentDate);
    }

    const renderItem = ({ item, index }) => (
        <OrderCard shop={item.shop && item.shop.name}
            codeNumber={item.orderCode}
            codeTransport={item.shippingCode}
            dateCreate={getMMDDYYYYStr(item.dateCreate)}
            status={item.status}
            checkbox={visible}
            id={item._id}
            // trung07: optimize this code later
            onPress={() => onOrderPress(item._id, index)}
            selectID={selectID}
            onTickCheckbox={onTickCheckbox}
        />
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles1.container}
        >
            <LinearGradient
                colors={['#5B57C5', '#4A47A0']} >
                <View style={styles1.headerContent}>
                    <View style={styles1.topWrapper}>
                        <DateBtn date={getMMDDYYYYStr(dateView)}
                            onPress={onDateViewPress} />
                        <View style={{ flex: 1 }} />
                        <ChangeStatusBtn style={visible ? { backgroundColor: '#00FA08' } : null}
                            onPress={onChangeStatusPress} />
                    </View>
                    <View style={styles1.searchWrapper}>
                        <View style={styles1.search}>
                            <TextInput placeholder=''
                                onChangeText={onChangeText}
                                value={searchCode} />
                        </View>
                        <SearchBtn onPress={onSearchPress} />
                    </View>
                </View>
                <View style={styles1.tipWrapper}>
                    <Text style={styles1.tip}>
                        {visible ? CHECKBOX_TIP : ''}
                    </Text>
                </View>
            </LinearGradient>
            <View style={styles1.listWrapper}>
                {searchAlertVisible && <Text style={styles1.searchAlert} >
                    {`${SEARCH_NOT_FOUND} \"${searchCodeShow.current}\"`}
                </Text>}
                <FlatList
                    data={dataOrder}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    extraData={selectID}
                // getItemLayout={(data, index) => ({
                //     length: 143, // height of the item
                //     offset: 143 * index,
                //     index,
                // })}
                // initialScrollIndex={listIndex}
                />
            </View>

            <BottomStick style={styles1.footer}>
                <BottomBtn onPress={naviHome}
                    source={HomeImg}
                    title={BTN_BOTTOMS[0]}
                    useable={true} />
                <BottomBtn onPress={onAddOrderPress}
                    source={PlusImg}
                    title={BTN_BOTTOMS[1]}
                    useable={true} />
                <BottomBtn onPress={onModifyOrderPress}
                    source={PencilImg}
                    title={BTN_BOTTOMS[2]}
                    useable={selectID != -1} />
                <BottomBtn onPress={onDeletePress}
                    source={DelImg}
                    title={BTN_BOTTOMS[3]}
                    useable={selectID != -1} />
            </BottomStick>
            <Modal isVisible={isModalVisible}>
                <View style={styles1.formWrapper}>
                    <InputDataSc shopItems={shopsForPicker(shops)}
                        inputOrder={inputOrder}
                        extraData={isModalVisible}
                        mode={mode} />
                    <View style={styles1.btnWrapper}>
                        <BasicBtn style={styles1.btnCancel}
                            title={BTN_CANCEL}
                            onPress={toggleModal}
                            color='#fff' />
                        <BasicBtn style={styles1.btnAccept}
                            title={BTN_ACCEPT}
                            onPress={onAcceptPress}
                            color='#000' />
                    </View>
                </View>
            </Modal>
            {show && <DateTimePicker
                value={dateView}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={onChangeDateView}
            />}
        </KeyboardAvoidingView>
    )
}

const styles1 = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    formWrapper: {
        backgroundColor: '#CCC9C9',
        paddingHorizontal: 10,
        paddingBottom: 30,
        borderRadius: 5,
    },
    topWrapper: {
        flexDirection: 'row',
    },
    searchWrapper: {
        flexDirection: 'row',
        marginTop: 15,
    },
    headerContent: {
        paddingLeft: 15,
        paddingRight: 11,
        paddingTop: 17,
        paddingBottom: 9,
    },
    tipWrapper: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        minHeight: 53,
        paddingLeft: 15,
        paddingRight: 24,
        paddingTop: 5,
    },

    tip: {
        fontSize: 15,
        color: '#000',
    },
    btnDateWrapper: {
        flex: 1,
    },
    search: {
        flex: 1,
        height: 45,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        marginRight: 8,
        backgroundColor: '#F4F2F2',
    },
    searchAlert: {
        alignSelf: 'center',
        fontSize: 20,
    },
    listWrapper: {
        flex: 1,
        marginBottom: 72,
        paddingBottom: 5
    },
    footer: {
        paddingTop: 4,
        borderTopWidth: 1,
        borderColor: '#707070'
    },
    btnWrapper: {
        flexDirection: 'row',
        marginTop: 51,
    },
    btnAccept: {
        marginLeft: 34,
        backgroundColor: '#0F996D'
    },
    btnCancel: {
        backgroundColor: '#E93434'
    }
});

export default AppSc;