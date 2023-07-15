import { useContext } from 'react';
import { Pressable, Text, View } from 'react-native';
import Category from '@src/components/Category';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootParamList } from 'App';
import { myStyles } from '@src/lib/myStyles';
import { CategoryContext } from '@src/context/categoryContext';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <DraggableFlatList
          data={category}
          keyExtractor={(item) => item.Id}
          onDragEnd={({ data }) => {
            categoryCtx.reorderCategory(data);
          }}
          contentContainerStyle={{ paddingBottom: 200 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, drag, isActive }) => {
            return (
              <ScaleDecorator>
                <Pressable
                  onLongPress={drag}
                  disabled={isActive}
                  onPress={() => onPressHandler(item.Id)}
                  className='px-[18px]'
                >
                  <Category item={item} />
                </Pressable>
              </ScaleDecorator>
            );
          }}
        />
      </GestureHandlerRootView>
    </>
  );
}
