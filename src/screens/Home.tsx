import { dummyList } from '@src/lib/dummyList';
import { useState } from 'react';
import { FlatList, Pressable, SafeAreaView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Category from '@src/components/Category';

export default function Home() {
  const [list, setList] = useState(dummyList);

  return (
    <View className='flex-1 px-5'>
      <View className='mt-14 mb-6 flex-row justify-between items-center'>
        <Text className='text-[28px] font-bold text-gray-800 ml-4'>
          All Categories
        </Text>
        <Pressable>
          <Ionicons name='add-circle-outline' size={33} color='gray' />
        </Pressable>
      </View>

      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 200 }}
        renderItem={({ item }) => {
          return <Category item={item} />;
        }}
      />
    </View>
  );
}
