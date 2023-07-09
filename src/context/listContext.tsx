import { dummyList } from '@src/lib/dummyList';
import { IItem, IList } from '@src/lib/type';
import { ReactNode, createContext, useState } from 'react';
import { Text, View } from 'react-native';

interface Props {
  children: ReactNode;
}

interface IListContext {
  list: IList[];
  addList: (item: IItem, category: string) => void;
  deleteList: (id: string, category: string) => void;
  editList: (newItem: IItem, id: string, category: string) => void;
}

export const ListContext = createContext<IListContext>({
  list: [],
  addList: () => {},
  deleteList: () => {},
  editList: () => {},
});

export default function ListContextProvider({ children }: Props) {
  const [list, setList] = useState(dummyList);

  const addList = (item: IItem, category: string) => {
    setList((prev) =>
      prev.map((listItem) => {
        if (listItem.category === category)
          return {
            ...listItem,
            list: [...listItem.list, item],
          };
        return listItem;
      })
    );
  };

  const deleteList = (id: string, category: string) => {
    setList((prev) =>
      prev.map((listItem) => {
        if (listItem.category === category) {
          const updatedList = listItem.list.filter((item) => item.id !== id);
          return {
            ...listItem,
            list: updatedList,
          };
        }
        return listItem;
      })
    );
  };

  const editList = (newItem: IItem, id: string, category: string) => {
    setList((prev) =>
      prev.map((listItem) => {
        if (listItem.category === category) {
          const updatedList = listItem.list.map((item) => {
            if (item.id === id) return newItem;
            else return item;
          });
          return {
            ...listItem,
            list: updatedList,
          };
        }
        return listItem;
      })
    );
  };

  const contextValue = {
    list,
    addList,
    deleteList,
    editList,
  };

  return (
    <ListContext.Provider value={contextValue}>{children}</ListContext.Provider>
  );
}
