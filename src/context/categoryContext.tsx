import { ICategory } from '@src/lib/type';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { getData, removeValue, storeData } from '@src/lib/asyncStorage';

interface Props {
  children: ReactNode;
}

interface ICategoryContext {
  categories: ICategory[];
  addCategory: (newItem: ICategory) => void;
  deleteCategory: (id: string) => void;
  editCategory: (newItem: ICategory, id: string) => void;
  reorderCategory: (newOrderedCategory: ICategory[]) => void;
}

export const CategoryContext = createContext<ICategoryContext>({
  categories: [],
  addCategory: () => {},
  deleteCategory: () => {},
  editCategory: () => {},
  reorderCategory: () => {},
});

export default function CategoryContextProvider({ children }: Props) {
  const [categories, setCategories] = useState<ICategory[]>([]);

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

  const reorderCategory = (newOrderedCategory: ICategory[]) => {
    setCategories(newOrderedCategory);
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

  const contextValue = {
    categories,
    addCategory,
    deleteCategory,
    editCategory,
    reorderCategory,
  };

  return (
    <CategoryContext.Provider value={contextValue}>
      {children}
    </CategoryContext.Provider>
  );
}
