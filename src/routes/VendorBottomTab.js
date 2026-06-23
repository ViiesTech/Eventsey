import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Platform } from 'react-native';
import SVGXml from '../components/SvgXml';
import { AppIcons } from '../assets/Icons/Index';
import { AppColors } from '../utils/AppColors';
import { responsiveFontSize } from '../utils/Responsive_Dimensions';

// Screens
import VendorHome from '../screens/VendorFlow/Home';
import VendorJobs from '../screens/VendorFlow/Jobs';
import VendorMessages from '../screens/VendorFlow/VendorMessages';
import VendorProfile from '../screens/VendorFlow/Profile';
import { AppImages } from '../assets/Images/Index';

const Tab = createBottomTabNavigator();

const VendorBottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: AppColors.secondary,
        tabBarInactiveTintColor: AppColors.darkGray,
        tabBarLabelStyle: {
          fontSize: responsiveFontSize(1.4),
          fontWeight: '400',
          marginBottom: Platform.OS === 'ios' ? 0 : 8,
        },
        tabBarStyle: {
          height: 75,
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? 24 : 16,
          backgroundColor: AppColors.white,
          elevation: 0,
          marginHorizontal: 25,
          borderTopWidth: 0,
          paddingTop: 10,
        },
        tabBarIcon: ({ focused }) => {
          let iconXml;
          switch (route.name) {
            case 'Home':
              iconXml = AppImages.home;
              break;
            case 'Jobs':
              iconXml = AppImages.jobs;
              break;
            case 'Chat':
              iconXml = AppImages.chat;
              break;
            case 'Profile':
              iconXml = AppImages.user;
              break;
            default:
              iconXml = AppImages.home;
          }
          return (
            <Image
              source={iconXml}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? AppColors.secondary : AppColors.darkGray,
              }}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={VendorHome} />
      <Tab.Screen name="Jobs" component={VendorJobs} />
      <Tab.Screen name="Chat" component={VendorMessages} />
      <Tab.Screen name="Profile" component={VendorProfile} />
    </Tab.Navigator>
  );
};

export default VendorBottomTab;
