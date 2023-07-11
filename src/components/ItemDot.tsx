import { IItem } from '@src/lib/type';
import { Pressable, Text, View, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import ItemDotSlideMenu from '@src/components/ItemDotSlideMenu';
import OutsidePressHandler from 'react-native-outside-press';
import InputItem from '@src/components/InputItem';
import { ListContext } from '@src/context/listContext';
import EditItem from '@src/components/EditItem';

interface Props {
  themeColor: string;
  item?: IItem;
}

export default function ItemDot({ themeColor, item }: Props) {
  const [slideMenuVisible, setSlideMenuVisible] = useState(false);
  const [editItemMode, setEditItemMode] = useState(false);
  const slideAnim = useState(new Animated.Value(0))[0];

  const listCtx = useContext(ListContext);

  const getCategory = (): string => {
    const parentList = listCtx.list.find(
      (listItem) =>
        listItem.list.findIndex((listItem) => listItem.id === item.id) !== -1
    );
    return parentList?.category || '';
  };

  const pressDotHandler = () => {
    setSlideMenuVisible(!slideMenuVisible);
    Animated.spring(slideAnim, {
      toValue: slideMenuVisible ? 0 : 100,
      useNativeDriver: false,
    }).start();
  };

  const editItemHandler = () => {
    setEditItemMode(true);
  };

  return (
    <OutsidePressHandler
      onOutsidePress={() => {
        slideMenuVisible && pressDotHandler();
      }}
      disabled={false}
    >
      <View className='flex-row items-center'>
        <Pressable onPress={pressDotHandler}>
          <View
            className='h-[25px] aspect-square rounded-full border-2 mr-3 '
            style={{
              borderColor: themeColor,
              backgroundColor: item?.complete ? themeColor : 'none',
            }}
          />
          {item?.star && (
            <View style={{ position: 'absolute', left: 4.5, top: 4 }}>
              <FontAwesome name='star' size={17} color={themeColor} />
            </View>
          )}
          {item?.complete && (
            <View style={{ position: 'absolute' }}>
              <Ionicons name='md-checkmark-sharp' size={24} color='white' />
            </View>
          )}
        </Pressable>
        {item && slideMenuVisible && (
          <Animated.View
            style={{
              marginRight: slideAnim,
              transform: [{ translateX: slideAnim }],
            }}
            className='flex-row'
          >
            <ItemDotSlideMenu themeColor={themeColor} item={item} />
          </Animated.View>
        )}
        {item && (
          <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
            <Pressable onPress={editItemHandler}>
              {editItemMode ? (
                <EditItem
                  themeColor={themeColor}
                  category={getCategory()}
                  toggleAddMode={setEditItemMode}
                  item={item}
                />
              ) : (
                <Text style={{ fontSize: 16 }}>{item?.contents}</Text>
              )}
            </Pressable>
          </Animated.View>
        )}
      </View>
    </OutsidePressHandler>
  );
}
