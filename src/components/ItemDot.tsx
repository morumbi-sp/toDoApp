import { ICategory, IList } from '@src/lib/type';
import { Pressable, Text, View, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import ItemDotSlideMenu from '@src/components/ItemDotSlideMenu';
import OutsidePressHandler from 'react-native-outside-press';
import EditItem from '@src/components/EditItem';

interface Props {
  item?: IList;
  category?: ICategory;
}

export default function ItemDot({ item, category }: Props) {
  const [slideMenuVisible, setSlideMenuVisible] = useState(false);
  const [editItemMode, setEditItemMode] = useState(false);
  const slideAnim = useState(new Animated.Value(0))[0];

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
              borderColor: item?.bgColor || category?.bgColor,
              backgroundColor: item?.complete ? item?.bgColor : 'none',
            }}
          />
          {item?.star && (
            <View style={{ position: 'absolute', left: 4.5, top: 4 }}>
              <FontAwesome name='star' size={17} color={item?.bgColor} />
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
            <ItemDotSlideMenu item={item} />
          </Animated.View>
        )}
        {item && (
          <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
            <Pressable onPress={editItemHandler} hitSlop={{ right: 70 }}>
              {editItemMode ? (
                <EditItem toggleAddMode={setEditItemMode} item={item} />
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
