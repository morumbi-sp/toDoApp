import { useContext } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import Category from '@src/components/Category';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootParamList } from 'App';
import { myStyles } from '@src/lib/myStyles';
import { CategoryContext } from '@src/context/categoryContext';

type NProps = NativeStackScreenProps<RootParamList, 'Home'>;

interface Props extends NProps {}

export default function Home({ navigation }: Props) {
  const categoryCtx = useContext(CategoryContext);
  const category = categoryCtx.categories;

  const onPressHandler = (id: string) => {
    navigation.navigate('List', { categoryId: id });
  };

  const addCategoryHandler = () => {
    navigation.navigate('Edit', {});
  };

  console.log(JSON.stringify(category, null, 2));

  return (
    <>
      <View className={myStyles.topBarStyle}>
        <Text className='text-[22px] font-bold text-gray-800'>
          All Categories
        </Text>
        <Pressable onPress={addCategoryHandler}>
          <Text className='text-blue-600 font-semibold text-lg'>ADD</Text>
        </Pressable>
      </View>

      <FlatList
        data={category}
        keyExtractor={(element) => element.Id}
        contentContainerStyle={{ paddingBottom: 200 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <Pressable onPress={() => onPressHandler(item.Id)}>
              <Category item={item} />
            </Pressable>
          );
        }}
      />
    </>
  );
}
