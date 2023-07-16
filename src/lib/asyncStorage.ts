import AsyncStorage from '@react-native-async-storage/async-storage';
import { dummyCategory } from '@src/lib/dummyList';
import { ICategory, IList } from '@src/lib/type';

type keyType = 'my-list' | 'my-category';

export const storeData = async (
  toSave: IList[] | ICategory[],
  key: keyType
) => {
  try {
    const jsonValue = JSON.stringify(toSave);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {}
};

export const getData = async (key: keyType) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);

    return JSON.parse(jsonValue!) != null
      ? JSON.parse(jsonValue!)
      : dummyCategory;
  } catch (e) {
    console.log('getData Error!');
  }
};

export const removeValue = async (key: keyType) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {}
  console.log(`AsyncStorage of ${key} has Removed.`);
};
