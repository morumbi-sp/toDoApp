import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Category from '@src/components/Category';
import { bgColors } from '@src/lib/bgColors';
import hexToRgb from '@src/lib/hexToRgb';
import { RootParamList } from 'App';
import { LinearGradient } from 'expo-linear-gradient';
import { useContext, useRef, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CategoryContext } from '@src/context/categoryContext';
import uuid from 'react-native-uuid';
import { ListContext } from '@src/context/listContext';

type NProps = NativeStackScreenProps<RootParamList, 'Edit'>;

interface Props extends NProps {}

const bgColorArr = bgColors;

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * bgColorArr.length);
  return bgColorArr[randomIndex];
};

export default function Edit({ navigation, route }: Props) {
  const inputRef = useRef<TextInput>(null);
  const listCtx = useContext(ListContext);
  const categoryCtx = useContext(CategoryContext);

  const params = route.params;
  const [bgColor, setBgColor] = useState(
    params.category?.bgColor || getRandomColor()
  );
  const [inputText, setInputText] = useState(params.category?.title || '');

  const boardBgColor = `rgba(${hexToRgb(bgColor)}, 0.15)`;

  const handleSubmit = () => {
    if (inputText?.trim().length === 0 || inputText === undefined) {
      navigation.goBack();
    } else {
      const newItem = {
        Id: params?.category?.Id || String(uuid.v4()),
        title: inputText,
        bgColor,
      };

      if (params?.category?.Id) {
        categoryCtx.editCategory(newItem, params.category?.Id);
        listCtx.AllListOfCategory(params?.category?.title).map((element) => {
          const newItem = { ...element, category: inputText, bgColor };
          listCtx.editList(newItem, element.id);
          navigation.navigate('List', { categoryId: params.category!.Id });
        });
      } else {
        categoryCtx.addCategory(newItem);
      }
    }
  };

  return (
    <>
      <View className='items-center mb-4'>
        <Text className='text-xl font-semibold'>
          {params.category ? 'Edit' : 'Create'} Category
        </Text>
      </View>
      <LinearGradient
        colors={[bgColor, boardBgColor]}
        start={{ x: 0.5, y: 0.03 }}
        end={{ x: 0.5, y: 0.3 }}
        className='h-full rounded-2xl shadow-md pt-7 px-5 bg-white'
      >
        <View>
          <Text className='text-[16px] font-semibold text-gray-800'>Title</Text>
        </View>
        <View className='border-b border-gray-800'>
          <TextInput
            className='text-[38px] font-bold text-white'
            value={inputText}
            ref={inputRef}
            onChangeText={setInputText}
            underlineColorAndroid='transparent'
            autoFocus
            autoCorrect={false}
            onSubmitEditing={handleSubmit}
          />
        </View>
        <View className='mt-12'>
          <View>
            <Text className='text-[16px] font-semibold text-gray-800'>
              Color
            </Text>
          </View>
          <View className='flex-row w-full flex-wrap items-end'>
            {bgColorArr.map((element, index) => (
              <Pressable
                onPress={() => setBgColor(element)}
                key={index}
                className='w-[11%] rounded-full aspect-square justify-center items-center'
                style={{
                  backgroundColor: element,
                  marginRight:
                    index !== 5 && index !== 11 ? `${(100 - 11 * 6) / 5}%` : 0,
                  marginTop: 24,
                }}
              >
                {bgColor === element && (
                  <Ionicons name='md-checkmark-sharp' size={30} color='white' />
                )}
              </Pressable>
            ))}
          </View>
        </View>
        <View className='flex-row justify-center space-x-6 mt-10'>
          <Pressable
            className='w-[120px] h-[45px] border border-gray-800 rounded-full justify-center'
            onPress={navigation.goBack}
          >
            <Text className='text-center text-xl font-semibold text-gray-800 mb-1'>
              Cancel
            </Text>
          </Pressable>
          <Pressable
            className='w-[120px] h-[45px] bg-gray-800 rounded-full justify-center'
            onPress={handleSubmit}
          >
            <Text className='text-center text-xl font-semibold text-white mb-1'>
              {params.category ? 'Confirm' : 'Create'}
            </Text>
          </Pressable>
        </View>
      </LinearGradient>
    </>
  );
}
