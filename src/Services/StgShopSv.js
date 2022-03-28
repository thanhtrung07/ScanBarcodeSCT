let realm;

export const assignShopRealm = (therealm) => {
    realm = therealm;
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
