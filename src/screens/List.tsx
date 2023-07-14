import { Pressable, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootParamList } from 'App';
import { Ionicons } from '@expo/vector-icons';
import { myStyles } from '@src/lib/myStyles';
import ListBoard from '@src/components/ListBoard';
import { useContext } from 'react';
import { CategoryContext } from '@src/context/categoryContext';

type NProps = NativeStackScreenProps<RootParamList, 'List'>;

interface Props extends NProps {}

export default function List({ navigation, route }: Props) {
  const { categoryId } = route.params;
  const categoryCtx = useContext(CategoryContext);

  const category = categoryCtx.categories.find(
    (element) => element.Id === categoryId
  );

  const editCategoryHandler = () => {
    navigation.navigate('Edit', { category });
  };

  return (
    <View className='mb-[100px]'>
      <View className={myStyles.topBarStyle}>
        <Pressable
          onPress={navigation.goBack}
          className='flex-row items-center'
        >
          <Ionicons name='arrow-back' size={28} color='black' />
          <Text className='font-semibold text-xl ml-2'>Home</Text>
        </Pressable>
        <Pressable onPress={editCategoryHandler}>
          <Text className='text-blue-600 font-semibold text-lg'>EDIT</Text>
        </Pressable>
      </View>
      <ListBoard categoryId={categoryId} />
    </View>
  );
}
