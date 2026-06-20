import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
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

const VendorLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email) return showToast('Validation Error', 'Please enter your email');
    if (!password)
      return showToast('Validation Error', 'Please enter your password');
    showToast('Success', 'Login successful');
  };

  return (
    <ScreenWrapper scrollable style={styles.screenBackground}>
      <View style={styles.contentContainer}>
        {/* Brand Visual & Header */}
        <View style={styles.logoContainer}>
          <View style={styles.logoGlowContainer}>
            <Image
              source={AppImages.logo}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.welcomeText}>Vendors</Text>

          {/* Dark slim divider underneath the header title */}
          <View style={styles.dividerLine} />

          <Text style={styles.subText}>
            Grow your business with us{' '}
            <Text style={styles.currencySymbol}>$</Text>
          </Text>
        </View>

        {/* Input Form Fields */}
        <View style={styles.formContainer}>
          <InputField
            label="Email"
            placeHolder="vendor@example.com"
            value={email}
            handlePress={setEmail}
            keyboardType="email-address"
            xmlIcon={AppIcons.emailIcon}
            labelStyle={styles.customLabelStyle}
            inputContainerStyle={styles.customInputContainer}
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
            labelStyle={styles.customLabelStyle}
            inputContainerStyle={styles.customInputContainer}
          />

          {/* Forgot Password Link */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ForgotPassword', { userType: 'vendor' })
            }
            style={styles.forgotPasswordContainer}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login CTA Action */}
          <Button
            title="Login"
            onPress={handleLogin}
            style={styles.loginBtn}
            textStyle={styles.loginBtnText}
          />
        </View>

        {/* Footer Registration Link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('VendorSignUp')}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  screenBackground: {
    backgroundColor: AppColors.primary, // Outer coral layout background tint
  },
  frameWrapper: {
    flex: 1,
    width: '100%',
    minHeight: responsiveHeight(100),
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: responsiveWidth(12),
    paddingTop: responsiveHeight(8),
    paddingBottom: responsiveHeight(4),
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: responsiveHeight(4),
  },
  logoGlowContainer: {
    width: responsiveWidth(40),
    height: responsiveWidth(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveWidth(20),
    marginBottom: responsiveHeight(1.5),
  },
  logoImage: {
    width: responsiveWidth(60),
    height: responsiveWidth(60),
  },
  welcomeText: {
    fontSize: responsiveFontSize(3.2),
    fontWeight: '700',
    color: AppColors.primary, // Soft coral heading color matches layout border
    textAlign: 'center',
  },
  dividerLine: {
    width: '75%',
    height: 1,
    backgroundColor: '#000000',
    marginTop: responsiveHeight(1.5),
    opacity: 0.6,
  },
  subText: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '700',
    color: AppColors.secondary,
    textAlign: 'center',
    marginTop: responsiveHeight(2),
  },
  currencySymbol: {
    color: AppColors.primary,
  },
  formContainer: {
    width: '100%',
  },
  customLabelStyle: {
    color: AppColors.primary, // Coral labels match new UI theme layout
    fontSize: responsiveFontSize(1.8),
    marginBottom: responsiveHeight(0.8),
    fontWeight: '500',
  },
  customInputContainer: {
    backgroundColor: AppColors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    height: responsiveHeight(6.5),
    marginBottom: responsiveHeight(2),
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-start',
    marginTop: responsiveHeight(0.5),
    marginBottom: responsiveHeight(3),
  },
  forgotPasswordText: {
    color: AppColors.primary,
    fontSize: responsiveFontSize(1.8),
    fontWeight: '500',
  },
  loginBtn: {
    backgroundColor: AppColors.secondary, // Mint/teal solid button theme
    borderRadius: 14,
    height: responsiveHeight(6.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtnText: {
    color: '#1A2E2B',
    fontWeight: '600',
    fontSize: responsiveFontSize(2.2),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(4),
  },
  footerText: {
    color: '#4A4A4A',
    fontSize: responsiveFontSize(1.8),
  },
  signUpText: {
    color: AppColors.secondary,
    fontWeight: '600',
    fontSize: responsiveFontSize(1.8),
  },
});

export default VendorLogin;
