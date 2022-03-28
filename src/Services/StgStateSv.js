let realm;

export const assignStateRealm = (therealm) => {
    realm = therealm;
}

export const getTheState = () => {
    let appstate = null;
    try {
        appstate = realm.objects('AppState')[0];
    } catch (error) { console.log(`getTheState got Error: ${error}`) }
    return appstate;
}

export const initTheState = () => {
    const defaultDate = new Date();
    let addAppState = null;
    try {
        realm.write(() => {
            addAppState = realm.create("AppState", {
                _id: 1,
                dataDir: '',
                currentShopName: '',
                currentDateCreate: defaultDate,
                currentDateRecord: defaultDate,
                currentDateView: defaultDate,
                initedShop: false,
                permissionsGranted: false,
                currentLogistic: '',
            })
        });
    } catch (error) { console.log('initTheState got err:', error); }
    return addAppState;
}

export const updateTheState = (data) => {
    let updated = false;
    const { dataDir, currentShopName, currentDateCreate, currentDateRecord, currentDateView, currentLogistic, initedShop, permissionsGranted } = data;
    try {
        const appstate = getTheState();
        realm.write(() => {
            if (appstate) {
                appstate.dataDir = dataDir ? dataDir : appstate.dataDir;
                appstate.currentShopName = currentShopName ? currentShopName : appstate.currentShopName;
                appstate.currentDateCreate = currentDateCreate ? currentDateCreate : appstate.currentDateCreate;
                appstate.currentDateRecord = currentDateRecord ? currentDateRecord : appstate.currentDateRecord;
                appstate.currentDateView = currentDateView ? currentDateView : appstate.currentDateView;
                appstate.initedShop = initedShop ? initedShop : appstate.initedShop;
                appstate.permissionsGranted = permissionsGranted ? permissionsGranted : appstate.permissionsGranted;
                appstate.currentLogistic = currentLogistic ? currentLogistic : appstate.currentLogistic;
            }
        })
        updated = true;
    } catch (error) {
        console.log('updateTheState got err: ', error);
    }
    return updated;
}
