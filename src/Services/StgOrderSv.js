let realm;

export const assignOrderRealm = (therealm) => {
    realm = therealm;
}

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

export const getByCode = (search_code = '') => {
    let orders;
    if (!search_code) return [];
    try {
        orders = realm.objects('OrderCode').filtered(
            'orderCode CONTAINS[c] $0 || shippingCode CONTAINS[c] $0', search_code
        );
    } catch (error) { console.log('GetByCode got err:', error); }
    return orders ? orders : [];
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
    const { shop, orderCode, shippingCode, dateCreate, dateRecord, status, logistic } = data;
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
                logistic: logistic,
            })
        });
    } catch (error) { console.log('addIncrement got err:', error); }
    return add_OrderCode;
}

export const updateObject = (id, data) => {
    let updated = false;
    const { shop, orderCode, shippingCode, dateCreate, logistic, dateRecord, status } = data;
    try {
        const order = getById(id);
        realm.write(() => {
            if (order) {
                order.shop = shop ? shop : order.shop;
                order.orderCode = orderCode ? orderCode : order.orderCode;
                order.shippingCode = shippingCode ? shippingCode : order.shippingCode;
                order.dateCreate = dateCreate ? dateCreate : order.dateCreate;
                order.dateRecord = dateRecord ? dateRecord : order.dateRecord;
                order.status = status ? status : order.status;
                order.logistic = logistic ? logistic : order.logistic;
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