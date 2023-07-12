import { dummyCategory, dummyList } from '@src/lib/dummyList';
import { ICategory } from '@src/lib/type';
import { ReactNode, createContext, useState } from 'react';
import { Text, View } from 'react-native';

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
  const [categories, setCategories] = useState(dummyCategory);

  const addCategory = (newItem: ICategory) => {
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
