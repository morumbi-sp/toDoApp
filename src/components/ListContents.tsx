import { IItem } from '@src/lib/type';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import ItemDot from '@src/components/ItemDot';
import { useState } from 'react';

interface Props {
  themeColor: string;
  list: IItem[];
}

export default function ListContents({ themeColor, list }: Props) {
  return (
    <View>
      {list.map((item) => (
        <View key={item.id}>
          <Pressable>
            <ItemDot themeColor={themeColor} item={item} />
          </Pressable>
        </View>
      ))}
    </View>
  );
}
