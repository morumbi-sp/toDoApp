import { Text, View } from 'react-native';

interface Props {
  numberOfAll: number;
  numberOfCompleted: number;
}

export default function TaskDots({ numberOfAll, numberOfCompleted }: Props) {
  const allArray = Array.from({ length: numberOfAll });
  return (
    <View>
      <View className='flex-row items-end'>
        <Text className='text-[25px] font-semibold text-white'>
          {numberOfCompleted} / {numberOfAll}
        </Text>
        <Text className='ml-2 text-[16px] mb-[2px] text-white font-semibold'>
          tasks
        </Text>
      </View>
      <View className='flex-row items-end w-full flex-wrap'>
        {allArray.map((_, index) => (
          <View
            key={index}
            className={` ${
              index < numberOfCompleted
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
