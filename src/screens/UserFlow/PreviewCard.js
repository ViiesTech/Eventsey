import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import Text from '../../components/CustomText';
import ScreenWrapper from '../../components/ScreenWrapper';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../utils/Responsive_Dimensions';
import { AppColors } from '../../utils/AppColors';
import { AppImages } from '../../assets/Images/Index';

const PreviewCard = ({ navigation, route }) => {
  const incomingData = route?.params?.data;

  const viewShotRef = useRef(null);

  const displayDate = () => {
    if (!incomingData?.date) return '---';
    if (incomingData.date instanceof Date) {
      return incomingData.date.toISOString().split('T')[0];
    }
    return incomingData.date;
  };

  const displayTime = () => {
    if (!incomingData?.time) return '5:00 PM';
    if (incomingData.time instanceof Date) {
      return incomingData.time.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    }
    return incomingData.time;
  };

  const handleShareInvitation = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      const shareOptions = {
        title: 'Share Event Invitation',
        url: uri,
        type: 'image/jpeg',
      };
      await Share.open(shareOptions);
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  const handleDownloadAsImage = async () => {
    try {
      const uri = await viewShotRef.current.capture();

      await CameraRoll.saveAsset(uri, { type: 'photo' });

      Alert.alert(
        'Success',
        'Invitation card successfully saved to your gallery! 🎉',
      );
    } catch (error) {
      console.log('Gallery Save error:', error);
      Alert.alert(
        'Error',
        'Failed to save image to gallery. Please check permissions.',
      );
    }
  };

  //   console.log('incomingData:-', incomingData);
  return (
    <ScreenWrapper scrollable>
      <View style={styles.container}>
        {/* --- Header Section --- */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Image source={AppImages.arrowLeft} style={styles.backIcon} />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>

          <View style={styles.homeCircleButton}>
            <Image source={AppImages.home} style={styles.homeIcon} />
          </View>
        </View>

        {/* --- Screen Headliners --- */}
        <View style={styles.headlineContainer}>
          <Text style={styles.mainTitleText}>Event Invitation 💕</Text>
          <Text style={styles.subtitleText}>Share your special day</Text>
        </View>

        {/* Outer Card Wrapper wrapped inside ViewShot */}
        <ViewShot
          ref={viewShotRef}
          options={{ format: 'jpg', quality: 0.9 }}
          style={styles.cardMainWrapper}
        >
          {/* --- Invitation Header Coral Box --- */}
          <View style={styles.coralInvitationBox}>
            <Text style={styles.invitedLabelText}>You are invited to</Text>
            <View style={styles.namesRowContainer}>
              <Text style={styles.groomBrideName}>WILSON </Text>
              <Image source={AppImages.heart} style={styles.inlineHeartIcon} />
              <Text style={styles.groomBrideName}> EMMA</Text>
            </View>
            <Text style={styles.togetherFamilyText}>
              Together with our families
            </Text>
          </View>

          {/* Inner Content Container */}
          <View style={styles.cardInnerContent}>
            {/* --- Main Couple Display Photo --- */}
            <View style={styles.mainImageWrapper}>
              <Image
                source={
                  incomingData?.coverPhoto
                    ? { uri: incomingData.coverPhoto }
                    : AppImages.couplePlaceholder || {
                        uri: 'https://images.unsplash.com/photo-1519741497674-611481863552',
                      }
                }
                style={styles.coupleHeroImage}
              />
            </View>

            {/* --- Invitation Prose Quote --- */}
            <Text style={styles.invitationProseHeadline}>
              We joyfully invite you to celebrate our wedding
            </Text>

            {/* --- Date & Time Container Box --- */}
            <View style={styles.detailsWhiteCard}>
              <View style={styles.metaDetailsRow}>
                <View style={styles.iconBadgeSquare}>
                  <Image
                    source={AppImages.calendar}
                    style={styles.metaCardIcon}
                  />
                </View>
                <View style={styles.metaLabelsColumn}>
                  <Text style={styles.metaCardSubLabel}>Date</Text>
                  <Text style={styles.metaCardMainValue}>{displayDate()}</Text>
                </View>
              </View>

              <View style={[styles.metaDetailsRow, { marginBottom: 0 }]}>
                <View style={styles.iconBadgeSquare}>
                  <Image source={AppImages.time} style={styles.metaCardIcon} />
                </View>
                <View style={styles.metaLabelsColumn}>
                  <Text style={styles.metaCardSubLabel}>Time</Text>
                  <Text style={styles.metaCardMainValue}>{displayTime()}</Text>
                </View>
              </View>
            </View>

            {/* --- Venue Card Block --- */}
            <View style={styles.detailsWhiteCard}>
              <View
                style={[
                  styles.metaDetailsRow,
                  { alignItems: 'flex-start', marginBottom: 0 },
                ]}
              >
                <View style={styles.iconBadgeSquare}>
                  <Image
                    source={AppImages.location}
                    style={styles.metaCardIcon}
                  />
                </View>
                <View style={styles.metaLabelsColumn}>
                  <Text style={styles.metaCardSubLabel}>Venue</Text>
                  <Text style={styles.metaCardMainValue}>
                    {incomingData?.venueName ||
                      incomingData?.venue ||
                      'Grand Ballroom, The Plaza Hotel'}
                  </Text>
                  {incomingData?.venueAddress && (
                    <Text style={styles.venueSubAddressText}>
                      {incomingData.venueAddress}
                    </Text>
                  )}
                </View>
              </View>
            </View>

            {/* --- Miniature Circular Gallery Row --- */}
            <View style={styles.miniGalleryRow}>
              {incomingData?.galleryPhotos &&
              incomingData.galleryPhotos.length > 0
                ? incomingData.galleryPhotos.map((photoUri, index) => (
                    <Image
                      key={index}
                      source={{ uri: photoUri }}
                      style={styles.miniGalleryCircleAsset}
                    />
                  ))
                : [1, 2, 3, 4].map((_, index) => (
                    <Image
                      key={index}
                      source={
                        AppImages.galleryPlaceholder || {
                          uri: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc',
                        }
                      }
                      style={styles.miniGalleryCircleAsset}
                    />
                  ))}
            </View>

            {/* --- Footer Love Quote --- */}
            <Text style={styles.footerQuoteTypography}>
              "Join us for an evening of love, laughter, and happily ever after"
            </Text>
          </View>
        </ViewShot>

        {/* --- Action Buttons Block Suite --- */}
        <View style={styles.actionSuiteLayoutContainer}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.primaryShareBtn}
            onPress={handleShareInvitation}
          >
            <Image source={AppImages.share} style={styles.btnActionIcon} />
            <Text style={styles.primaryShareBtnText}>Share Invitation</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.secondaryDownloadBtn}
            onPress={handleDownloadAsImage}
          >
            <Image source={AppImages.download} style={styles.downloadIcon} />
            <Text style={styles.secondaryDownloadBtnText}>
              Download as Image
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(9),
    paddingBottom: responsiveHeight(4),
    marginTop: responsiveHeight(3),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveHeight(1.5),
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    height: responsiveHeight(1.8),
    width: responsiveWidth(3.8),
    marginRight: responsiveWidth(1.5),
    resizeMode: 'contain',
  },
  backText: {
    fontSize: responsiveFontSize(1.8),
    color: AppColors.black,
    fontWeight: '600',
  },
  homeCircleButton: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    borderRadius: responsiveWidth(5),
    backgroundColor: AppColors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeIcon: {
    width: responsiveWidth(4.5),
    height: responsiveWidth(4.5),
    resizeMode: 'contain',
    tintColor: AppColors.white,
  },
  headlineContainer: {
    marginBottom: responsiveHeight(2.5),
  },
  mainTitleText: {
    fontSize: responsiveFontSize(3.0),
    fontWeight: '700',
    color: AppColors.black,
  },
  subtitleText: {
    fontSize: responsiveFontSize(1.7),
    color: '#555555',
    marginTop: responsiveHeight(0.2),
  },
  cardMainWrapper: {
    backgroundColor: 'rgba(255, 246, 249, 1)',
    borderRadius: 20,
    overflow: 'hidden',
  },
  coralInvitationBox: {
    backgroundColor: AppColors.primary,
    paddingVertical: responsiveHeight(2.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  invitedLabelText: {
    fontSize: responsiveFontSize(1.6),
    color: AppColors.black,
    fontWeight: '500',
    marginBottom: responsiveHeight(0.5),
  },
  namesRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: responsiveHeight(0.2),
  },
  groomBrideName: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: '800',
    color: AppColors.black,
    letterSpacing: 0.5,
  },
  inlineHeartIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: AppColors.black,
    marginHorizontal: responsiveWidth(1),
  },
  togetherFamilyText: {
    fontSize: responsiveFontSize(1.4),
    color: '#444444',
    fontWeight: '400',
    marginTop: responsiveHeight(0.5),
  },
  cardInnerContent: {
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(2.5),
  },
  mainImageWrapper: {
    width: '100%',
    height: responsiveHeight(34),
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: responsiveHeight(2.5),
  },
  coupleHeroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  invitationProseHeadline: {
    fontSize: responsiveFontSize(1.9),
    color: AppColors.black,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 24,
    paddingHorizontal: responsiveWidth(2),
    marginBottom: responsiveHeight(2.5),
  },
  detailsWhiteCard: {
    backgroundColor: 'rgba(253, 238, 241, 1)',
    borderRadius: 15,
    padding: responsiveWidth(4.5),
    borderWidth: 0.3,
    borderColor: AppColors.primary,
    marginBottom: responsiveHeight(2),
  },
  metaDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
  },
  iconBadgeSquare: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  metaCardIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: AppColors.secondary,
  },
  metaLabelsColumn: {
    flex: 1,
    marginLeft: responsiveWidth(4),
  },
  metaCardSubLabel: {
    fontSize: responsiveFontSize(1.4),
    color: '#71717A',
    fontWeight: '400',
  },
  metaCardMainValue: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: '600',
    color: AppColors.black,
    marginTop: responsiveHeight(0.2),
  },
  venueSubAddressText: {
    fontSize: responsiveFontSize(1.4),
    color: '#6B7280',
    marginTop: responsiveHeight(0.4),
    lineHeight: 18,
  },
  miniGalleryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: responsiveHeight(1.5),
  },
  miniGalleryCircleAsset: {
    width: responsiveWidth(12),
    height: responsiveWidth(12),
    borderRadius: responsiveWidth(6),
    resizeMode: 'cover',
    borderWidth: 1.5,
    borderColor: AppColors.white,
    marginHorizontal: responsiveWidth(1.5),
  },
  footerQuoteTypography: {
    fontSize: responsiveFontSize(1.6),
    fontStyle: 'italic',
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 22,
    marginTop: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(2),
    paddingBottom: responsiveHeight(2.5),
  },
  actionSuiteLayoutContainer: {
    width: '100%',
    marginTop: responsiveHeight(2.5),
  },
  primaryShareBtn: {
    flexDirection: 'row',
    backgroundColor: AppColors.secondary,
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsiveHeight(1.5),
  },
  primaryShareBtnText: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: '600',
    color: AppColors.black,
  },
  btnActionIcon: {
    width: responsiveWidth(4),
    height: responsiveWidth(4),
    resizeMode: 'contain',
    marginRight: responsiveWidth(2),
    tintColor: AppColors.black,
  },
  secondaryDownloadBtn: {
    flexDirection: 'row',
    backgroundColor: AppColors.white,
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  secondaryDownloadBtnText: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: '500',
    color: AppColors.black,
  },
  downloadIcon: {
    width: responsiveWidth(4),
    height: responsiveWidth(4),
    resizeMode: 'contain',
    marginRight: responsiveWidth(2),
    tintColor: AppColors.black,
  },
});

export default PreviewCard;
