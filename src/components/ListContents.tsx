import { IItem } from '@src/lib/type';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

interface Props {
  themeColor: string;
  list: IItem[];
}

export default function ListContents({ themeColor, list }: Props) {
  return (
    <View>
      {list.map((item) => (
        <View className='flex-row mb-5 items-center'>
          <View
            className='h-[25px] aspect-square rounded-full border-2 mr-3 '
            style={{
              borderColor: themeColor,
              backgroundColor: item.complete ? themeColor : 'none',
            }}
          ></View>

          {item.star && (
            <View className='absolute left-[4.5px]'>
              <FontAwesome name='star' size={17} color={themeColor} />
            </View>
          )}
          {item.complete && (
            <View className='absolute'>
              <Ionicons name='md-checkmark-sharp' size={24} color='white' />
            </View>
          )}
          <Text className='text-[16px]'>{item.contents}</Text>
        </View>
      ))}
    </View>
  );
}
