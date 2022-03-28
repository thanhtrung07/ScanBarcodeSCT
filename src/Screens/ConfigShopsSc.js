import React, { useState, useEffect, useRef } from 'react';
import {
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    KeyboardAvoidingView,
    useColorScheme,
    View,
    TouchableOpacity,
    SectionList,
    Platform,
    TextInput
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Modal from 'react-native-modal';

// import { openRealm, getListShop, getShopBySource, getShopById, addIncrementShop, upsertShop, removeShop, removeAllShops, updateShop } from '../Services/StgOrderCodeSv';
import { openRealm, closeRealm } from '../Services/RealmSchema';
import { assignShopRealm, getListShop, getShopById, getShopBySource, addIncrementShop, removeShop, updateShop } from '../Services/StgShopSv';

import { BottomStick } from '../Components/LayoutsCo';
import { BottomBtn, BasicBtn } from '../Components/ButtonsCo';
import { BTN_BOTTOMS, BTN_ACCEPT2, BTN_CANCEL, SHOP_PLACEHOLDER2 } from '../Const/ViStrCt';
import { ECOM } from '../Const/ConstCt';

import HomeImg from '../Assets/Icons/home.png';
import PlusImg from '../Assets/Icons/plus.png';
import PencilImg from '../Assets/Icons/pencil.png';
import DelImg from '../Assets/Icons/delete.png';

/* Note from trung07 (author):
    This data state below is set directly from realm database, 
    it mean you change the data in database, you change data state.
    So it is mutable due to function from Services file which
    is call a query to realm. It may break the rule "state should 
    not be mutation".
    But I dont understand why when i query add, modify or delete, 
    react can render the change with out setState.
*/


const ecomForPicker = (ecom) => {
    return ecom.map((ele, index) => (
        { label: ele, value: ele }
    ))
}

const ecomItems = ecomForPicker(ECOM);

const Header2 = ({ title }) => {
    return (
        <Text style={styles1.header}>{title}</Text>
    )
}

const Item2 = ({ item, handleItemPress, selectId, background, titleColor }) => {
    return (
        <TouchableOpacity
            onPress={() => handleItemPress(item._id)}
            style={[styles1.item, background]}
        >
            <Text style={[styles1.title, titleColor]}>
                {item.name}
            </Text>
        </TouchableOpacity>
    )
};

const AppSc = ({ navigation, route }) => {
    const [data, setData] = useState([]);
    const [selectedID, setSelectedID] = useState(-1);
    const [isModalVisible, setModalVisible] = useState(false);
    const [action, setAction] = useState('');
    const [shopName, setShopName] = useState('');
    const [ecomName, setEcomName] = useState(ecomItems[0].value);

    useEffect(() => {
        openRealm().then((realm) => {
            assignShopRealm(realm);
            updateShopsData();
        }).catch(err => console.log('Fail to open Realm: ', err));
        return () => closeRealm();
    }, [])

    const updateShopsData = () => {
        const shopees = getShopBySource(ECOM[0]);
        const lazadas = getShopBySource(ECOM[1]);
        const tikis = getShopBySource(ECOM[2]);
        const others = getShopBySource(ECOM[3]);
        const newdata = [
            {
                title: ECOM[0],
                data: shopees,
            },
            {
                title: ECOM[1],
                data: lazadas,
            },
            {
                title: ECOM[2],
                data: tikis,
            },
            {
                title: ECOM[3],
                data: others,
            },
        ]
        setData(newdata);
    }


    const handleItemPress = (id) => {
        setSelectedID(id);
    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const onChangeText = (text) => {
        setShopName(text);
    }

    const onChangeEcom = (value) => {
        setEcomName(value);
    }

    const naviHome = () => {
        navigation.navigate('Dashboard');
    }

    const onAddShopPress = () => {
        toggleModal();
        setShopName('');
        setEcomName(ECOM[0]);
        setAction('add');
    }

    const onModifyShopPress = () => {
        toggleModal();
        const ashop = getShopById(selectedID);
        setShopName(ashop.name);
        setEcomName(ashop.from);
        setAction('mod');
    }

    const onAcceptPress = () => {
        let ashop;
        toggleModal();
        switch (action) {
            case 'add':
                ashop = { name: shopName, from: ecomName };
                addIncrementShop(ashop);
                break;
            case 'mod':
                ashop = { id: selectedID, name: shopName, from: ecomName };
                updateShop(ashop)
                break;
            default:
                break;
        }
    }

    const onDeletePress = () => {
        if (removeShop(selectedID)) {
            setSelectedID(-1);
        }
    }

    const renderHeader2 = ({ section: { title } }) => {
        return (
            <Header2 title={title} />
        )
    }

    const renderItem = ({ item }) => {
        const itemID = item ? item._id : null;
        const background = itemID === selectedID ? styles1.selectItem : {};
        const titleColor = itemID === selectedID ? styles1.titleSelected : {};

        return (
            <Item2
                item={item}
                handleItemPress={handleItemPress}
                selectId={selectedID}
                background={background}
                titleColor={titleColor}
            />
        )
    }

    return (
        <KeyboardAvoidingView
            style={styles1.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <SectionList
                style={styles1.listWrapper}
                sections={data}
                keyExtractor={(item, index) => item + index}
                renderItem={renderItem}
                renderSectionHeader={renderHeader2}
            />
            <BottomStick style={styles1.bottomLayout}>
                <BottomBtn onPress={naviHome}
                    source={HomeImg}
                    title={BTN_BOTTOMS[0]}
                    useable={true} />
                <BottomBtn onPress={onAddShopPress}
                    source={PlusImg}
                    title={BTN_BOTTOMS[1]}
                    useable={true} />
                <BottomBtn onPress={onModifyShopPress}
                    source={PencilImg}
                    title={BTN_BOTTOMS[2]}
                    useable={selectedID != -1} />
                <BottomBtn onPress={onDeletePress}
                    source={DelImg}
                    title={BTN_BOTTOMS[3]}
                    useable={selectedID != -1} />
            </BottomStick>
            <Modal isVisible={isModalVisible} >
                <View style={styles1.formWrapper}>
                    <View style={styles1.textInputWrapper}>
                        <TextInput placeholder={SHOP_PLACEHOLDER2}
                            value={shopName}
                            style={styles1.textInput}
                            onChangeText={onChangeText} />
                    </View>
                    <View style={styles1.ecomWrapper}>
                        <RNPickerSelect
                            value={ecomName}
                            onValueChange={onChangeEcom}
                            items={ecomItems}
                        />
                    </View>
                    <View style={styles1.btnWrapper}>
                        <BasicBtn style={styles1.btnCancel}
                            title={BTN_CANCEL}
                            onPress={toggleModal}
                            color='#fff' />
                        <BasicBtn style={styles1.btnAccept}
                            title={BTN_ACCEPT2}
                            onPress={onAcceptPress}
                            color='#fff' />
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    )
}

const styles1 = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    listWrapper: {
        flex: 1,
        marginHorizontal: 15,
        marginBottom: 85,
    },
    item: {
        backgroundColor: "#EEEEEE",
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 9,
        borderRadius: 5,
    },
    selectItem: {
        backgroundColor: '#0066FF',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 48,
    },
    title: {
        fontSize: 24
    },
    titleSelected: {
        color: '#fff',
    },
    bottomLayout: {
        paddingTop: 4,
        borderTopWidth: 1,
        borderColor: '#707070'
    },
    formWrapper: {
        backgroundColor: '#CCC9C9',
        paddingHorizontal: 10,
        paddingBottom: 30,
        paddingTop: 15,
        borderRadius: 5,
    },
    ecomWrapper: {
        marginTop: 20,
        backgroundColor: '#fff',
        borderRadius: 5,
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
    },
    textInputWrapper: {
        marginTop: 20,
        paddingLeft: 12,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    textInput: {
        fontSize: 20,
    },
});

export default AppSc;
