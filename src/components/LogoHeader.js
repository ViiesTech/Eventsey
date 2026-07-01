import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';
import { AppImages } from '../assets/Images/Index';
import Text from './CustomText';
import { AppColors } from '../utils/AppColors';
import { useNavigation } from '@react-navigation/native';

const LogoHeader = ({
  goBack = false,
  title,
  description,
  starImage = false,
  profileIcon = false,
  headerHeight = 17,
  user = false,
}) => {
  const navigation = useNavigation();
  let showNavigation = goBack || profileIcon;

  return (
    <View style={styles.container(headerHeight)}>
      {showNavigation && (
        <View style={styles.navigationHeaderRow}>
          {goBack && (
            <TouchableOpacity
              onPress={() => navigation?.goBack()}
              style={styles.backButtonTile}
              activeOpacity={0.7}
            >
              <Image
                source={AppImages.arrowLeft}
                style={styles.backArrowIcon}
                resizeMode="contain"
              />
              <Text style={styles.backActionLabelText}>Back</Text>
            </TouchableOpacity>
          )}

          {profileIcon && (
            <View style={styles.alignRight}>
              <TouchableOpacity
                style={styles.profileInteractiveBadgeTile}
                activeOpacity={0.85}
                onPress={() => navigation.navigate('VendorEditProfile')}
              >
                <View style={styles.userIconCircleBadgeFrame}>
                  <Image
                    source={AppImages.user}
                    style={styles.avatarDefaultVectorIcon}
                  />
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      {/* Brand Core Identity Area */}
      <View style={styles.brandHeroContainer(goBack)}>
        <View style={styles.avatarMainFrame}>
          <Image source={AppImages.logo} style={styles.logo} />
        </View>
        {!user && <Text style={styles.subtextTag}>Vendors</Text>}
      </View>

      {/* Screen Title & Description */}
      <View style={styles.headlineContainer}>
        {starImage && (
          <Image source={AppImages.starCircle} style={styles.centerStarIcon} />
        )}
        {title && <Text style={styles.mainHeadingTitle}>{title}</Text>}
        {description && (
          <Text style={styles.subHeadingDescription}>{description}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: headerHeight => ({
    flex: 1,
    maxHeight: responsiveHeight(headerHeight),
  }),
  navigationHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: responsiveHeight(1),
  },
  backButtonTile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrowIcon: {
    height: 20,
    width: 20,
    tintColor: AppColors.black,
    resizeMode: 'contain',
    marginRight: responsiveWidth(2),
  },
  backActionLabelText: {
    fontSize: responsiveFontSize(1.6),
    color: AppColors.black,
    fontWeight: '500',
  },
  brandHeroContainer: goBack => ({
    alignItems: 'center',
    marginTop: goBack ? -responsiveHeight(2) : responsiveHeight(1.5),
    marginBottom: responsiveHeight(1),
  }),
  avatarMainFrame: {
    width: responsiveWidth(20),
    height: responsiveWidth(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: responsiveHeight(50),
    width: responsiveWidth(50),
    resizeMode: 'contain',
  },
  subtextTag: {
    fontSize: responsiveFontSize(1.3),
    fontWeight: '700',
    color: AppColors.black,
    marginTop: responsiveHeight(0.6),
  },
  headlineContainer: {
    alignItems: 'center',
    marginVertical: responsiveHeight(1),
  },
  centerStarIcon: {
    width: 64,
    height: 64,
    marginBottom: responsiveHeight(1),
    resizeMode: 'contain',
  },
  mainHeadingTitle: {
    fontSize: responsiveFontSize(2),
    fontWeight: '500',
    color: AppColors.black,
    textAlign: 'center',
  },
  subHeadingDescription: {
    fontSize: responsiveFontSize(1.6),
    color: '#555555',
    textAlign: 'center',
    marginTop: responsiveHeight(0.6),
  },
  alignRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  profileInteractiveBadgeTile: {
    position: 'relative',
    marginRight: responsiveWidth(1),
  },
  userIconCircleBadgeFrame: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: AppColors.primary,
    borderWidth: 1,
    borderColor: AppColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarDefaultVectorIcon: {
    height: responsiveWidth(6),
    width: responsiveWidth(6),
    tintColor: AppColors.black,
  },
});

export default LogoHeader;
