import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../../../components/ScreenWrapper';
import Button from '../../../components/Button';
import { AppImages } from '../../../assets/Images/Index';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../../utils/Responsive_Dimensions';

const LoginScreen = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    // Placeholder login action
    alert('Vendor login successful! Welcome to the Eventsey Vendor alpha!');
  };

  const handleBack = () => {
    navigation.navigate('Onboarding');
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Top Section: Back button and Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Onboarding</Text>
          </TouchableOpacity>
        </View>

        {/* Brand visual */}
        <View style={styles.logoContainer}>
          <AnimatedLogo />
          <Text style={styles.welcomeText}>Vendor Portal</Text>
          <Text style={styles.subText}>Login to manage bookings and event inquiries</Text>
        </View>

        {/* Input Fields */}
        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Business Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter business email"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          {/* Login Button using our premium custom Button component */}
          <Button
            title="Business Log In"
            onPress={handleLogin}
            type="primary"
            style={styles.loginBtn}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Want to partner with us? </Text>
          <TouchableOpacity>
            <Text style={styles.signUpText}>Apply Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

// Internal mini-helper to render a smaller logo inside login
const AnimatedLogo = () => {
  const { Image } = require('react-native');
  return (
    <Image
      source={AppImages.logo}
      style={{
        width: responsiveWidth(20),
        height: responsiveWidth(20),
        marginBottom: responsiveHeight(1.5),
      }}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(2),
    justifyContent: 'space-between',
  },
  header: {
    height: responsiveHeight(5),
    justifyContent: 'center',
  },
  backButton: {
    paddingVertical: responsiveHeight(0.5),
  },
  backButtonText: {
    color: '#6E8A85',
    fontSize: responsiveFontSize(1.6),
    fontWeight: '600',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: responsiveHeight(1),
  },
  welcomeText: {
    fontSize: responsiveFontSize(2.8),
    fontWeight: '700',
    color: '#1A3330',
    textAlign: 'center',
  },
  subText: {
    fontSize: responsiveFontSize(1.6),
    color: '#6E8A85',
    textAlign: 'center',
    marginTop: responsiveHeight(0.8),
  },
  formContainer: {
    marginVertical: responsiveHeight(3),
  },
  inputWrapper: {
    marginBottom: responsiveHeight(2),
  },
  inputLabel: {
    fontSize: responsiveFontSize(1.5),
    fontWeight: '600',
    color: '#1A3330',
    marginBottom: responsiveHeight(0.8),
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: responsiveWidth(3),
    height: responsiveHeight(5.8),
    paddingHorizontal: responsiveWidth(4),
    fontSize: responsiveFontSize(1.6),
    color: '#1F2937',
  },
  loginBtn: {
    marginTop: responsiveHeight(2.5),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
  },
  footerText: {
    color: '#6E8A85',
    fontSize: responsiveFontSize(1.6),
  },
  signUpText: {
    color: '#FBAFA1',
    fontWeight: '700',
    fontSize: responsiveFontSize(1.6),
  },
});

export default LoginScreen;
