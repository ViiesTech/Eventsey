import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import SVGXml from '../components/SvgXml';
import { AppIcons } from '../assets/Icons/Index';
import { AppColors } from '../utils/AppColors';
import { responsiveFontSize } from '../utils/Responsive_Dimensions';

// Screens
import WelcomeGuest from '../screens/GuestFlow/WelcomeGuest';
import RSVP from '../screens/GuestFlow/RSVP';
import GuestMsg from '../screens/GuestFlow/GuestMsg';

const Tab = createBottomTabNavigator();

const GuestBottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: AppColors.primary,
        tabBarInactiveTintColor: AppColors.liteGray,
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
          borderRadius: 24, // Matches the premium curved layout
          // Shadow configuration
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.06,
          shadowRadius: 10,
        },
        tabBarIcon: ({ color }) => {
          let iconXml;
          switch (route.name) {
            case 'Home':
              iconXml = AppIcons.home(color);
              break;
            case 'RSVP':
              iconXml = AppIcons.mail(color);
              break;
            case 'Msg':
              iconXml = AppIcons.chat(color);
              break;
            default:
              iconXml = AppIcons.home(color);
          }
          return <SVGXml icon={iconXml} width={24} height={24} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={WelcomeGuest} />
      <Tab.Screen name="RSVP" component={RSVP} />
      <Tab.Screen name="Msg" component={GuestMsg} />
    </Tab.Navigator>
  );
};

export default GuestBottomTab;
