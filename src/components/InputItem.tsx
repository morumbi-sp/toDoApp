import ItemDot from '@src/components/ItemDot';
import { ListContext } from '@src/context/listContext';
import { IItem } from '@src/lib/type';
import { SetStateAction, useContext, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from 'react-native';
import uuid from 'react-native-uuid';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface Props {
  themeColor: string;
  category: string;
  toggleAddMode: (prevState: boolean) => void;
  item?: IItem;
}

export default function InputItem({
  themeColor,
  category,
  item,
  toggleAddMode,
}: Props) {
  const inputRef = useRef<TextInput>(null);
  const [inputValues, setInputValues] = useState(item?.contents);
  const listCtx = useContext(ListContext);
  const handleSubmit = () => {
    console.log(inputValues, inputValues?.trim().length);
    if (inputValues?.trim().length === 0 || inputValues === undefined) {
      toggleAddMode(false);
      return;
    } else {
      const newItem = {
        id: item?.id || String(uuid.v4()),
        contents: inputValues!,
        star: item?.star || false,
        complete: false,
      };
      listCtx.addList(newItem, category);
      toggleAddMode(false);
    }
  };
  return (
    <View className='flex-row items-center mb-4'>
      <ItemDot themeColor={themeColor} />

      <TextInput
        autoCorrect={false}
        autoFocus
        ref={inputRef}
        onBlur={handleSubmit}
        className='text-[16px]'
        onChangeText={setInputValues}
        onSubmitEditing={handleSubmit}
      />
    </View>
  );
}
