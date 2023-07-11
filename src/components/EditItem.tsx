import ItemDot from '@src/components/ItemDot';
import { ListContext } from '@src/context/listContext';
import { IItem } from '@src/lib/type';
import { useContext, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';

interface Props {
  themeColor: string;
  category: string;
  toggleAddMode: (prevState: boolean) => void;
  item: IItem;
}

export default function EditItem({
  themeColor,
  category,
  item,
  toggleAddMode,
}: Props) {
  const inputRef = useRef<TextInput>(null);
  const [inputValues, setInputValues] = useState(item?.contents);
  const listCtx = useContext(ListContext);
  const handleSubmit = () => {
    if (inputValues?.trim().length === 0 || inputValues === undefined) {
      toggleAddMode(false);
      listCtx.deleteList(item.id, category);
      return;
    } else {
      const newItem = {
        id: item.id,
        contents: inputValues,
        star: item.star,
        complete: item.complete,
      };
      listCtx.editList(newItem, item.id, category);

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
