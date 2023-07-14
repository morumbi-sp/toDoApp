import { dummyCategory, dummyList } from '@src/lib/dummyList';
import { ICategory } from '@src/lib/type';
import { ReactNode, createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  children: ReactNode;
}

interface ICategoryContext {
  categories: ICategory[];
  addCategory: (newItem: ICategory) => void;
  deleteCategory: (id: string) => void;
  editCategory: (newItem: ICategory, id: string) => void;
}

export const CategoryContext = createContext<ICategoryContext>({
  categories: [],
  addCategory: () => {},
  deleteCategory: () => {},
  editCategory: () => {},
});

export default function CategoryContextProvider({ children }: Props) {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const addCategory = (newItem: ICategory) => {
    console.log(newItem);
    console.log(categories);
    setCategories((prev) => [...prev, newItem]);
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((element) => element.Id !== id));
  };

  const editCategory = (newItem: ICategory, id: string) => {
    setCategories((prev) =>
      prev.map((element) => {
        if (element.Id === id) return newItem;
        else return element;
      })
    );
  };

  const storeData = async (toSave: ICategory[]) => {
    try {
      const jsonValue = JSON.stringify(toSave);
      await AsyncStorage.setItem('my-category', jsonValue);
    } catch (e) {}
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('my-category');
    } catch (e) {
      // remove error
    }
    console.log('Done.');
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('my-category');
      console.log(JSON.stringify(jsonValue, null, 2));
      setCategories(
        jsonValue != 'null' ? JSON.parse(jsonValue!) : dummyCategory
      );
    } catch (e) {}
  };

  useEffect(() => {
    // removeValue();
    getData();
  }, []);

  useEffect(() => {
    storeData(categories);
  }, [setCategories, addCategory, deleteCategory, editCategory]);

  console.log(JSON.stringify(categories, null, 2));

  const contextValue = {
    categories,
    addCategory,
    deleteCategory,
    editCategory,
  };

  return (
    <CategoryContext.Provider value={contextValue}>
      {children}
    </CategoryContext.Provider>
  );
}
