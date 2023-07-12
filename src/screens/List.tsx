import { Pressable, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootParamList } from 'App';
import { Ionicons } from '@expo/vector-icons';
import { myStyles } from '@src/lib/myStyles';
import ListBoard from '@src/components/ListBoard';

type NProps = NativeStackScreenProps<RootParamList, 'List'>;

interface Props extends NProps {}

export default function List({ navigation, route }: Props) {
  const { category } = route.params;
  const editCategoryHandler = () => {
    navigation.navigate('Edit', { category });
  };
  return (
    <>
      <View className={myStyles.topBarStyle}>
        <Pressable onPress={navigation.goBack}>
          <Ionicons name='arrow-back' size={28} color='black' />
        </Pressable>
        <Pressable onPress={editCategoryHandler}>
          <Text className='text-blue-600 font-semibold text-lg'>EDIT</Text>
        </Pressable>
      </View>
      <ListBoard category={category} />
    </>
  );
}
