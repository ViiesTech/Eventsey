import React, { useState, useRef } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Text from '../../../components/CustomText';
import ScreenWrapper from '../../../components/ScreenWrapper';
import Button from '../../../components/Button';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../../utils/Responsive_Dimensions';
import { showToast } from '../../../components/Toast';
import { AppColors } from '../../../utils/AppColors';

const UserOTP = ({ navigation, route }) => {
  const [otp, setOtp] = useState(['', '', '', '']);

  // Refs for managing auto-focus shift between OTP blocks
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const email = route?.params?.email;

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input box if value is entered
    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    // Move focus back to the previous field on backspace delete
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleVerifyOTP = () => {
    const otpCode = otp.join('');
    if (otpCode.length < 4) {
      return showToast(
        'Validation Error',
        'Please enter the complete 4-digit OTP code',
      );
    }

    showToast('Success', 'OTP Verified successfully!');

    setTimeout(() => {
      navigation.navigate('CollectInfo');
    }, 1500);
    // Navigation or post-verification dashboard launch logic goes here
  };

  const handleResendCode = () => {
    showToast('Info', 'A new verification code has been sent.');
  };

  return (
    <ScreenWrapper scrollable style={styles.screenBackground}>
      <View style={styles.contentContainer}>
        {/* Top Branding Header Area */}
        <View style={styles.brandingContainer}>
          <Text style={styles.mainTitle}>Fare Share Fare Share</Text>
          <Text style={styles.subTitle}>Eventsey</Text>
        </View>

        {/* Core OTP Verification Form Card */}
        <View style={styles.otpCard}>
          <Text style={styles.cardHeaderTitle}>Verification Code</Text>
          <Text style={styles.cardSubTitle}>
            Please enter the 4-digit verification code sent to {email}
          </Text>

          {/* Core OTP Input Segment Grid */}
          <View style={styles.otpInputRow}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={inputRefs[index]}
                style={styles.otpBox}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={value => handleOtpChange(value, index)}
                onKeyPress={e => handleKeyPress(e, index)}
                selectTextOnFocus
              />
            ))}
          </View>

          {/* Verification CTA Action Trigger */}
          <Button
            title="Verify Code"
            onPress={handleVerifyOTP}
            style={styles.verifyBtn}
            textStyle={styles.verifyBtnText}
          />

          {/* Resend Verification Route Handler Link */}
          <View style={styles.footerRedirectRow}>
            <Text style={styles.footerRedirectLabel}>
              Didn't receive code?{' '}
            </Text>
            <TouchableOpacity onPress={handleResendCode}>
              <Text style={styles.resendLink}>Resend code</Text>
            </TouchableOpacity>
          </View>

          {/* Back Navigation Re-routing Option */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButtonWrapper}
          >
            <Text style={styles.backButtonText}>Back to Previous Screen</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  screenBackground: {
    backgroundColor: AppColors.primary, // App theme background tint
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: responsiveWidth(10),
    paddingTop: responsiveHeight(12),
    paddingBottom: responsiveHeight(5),
  },
  brandingContainer: {
    alignItems: 'center',
    marginBottom: responsiveHeight(4),
  },
  mainTitle: {
    fontSize: responsiveFontSize(3.6),
    fontWeight: '700',
    color: AppColors.primary,
    textAlign: 'center',
    lineHeight: responsiveHeight(5),
  },
  subTitle: {
    fontSize: responsiveFontSize(2.2),
    color: '#9E9E9E',
    textAlign: 'center',
    marginTop: responsiveHeight(0.8),
  },
  otpCard: {
    backgroundColor: AppColors.white,
    borderRadius: 24,
    paddingHorizontal: responsiveWidth(6),
    paddingVertical: responsiveHeight(4),
    width: '100%',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 5,
  },
  cardHeaderTitle: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: '700',
    color: AppColors.black,
    textAlign: 'center',
    marginBottom: responsiveHeight(1),
  },
  cardSubTitle: {
    fontSize: responsiveFontSize(1.7),
    color: '#7C7C7C',
    textAlign: 'center',
    lineHeight: responsiveHeight(2.4),
    marginBottom: responsiveHeight(4),
    paddingHorizontal: responsiveWidth(2),
  },
  otpInputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: responsiveHeight(4),
  },
  otpBox: {
    backgroundColor: '#F5EFEA', // Creamy shaded text input block theme matching your layout
    width: responsiveWidth(14),
    height: responsiveWidth(14),
    borderRadius: 14,
    textAlign: 'center',
    fontSize: responsiveFontSize(2.6),
    fontWeight: '700',
    color: AppColors.black,
  },
  verifyBtn: {
    backgroundColor: AppColors.secondary, // Brand mint signature color fill
    borderRadius: 14,
    height: responsiveHeight(6.2),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(3.5),
  },
  verifyBtnText: {
    color: '#1A2E2B',
    fontWeight: '600',
    fontSize: responsiveFontSize(2.2),
  },
  footerRedirectRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(3),
  },
  footerRedirectLabel: {
    fontSize: responsiveFontSize(1.7),
    color: '#9E9E9E',
  },
  resendLink: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: '600',
    color: AppColors.primary, // Brand accent coral highlight link text
  },
  backButtonWrapper: {
    alignSelf: 'center',
    marginTop: responsiveHeight(0.2),
  },
  backButtonText: {
    fontSize: responsiveFontSize(1.9),
    fontWeight: '600',
    color: '#8A6861', // Shaded muted secondary layout color
  },
});

export default UserOTP;
