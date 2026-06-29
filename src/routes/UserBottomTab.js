import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, StyleSheet } from 'react-native';
import SVGXml from '../components/SvgXml';
import { AppIcons } from '../assets/Icons/Index';
import { AppColors } from '../utils/AppColors';
import { responsiveFontSize } from '../utils/Responsive_Dimensions';

// Screens
import UserHome from '../screens/UserFlow/Home';
import UserTasks from '../screens/UserFlow/Tasks';
import UserVendors from '../screens/UserFlow/Vendors';
import UserGuests from '../screens/UserFlow/Guests';
import UserProfile from '../screens/UserFlow/Profile';

const Tab = createBottomTabNavigator();

const UserBottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: AppColors.primary,
        tabBarInactiveTintColor: AppColors.darkGray,
        tabBarLabelStyle: {
          fontSize: responsiveFontSize(1.5),
          fontWeight: '600',
          marginBottom: Platform.OS === 'ios' ? 0 : 8,
        },
        tabBarStyle: {
          height: 75,
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? 24 : 16,
          backgroundColor: AppColors.white,
          elevation: 0,
          marginHorizontal: 16,
          borderTopWidth: 0,
          paddingTop: 10,
        },
        tabBarIcon: ({ color }) => {
          let iconXml;
          switch (route.name) {
            case 'Home':
              iconXml = AppIcons.home(color);
              break;
            case 'Tasks':
              iconXml = AppIcons.tasks(color);
              break;
            case 'Vendors':
              iconXml = AppIcons.vendors(color);
              break;
            case 'Guests':
              iconXml = AppIcons.guests(color);
              break;
            case 'Profile':
              iconXml = AppIcons.gear(color);
              break;
            default:
              iconXml = AppIcons.home(color);
          }
          return <SVGXml icon={iconXml} width={24} height={24} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={UserHome} />
      <Tab.Screen name="Tasks" component={UserTasks} />
      <Tab.Screen name="Vendors" component={UserVendors} />
      <Tab.Screen name="Guests" component={UserGuests} />
      <Tab.Screen name="Profile" component={UserProfile} />
    </Tab.Navigator>
  );
};

export default UserBottomTab;
