import { Pressable, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { IItem } from '@src/lib/type';
import { useContext } from 'react';
import { ListContext } from '@src/context/listContext';

interface Props {
  themeColor: string;
  item: IItem;
}

export default function ItemDotSlideMenu({ themeColor, item }: Props) {
  const listCtx = useContext(ListContext);

  const getCategory = (): string => {
    const parentList = listCtx.list.find(
      (listItem) =>
        listItem.list.findIndex((listItem) => listItem.id === item.id) !== -1
    );
    return parentList?.category || '';
  };

  const toggleCompletedHandler = () => {
    const newItem = { ...item, complete: !item.complete };
    listCtx.editList(newItem, item.id, getCategory());
  };

  const toggleStarHandler = () => {
    const newItem = { ...item, star: !item.star };
    listCtx.editList(newItem, item.id, getCategory());
  };

  return (
    <View className='flex-row'>
      <Pressable className='mr-[15px]' onPress={toggleCompletedHandler}>
        <View
          className='h-[33px] aspect-square rounded-full border-2 mr-3 '
          style={{
            borderColor: themeColor,
            backgroundColor: item?.complete ? 'none' : themeColor,
          }}
        />
        {!item?.complete && (
          <View
            style={{ position: 'absolute' }}
            className='left-[2px] top-[1px]'
          >
            <Ionicons name='md-checkmark-sharp' size={27} color='white' />
          </View>
        )}
      </Pressable>

      <Pressable className='mr-[15px]' onPress={toggleStarHandler}>
        <View
          className='h-[32px] aspect-square rounded-full border-2 mr-3 '
          style={{
            borderColor: themeColor,
          }}
        />
        <View style={{ position: 'absolute', left: 5, top: 4 }}>
          {item?.star ? (
            <FontAwesome name='star-o' size={24} color={themeColor} />
          ) : (
            <FontAwesome name='star' size={24} color={themeColor} />
          )}
        </View>
      </Pressable>

      <View>
        <View
          className='h-[32px] aspect-square rounded-full border-2 mr-3 '
          style={{
            borderColor: themeColor,
            backgroundColor: themeColor,
          }}
        />
        <View style={{ position: 'absolute', left: 4, top: 3 }}>
          <MaterialIcons name='mode-edit' size={24} color='white' />
        </View>
      </View>
    </View>
  );
}
