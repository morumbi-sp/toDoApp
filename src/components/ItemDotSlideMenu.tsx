import { Pressable, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { IList } from '@src/lib/type';
import { useContext } from 'react';
import { ListContext } from '@src/context/listContext';
import { MaterialIcons } from '@expo/vector-icons';

interface Props {
  item: IList;
}

export default function ItemDotSlideMenu({ item }: Props) {
  const listCtx = useContext(ListContext);

  const toggleCompletedHandler = () => {
    const newItem = { ...item, complete: !item.complete, star: false };
    listCtx.editList(newItem, item.id);
  };

  const toggleStarHandler = () => {
    const newItem = { ...item, star: !item.star, complete: false };
    listCtx.editList(newItem, item.id);
  };

  const clickDeleteHandler = () => {
    listCtx.deleteList(item.id);
  };

  return (
    <View className='flex-row mt-3 justify-center w-full mb-3'>
      <Pressable className='mr-[30px]' onPress={toggleCompletedHandler}>
        <View
          className='h-[33px] aspect-square rounded-full border-2 mr-3 '
          style={{
            borderColor: item.bgColor,
            backgroundColor: item?.complete ? 'none' : item.bgColor,
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

      <Pressable className='mr-[30px]' onPress={toggleStarHandler}>
        <View
          className='h-[32px] aspect-square rounded-full border-2 mr-3 '
          style={{
            borderColor: item.bgColor,
          }}
        />
        <View style={{ position: 'absolute', left: 5, top: 4 }}>
          {item?.star ? (
            <FontAwesome name='star-o' size={24} color={item.bgColor} />
          ) : (
            <FontAwesome name='star' size={24} color={item.bgColor} />
          )}
        </View>
      </Pressable>

      <Pressable onPress={clickDeleteHandler}>
        <View
          className='h-[32px] aspect-square rounded-full border-2'
          style={{
            borderColor: item.bgColor,
            backgroundColor: item.bgColor,
          }}
        />
        <View style={{ position: 'absolute', left: 4, top: 3 }}>
          <Ionicons name='trash' size={24} color='white' />
        </View>
      </Pressable>
    </View>
  );
}
