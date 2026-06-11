import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeGuest from '../screens/GuestFlow/WelcomeGuest';
import RSVP from '../screens/GuestFlow/RSVP';
import GuestMsg from '../screens/GuestFlow/GuestMsg';

const Stack = createStackNavigator();

const GuestStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="WelcomeGuest"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="WelcomeGuest" component={WelcomeGuest} />
      <Stack.Screen name="RSVP" component={RSVP} />
      <Stack.Screen name="GuestMsg" component={GuestMsg} />
    </Stack.Navigator>
  );
};

export default GuestStack;
