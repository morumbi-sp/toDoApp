import { ListContext } from '@src/context/listContext';
import { IList } from '@src/lib/type';
import { useContext, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';

interface Props {
  toggleAddMode: (prevState: boolean) => void;
  item: IList;
}

export default function EditItem({ item, toggleAddMode }: Props) {
  const inputRef = useRef<TextInput>(null);
  const [inputValues, setInputValues] = useState(item?.contents);
  const listCtx = useContext(ListContext);
  const handleSubmit = () => {
    if (inputValues?.trim().length === 0 || inputValues === undefined) {
      toggleAddMode(false);
      listCtx.deleteList(item.id);
      return;
    } else {
      const newItem = { ...item, contents: inputValues };
      listCtx.editList(newItem, item.id);

      toggleAddMode(false);
    }
  };
  return (
    <TextInput
      autoCorrect={false}
      autoFocus
      ref={inputRef}
      onBlur={handleSubmit}
      className='text-[16px]'
      onChangeText={setInputValues}
      onSubmitEditing={handleSubmit}
      value={inputValues}
    />
  );
}
