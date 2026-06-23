import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../utils/Responsive_Dimensions';
import { AppImages } from '../../assets/Images/Index';
import { AppColors } from '../../utils/AppColors';

const JobDetails = ({ navigation, route }) => {
  // Navigation handling back arrow utility
  const handleBackPress = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  return (
    <ScreenWrapper scrollable>
      <View style={styles.contentContainer}>
        {/* Top Header Controls with Persistent Brand Logo */}
        <View style={styles.navigationHeaderRow}>
          <TouchableOpacity
            onPress={handleBackPress}
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
        </View>

        {/* Brand Anchor Display Frame */}
        <View style={styles.brandHeroContainer}>
          <View style={styles.avatarMainFrame}>
            <Image source={AppImages.logo} style={styles.logo} />
          </View>
          <Text style={styles.subtextTag}>Vendors</Text>
        </View>

        {/* Category & Status Badge Row */}
        <View style={styles.titleStatusHeaderRow}>
          <Text style={styles.jobCategoryHeadingText}>Catering</Text>
          <View style={styles.statusBadgeCapsule}>
            <Text style={styles.statusBadgeValueText}>Accepted</Text>
          </View>
        </View>

        {/* Client Budget Showcase Segment Hero Banner */}
        <View style={styles.budgetHeroCardFrame}>
          <View style={styles.budgetTextInfoBlock}>
            <Text style={styles.budgetSectionLabel}>Client Budget</Text>
            <Text style={styles.budgetValueAmountText}>$3,500</Text>
          </View>
          <View style={styles.currencyCircularIconBadge}>
            <Image
              source={AppImages.dollarCircle}
              style={styles.currencySymbolText}
            />
          </View>
          <Text style={styles.budgetFootnoteHintText}>
            Set by Sarah & John. You can propose a different total.
          </Text>
        </View>

        {/* Group Section: Event Details Block */}
        <Text style={styles.blockSectionHeadingTitleText}>Event Details</Text>
        <View style={styles.detailsInformationWrapperCard}>
          <View style={styles.specificationsGridRowItem}>
            <View style={styles.metaIconHolderBox}>
              <Image
                source={AppImages.calendar}
                style={styles.vectorIconPlaceholder}
              />
            </View>
            <View style={styles.metaDataTextLabelGroup}>
              <Text style={styles.metaDataTopLabelTitleText}>Event Date</Text>
              <Text style={styles.metaDataActualValueText}>June 15, 2024</Text>
            </View>
          </View>

          <View style={[styles.specificationsGridRowItem, { marginBottom: 0 }]}>
            <View style={styles.metaIconHolderBox}>
              <Image
                source={AppImages.location}
                style={styles.vectorIconPlaceholder}
              />
            </View>
            <View style={styles.metaDataTextLabelGroup}>
              <Text style={styles.metaDataTopLabelTitleText}>Venue</Text>
              <Text style={styles.metaDataActualValueText}>
                Grand Hotel Ballroom
              </Text>
            </View>
          </View>
        </View>

        {/* Group Section: Client Contact Information Block */}
        <Text style={styles.blockSectionHeadingTitleText}>
          Client Information
        </Text>
        <View style={styles.detailsInformationWrapperCard}>
          <View style={styles.specificationsGridRowItem}>
            <View style={styles.metaIconHolderBox}>
              <Image
                source={AppImages.user}
                style={styles.vectorIconPlaceholder}
              />
            </View>
            <View style={styles.metaDataTextLabelGroup}>
              <Text style={styles.metaDataTopLabelTitleText}>Client Name</Text>
              <Text style={styles.metaDataActualValueText}>Sarah & John</Text>
            </View>
          </View>

          <View style={styles.specificationsGridRowItem}>
            <View style={styles.metaIconHolderBox}>
              <Image
                source={AppImages.phone}
                style={styles.vectorIconPlaceholder}
              />
            </View>
            <View style={styles.metaDataTextLabelGroup}>
              <Text style={styles.metaDataTopLabelTitleText}>Phone</Text>
              <Text style={styles.metaDataActualValueText}>
                +1 (555) 123-4567
              </Text>
            </View>
          </View>

          <View style={[styles.specificationsGridRowItem, { marginBottom: 0 }]}>
            <View style={styles.metaIconHolderBox}>
              <Image
                source={AppImages.email}
                style={styles.vectorIconPlaceholder}
              />
            </View>
            <View style={styles.metaDataTextLabelGroup}>
              <Text style={styles.metaDataTopLabelTitleText}>Email</Text>
              <Text style={styles.metaDataActualValueText}>
                sarah.john@email.com
              </Text>
            </View>
          </View>
        </View>

        {/* Group Section: Project Overview Descriptions */}
        <Text style={styles.blockSectionHeadingTitleText}>Description</Text>
        <View style={styles.detailsInformationWrapperCard}>
          <Text style={styles.mainDescriptionParagraphBodyText}>
            Full catering service for 150 guests, including appetizers, main
            course, and desserts.
          </Text>

          {/* Internal Note Segment Box */}
          <View style={styles.specialNoteHighlightContainer}>
            <Text style={styles.specialNoteEmbeddedBodyText}>
              <Text style={styles.specialNoteLabelWeightSpan}>
                Special Note:{' '}
              </Text>
              Vegetarian options needed for 20 guests
            </Text>
          </View>
        </View>

        {/* Bottom Interactive Command Buttons Container */}
        <View style={styles.footerActionControlsGroupWrapper}>
          <TouchableOpacity
            style={styles.sendProposalMainActionButtonTile}
            activeOpacity={0.85}
          >
            <Image
              source={AppImages.send}
              style={styles.sendProposalButtonIconGraphic}
            />
            <Text style={styles.sendProposalButtonLabelText}>
              Send Proposal
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.initiateChatSecondaryActionButtonTile}
            activeOpacity={0.8}
          >
            <Image
              source={AppImages.chat}
              style={styles.chatActionIconGraphic}
            />
            <Text style={styles.chatActionLabelText}>Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ height: responsiveHeight(4) }} />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: AppColors.white || '#FFFFFF',
    marginHorizontal: responsiveWidth(6),
    borderRadius: 36,
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(4),
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(2),
    minHeight: '95%',
  },
  navigationHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  brandHeroContainer: {
    alignItems: 'center',
    marginTop: -responsiveHeight(2),
    marginBottom: responsiveHeight(1),
  },
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
  titleStatusHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: responsiveHeight(1.5),
  },
  jobCategoryHeadingText: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: '700',
    color: '#1A1A1A',
  },
  statusBadgeCapsule: {
    backgroundColor: '#F3A492', // Theme status matching active backdrop tint palette
    paddingHorizontal: responsiveWidth(3.5),
    paddingVertical: responsiveHeight(0.5),
    borderRadius: 14,
  },
  statusBadgeValueText: {
    fontSize: responsiveFontSize(1.4),
    color: '#FFFFFF',
    fontWeight: '600',
  },
  budgetHeroCardFrame: {
    backgroundColor: '#8ADED5',
    borderRadius: 18,
    padding: responsiveWidth(4.5),
    position: 'relative',
    marginBottom: responsiveHeight(2.5),
  },
  budgetTextInfoBlock: {
    flexDirection: 'column',
  },
  budgetSectionLabel: {
    fontSize: responsiveFontSize(1.5),
    color: '#1A2E2B',
    fontWeight: '500',
  },
  budgetValueAmountText: {
    fontSize: responsiveFontSize(3.6),
    fontWeight: '700',
    color: '#1A2E2B',
    marginVertical: responsiveHeight(0.2),
  },
  currencyCircularIconBadge: {
    position: 'absolute',
    right: responsiveWidth(4),
  },
  currencySymbolText: {
    height: responsiveHeight(8),
    width: responsiveWidth(8),
    resizeMode: 'contain',
  },
  budgetFootnoteHintText: {
    fontSize: responsiveFontSize(1.4),
    color: '#1A2E2B',
    opacity: 0.8,
    marginTop: responsiveHeight(1),
  },
  blockSectionHeadingTitleText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: responsiveHeight(1.5),
    marginBottom: responsiveHeight(1.2),
  },
  detailsInformationWrapperCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 16,
    padding: responsiveWidth(4.5),
    marginBottom: responsiveHeight(1.5),
  },
  specificationsGridRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
  },
  metaIconHolderBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: AppColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: responsiveWidth(4),
  },
  vectorIconPlaceholder: {
    height: responsiveHeight(5),
    width: responsiveWidth(5),
    resizeMode: 'contain',
    tintColor: AppColors.white,
  },
  metaDataTextLabelGroup: {
    flexDirection: 'column',
  },
  metaDataTopLabelTitleText: {
    fontSize: responsiveFontSize(1.35),
    color: '#9E9E9E',
    fontWeight: '500',
    marginBottom: responsiveHeight(0.2),
  },
  metaDataActualValueText: {
    fontSize: responsiveFontSize(1.65),
    color: '#1A1A1A',
    fontWeight: '600',
  },
  mainDescriptionParagraphBodyText: {
    fontSize: responsiveFontSize(1.6),
    color: '#666666',
    lineHeight: responsiveFontSize(2.3),
  },
  specialNoteHighlightContainer: {
    backgroundColor: '#F9F5F1',
    borderRadius: 12,
    padding: responsiveWidth(3.5),
    borderWidth: 1,
    borderColor: '#EFEAE4',
    marginTop: responsiveHeight(2),
  },
  specialNoteEmbeddedBodyText: {
    fontSize: responsiveFontSize(1.45),
    color: '#4A4A4A',
    lineHeight: responsiveFontSize(2.1),
  },
  specialNoteLabelWeightSpan: {
    fontWeight: '700',
    color: '#1A1A1A',
  },
  footerActionControlsGroupWrapper: {
    marginTop: responsiveHeight(2.5),
  },
  sendProposalMainActionButtonTile: {
    backgroundColor: AppColors.secondary,
    borderRadius: 10,
    height: responsiveHeight(5),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(1.5),
  },
  sendProposalButtonIconGraphic: {
    height: responsiveHeight(4),
    width: responsiveWidth(4),
    resizeMode: 'contain',
    tintColor: AppColors.black,
    marginRight: responsiveWidth(2),
  },
  sendProposalButtonLabelText: {
    fontSize: responsiveFontSize(1.7),
    color: AppColors.black,
    fontWeight: '500',
  },
  initiateChatSecondaryActionButtonTile: {
    backgroundColor: '#F2ECE6',
    borderRadius: 10,
    height: responsiveHeight(5),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatActionIconGraphic: {
    height: responsiveHeight(4),
    width: responsiveWidth(4),
    resizeMode: 'contain',
    tintColor: AppColors.black,
    marginRight: responsiveWidth(2),
  },
  chatActionLabelText: {
    fontSize: responsiveFontSize(1.7),
    color: AppColors.black,
    fontWeight: '500',
  },
});

export default JobDetails;
