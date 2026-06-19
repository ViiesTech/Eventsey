import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Onboarding from '../screens/AuthScreens/CommonAuthScreens/Onboarding';
import Splash from '../screens/AuthScreens/CommonAuthScreens/Splash';
import UserLogin from '../screens/AuthScreens/UserAuth/UserLogin';
import VendorLogin from '../screens/AuthScreens/VendorAuth/VendorLogin';
import Welcome from '../screens/AuthScreens/CommonAuthScreens/Welcome';
import VendorSignUp from '../screens/AuthScreens/VendorAuth/VendorSignup';
import VendorOTP from '../screens/AuthScreens/VendorAuth/VendorOTP';
import SuccessOTP from '../screens/AuthScreens/VendorAuth/SuccessOTP';
import ForgotPassword from '../screens/AuthScreens/CommonAuthScreens/ForgotPassword';
import VerifyOTP from '../screens/AuthScreens/CommonAuthScreens/VerifyOTP';
import PasswordResetSuccess from '../screens/AuthScreens/CommonAuthScreens/PasswordResetSuccess';
import NewPassword from '../screens/AuthScreens/CommonAuthScreens/NewPassword';

const Stack = createStackNavigator();

const UserAuth = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="UserLogin" component={UserLogin} />
    </Stack.Navigator>
  );
};

const VendorAuth = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="VendorLogin" component={VendorLogin} />
      <Stack.Screen name="VendorSignUp" component={VendorSignUp} />
      <Stack.Screen name="VendorOTP" component={VendorOTP} />
      <Stack.Screen name="SuccessOTP" component={SuccessOTP} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
      <Stack.Screen
        name="PasswordResetSuccess"
        component={PasswordResetSuccess}
      />
      <Stack.Screen name="NewPassword" component={NewPassword} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserAuth" component={UserAuth} />
      <Stack.Screen name="VendorAuth" component={VendorAuth} />
    </Stack.Navigator>
  );
};

export default AuthStack;
