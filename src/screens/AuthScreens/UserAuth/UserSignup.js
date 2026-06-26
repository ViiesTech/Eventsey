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

const UserSignUp = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = () => {
    if (!userName || !email || !password || !confirmPassword) {
      return showToast(
        'Validation Error',
        'Please fill in all the required fields',
      );
    }
    if (password !== confirmPassword) {
      return showToast(
        'Validation Error',
        'Password and Confirm Password do not match',
      );
    }

    showToast('Success', 'Creating your account...');
    navigation.navigate('UserOTP', {
      email,
    });
  };

  const handleSocialSignIn = provider => {
    showToast('Info', `Continuing with ${provider}...`);
  };

  return (
    <ScreenWrapper scrollable style={styles.screenBackground}>
      <View style={styles.contentContainer}>
        {/* Top Branding Header Area */}
        <View style={styles.brandingContainer}>
          <Text style={styles.mainTitle}>Fare Share Fare Share</Text>
          <Text style={styles.subTitle}>Eventsey</Text>
        </View>

        {/* Core SignUp Form Card Component */}
        <View style={styles.signUpCard}>
          {/* Username Form Segment */}
          <Text style={styles.inputLabel}>Username</Text>
          <InputField
            placeHolder="Enter your username"
            value={userName}
            handlePress={setUserName}
            inputContainerStyle={styles.customInputContainer}
          />

          {/* Email Form Segment */}
          <Text style={styles.inputLabel}>Email</Text>
          <InputField
            placeHolder="your@email.com"
            value={email}
            handlePress={setEmail}
            keyboardType="email-address"
            inputContainerStyle={styles.customInputContainer}
          />

          {/* Password Form Segment */}
          <Text style={styles.inputLabel}>Password</Text>
          <InputField
            placeHolder="••••••••"
            value={password}
            handlePress={setPassword}
            security
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            inputContainerStyle={styles.customInputContainer}
          />

          {/* Confirm Password Form Segment */}
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <InputField
            placeHolder="••••••••"
            value={confirmPassword}
            handlePress={setConfirmPassword}
            security
            showPassword={showConfirmPassword}
            setShowPassword={setShowConfirmPassword}
            inputContainerStyle={styles.customInputContainer}
          />

          {/* Authentication Core Button CTA */}
          <Button
            title="Sign Up"
            onPress={handleSignUp}
            style={styles.signUpBtn}
            textStyle={styles.signUpBtnText}
          />

          {/* Neutral Section Separator Label */}
          <Text style={styles.separatorText}>Or continue with</Text>

          {/* Social Authentication Row */}
          <View style={styles.socialRow}>
            {/* Google Button */}
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialSignIn('Google')}
            >
              <Image source={AppImages.googleLogo} style={styles.socialIcon} />
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>

            {/* Apple Button */}
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialSignIn('Apple')}
            >
              <Image source={AppImages.appleLogo} style={styles.socialIcon} />
              <Text style={styles.socialButtonText}>Apple</Text>
            </TouchableOpacity>
          </View>

          {/* Navigation Account Redirection Link */}
          <View style={styles.footerRedirectRow}>
            <Text style={styles.footerRedirectLabel}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('UserLogin')}>
              <Text style={styles.loginLink}>Log in</Text>
            </TouchableOpacity>
          </View>

          {/* Anonymous Mode Option Link */}
          <TouchableOpacity
            // onPress={() => navigation.navigate('GuestHome')}
            style={styles.guestButtonWrapper}
          >
            <Text style={styles.guestButtonText}>Continue as Guest</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  screenBackground: {
    backgroundColor: AppColors.primary, // Structural layout perimeter background coral tint
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: responsiveWidth(10),
    paddingTop: responsiveHeight(6), // Balanced padding for multi-field alignment
    paddingBottom: responsiveHeight(5),
  },
  brandingContainer: {
    alignItems: 'center',
    marginBottom: responsiveHeight(3),
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
  signUpCard: {
    backgroundColor: AppColors.white,
    borderRadius: 24,
    paddingHorizontal: responsiveWidth(6),
    paddingVertical: responsiveHeight(3.5),
    width: '100%',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 5,
  },
  inputLabel: {
    fontSize: responsiveFontSize(1.9),
    fontWeight: '600',
    color: AppColors.black,
    marginBottom: responsiveHeight(0.8),
  },
  customInputContainer: {
    backgroundColor: '#F5EFEA',
    borderRadius: 14,
    borderWidth: 0,
    height: responsiveHeight(6.2),
    marginBottom: responsiveHeight(1.8),
    paddingHorizontal: responsiveWidth(4),
  },
  signUpBtn: {
    backgroundColor: AppColors.secondary,
    borderRadius: 14,
    height: responsiveHeight(6.2),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(1.2),
    marginBottom: responsiveHeight(3.5),
  },
  signUpBtnText: {
    color: '#1A2E2B',
    fontWeight: '600',
    fontSize: responsiveFontSize(2.2),
  },
  separatorText: {
    fontSize: responsiveFontSize(1.8),
    color: '#9E9E9E',
    textAlign: 'center',
    marginBottom: responsiveHeight(2.5),
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: responsiveHeight(3.5),
  },
  socialButton: {
    flexDirection: 'row',
    backgroundColor: '#F5EFEA',
    width: '47%',
    height: responsiveHeight(5.8),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    width: 16,
    height: 16,
    marginRight: responsiveWidth(2),
    resizeMode: 'contain',
  },
  socialButtonText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '600',
    color: AppColors.black,
  },
  footerRedirectRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(3.5),
  },
  footerRedirectLabel: {
    fontSize: responsiveFontSize(1.7),
    color: '#9E9E9E',
  },
  loginLink: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: '600',
    color: AppColors.primary,
  },
  guestButtonWrapper: {
    alignSelf: 'center',
    marginTop: responsiveHeight(0.2),
  },
  guestButtonText: {
    fontSize: responsiveFontSize(1.9),
    fontWeight: '600',
    color: '#8A6861',
  },
});

export default UserSignUp;
