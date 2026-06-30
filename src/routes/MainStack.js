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
import VendorDetails from '../screens/UserFlow/VendorDetails';
import UserChat from '../screens/UserFlow/UserChat';
import HiredVendors from '../screens/UserFlow/HiredVendors';
import PaymentHistory from '../screens/UserFlow/PaymentHistory';
import UserEditProfile from '../screens/UserFlow/UserEditProfile';
import HelpAndSupport from '../screens/UserFlow/HelpAndSupport';
import TermsOfService from '../screens/UserFlow/TermsOfService';
import PrivacyPolicy from '../screens/UserFlow/PrivacyPolicy';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="UserFlow"
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
      <Stack.Screen name="VendorDetails" component={VendorDetails} />
      <Stack.Screen name="UserChat" component={UserChat} />
      <Stack.Screen name="HiredVendors" component={HiredVendors} />
      <Stack.Screen name="PaymentHistory" component={PaymentHistory} />
      <Stack.Screen name="UserEditProfile" component={UserEditProfile} />
      <Stack.Screen name="HelpAndSupport" component={HelpAndSupport} />
      <Stack.Screen name="TermsOfService" component={TermsOfService} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    </Stack.Navigator>
  );
};

export default MainStack;
