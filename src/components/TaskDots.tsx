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

  return (
    <View>
      <View className='flex-row items-end'>
        <Text className='text-[22px] font-semibold text-white'>
          {completedList.length || 0} / {allList.length || 0}
        </Text>
        <Text className='ml-2 text-[16px] mb-[2px] text-white font-semibold'>
          tasks
        </Text>
      </View>
      {allList.length > 100 ? (
        <View>
          <Text className='text-white font-semibold'>
            There are more than 100 items! Clean up items in completed list!
          </Text>
        </View>
      ) : (
        <View className='flex-row items-end w-full flex-wrap justify-start'>
          {Array.from({ length: allList.length }).map((_, index) => {
            console.log(allList.length);
            if (allList.length <= 30) {
              return (
                <View
                  key={index}
                  className={` ${
                    index < completedList.length
                      ? 'bg-white'
                      : 'border-[2px] border-white'
                  }  rounded-full w-[5%] aspect-square`}
                  style={{
                    marginRight:
                      index % 10 !== 9 ? `${(100 - 5 * 10) / 9.00001}%` : 0,
                    marginTop: 10,
                  }}
                />
              );
            } else if (allList.length <= 50) {
              return (
                <View
                  key={index}
                  className={` ${
                    index < completedList.length
                      ? 'bg-white'
                      : 'border-[2px] border-white'
                  }  rounded-full w-[3.5%] aspect-square`}
                  style={{
                    marginRight:
                      index % 10 !== 18 ? `${(100 - 3.5 * 18) / 18.00001}%` : 0,
                    marginTop: 7,
                  }}
                />
              );
            }
          })}
        </View>
      )}
    </View>
  );
}
