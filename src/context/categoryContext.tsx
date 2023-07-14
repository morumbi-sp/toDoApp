import { dummyCategory, dummyList } from '@src/lib/dummyList';
import { ICategory } from '@src/lib/type';
import { ReactNode, createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData, removeValue, storeData } from '@src/lib/asyncStorage';

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

  useEffect(() => {
    (async () => {
      // removeValue('my-category');
      setCategories(await getData('my-category'));
    })();
  }, []);

  useEffect(() => {
    storeData(categories, 'my-category');
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
