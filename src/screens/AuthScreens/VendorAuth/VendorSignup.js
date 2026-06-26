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
import { AppColors } from '../../../utils/AppColors';
import { showToast } from '../../../components/Toast';
import { AppIcons } from '../../../assets/Icons/Index';

const VendorSignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    // if (!email || !username || !password || !confirmPassword) {
    //   return showToast('Error', 'Please fill all fields');
    // }
    // if (password !== confirmPassword) {
    //   return showToast('Error', 'Passwords do not match');
    // }
    navigation.navigate('VendorOTP');
  };

  return (
    <ScreenWrapper scrollable style={styles.screenBackground}>
      <View style={styles.contentContainer}>
        {/* Header Section */}
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

        {/* Form Input Fields */}
        <View style={styles.formContainer}>
          <InputField
            placeHolder="email"
            value={email}
            handlePress={setEmail}
            keyboardType="email-address"
            xmlIcon={AppIcons.emailIcon}
            inputContainerStyle={styles.customInputContainer}
          />

          <InputField
            placeHolder="username"
            value={username}
            handlePress={setUsername}
            xmlIcon={AppIcons.userIcon}
            inputContainerStyle={styles.customInputContainer}
          />

          <InputField
            placeHolder="password"
            value={password}
            handlePress={setPassword}
            security
            xmlIcon={AppIcons.lockIcon}
            inputContainerStyle={styles.customInputContainer}
          />

          <InputField
            placeHolder="Confirm password"
            value={confirmPassword}
            handlePress={setConfirmPassword}
            security
            xmlIcon={AppIcons.lockIcon}
            inputContainerStyle={styles.customInputContainer}
          />

          {/* Main Sign Up Button */}
          <Button
            title="Sign Up"
            onPress={handleSignUp}
            style={styles.signUpBtn}
            textStyle={styles.signUpBtnText}
          />
        </View>

        {/* "Or continue with" Section */}
        <View style={styles.socialDividerContainer}>
          <Text style={styles.socialDividerText}>Or continue with</Text>
        </View>

        {/* Social Buttons */}
        <View style={styles.socialButtonsRow}>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={AppImages.googleLogo} style={styles.socialIcon} />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Image source={AppImages.appleLogo} style={styles.socialIcon} />
            <Text style={styles.socialButtonText}>Apple</Text>
          </TouchableOpacity>
        </View>

        {/* Footer - Sign In Redirect */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity
            style={styles.signInOutlineBtn}
            onPress={() => navigation.navigate('VendorLogin')}
          >
            <Text style={styles.signInBtnText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  screenBackground: {
    backgroundColor: AppColors.primary, // Outer coral layout background
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
    // backgroundColor: 'rgba(215, 247, 244, 0.6)', // Cyan glow container background
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
    color: '#000000',
    textAlign: 'center',
  },
  dividerLine: {
    width: '80%',
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
    marginTop: responsiveHeight(1.5),
  },
  currencySymbol: {
    color: AppColors.primary,
  },
  formContainer: {
    width: '100%',
  },
  customInputContainer: {
    backgroundColor: '#F5EFEA', // Design's light grayish-pink tint
    borderRadius: 14,
    borderWidth: 0,
    height: responsiveHeight(6.5),
    marginBottom: responsiveHeight(1.5),
    paddingHorizontal: responsiveWidth(4),
  },
  signUpBtn: {
    backgroundColor: AppColors.secondary,
    borderRadius: 14,
    height: responsiveHeight(6.5),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(1),
  },
  signUpBtnText: {
    color: '#2C3E50',
    fontWeight: '600',
    fontSize: responsiveFontSize(2.2),
  },
  socialDividerContainer: {
    alignItems: 'center',
    marginVertical: responsiveHeight(2.5),
  },
  socialDividerText: {
    color: '#9E9E9E',
    fontSize: responsiveFontSize(1.6),
  },
  socialButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: responsiveHeight(3),
  },
  socialButton: {
    flexDirection: 'row',
    backgroundColor: '#F5EFEA',
    width: '47%',
    height: responsiveHeight(5.5),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
    resizeMode: 'contain',
  },
  socialButtonText: {
    color: '#000000',
    fontWeight: '600',
    fontSize: responsiveFontSize(1.8),
  },
  footer: {
    alignItems: 'center',
    marginTop: 'auto', // Sticks the button to the bottom area safely
  },
  footerText: {
    color: '#9E9E9E',
    fontSize: responsiveFontSize(1.8),
    marginBottom: responsiveHeight(1.5),
  },
  signInOutlineBtn: {
    width: '100%',
    height: responsiveHeight(6.5),
    borderRadius: 14,
    borderWidth: 1,
    borderColor: AppColors.secondary,
    backgroundColor: AppColors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInBtnText: {
    color: '#000000',
    fontWeight: '600',
    fontSize: responsiveFontSize(2),
  },
});

export default VendorSignUp;
