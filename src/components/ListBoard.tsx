import ListContents from '@src/components/ListContents';
import hexToRgb from '@src/lib/hexToRgb';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Text, View } from 'react-native';
import { useContext, useState } from 'react';
import { Octicons } from '@expo/vector-icons';
import AddItemBtn from '@src/components/AddItemBtn';
import InputItem from '@src/components/InputItem';
import { ListContext } from '@src/context/listContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CategoryContext } from '@src/context/categoryContext';

interface Props {
  categoryId: string;
}

export default function ListBoard({ categoryId }: Props) {
  const [showCompleted, setShowCompleted] = useState(true);
  const [addItemMode, setAddItemMode] = useState(false);
  const categoryCtx = useContext(CategoryContext);

  const category = categoryCtx.categories.find(
    (element) => element.Id === categoryId
  ) || { Id: 'none', title: 'none', bgColor: '#FFC048' };

  const boardBgColor = category && `rgba(${hexToRgb(category.bgColor)}, 0.15)`;

  const listCtx = useContext(ListContext);

  const thisList = listCtx.AllListOfCategory(category.title);
  const starList = listCtx.starListOfCategory(category.title);
  const completeList = listCtx.completedListOfCategory(category.title);

  const incompleteList = thisList.filter(
    (item) => item.complete === false && item.star === false
  );

  const numberOfCompleted = completeList.length;
  const numberOfAll = thisList.length;

  const toggleShowCompleted = () => {
    setShowCompleted((prev) => !prev);
  };

  const addItemHandler = () => {
    setAddItemMode(true);
  };

  console.log(JSON.stringify(listCtx.lists, null, 2));

  return (
    <LinearGradient
      colors={[category.bgColor, boardBgColor]}
      start={{ x: 0.5, y: 0.03 }}
      end={{ x: 0.5, y: 0.3 }}
      className='h-full rounded-2xl shadow-md pt-5 px-5 bg-white'
    >
      <View className='ml-[4px] mb-5'>
        <Text className='text-[38px] font-bold text-white'>
          {category.title}
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
        <ListContents list={starList} />
        <ListContents list={incompleteList} />
        {addItemMode && (
          <InputItem category={category} toggleAddMode={setAddItemMode} />
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
        {showCompleted && <ListContents list={completeList} />}
      </KeyboardAwareScrollView>
      {!addItemMode && (
        <Pressable
          className='absolute bottom-6 right-3'
          onPress={addItemHandler}
        >
          <AddItemBtn themeColor={category.bgColor} />
        </Pressable>
      )}
    </LinearGradient>
  );
}
