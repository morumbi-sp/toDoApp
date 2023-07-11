import { IItem } from '@src/lib/type';
import { useEffect, useRef } from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface Props {
  modalVisible: boolean;
  setModalVisible: (prevState: boolean) => void;
  item: IItem;
}

const { width, height } = Dimensions.get('window');

export default function EditModal({
  modalVisible,
  setModalVisible,
  item,
}: Props) {
  const inputRef = useRef<TextInput>(null);

  return (
    <View>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          className='justify-center items-center '
          style={{ height: height }}
        >
          <View className=' bg-white w-[85%] h-[30%] rounded-xl mb-[100px]'>
            <View>
              <Text>Edit ToDo</Text>
            </View>
            <TextInput
              autoCorrect={false}
              ref={inputRef}
              className='text-[16px]'
              //   onChangeText={setInputValues}
              //   onSubmitEditing={handleSubmit}
              //   defaultValue={item.contents}
            />
            <Pressable>
              <Text>Edit</Text>
            </Pressable>
            <Pressable>
              <Text>Delete</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
