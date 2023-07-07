import { IItem } from '@src/lib/type';
import { Text, View } from 'react-native';

interface Props {
  themeColor: string;
  list: IItem[];
}

export default function ListContents({ themeColor, list }: Props) {
  return (
    <View>
      {list.map((item) => (
        <View className='flex-row mb-3 items-center'>
          <View
            className='h-[25px] aspect-square rounded-full border-2 mr-3'
            style={{ borderColor: themeColor }}
          />
          <Text className='text-[15px]'>{item.contents}</Text>
        </View>
      ))}
    </View>
  );
}
