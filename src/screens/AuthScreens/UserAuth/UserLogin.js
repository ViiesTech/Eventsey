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

const UserLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
    if (!email || !password) {
      return showToast(
        'Validation Error',
        'Please enter both email and password',
      );
    }
    showToast('Success', 'Logging in...');
    setTimeout(() => {
      navigation.replace('MainStack', { screen: 'UserFlow' });
    }, 1000);
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

        {/* Core Login Form Card Component */}
        <View style={styles.loginCard}>
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

          {/* Forgot Password Link Button */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ForgotPassword', { userType: 'user' })
            }
            style={styles.forgotPasswordWrapper}
          >
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>

          {/* Authentication Core Button CTA */}
          <Button
            title="Sign In"
            onPress={handleSignIn}
            style={styles.signInBtn}
            textStyle={styles.signInBtnText}
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

          {/* Navigation Account Creation Redirection Link */}
          <View style={styles.footerRedirectRow}>
            <Text style={styles.footerRedirectLabel}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('UserSignUp')}>
              <Text style={styles.signUpLink}>Sign up</Text>
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
  frameWrapper: {
    flex: 1,
    width: '100%',
    minHeight: responsiveHeight(100),
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: responsiveWidth(10),
    paddingTop: responsiveHeight(13),
    paddingBottom: responsiveHeight(5),
  },
  brandingContainer: {
    alignItems: 'center',
    marginBottom: responsiveHeight(3.5),
  },
  mainTitle: {
    fontSize: responsiveFontSize(3.6),
    fontWeight: '700',
    color: AppColors.primary, // Heading match tone
    textAlign: 'center',
    lineHeight: responsiveHeight(5),
  },
  subTitle: {
    fontSize: responsiveFontSize(2.2),
    color: '#9E9E9E', // Sub-branding structural label gray tint
    textAlign: 'center',
    marginTop: responsiveHeight(0.8),
  },
  loginCard: {
    backgroundColor: AppColors.white, // Central content structure box layer
    borderRadius: 24,
    paddingHorizontal: responsiveWidth(6),
    paddingVertical: responsiveHeight(4),
    width: '100%',
    // Elevation configuration properties
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
    marginBottom: responsiveHeight(1),
  },
  customInputContainer: {
    backgroundColor: '#F5EFEA', // Creamy shaded input container box design theme
    borderRadius: 14,
    borderWidth: 0,
    height: responsiveHeight(6.2),
    marginBottom: responsiveHeight(2.2),
    paddingHorizontal: responsiveWidth(4),
  },
  forgotPasswordWrapper: {
    alignSelf: 'center',
    marginBottom: responsiveHeight(2.5),
    marginTop: responsiveHeight(0.2),
  },
  forgotPasswordText: {
    fontSize: responsiveFontSize(1.8),
    color: '#BC8D84', // Muted light coral tone link accent
  },
  signInBtn: {
    backgroundColor: AppColors.secondary, // Main verification mint background fill color
    borderRadius: 14,
    height: responsiveHeight(6.2),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(3.5),
  },
  signInBtnText: {
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
    backgroundColor: '#F5EFEA', // Shaded button block context configuration
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
  signUpLink: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: '600',
    color: AppColors.primary, // Accent brand orange/coral highlight text
  },
  guestButtonWrapper: {
    alignSelf: 'center',
    marginTop: responsiveHeight(0.2),
  },
  guestButtonText: {
    fontSize: responsiveFontSize(1.9),
    fontWeight: '600',
    color: '#8A6861', // Darker earthy coral secondary text variant
  },
});

export default UserLogin;
