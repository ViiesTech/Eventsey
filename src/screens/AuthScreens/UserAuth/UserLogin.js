import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ScreenWrapper from '../../../components/ScreenWrapper';
import Button from '../../../components/Button';
import InputField from '../../../components/InputField';
import { AppImages } from '../../../assets/Images/Index';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../../utils/Responsive_Dimensions';
import { AppColors } from '../../../utils/AppColors';
import { showToast } from '../../../components/Toast';
import { AppIcons } from '../../../assets/Icons/Index';

const UserLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email) return showToast('Validation Error', 'Please enter your email');
    if (!password)
      return showToast('Validation Error', 'Please enter your password');
    showToast('Success', 'Login successful');
  };

  const handleForgotPassword = () => {
    alert('Forgot password clicked!');
  };

  return (
    <ScreenWrapper scrollable>
      <View style={styles.container}>
        {/* Brand visual */}
        <View style={styles.logoContainer}>
          <AnimatedLogo />

          <Text style={styles.welcomeText}>Users</Text>
          <Text style={styles.subText}>
            Login to manage your premium events
          </Text>
        </View>

        {/* Input Fields */}
        <View style={styles.formContainer}>
          <InputField
            label="Email"
            placeHolder="user@example.com"
            value={email}
            handlePress={setEmail}
            keyboardType="email-address"
            xmlIcon={AppIcons.emailIcon}
          />

          <InputField
            label="Password"
            placeHolder="........"
            value={password}
            handlePress={setPassword}
            security
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            xmlIcon={AppIcons.lockIcon}
          />

          {/* Forgot Password Link */}
          <TouchableOpacity
            onPress={handleForgotPassword}
            style={styles.forgotPasswordContainer}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button using our premium custom Button component */}
          <Button
            title="Login"
            onPress={handleLogin}
            type="primary"
            style={styles.loginBtn}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

// Internal mini-helper to render a smaller logo inside login with glow container
const AnimatedLogo = () => {
  const { Image } = require('react-native');
  return (
    <View style={styles.logoGlowContainer}>
      <Image
        source={AppImages.logo}
        style={styles.logoImage}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(10),
    paddingTop: responsiveHeight(10),
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: responsiveHeight(1),
  },
  logoGlowContainer: {
    width: responsiveWidth(28),
    height: responsiveWidth(28),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(1.5),
  },
  logoImage: {
    width: responsiveWidth(50),
    height: responsiveWidth(50),
  },
  welcomeText: {
    fontSize: responsiveFontSize(2.8),
    fontWeight: '700',
    color: AppColors.primary,
    textAlign: 'center',
    marginBottom: responsiveHeight(0.5),
  },
  subText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '600',
    color: AppColors.secondary,
    textAlign: 'center',
    marginTop: responsiveHeight(0.5),
  },
  formContainer: {
    marginVertical: responsiveHeight(2.5),
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-start',
    marginBottom: responsiveHeight(2.5),
  },
  forgotPasswordText: {
    color: AppColors.primary,
    fontSize: responsiveFontSize(1.6),
    fontWeight: '600',
  },
  loginBtn: {
    marginTop: responsiveHeight(1.5),
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
    color: AppColors.secondary,
    fontWeight: '700',
    fontSize: responsiveFontSize(1.6),
  },
});

export default UserLogin;
