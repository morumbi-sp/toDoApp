import AsyncStorage from '@react-native-async-storage/async-storage';
import { IList } from '@src/lib/type';
import { ReactNode, createContext, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
}

interface IListContext {
  lists: IList[];
  AllListOfCategory: (category: string) => IList[];
  completedListOfCategory: (category: string) => IList[];
  starListOfCategory: (category: string) => IList[];
  addList: (newItem: IList) => void;
  deleteList: (id: string) => void;
  editList: (newItem: IList, id: string) => void;
}

export const ListContext = createContext<IListContext>({
  lists: [],
  AllListOfCategory: () => [],
  completedListOfCategory: () => [],
  starListOfCategory: () => [],
  addList: () => {},
  deleteList: () => {},
  editList: () => {},
});

export default function ListContextProvider({ children }: Props) {
  const [lists, setLists] = useState<IList[]>([]);

  const AllListOfCategory = (category: string) =>
    lists?.filter((element) => element.category === category);

  const completedListOfCategory = (category: string) =>
    AllListOfCategory(category)?.filter((element) => element.complete === true);

  const starListOfCategory = (category: string) =>
    AllListOfCategory(category)?.filter((element) => element.star === true);

  const addList = (newItem: IList) => {
    setLists((prev) => [...prev, newItem]);
  };

  const deleteList = (id: string) => {
    setLists((prev) => prev?.filter((element) => element.id !== id));
  };

  const editList = (newItem: IList, id: string) => {
    setLists(
      (prev) =>
        prev?.map((element) => {
          if (element.id === id) return newItem;
          else return element;
        })
    );
  };

  const storeData = async (toSave: IList[]) => {
    try {
      const jsonValue = JSON.stringify(toSave);
      await AsyncStorage.setItem('my-list', jsonValue);
    } catch (e) {}
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('my-list');
      setLists(jsonValue != null ? JSON.parse(jsonValue) : null);
    } catch (e) {}
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    storeData(lists);
  }, [setLists, addList, deleteList, editList]);

  const contextValue = {
    lists,
    AllListOfCategory,
    completedListOfCategory,
    starListOfCategory,
    addList,
    deleteList,
    editList,
  };

  return (
    <ListContext.Provider value={contextValue}>{children}</ListContext.Provider>
  );
}
