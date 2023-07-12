import TaskDots from '@src/components/TaskDots';
import { ICategory, IList } from '@src/lib/type';
import { Pressable, Text, View } from 'react-native';

interface Props {
  item: ICategory;
  onPress: (item: ICategory) => void;
}

export default function Category({ item, onPress }: Props) {
  return (
    <Pressable onPress={() => onPress(item)}>
      <View
        className='h-[200px] mb-5 rounded-xl shadow-sm shadow-gray-400 p-5 justify-between'
        style={{
          backgroundColor: item.bgColor,
        }}
      >
        <Text className='text-[38px] font-semibold text-white '>
          {item.title}
        </Text>
        <TaskDots category={item.title} />
      </View>
    </Pressable>
  );
}
