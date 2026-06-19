import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import ScreenWrapper from '../../../components/ScreenWrapper';
import Button from '../../../components/Button';
import { AppImages } from '../../../assets/Images/Index';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../../utils/Responsive_Dimensions';
import { AppColors } from '../../../utils/AppColors';

const SuccessOTP = ({ navigation }) => {
  const handleContinue = () => {
    // Navigate user to the main vendor dashboard/home flow
    navigation.navigate('VendorLogin');
  };

  return (
    <ScreenWrapper scrollable style={styles.screenBackground}>
      {/* Cloud Scalloped Frame Mask Background Wrapper */}
      <ImageBackground
        source={AppImages.scallopedFrameMask}
        style={styles.frameWrapper}
        resizeMode="stretch"
      >
        <View style={styles.contentContainer}>
          {/* Top Logo & Branding Visual */}
          <View style={styles.logoContainer}>
            <View style={styles.logoGlowContainer}>
              <Image
                source={AppImages.logo}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Success Message Block */}
          <View style={styles.messageContainer}>
            <Text style={styles.successTitle}>Success!</Text>
            <Text style={styles.successSubtext}>
              Congratulations! You have been successfully Verified.
            </Text>
          </View>

          {/* Center Checkmark Element */}
          <View style={styles.checkmarkWrapper}>
            <Image
              source={AppImages.successTick}
              style={styles.checkmarkIcon}
            />
          </View>

          {/* Bottom Action Button Area */}
          <View style={styles.footerContainer}>
            <Button
              title="Continue"
              onPress={handleContinue}
              style={styles.continueBtn}
              textStyle={styles.continueBtnText}
            />
          </View>
        </View>
      </ImageBackground>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  screenBackground: {
    backgroundColor: AppColors.primary, // Frame layer background coral color
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
    paddingBottom: responsiveHeight(5),
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: responsiveHeight(4),
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
  messageContainer: {
    alignItems: 'center',
    marginTop: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(4),
  },
  successTitle: {
    fontSize: responsiveFontSize(3.4),
    fontWeight: '700',
    color: '#2C3E50', // Dark contrast success headline text
    textAlign: 'center',
    marginBottom: responsiveHeight(1.5),
  },
  successSubtext: {
    fontSize: responsiveFontSize(2.2),
    color: '#9E9E9E', // Secondary structural body copy grey
    textAlign: 'center',
    lineHeight: responsiveHeight(3.2),
  },
  checkmarkWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: responsiveHeight(4),
  },
  checkmarkIcon: {
    height: responsiveWidth(30),
    width: responsiveWidth(30),
    resizeMode: 'contain',
  },
  footerContainer: {
    justifyContent: 'flex-end',
    width: '100%',
  },
  continueBtn: {
    backgroundColor: AppColors.secondary, // Mint green background
    borderRadius: 14,
    height: responsiveHeight(6.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueBtnText: {
    color: '#1A2E2B',
    fontWeight: '600',
    fontSize: responsiveFontSize(2.2),
  },
});

export default SuccessOTP;
