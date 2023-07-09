import { IItem } from '@src/lib/type';
import { Text, View } from 'react-native';

interface Props {
  themeColor: string;
  item?: IItem;
}

export default function ItemDot({ themeColor, item }: Props) {
  return (
    <View
      className='h-[25px] aspect-square rounded-full border-2 mr-3 '
      style={{
        borderColor: themeColor,
        backgroundColor: item?.complete ? themeColor : 'none',
      }}
    ></View>
  );
}
