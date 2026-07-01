import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GuestBottomTab from './GuestBottomTab';
import GuestChat from '../screens/GuestFlow/GuestChat';

const Stack = createStackNavigator();

const GuestStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GuestTabs" component={GuestBottomTab} />
      <Stack.Screen name="GuestChat" component={GuestChat} />
    </Stack.Navigator>
  );
};

export default GuestStack;
