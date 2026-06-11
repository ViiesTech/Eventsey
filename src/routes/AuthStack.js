import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  SplashScreen,
  OnboardingScreen,
} from '../screens/AuthScreens/CommonAuthScreens/Index';
import UserLoginScreen from '../screens/AuthScreens/UserAuth/LoginScreen';
import VendorLoginScreen from '../screens/AuthScreens/VendorAuth/LoginScreen';

const Stack = createStackNavigator();

const UserAuth = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={UserLoginScreen} />
    </Stack.Navigator>
  );
};

const VendorAuth = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={VendorLoginScreen} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="UserAuth"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="UserAuth" component={UserAuth} />
      <Stack.Screen name="VendorAuth" component={VendorAuth} />
    </Stack.Navigator>
  );
};

export default AuthStack;
