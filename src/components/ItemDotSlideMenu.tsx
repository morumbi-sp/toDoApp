import { Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function ItemDotSlideMenu({ themeColor, item }) {
  return (
    <View className='flex-row'>
      <View className='mr-[15px]'>
        <View
          className='h-[33px] aspect-square rounded-full border-2 mr-3 '
          style={{
            borderColor: themeColor,
            backgroundColor: item?.complete ? 'none' : themeColor,
          }}
        />
        {!item?.complete && (
          <View
            style={{ position: 'absolute' }}
            className='left-[2px] top-[1px]'
          >
            <Ionicons name='md-checkmark-sharp' size={27} color='white' />
          </View>
        )}
      </View>

      <View className='mr-[15px]'>
        <View
          className='h-[32px] aspect-square rounded-full border-2 mr-3 '
          style={{
            borderColor: themeColor,
          }}
        />
        <View style={{ position: 'absolute', left: 5, top: 4 }}>
          {item?.star ? (
            <FontAwesome name='star-o' size={24} color={themeColor} />
          ) : (
            <FontAwesome name='star' size={24} color={themeColor} />
          )}
        </View>
      </View>

      <View>
        <View
          className='h-[32px] aspect-square rounded-full border-2 mr-3 '
          style={{
            borderColor: themeColor,
            backgroundColor: themeColor,
          }}
        />
        <View style={{ position: 'absolute', left: 4, top: 3 }}>
          <Ionicons name='trash' size={24} color='white' />
        </View>
      </View>
    </View>
  );
}
