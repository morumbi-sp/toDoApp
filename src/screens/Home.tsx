import { dummyList } from '@src/lib/dummyList';
import { useContext, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Category from '@src/components/Category';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootParamList } from 'App';
import { IList } from '@src/lib/type';
import { myStyles } from '@src/lib/myStyles';
import { ListContext } from '@src/context/listContext';

type NProps = NativeStackScreenProps<RootParamList, 'Home'>;

interface Props extends NProps {}

export default function Home({ navigation }: Props) {
  const listCtx = useContext(ListContext);

  const onPressHandler = (
    item: IList,
    numberOfAll: number,
    numberOfCompleted: number
  ) => {
    navigation.navigate('List', {
      category: item.category,
      numberOfAll,
      numberOfCompleted,
    });
  };

  return (
    <>
      <View className={myStyles.topBarStyle}>
        <Text className='text-[28px] font-bold text-gray-800 ml-4'>
          All Categories
        </Text>
        <Pressable>
          <Ionicons name='add-circle-outline' size={33} color='gray' />
        </Pressable>
      </View>

      <FlatList
        data={listCtx.list}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 200 }}
        renderItem={({ item }) => {
          return <Category item={item} onPress={onPressHandler} />;
        }}
      />
    </>
  );
}
