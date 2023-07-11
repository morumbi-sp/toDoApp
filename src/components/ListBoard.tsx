import ListContents from '@src/components/ListContents';
import hexToRgb from '@src/lib/hexToRgb';
import { LinearGradient } from 'expo-linear-gradient';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useContext, useState } from 'react';
import { Octicons } from '@expo/vector-icons';
import AddItemBtn from '@src/components/AddItemBtn';
import InputItem from '@src/components/InputItem';
import { ListContext } from '@src/context/listContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface Props {
  category: string;
}

export default function ListBoard({ category }: Props) {
  const [showCompleted, setShowCompleted] = useState(true);
  const [addItemMode, setAddItemMode] = useState(false);
  const listCtx = useContext(ListContext);
  const thisList = listCtx.list.filter((item) => item.category === category)[0];
  const boardBgColor = `rgba(${hexToRgb(thisList.bgColor)}, 0.15)`;

  const starList = thisList.list.filter((item) => item.star === true);
  const incompleteList = thisList.list.filter(
    (item) => item.complete === false && item.star === false
  );
  const completeList = thisList.list.filter((item) => item.complete === true);

  const numberOfCompleted = completeList.length;
  const numberOfAll =
    numberOfCompleted + incompleteList.length + starList.length;

  const toggleShowCompleted = () => {
    setShowCompleted((prev) => !prev);
  };

  const addItemHandler = () => {
    setAddItemMode(true);
  };

  const getCategory = (): string => {
    const parentList = listCtx.list.find(
      (listItem) =>
        listItem.list.findIndex((listItem) => listItem.id === item.id) !== -1
    );
    return parentList?.category || '';
  };

  return (
    <LinearGradient
      colors={[thisList.bgColor, boardBgColor]}
      start={{ x: 0.5, y: 0.03 }}
      end={{ x: 0.5, y: 0.3 }}
      className='h-full rounded-2xl shadow-md pt-7 px-5 bg-white'
    >
      <View className='ml-[4px] mb-5'>
        <Text className='text-[38px] font-bold text-white'>
          {thisList.category}
        </Text>
        <View className='mt-2.5 flex-row'>
          <View className='h-[50px] border-2 border-white w-[14px] rounded-full justify-end'>
            <View
              className='w-[10px] bg-white rounded-full'
              style={{
                height: `${(numberOfCompleted / numberOfAll) * 100}%`,
              }}
            />
          </View>
          <View className='ml-3'>
            <Text className='text-[25px] font-bold text-white'>
              {numberOfCompleted}/{numberOfAll}
            </Text>
            <Text className='text-[15px] text-white'>tasks</Text>
          </View>
        </View>
      </View>

      <KeyboardAwareScrollView
        className='pt-3 -ml-[2px] mb-3'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 200 }}
      >
        <ListContents themeColor={thisList.bgColor} list={starList} />
        <ListContents themeColor={thisList.bgColor} list={incompleteList} />
        {addItemMode && (
          <InputItem
            themeColor={thisList.bgColor}
            category={thisList.category}
            toggleAddMode={setAddItemMode}
          />
        )}

        <View className='mb-3 mt-1 flex-row justify-between mx-1 items-center'>
          <Text className='text-[12px] text-gray-700'>
            COMPLETED ({numberOfCompleted})
          </Text>
          <Pressable onPress={toggleShowCompleted} className='mr-5'>
            {showCompleted ? (
              <Octicons name='chevron-down' size={22} color='gray' />
            ) : (
              <Octicons name='chevron-left' size={22} color='gray' />
            )}
          </Pressable>
        </View>
        {showCompleted && (
          <ListContents themeColor={thisList.bgColor} list={completeList} />
        )}
      </KeyboardAwareScrollView>
      {!addItemMode && (
        <Pressable
          className='absolute bottom-6 right-3'
          onPress={addItemHandler}
        >
          <AddItemBtn themeColor={thisList.bgColor} />
        </Pressable>
      )}
    </LinearGradient>
  );
}
