import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '@src/screens/Home';
import List from '@src/screens/List';
import Edit from '@src/screens/Edit';
import { IList } from '@src/lib/type';
import * as Device from 'expo-device';
import ListContextProvider from '@src/context/listContext';

export type RootParamList = {
  Home: undefined;
  List: { category: string; numberOfAll: number; numberOfCompleted: number };
  Edit: undefined;
};

const Stack = createNativeStackNavigator<RootParamList>();

export default function App() {
  return (
    <ListContextProvider>
      <StatusBar style='auto' />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: {
              paddingHorizontal: 12,
              paddingVertical: Device.osName === 'iOS' ? 90 : 70,
            },
          }}
        >
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='List' component={List} />
          <Stack.Screen name='Edit' component={Edit} />
        </Stack.Navigator>
      </NavigationContainer>
    </ListContextProvider>
  );
}
