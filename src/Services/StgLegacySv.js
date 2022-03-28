import Realm from "realm";

/* trung07 note: this Service is no longer necessary
*/ 

const OrderCodeSchema = {
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

const ShopSchema = {
    name: 'Shop',
    properties: {
        _id: 'int',
        name: 'string',
        from: 'string',
    },
    primaryKey: '_id',
}

const AppStateSchema = {
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
}

export const initShops = (data) => {
    let success = false;
    try {
        realm.write(() => {
            data.forEach(shop => {
                realm.create('Shop', shop, 'modified')
            });
        })
        success = true;
        console.log('Init shops list');
    } catch (error) { console.log('Initshop got err:', error); }
    return success;
}

export const getListShop = () => {
    let sortedShops;
    try {
        sortedShops = realm.objects('Shop').sorted("_id");
    } catch (error) { console.log(`Err at getListShop: ${error}`) }
    return sortedShops ? sortedShops : [];
}

export const getShopById = (id) => {
    let shop = null;
    try {
        shop = realm.objectForPrimaryKey('Shop', id);
    } catch (error) { console.log('Get shop by ID got err:', error); }
    return shop;
}

export const getShopBySource = (from) => {
    let shops;
    try {
        shops = realm.objects('Shop').filtered(
            'from == $0', from
        );
    } catch (error) { console.log(`Err at getShopBySource: ${error}`) }
    return shops ? shops : [];
}

export const upsertShop = (upsert_shop) => {
    let upsertSuccess = false;
    try {
        realm.write(() => {
            realm.create('Shop', upsert_shop, 'modified')
        })
        upsertSuccess = true;
        console.log('Upserted shop:', upsert_shop);
    } catch (error) { console.log('Upsertshop got err:', error); }
    return upsertSuccess;
}

export const addIncrementShop = (data) => {
    const { name, from } = data;
    let add_shop;
    try {
        let sortShop = realm.objects('Shop').sorted('_id', true);
        let id = sortShop ? sortShop[0]._id + 1 : 1;
        realm.write(() => {
            add_shop = realm.create("Shop", {
                _id: id,
                name: name,
                from: from,
            })
        });
        console.log('Shop added');
    } catch (error) {
        console.log('add increment shop got err:', error);
    }
    return add_shop ? add_shop : null;
}

export const updateShop = (data) => {
    let updated = false;
    const { id, name, from, } = data;
    try {
        const shop = getShopById(id);
        realm.write(() => {
            if (shop) {
                shop.name = name || shop.name;
                shop.from = from || shop.from;
            }
        })
        updated = true;
    } catch (error) {
        console.log('Update shop got err: ', error);
    }
    return updated;
}

export const removeShop = (id) => {
    let shop = realm.objectForPrimaryKey('Shop', id);
    let deleted = false;
    try {
        realm.write(() => {
            realm.delete(shop);
            console.log(`Deleted shop`);
            deleted = true;
        })
    } catch (error) {
        console.log('Deleteshop got err: ', error);
    }
    return deleted;
}

export const removeAllShops = () => {
    try {
        realm.write(() => {
            realm.delete(realm.objects('Shop'));
        });
        console.log('Deleted all shop');
    } catch (error) {
        console.log(`Deleted all shop got err: ${error}`);
    }
}

export const getOneShop = () => {
    let shop;
    try {
        shop = realm.objectForPrimaryKey('Shop', 7);
    } catch (error) {
        console.log(err => console.log('getOneShop got err:', err));
    }
    return shop ? shop : null;
}

// ########################################################################

export const getList = () => {
    let sortedOrderCodes = null;
    try {
        sortedOrderCodes = realm.objects('OrderCode').sorted("_id");
    } catch (error) { console.log(`Err at getList: ${error}`) };
    return sortedOrderCodes ? sortedOrderCodes : [];
}

export const getById = (id) => {
    let order;
    try {
        order = realm.objectForPrimaryKey('OrderCode', id);
    } catch (error) { console.log('GetByID got err:', error) }
    return order;
}

export const getLastestId = () => {
    let lastestObj = null;
    try {
        let sortedOrderCodes = realm.objects('OrderCode').sorted('_id', true);
        if (sortedOrderCodes) lastestObj = sortedOrderCodes[0]
    } catch (error) { console.log('getLastestID got err:', error); }
    return lastestObj;
}

export const getByCode = (search_code) => {
    // console.log(search_code);
    try {
        const orders = realm.objects('OrderCode').filtered(
            'orderCode CONTAINS[c] $0 || shippingCode CONTAINS[c] $0', search_code
        );
        return orders;
    } catch (error) { console.log('GetByCode got err:', error); }
}

export const getByDateRecord = (
    startDate,
    endDate = new Date(startDate.getTime() + 86400000)
) => {
    let orders;
    try {
        orders = realm.objects('OrderCode').filtered(
            'dateRecord >= $0 && dateRecord < $1', startDate, endDate
        );
    } catch (error) { console.log(`getByDate get err: ${error}`) }
    return orders ? orders : [];
}

export const addIncrement = (data) => {
    let add_OrderCode = null;
    const { shop, orderCode, shippingCode, dateCreate, dateRecord, status } = data;
    const lastID = getLastestId();
    let id = lastID ? lastID._id + 1 : 1;
    try {
        realm.write(() => {
            add_OrderCode = realm.create("OrderCode", {
                _id: id,
                shop: shop,
                orderCode: orderCode,
                shippingCode: shippingCode,
                status: status,
                dateCreate: dateCreate,
                dateRecord: dateRecord,
            })
        });
    } catch (error) { console.log('addIncrement got err:', error); }
    return add_OrderCode;
}

export const updateObject = (id, data) => {
    let updated = false;
    const { shop, orderCode, shippingCode, dateCreate, dateRecord, status } = data;
    try {
        const order = getById(id);
        realm.write(() => {
            if (order) {
                order.shop = shop ? shop : order.shop;
                order.orderCode = orderCode ? orderCode : order.orderCode;
                order.shippingCode = shippingCode ? shippingCode : order.shippingCode;
                order.dateCreate = dateCreate ? dateCreate : order.dateCreate;
                order.dateRecord = dateRecord ? dateRecord : order.dateRecord;
                order.status = status ? status : status
            }
        })
        updated = true;
    } catch (error) {
        console.log('UpdateObject got err: ', error);
    }
    return updated;
}

export const deleteById = (id) => {
    const order = getById(id);
    let deleted = false;
    try {
        realm.write(() => {
            realm.delete(order);
            console.log(`Deleted object`);
        })
        deleted = true;
    } catch (error) { console.log('Delered got err: ', error); }
    return deleted;
}

export const deleteAll = () => {
    let deleted = false;
    try {
        realm.write(() => {
            realm.delete(realm.objects('OrderCode'));
        });
        console.log('Deleted all ordercode');
        deleted = true;
    } catch (error) { console.log(`Deleted all got err: ${error}`); }
    return deleted;
}

export const closeRealm = () => {
    try {
        realm.close();
        console.log('Realm is closed');
    } catch (error) {
        console.log('RealmClose got err:', error);
    }
}

// ########################################################################
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
            })
        });
    } catch (error) { console.log('addIncrement got err:', error); }
    return addAppState;
}

export const updateTheState = (data) => {
    let updated = false;
    const { dataDir, currentShopName, currentDateCreate, currentDateRecord, currentDateView, initedShop, permissionsGranted } = data;
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
            }
        })
        updated = true;
    } catch (error) {
        console.log('updateTheState got err: ', error);
    }
    return updated;
}