
export const requestExternalPermission = async () => {
    try {
        const readGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );

        return (readGranted === PermissionsAndroid.RESULTS.GRANTED);
    } catch (err) {
        console.warn(err);
    }
};