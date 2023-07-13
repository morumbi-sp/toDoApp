import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '@src/screens/Home';
import List from '@src/screens/List';
import Edit from '@src/screens/Edit';
import * as Device from 'expo-device';
import ListContextProvider from '@src/context/listContext';
import { EventProvider } from 'react-native-outside-press';
import { ICategory } from '@src/lib/type';
import CategoryContextProvider from '@src/context/categoryContext';

export type RootParamList = {
  Home: undefined;
  List: { categoryId: string };
  Edit: { category?: ICategory };
};

const Stack = createNativeStackNavigator<RootParamList>();

export default function App() {
  return (
    <EventProvider style={{ flex: 1 }}>
      <ListContextProvider>
        <CategoryContextProvider>
          <StatusBar style='auto' />
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                contentStyle: {
                  paddingHorizontal: 10,
                  paddingTop: Device.osName === 'iOS' ? 70 : 50,
                  paddingBottom: 24,
                },
              }}
            >
              <Stack.Screen name='Home' component={Home} />
              <Stack.Screen name='List' component={List} />
              <Stack.Screen name='Edit' component={Edit} />
            </Stack.Navigator>
          </NavigationContainer>
        </CategoryContextProvider>
      </ListContextProvider>
    </EventProvider>
  );
}
