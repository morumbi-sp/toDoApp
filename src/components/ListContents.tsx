import { IList } from '@src/lib/type';
import { Pressable, View } from 'react-native';
import ItemDot from '@src/components/ItemDot';

interface Props {
  list: IList[];
}

export default function ListContents({ list }: Props) {
  return (
    <View>
      {list.map((item) => (
        <View key={item.id} className='mb-5'>
          <Pressable>
            <ItemDot item={item} />
          </Pressable>
        </View>
      ))}
    </View>
  );
}
