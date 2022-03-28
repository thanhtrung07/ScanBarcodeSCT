import React, { useState, useEffect } from 'react';
import { Button, View, Platform, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RNCScanTextSc from './src/Screens/RNCScanTextSc';
import ProcessDataSc from './src/Screens/ProcessDataSc';
import ConfigShopsSc from './src/Screens/ConfigShopsSc';
import OrderCodesSc from './src/Screens/OrderCodesSc';
import ExternalStorageSc from './src/Screens/ExternalStorageSc';
import DashboardSc from './src/Screens/DashboardSc';
import LoadingSc from './src/Screens/LoadingSc';
import MainteaningSc from './src/Screens/MainteaningSc';

import { DASHBOARD, CONFIGSHOP, PROCESS_DATA, ORDERCODES, RNSCANCODE, EXTERNAL_STG, TRANSFER_DATA } from './src/Const/ViStrCt';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.androidSafeArea}>
                <StatusBar barStyle="light-content" backgroundColor="#4D4D4D" />
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Group screenOptions={{ headerTitleAlign: 'center', }}>
                            <Stack.Screen name="Loading" component={LoadingSc} options={{ headerShown: false }} />
                            <Stack.Screen name="Dashboard" component={DashboardSc} options={{ title: DASHBOARD, }} />
                            <Stack.Screen name="RNCScanText" component={RNCScanTextSc} options={{ title: RNSCANCODE }} />
                            <Stack.Screen name="ProcessData" component={ProcessDataSc} options={{ title: PROCESS_DATA, }} />
                            <Stack.Screen name="ConfigShops" component={ConfigShopsSc} options={{ title: CONFIGSHOP, }} />
                            <Stack.Screen name="OrderCodes" component={OrderCodesSc} options={{ title: ORDERCODES, }} />
                            <Stack.Screen name="ExternalStorage" component={ExternalStorageSc} options={{ title: EXTERNAL_STG }} />
                            <Stack.Screen name="Mainteaning" component={MainteaningSc} options={{ title: TRANSFER_DATA }} />
                        </Stack.Group>
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    androidSafeArea: {
        flex: 1,
        backgroundColor: '#4D4D4D',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight / 2 : 0
    }
})

export default App;