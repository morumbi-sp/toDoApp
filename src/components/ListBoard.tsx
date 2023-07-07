import ListContents from '@src/components/ListContents';
import hexToRgb from '@src/lib/hexToRgb';
import { IList } from '@src/lib/type';
import { LinearGradient } from 'expo-linear-gradient';
import {
  FlatList,
  ScrollView,
  ScrollViewComponent,
  Text,
  View,
} from 'react-native';

interface Props {
  numberOfCompleted: number;
  numberOfAll: number;
  list: IList;
}

export default function ListBoard({
  numberOfCompleted,
  numberOfAll,
  list,
}: Props) {
  const starList = list.list.filter((item) => item.star === true);
  const incompleteList = list.list.filter(
    (item) => item.complete === false && item.star === false
  );
  const completeList = list.list.filter((item) => item.complete === true);

  return (
    <LinearGradient
      colors={[list.bgColor, `rgba(${hexToRgb(list.bgColor)}, 0.15)`]}
      start={{ x: 0.5, y: 0.03 }}
      end={{ x: 0.5, y: 0.3 }}
      className='h-full rounded-2xl shadow-md pt-7 px-5 bg-white'
    >
      <View className='ml-[3.5px]'>
        <Text className='text-[38px] font-bold text-white'>
          {list.category}
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
      <ScrollView className='pt-7 -ml-[2px]'>
        <ListContents themeColor={list.bgColor} list={starList} />
        <ListContents themeColor={list.bgColor} list={incompleteList} />
        <ListContents themeColor={list.bgColor} list={completeList} />
      </ScrollView>
    </LinearGradient>
  );
}
