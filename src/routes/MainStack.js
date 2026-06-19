import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const UserFlow = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Splash" component={Splash} /> */}
    </Stack.Navigator>
  );
};
const VendorFlow = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Splash" component={Splash} /> */}
    </Stack.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="UserFlow"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="UserFlow" component={UserFlow} />
      <Stack.Screen name="VendorFlow" component={VendorFlow} />
    </Stack.Navigator>
  );
};

export default MainStack;
