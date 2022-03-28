import Realm from 'realm';

export const OrderCodeSchema = {
    name: "OrderCode",
    properties: {
        _id: "int",
        shop: "Shop",
        orderCode: "string",
        shippingCode: "string?",
        dateCreate: "date?",
        status: "string?",
        dateRecord: "date",
        logistic: 'string?',
    },
    primaryKey: "_id",
};

export const ShopSchema = {
    name: 'Shop',
    properties: {
        _id: 'int',
        name: 'string',
        from: 'string',
    },
    primaryKey: '_id',
}

export const AppStateSchema = {
    name: 'AppState',
    properties: {
        _id: 'int',
        dataDir: 'string',
        currentShopName: 'string',
        currentDateCreate: 'date',
        currentDateRecord: 'date',
        currentDateView: 'date',
        currentLogistic: 'string',
        initedShop: 'bool',
        permissionsGranted: 'bool',
    },
    primaryKey: '_id',
}

let realm;

export const openRealm = async function () {
    realm = await Realm.open({
        path: "myrealm",
        schema: [OrderCodeSchema, ShopSchema, AppStateSchema],
        schemaVersion: 1,
    })
    console.log('Realm is opened');
    return realm;
}

export const closeRealm = () => {
    try {
        if (realm) realm.close();
        console.log('Realm is closed');
    } catch (error) {
        console.log('RealmClose got err:', error);
    }
}
