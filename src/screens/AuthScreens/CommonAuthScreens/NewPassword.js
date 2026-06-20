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
import { showToast } from '../../../components/Toast';
import { AppColors } from '../../../utils/AppColors';

const NewPassword = ({ navigation, route }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const userType = route?.params?.userType;

  const handleUpdatePassword = () => {
    if (!password || !confirmPassword) {
      return showToast('Validation Error', 'Please fill in both fields');
    }
    if (password !== confirmPassword) {
      return showToast('Validation Error', 'Passwords do not match');
    }
    showToast('Success', 'Password updated successfully');
    if (userType === 'vendor') {
      navigation.navigate('VendorLogin');
    } else {
      navigation.navigate('UserLogin');
    }
  };

  return (
    <ScreenWrapper scrollable style={styles.screenBackground}>
      <View style={styles.contentContainer}>
        {/* Top Branding Header Layout */}
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

        {/* Round Action Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Image source={AppImages.goBack} style={styles.backIcon} />
        </TouchableOpacity>

        {/* Screen Descriptive Headers */}
        <Text style={styles.headerTitle}>Set a new password</Text>
        <Text style={styles.subDescription}>
          Create a new password. Ensure it differs from previous ones for
          security
        </Text>

        {/* Single Elevated Content Card Container */}
        <View style={styles.cardContainer}>
          {/* Password input segment */}
          <Text style={styles.inputLabel}>Password</Text>
          <InputField
            placeHolder="Enter your new password"
            value={password}
            handlePress={setPassword}
            security
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            inputContainerStyle={styles.customInputContainer}
          />

          {/* Confirm password segment */}
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <InputField
            placeHolder="Re-enter password"
            value={confirmPassword}
            handlePress={setConfirmPassword}
            security
            showPassword={showConfirmPassword}
            setShowPassword={setShowConfirmPassword}
            inputContainerStyle={styles.customInputContainer}
          />

          {/* Update Action Button CTA */}
          <Button
            title="Update Password"
            onPress={handleUpdatePassword}
            style={styles.updateBtn}
            textStyle={styles.updateBtnText}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  screenBackground: {
    backgroundColor: AppColors.primary, // Outer decorative framework coral pink canvas tone
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
    color: AppColors.primary,
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
    color: '#1A1A1A',
    marginBottom: responsiveHeight(1),
  },
  subDescription: {
    fontSize: responsiveFontSize(1.8),
    color: '#9E9E9E',
    lineHeight: responsiveHeight(2.6),
    marginBottom: responsiveHeight(3),
  },
  cardContainer: {
    backgroundColor: AppColors.white,
    borderRadius: 20,
    padding: responsiveWidth(6),
    width: '100%',
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
    marginBottom: responsiveHeight(1),
  },
  customInputContainer: {
    backgroundColor: '#F5EFEA', // Standard tinted input boxes for clean container styling
    borderRadius: 14,
    borderWidth: 0,
    height: responsiveHeight(6.5),
    marginBottom: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(4),
  },
  updateBtn: {
    backgroundColor: AppColors.secondary, // Mint green background configuration accent
    borderRadius: 14,
    height: responsiveHeight(6.5),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(1),
  },
  updateBtnText: {
    color: '#1A2E2B',
    fontWeight: '600',
    fontSize: responsiveFontSize(2),
  },
});

export default NewPassword;
