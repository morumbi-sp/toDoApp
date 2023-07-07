import TaskDots from '@src/components/TaskDots';
import { IList } from '@src/lib/type';
import { Pressable, Text, View } from 'react-native';

interface Props {
  item: IList;
  onPress: (
    item: IList,
    numberOfAll: number,
    numberOfCompleted: number
  ) => void;
}

export default function Category({ item, onPress }: Props) {
  const numberOfAll = item.list.length;
  const numberOfCompleted = item.list.filter(
    (item) => item.complete === true
  ).length;
  return (
    <Pressable onPress={() => onPress(item, numberOfAll, numberOfCompleted)}>
      <View
        className='h-[200px] mb-5 rounded-xl shadow-sm shadow-gray-400 p-5 justify-between'
        style={{
          backgroundColor: item.bgColor,
        }}
      >
        <Text className='text-[38px] font-semibold text-white '>
          {item.category}
        </Text>
        <TaskDots
          numberOfAll={numberOfAll}
          numberOfCompleted={numberOfCompleted}
        />
      </View>
    </Pressable>
  );
}
