import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoadingScreen} from './loading.tsx';
import * as React from 'react';
import {MainScreen} from './main.tsx';
import {Details} from './details.tsx';
import {Book} from '../types/entity.ts';

export type RootStackParamList = {
  Loading: undefined;
  Home: undefined;
  Details: {id: number};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Loading" component={LoadingScreen} />
      <Stack.Screen name="Home" component={MainScreen} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}

export default RootStack;
