import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Text from '../../../components/CustomText';
import ScreenWrapper from '../../../components/ScreenWrapper';
import Button from '../../../components/Button';
import InputField from '../../../components/InputField';
import { AppImages } from '../../../assets/Images/Index';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../../utils/Responsive_Dimensions';
import { showToast } from '../../../components/Toast';
import { AppColors } from '../../../utils/AppColors';

const ForgotPassword = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const userType = route?.params?.userType;

  const handleResetPassword = () => {
    if (!email) {
      return showToast('Validation Error', 'Please enter your email address');
    }
    showToast('Success', 'Otp sent to your email');
    navigation.navigate('VerifyOTP', { email, userType });
  };

  return (
    <ScreenWrapper scrollable style={styles.screenBackground}>
      <View style={styles.contentContainer}>
        {/* Top Logo Section */}
        {userType === 'vendor' && (
          <View style={styles.logoContainer}>
            <View style={styles.logoGlowContainer}>
              <Image
                source={AppImages.logo}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.welcomeText}>Vendors</Text>
            <View style={styles.dividerLine} />
            <Text style={styles.subText}>
              Grow your business with us{' '}
              <Text style={styles.currencySymbol}>$</Text>
            </Text>
          </View>
        )}

        {/* Back Navigation Arrow */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Image source={AppImages.goBack} style={styles.backIcon} />
        </TouchableOpacity>

        {/* Screen Title & Instruction Header */}
        <Text style={styles.headerTitle}>Forgot password</Text>
        <Text style={styles.subDescription}>
          Please enter your email to reset the password
        </Text>

        {/* Elevated Form Card Container */}
        <View style={styles.cardContainer}>
          <Text style={styles.inputLabel}>Your Email</Text>
          <InputField
            placeHolder="Enter your email"
            value={email}
            handlePress={setEmail}
            keyboardType="email-address"
            inputContainerStyle={styles.customInputContainer}
          />

          {/* Reset CTA Action */}
          <Button
            title="Reset Password"
            onPress={handleResetPassword}
            style={styles.resetBtn}
            textStyle={styles.resetBtnText}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  screenBackground: {
    backgroundColor: AppColors.primary, // Outer layout background coral color
  },
  frameWrapper: {
    flex: 1,
    width: '100%',
    minHeight: responsiveHeight(100),
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: responsiveWidth(10),
    paddingTop: responsiveHeight(6),
    paddingBottom: responsiveHeight(4),
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: responsiveHeight(2.5),
  },
  logoGlowContainer: {
    width: responsiveWidth(38),
    height: responsiveWidth(38),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveWidth(19),
    marginBottom: responsiveHeight(1),
  },
  logoImage: {
    width: responsiveWidth(60),
    height: responsiveWidth(60),
  },
  welcomeText: {
    fontSize: responsiveFontSize(2.6),
    fontWeight: '700',
    color: AppColors.primary, // Soft coral heading
    textAlign: 'center',
  },
  dividerLine: {
    width: '75%',
    height: 1,
    backgroundColor: '#000000',
    marginTop: responsiveHeight(1.2),
    opacity: 0.5,
  },
  subText: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '700',
    color: AppColors.secondary,
    textAlign: 'center',
    marginTop: responsiveHeight(1.5),
  },
  currencySymbol: {
    color: AppColors.primary,
  },
  backButton: {
    width: responsiveWidth(9),
    height: responsiveWidth(9),
    borderRadius: responsiveWidth(4.5),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(2),
  },
  backIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: responsiveFontSize(3),
    fontWeight: '700',
    color: AppColors.black,
    marginBottom: responsiveHeight(1),
  },
  subDescription: {
    fontSize: responsiveFontSize(1.8),
    color: '#9E9E9E',
    marginBottom: responsiveHeight(3),
  },
  cardContainer: {
    backgroundColor: AppColors.white, // White base block inside scalloped layout
    borderRadius: 20,
    padding: responsiveWidth(6),
    width: '100%',
    // Shadow elements for card visual depth
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  inputLabel: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '600',
    color: '#000000',
    marginBottom: responsiveHeight(1.2),
  },
  customInputContainer: {
    backgroundColor: '#F5EFEA', // Greyish-cream tint for custom entry box
    borderRadius: 14,
    borderWidth: 0,
    height: responsiveHeight(6.5),
    marginBottom: responsiveHeight(2.5),
    paddingHorizontal: responsiveWidth(4),
  },
  resetBtn: {
    backgroundColor: AppColors.secondary, // Mint green background action
    borderRadius: 14,
    height: responsiveHeight(6.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetBtnText: {
    color: '#1A2E2B',
    fontWeight: '600',
    fontSize: responsiveFontSize(2),
  },
});

export default ForgotPassword;
