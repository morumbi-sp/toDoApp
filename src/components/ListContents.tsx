import { IItem } from '@src/lib/type';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import ItemDot from '@src/components/ItemDot';

interface Props {
  themeColor: string;
  list: IItem[];
}

export default function ListContents({ themeColor, list }: Props) {
  return (
    <View>
      {list.map((item) => (
        <View key={item.id} className='flex-row mb-5 items-center'>
          <ItemDot themeColor={themeColor} item={item} />
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
          <Pressable>
            <Text className='text-[16px]'>{item.contents}</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}
