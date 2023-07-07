import { Pressable, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootParamList } from 'App';
import { Ionicons } from '@expo/vector-icons';
import { myStyles } from '@src/lib/myStyles';
import { LinearGradient } from 'expo-linear-gradient';
import ListBoard from '@src/components/ListBoard';

type NProps = NativeStackScreenProps<RootParamList, 'List'>;

interface Props extends NProps {}

export default function List({ navigation, route }: Props) {
  const { list, numberOfAll, numberOfCompleted } = route.params;

  return (
    <>
      <View className={myStyles.topBarStyle}>
        <Pressable onPress={navigation.goBack}>
          <Ionicons name='arrow-back' size={28} color='black' />
        </Pressable>
        <Pressable>
          <Text className='text-[16px] font-bold'>EDIT</Text>
        </Pressable>
      </View>
      <ListBoard
        list={list}
        numberOfAll={numberOfAll}
        numberOfCompleted={numberOfCompleted}
      />
    </>
  );
}
