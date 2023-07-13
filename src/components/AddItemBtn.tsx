import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface Props {
  themeColor: string;
}

export default function AddItemBtn({ themeColor }: Props) {
  return (
    <View
      className='h-[55px] aspect-square rounded-full justify-center items-center'
      style={{ backgroundColor: themeColor }}
    >
      <MaterialIcons name='add' size={45} color='white' />
    </View>
  );
}
