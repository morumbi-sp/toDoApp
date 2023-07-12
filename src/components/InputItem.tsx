import ItemDot from '@src/components/ItemDot';
import { ListContext } from '@src/context/listContext';
import { useContext, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import uuid from 'react-native-uuid';

interface Props {
  themeColor: string;
  category: string;
  toggleAddMode: (prevState: boolean) => void;
}

export default function InputItem({
  themeColor,
  category,
  toggleAddMode,
}: Props) {
  const inputRef = useRef<TextInput>(null);
  const [inputValues, setInputValues] = useState('');
  const listCtx = useContext(ListContext);
  const handleSubmit = () => {
    if (inputValues?.trim().length === 0 || inputValues === undefined) {
      toggleAddMode(false);
      return;
    } else {
      const newItem = {
        id: String(uuid.v4()),
        contents: inputValues,
        star: false,
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
