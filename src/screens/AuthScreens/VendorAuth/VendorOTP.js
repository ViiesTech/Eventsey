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
import { AppIcons } from '../../../assets/Icons/Index';
import { AppColors } from '../../../utils/AppColors';

const CELL_COUNT = 4; // Screenshot ke mutabiq 4 digits hain

const VendorOTP = ({ navigation }) => {
  const [value, setValue] = useState('');

  // Is hook se jab saare cells fill ho jayenge toh keyboard auto-hide/blur ho jayega
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });

  // Is hook se jab user kisi specific cell par tap karega toh wo clear ho jayega
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleVerify = () => {
    if (value.length < CELL_COUNT) {
      return showToast(
        'Validation Error',
        'Please enter the complete 4-digit code',
      );
    }
    showToast('Success', 'OTP Verified successfully');
    navigation.navigate('SuccessOTP');
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
        </View>

        {/* Title and Back Arrow Navigation Row */}
        <View style={styles.titleRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Image source={AppIcons.backArrow} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Enter code</Text>
        </View>

        {/* Subtext Description */}
        <Text style={styles.subDescription}>
          Enter the 4-digit verification code sent to email
        </Text>

        {/* Integration of react-native-confirmation-code-field */}
        <View style={styles.otpInputContainer}>
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

        {/* Resend Option */}
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Did not receive code? </Text>
          <TouchableOpacity
            onPress={() => showToast('Info', 'OTP Resent successfully')}
          >
            <Text style={styles.resendLinkText}>Resend</Text>
          </TouchableOpacity>
        </View>

        {/* Verify Call-to-Action Action Button */}
        <Button
          title="Verify"
          onPress={handleVerify}
          style={styles.verifyBtn}
          textStyle={styles.verifyBtnText}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  screenBackground: {
    backgroundColor: AppColors.primary, // Outer layout coral color
  },
  frameWrapper: {
    flex: 1,
    width: '100%',
    minHeight: responsiveHeight(100),
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: responsiveWidth(12),
    paddingTop: responsiveHeight(6),
    paddingBottom: responsiveHeight(4),
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
  },
  logoGlowContainer: {
    width: responsiveWidth(38),
    height: responsiveWidth(38),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveWidth(19),
  },
  logoImage: {
    width: responsiveWidth(60),
    height: responsiveWidth(60),
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(4),
    position: 'relative',
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    padding: 5,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: '#000000',
  },
  headerTitle: {
    fontSize: responsiveFontSize(3.2),
    fontWeight: '700',
    color: '#2C3E50',
    textAlign: 'center',
  },
  subDescription: {
    fontSize: responsiveFontSize(2),
    color: '#9E9E9E',
    textAlign: 'center',
    marginTop: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(4),
    lineHeight: responsiveHeight(2.8),
  },
  otpInputContainer: {
    marginVertical: responsiveHeight(4),
    paddingHorizontal: responsiveWidth(2),
  },
  codeFieldRoot: {
    justifyContent: 'space-between',
    width: '100%',
  },
  cell: {
    backgroundColor: '#F5EFEA', // Design background color block tint
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    lineHeight: responsiveWidth(14.5),
    borderRadius: 14,
    fontSize: responsiveFontSize(2.6),
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    overflow: 'hidden',
  },
  focusCell: {
    borderWidth: 1.5,
    borderColor: AppColors.secondary, // Active/Focus border color (Teal tint)
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(3),
  },
  resendText: {
    color: '#7A7A7A',
    fontSize: responsiveFontSize(1.8),
  },
  resendLinkText: {
    color: AppColors.primary,
    fontWeight: '500',
    fontSize: responsiveFontSize(1.8),
  },
  verifyBtn: {
    backgroundColor: AppColors.secondary,
    borderRadius: 14,
    height: responsiveHeight(6.5),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(1),
  },
  verifyBtnText: {
    color: '#1A2E2B',
    fontWeight: '600',
    fontSize: responsiveFontSize(2.2),
  },
});

export default VendorOTP;
