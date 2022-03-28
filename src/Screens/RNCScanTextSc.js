import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useNavigation, useRoute } from '@react-navigation/native';

import { BasicBtn } from '../Components/ButtonsCo';
import { BTN_FORWARD, } from '../Const/ViStrCt';
import { ECOM, LAZADA_TRANSPORT_MARK as MARK, QR_FORMAT, CODE128_FORMAT } from '../Const/ConstCt';

class AppSc extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            canDetectText: true,
            canDetectBarcode: true,
            hookStyles: null,
            barcodeValue: '',
            ordercodeValue: '',
        }
    }

    componentDidMount() {
        this.willFocusScanSc = this.props.navigation.addListener('focus', () => {
            this.setState({
                canDetectText: true,
                canDetectBarcode: true,
                hookStyles: null,
                ordercodeValue: '',
                barcodeValue: '',
            })
        });
    }

    componentWillUnmount() {
        this.willFocusScanSc();
    }

    onForwardPress = () => {
        this.props.navigation.navigate('ProcessData', {
            delivCode: this.state.barcodeValue
        });
    }

    textRecognized = object => {
        const { textBlocks } = object;

        const reShopee = /\b[0-9A-Z]{14}\b/;
        const reLazada = /\b[0-9]{15}\b/;
        for (var i = 0; i < textBlocks.length; i++) {
            var value = textBlocks[i].value.replace('O', '0');
            if (reShopee.test(value)) {
                var code = value.match(reShopee).toString();
                this.props.navigation.navigate('ProcessData', {
                    codeNumb: code,
                    delivCode: this.state.barcodeValue,
                    eCom: ECOM[0],
                })
                // console.log('Shopee code:', code);
                break;
            }
            else if (reLazada.test(value)) {
                var code = value.match(reLazada).toString();
                this.props.navigation.navigate('ProcessData', {
                    codeNumb: code,
                    delivCode: this.state.barcodeValue,
                    eCom: ECOM[1],
                })
                // console.log('Lazada code:', code);
                break;
            }
        }
    };


    barcodeReconized = (object) => {
        // console.log(object);
        let value;
        for (let i = 0; i < object.barcodes.length; i++) {
            const data = object.barcodes[i].data;
            const format = object.barcodes[i].format;
            if (format == QR_FORMAT) value = data;
            else if (format == CODE128_FORMAT) {
                if (data && data.includes(MARK)) {
                    value = data;
                    break;
                }
            }
        }
        if (value) {
            this.setState({
                canDetectBarcode: false,
                barcodeValue: value,
                hookStyles: {
                    borderColor: '#00ff00',
                }
            })
        }
    }

    render() {
        return (
            <View style={[styles.container, this.state.hookStyles]}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use your audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    onTextRecognized={
                        this.state.canDetectText ? this.textRecognized : null
                    }
                    onGoogleVisionBarcodesDetected={
                        this.state.canDetectBarcode ? this.barcodeReconized : null
                    }
                >
                </RNCamera>
                <View style={styles.capture} >
                    <BasicBtn style={styles.btnForward}
                        title={BTN_FORWARD}
                        onPress={this.onForwardPress}
                        color='#000' />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        borderWidth: 2,
        borderColor: '#ff0000',
        backgroundColor: '#000',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        height: 100,
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: '20%',
    },
    btnForward: {
        backgroundColor: '#fff',
    },
    text: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 2,
        position: 'absolute',
        borderColor: '#F00',
        justifyContent: 'center',
    },
    textBlock: {
        color: '#F00',
        position: 'absolute',
        textAlign: 'center',
        backgroundColor: 'transparent',
    },
});

export default function (props) {
    const navigation = useNavigation();
    const route = useRoute();

    return <AppSc {...props} route={route} navigation={navigation} />
}