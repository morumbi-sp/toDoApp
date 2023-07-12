import { dummyCategory, dummyList } from '@src/lib/dummyList';
import { useContext, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Category from '@src/components/Category';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootParamList } from 'App';
import { ICategory, IList } from '@src/lib/type';
import { myStyles } from '@src/lib/myStyles';

type NProps = NativeStackScreenProps<RootParamList, 'Home'>;

interface Props extends NProps {}

export default function Home({ navigation }: Props) {
  const [category, setCategory] = useState(dummyCategory);

  const onPressHandler = (item: ICategory) => {
    navigation.navigate('List', { category: item });
  };

  const addCategoryHandler = () => {
    navigation.navigate('Edit', {});
  };

  return (
    <>
      <View className={myStyles.topBarStyle}>
        <Text className='text-[26px] font-bold text-gray-800'>
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
          return <Category item={item} onPress={() => onPressHandler(item)} />;
        }}
      />
    </>
  );
}
