import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '@src/screens/Home';
import List from '@src/screens/List';
import Edit from '@src/screens/Edit';

export type RootParamList = {
  Home: undefined;
  List: undefined;
  Edit: undefined;
};

const Stack = createNativeStackNavigator<RootParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style='auto' />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='List' component={List} />
        <Stack.Screen name='Edit' component={Edit} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
