import { ListContext } from '@src/context/listContext';
import { useContext } from 'react';
import { Text, View } from 'react-native';

interface Props {
  category: string;
}

export default function TaskDots({ category }: Props) {
  const listCtx = useContext(ListContext);
  const allList = listCtx.AllListOfCategory(category);
  const completedList = listCtx.completedListOfCategory(category);

  console.log(JSON.stringify(listCtx.lists, null, 2));
  return (
    <View>
      <View className='flex-row items-end'>
        <Text className='text-[25px] font-semibold text-white'>
          {completedList.length} / {allList.length}
        </Text>
        <Text className='ml-2 text-[16px] mb-[2px] text-white font-semibold'>
          tasks
        </Text>
      </View>
      <View className='flex-row items-end w-full flex-wrap'>
        {Array.from({ length: allList.length }).map((_, index) => (
          <View
            key={index}
            className={` ${
              index < completedList.length
                ? 'bg-white'
                : 'border-[2px] border-white'
            }  rounded-full w-[5%] aspect-square`}
            style={{ marginRight: `${(100 - 5 * 10) / 9}%`, marginTop: 10 }}
          ></View>
        ))}
      </View>
    </View>
  );
}
