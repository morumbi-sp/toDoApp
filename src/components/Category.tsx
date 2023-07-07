import TaskDots from '@src/components/TaskDots';
import { IList } from '@src/lib/type';
import { Text, View } from 'react-native';

interface Props {
  item: IList;
}

export default function Category({ item }: Props) {
  const numberOfAll = item.list.length;
  const numberOfCompleted = item.list.filter(
    (item) => item.complete === true
  ).length;
  return (
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
  );
}
