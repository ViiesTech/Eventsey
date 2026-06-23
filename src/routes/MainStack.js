import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserBottomTab from './UserBottomTab';
import VendorBottomTab from './VendorBottomTab';
import JobDetails from '../screens/VendorFlow/JobDetails';
import VendorChat from '../screens/VendorFlow/VendorChat';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="VendorFlow"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="UserFlow" component={UserBottomTab} />
      <Stack.Screen name="VendorFlow" component={VendorBottomTab} />
      <Stack.Screen name="JobDetails" component={JobDetails} />
      <Stack.Screen name="VendorChat" component={VendorChat} />
    </Stack.Navigator>
  );
};

export default MainStack;
