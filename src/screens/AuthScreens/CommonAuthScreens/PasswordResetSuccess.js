import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ScreenWrapper from '../../../components/ScreenWrapper';
import Button from '../../../components/Button';
import { AppImages } from '../../../assets/Images/Index';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../../utils/Responsive_Dimensions';
import { AppColors } from '../../../utils/AppColors';

const PasswordResetSuccess = ({ navigation, route }) => {
  const userType = route?.params?.userType;

  const handleContinue = () => {
    navigation.navigate('NewPassword', { userType });
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

        {/* Round Back Navigation Arrow */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Image source={AppImages.goBack} style={styles.backIcon} />
        </TouchableOpacity>

        {/* Title & Screen Subtext Description */}
        <Text style={styles.headerTitle}>Password reset</Text>
        <Text style={styles.subDescription}>
          Your password has been successfully reset. click confirm to set a new
          password
        </Text>

        {/* White Card Container Layer */}
        <View style={styles.cardContainer}>
          {/* Confirm CTA Action Button */}
          <Button
            title="Continue"
            onPress={handleContinue}
            style={styles.confirmBtn}
            textStyle={styles.confirmBtnText}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  screenBackground: {
    backgroundColor: AppColors.primary, // Outer full layout layout frame coral color
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
    fontSize: responsiveFontSize(1.9),
    color: '#9E9E9E',
    lineHeight: responsiveHeight(2.6),
    marginBottom: responsiveHeight(3),
  },
  cardContainer: {
    backgroundColor: AppColors.white,
    borderRadius: 20,
    padding: responsiveWidth(6),
    paddingVertical: responsiveHeight(4),
    width: '100%',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  confirmBtn: {
    backgroundColor: AppColors.secondary, // Theme bright mint teal color scheme
    borderRadius: 14,
    height: responsiveHeight(6.5),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  confirmBtnText: {
    color: '#1A2E2B',
    fontWeight: '600',
    fontSize: responsiveFontSize(2.2),
  },
});

export default PasswordResetSuccess;
