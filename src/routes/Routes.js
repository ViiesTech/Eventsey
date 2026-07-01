import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import GuestStack from './GuestStack';
import MainStack from './MainStack';
import { GuestProvider } from './GuestContext';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <GuestProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="MainStack"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="AuthStack" component={AuthStack} />
          <Stack.Screen name="MainStack" component={MainStack} />
          <Stack.Screen name="GuestStack" component={GuestStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </GuestProvider>
  );
};

export default Routes;
