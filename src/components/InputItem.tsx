import ItemDot from '@src/components/ItemDot';
import { ListContext } from '@src/context/listContext';
import { ICategory } from '@src/lib/type';
import { useContext, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import uuid from 'react-native-uuid';

interface Props {
  category: ICategory;
  toggleAddMode: (prevState: boolean) => void;
}

export default function InputItem({ category, toggleAddMode }: Props) {
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
        category: category.title,
        bgColor: category.bgColor,
      };
      listCtx.addList(newItem);
      toggleAddMode(false);
    }
  };
  return (
    <View className='flex-row items-center mb-4'>
      <ItemDot category={category} />
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
