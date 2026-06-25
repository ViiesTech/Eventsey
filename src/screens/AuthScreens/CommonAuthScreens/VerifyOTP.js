import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import ScreenWrapper from '../../../components/ScreenWrapper';
import Button from '../../../components/Button';
import { AppImages } from '../../../assets/Images/Index';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../../utils/Responsive_Dimensions';
import { showToast } from '../../../components/Toast';
import { AppColors } from '../../../utils/AppColors';

const CELL_COUNT = 5; // Design ke mutabiq yahan 5 digits hain

const VerifyOTP = ({ navigation, route }) => {
  const { email } = route.params;
  const { userType } = route.params;
  const [value, setValue] = useState('');

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleVerifyCode = () => {
    if (value.length < CELL_COUNT) {
      return showToast(
        'Validation Error',
        'Please enter the complete 5-digit code',
      );
    }
    showToast('Success', 'Code Verified successfully');
    // On success navigation setup:
    navigation.navigate('PasswordResetSuccess', { userType });
  };

  return (
    <ScreenWrapper scrollable style={styles.screenBackground}>
      <View style={styles.contentContainer}>
        {/* Top Branding Section */}
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

        {/* Round Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Image source={AppImages.goBack} style={styles.backIcon} />
        </TouchableOpacity>

        {/* Descriptive Content Section */}
        <Text style={styles.headerTitle}>Check your email</Text>
        <Text style={styles.subDescription}>
          We sent a reset link to <Text style={styles.boldEmail}>{email}</Text>{' '}
          enter 5 digit code that mentioned in the email
        </Text>

        {/* White Card Layout containing Verification Interface */}
        <View style={styles.cardContainer}>
          {/* 5-Digit Field Segment */}
          <View style={styles.otpInputWrapper}>
            <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => (
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}
                >
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
          </View>

          {/* Action CTA Button */}
          <Button
            title="Verify Code"
            onPress={handleVerifyCode}
            style={styles.verifyBtn}
            textStyle={styles.verifyBtnText}
          />

          {/* Bottom Email Action Row */}
          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Haven't got the email yet? </Text>
            <TouchableOpacity
              onPress={() => showToast('Success', 'Code sent!')}
            >
              <Text style={styles.resendLinkText}>Resend code</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  screenBackground: {
    backgroundColor: AppColors.primary, // Main base frame pink color
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
    color: AppColors.black,
    marginBottom: responsiveHeight(1),
  },
  subDescription: {
    fontSize: responsiveFontSize(1.8),
    color: '#9E9E9E',
    lineHeight: responsiveHeight(2.6),
    marginBottom: responsiveHeight(3),
  },
  boldEmail: {
    fontWeight: '700',
    color: '#333333',
  },
  cardContainer: {
    backgroundColor: AppColors.white,
    borderRadius: 20,
    padding: responsiveWidth(5),
    width: '100%',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  otpInputWrapper: {
    marginBottom: responsiveHeight(3),
    marginTop: responsiveHeight(1),
  },
  codeFieldRoot: {
    justifyContent: 'space-between',
    width: '100%',
  },
  cell: {
    backgroundColor: AppColors.white,
    width: responsiveWidth(12),
    height: responsiveWidth(13.5),
    lineHeight: responsiveWidth(13),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    fontSize: responsiveFontSize(2.4),
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    overflow: 'hidden',
  },
  focusCell: {
    borderColor: AppColors.secondary,
    borderWidth: 1.5,
  },
  verifyBtn: {
    backgroundColor: AppColors.secondary,
    borderRadius: 14,
    height: responsiveHeight(6.5),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
  },
  verifyBtnText: {
    color: '#1A2E2B',
    fontWeight: '600',
    fontSize: responsiveFontSize(2),
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(0.5),
  },
  resendText: {
    color: '#9E9E9E',
    fontSize: responsiveFontSize(1.5),
  },
  resendLinkText: {
    color: AppColors.primary,
    fontWeight: '600',
    fontSize: responsiveFontSize(1.5),
    textDecorationLine: 'underline',
  },
});

export default VerifyOTP;
