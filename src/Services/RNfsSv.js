import * as RNFS from 'react-native-fs';

const EXPORT_DIR = '/RNReturned';

export const makeAndroidDir = async () => {
    var path = RNFS.ExternalStorageDirectoryPath + EXPORT_DIR;
    await RNFS.mkdir(path);
    return path;
}

export const readAndroidFile = async (filename) => {
    var path = RNFS.ExternalStorageDirectoryPath + EXPORT_DIR + '/' + filename;
    return await RNFS.readFile(path, 'utf8');
}

export const createAndroidFile = async (filename, content) => {
    var path = RNFS.ExternalStorageDirectoryPath + EXPORT_DIR + '/' + filename;
    await RNFS.writeFile(path, content, 'utf8');
}

export const readAndroidDir = async () => {
    var path = RNFS.ExternalStorageDirectoryPath + EXPORT_DIR;
    return await RNFS.readDir(path);
}