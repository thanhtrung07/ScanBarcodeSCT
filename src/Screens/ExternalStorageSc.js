import React, { useState, useEffect } from 'react';
import {
    PermissionsAndroid, FlatList, StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ScrollView, StatusBar
} from 'react-native';

import * as RNfsSv from '../Services/RNfsSv';
import { makeName } from '../Utils/Utility';
import { LinearBtn } from '../Components/ButtonsCo';
import { RoundIcon } from '../Components/PicturesCo';
import { BottomStick } from '../Components/LayoutsCo';

import { SILVEDARK_LINEARS } from '../Const/ConstCt';
import { BTN_EXPORT, BTN_IMPORT } from '../Const/ViStrCt';
import DocImg from '../Assets/Icons/document.png'

const DATA = [
    {
        id: 0,
        title: 'First_Item.txt',
    },
    {
        id: 1,
        title: 'Second_Item.txt',
    },
    {
        id: 2,
        title: 'Third_Item.txt',
    }, {
        id: 3,
        title: 'Third_Item.txt',
    }, {
        id: 4,
        title: 'Third_Item.txt',
    }, {
        id: 5,
        title: 'Third_Item.txt',
    }, {
        id: 6,
        title: 'Third_Item.txt',
    }, {
        id: 7,
        title: 'Third_Item.txt',
    }, {
        id: 8,
        title: 'Third_Item.txt',
    }, {
        id: 9,
        title: 'Third_Item.txt',
    }, {
        id: 10,
        title: 'Third_Item.txt',
    }, {
        id: 11,
        title: 'Third_Item.txt',
    }, {
        id: 12,
        title: 'Near_last_Item.txt',
    }, {
        id: 13,
        title: 'Last_item.txt',
    },
];

const Item1 = ({ title, id, hookStyles, setFunction }) => (
    <TouchableOpacity
        onPress={() => setFunction(id)}
        style={[styles1.itemwrapper, hookStyles]}
    >
        <RoundIcon style={styles1.roundIcon}
            source={DocImg}
            size={30}
            svgsize={48}
            svgfillcolor='#1492E6'
        />
        <View style={styles1.item}>
            <Text style={styles1.title}>{title}</Text>
        </View>
    </TouchableOpacity>
);

const requestExternalPermission = async () => {
    try {
        const readGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );

        return (readGranted === PermissionsAndroid.RESULTS.GRANTED);
    } catch (err) {
        console.warn(err);
    }
};

const simplifiedFilelist = (data) => {
    const datafl = data.map((element, index) => ({ id: index, title: element.name }))
    return datafl;
}

const AppSc = ({ navigation }) => {
    const [selectId, setSelectId] = useState(-1);
    const [isDirMade, setIsDirMade] = useState(false);
    const [fileData, setFileData] = useState([]);
    const [path, setPath] = useState('');
    const hookStyles = { backgroundColor: 'rgba(115, 115, 115, 0.2)' };

    useEffect(() => {
        requestExternalPermission().then(success => {
            if (success) {
                console.log('Permission Granted');
                RNfsSv.makeAndroidDir()
                    .then((pathfile) => {
                        setIsDirMade(true);
                        setPath(pathfile);
                    })
                    .catch(err => console.warn('makeAndroidDir: ', err));
            }
            else {
                console.log('Permission Denied');
            }
        }).catch(err => console.warn('Request Permission Error:', err))
    }, []);

    useEffect(() => {
        if (isDirMade) {
            updateFileList();
        }
    }, [isDirMade]);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={updateFileList}
                    title="Reload" />
            ),
        });
    }, [navigation]);

    const updateFileList = () => {
        RNfsSv.readAndroidDir().then(result => {
            setFileData(simplifiedFilelist(result));
        }).catch(err => console.warn('readAndroidDir Error:', err));
    }

    const handleImport = () => {
        if (fileData[selectId]) {
            RNfsSv.readAndroidFile(fileData[selectId].title)
                .then(content => {
                    console.log(content);
                }).catch(err => console.warn('readAndroidFile Error:', err));
        }
    }

    const handleExport = () => {
        if (isDirMade)
            RNfsSv.createAndroidFile(makeName('.dat'), 'Lorem ipsum dolor sit amet')
                .then(() => {
                    console.log('FILE HAS WRITTEN ');
                    updateFileList();
                })
                .catch(err => console.warn('handleExportFile: ', err));
        else console.log('Directory not found');
    }

    const renderItem = ({ item }) => (
        <Item1
            id={item.id}
            title={item.title}
            hookStyles={selectId === item.id ? hookStyles : {}}
            setFunction={setSelectId}
        />
    );

    return (
        <View style={styles1.container}>
            <View style={styles1.extPath}>
                <Text style={styles1.textPath}>
                    {path}
                </Text>
            </View>
            <View style={styles1.listWrapper}>
                <FlatList
                    data={fileData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    extraData={selectId}
                />
            </View>
            <BottomStick>
                <LinearBtn colors={SILVEDARK_LINEARS}
                    content={BTN_IMPORT}
                    onPress={handleImport} />
                <LinearBtn colors={SILVEDARK_LINEARS}
                    content={BTN_EXPORT}
                    onPress={handleExport} />
            </BottomStick>
        </View>
    )
}

const styles1 = StyleSheet.create({
    container: {
        flex: 1,
    },
    listWrapper: {
        flex: 1,
        marginBottom: 50,
        paddingBottom: 5,
    },

    extPath: {
        backgroundColor: '#1492E6',
        paddingLeft: 23,
        paddingVertical: 18,
    },
    textPath: {
        color: '#fff',
        fontSize: 20,
    },

    itemwrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 10,
    },
    item: {
        flex: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#8C8888',
        justifyContent: 'center',
    },
    roundIcon: { paddingHorizontal: 18 },
    title: {
        fontSize: 20,
    },
})

export default AppSc;