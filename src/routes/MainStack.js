import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserBottomTab from './UserBottomTab';
import VendorBottomTab from './VendorBottomTab';
import JobDetails from '../screens/VendorFlow/JobDetails';
import VendorChat from '../screens/VendorFlow/VendorChat';
import AddService from '../screens/VendorFlow/AddService';
import ServiceDetails from '../screens/VendorFlow/ServiceDetails';
import VendorEditProfile from '../screens/VendorFlow/VendorEditProfile';
import Premium from '../screens/VendorFlow/Premium';
import MyEarnings from '../screens/VendorFlow/MyEarnings';

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
      <Stack.Screen name="AddService" component={AddService} />
      <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
      <Stack.Screen name="VendorEditProfile" component={VendorEditProfile} />
      <Stack.Screen name="Premium" component={Premium} />
      <Stack.Screen name="MyEarnings" component={MyEarnings} />
    </Stack.Navigator>
  );
};

export default MainStack;
