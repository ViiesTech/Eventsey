import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Text from '../../components/CustomText';
import ScreenWrapper from '../../components/ScreenWrapper';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../utils/Responsive_Dimensions';
import { AppColors } from '../../utils/AppColors';
import { AppImages } from '../../assets/Images/Index';

const VendorDetails = ({ navigation, route }) => {
  const data = route.params?.data || {};
  const userFlow = route.params?.type === 'user';

  // Data structural schema synchronized with asset-level parameters
  const vendorProfile = {
    name: data.name || 'Vendor Name',
    category: data.category || 'Category',
    rating: data.rating || '0.0',
    reviewsCount: data.reviewsCount || '0 reviews',
    location: data.location || 'Unknown',
    jobsCount: data.jobsCount || '0 jobs',
    priceRange: data.priceRange || '$0 - $0',
    about:
      'We are a professional photography team specializing in wedding photography. With over 10 years of experience, we capture your special moments with creativity and passion.',
    services: [
      'Full Day Coverage (8 hours)',
      'Pre-wedding Photoshoot',
      'High-Resolution Photos',
      'Photo Album (50 pages)',
      'Same Day Editing',
      'Drone Photography',
    ],
    metrics: [
      { id: '1', value: '10+', label: 'Years\nExperience' },
      { id: '2', value: '85', label: 'Completed\nProjects' },
      { id: '3', value: data.rating || '4.9', label: 'Average Rating' },
      { id: '4', value: '2 hours', label: 'Response Time' },
    ],
    portfolioPlaceholders: [1, 2, 3, 4, 5, 6],
  };

  return (
    <ScreenWrapper>
      <View style={styles.mainInnerCanvasSheet}>
        {/* Navigation Action Header Sub-Bar Row */}
        <View style={styles.navigationHeaderActionFlexRow}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.backButtonTriggerInline}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={AppImages.arrowLeft}
              style={styles.backArrowAssetIcon}
            />
            <Text style={styles.backButtonLabelTextText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.homeCircleIconActionButton}
          >
            <Image source={AppImages.home} style={styles.homeAssetIcon} />
          </TouchableOpacity>
        </View>

        {/* Primary Main Title Layout */}
        <Text style={styles.screenMainHeadlineText}>View Vendor Profile</Text>

        {/* Scrollable Information Container Body Layout */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.detailsViewScrollAreaContainer}
        >
          {/* CARD 1: Identity & Pricing Capsule Summary */}
          <View style={styles.cardInfoWhiteContainerBox}>
            <Text style={styles.vendorBrandHeadingTitleText}>
              {vendorProfile.name}
            </Text>
            <Text style={styles.vendorCategorySublabelText}>
              {vendorProfile.category}
            </Text>

            <View style={styles.identityMetaDetailsInlineCompositeFlexRow}>
              <Text style={styles.ratingStarGraphicGlyph}>★</Text>
              <Text style={styles.ratingNumericMetricValueText}>
                {vendorProfile.rating}{' '}
              </Text>
              <Text style={styles.reviewsMetaCountVolumeText}>
                ({vendorProfile.reviewsCount})
              </Text>

              <Text style={styles.metaInlineSeparationDot}> • </Text>
              <Image
                source={AppImages.location}
                style={styles.cardInlineAssetIcon}
              />
              <Text style={styles.metaItemLabelStringBodyText}>
                {vendorProfile.location}
              </Text>

              <Text style={styles.metaInlineSeparationDot}> • </Text>
              <Image
                source={AppImages.jobs}
                style={styles.cardInlineAssetIcon}
              />
              <Text style={styles.metaItemLabelStringBodyText}>
                {vendorProfile.jobsCount}
              </Text>
            </View>

            <View style={styles.pricingSectionWrapperInlineFlexRow}>
              <Text style={styles.pricingRangeEstimateMainValueStringText}>
                {vendorProfile.priceRange}
              </Text>
            </View>
          </View>

          {/* CARD 2: About Description Paragraph Text Frame Block */}
          <View style={styles.cardInfoWhiteContainerBox}>
            <Text style={styles.sectionBlockHeaderHeadingTitleText}>About</Text>
            <Text
              style={styles.aboutSectionParagraphDescriptionBodyContentText}
            >
              {vendorProfile.about}
            </Text>
          </View>

          {/* CARD 3: Services Included Bullet Lists Checklist Frame Block */}
          <View style={styles.cardInfoWhiteContainerBox}>
            <Text style={styles.sectionBlockHeaderHeadingTitleText}>
              Services Included
            </Text>
            {vendorProfile.services.map((service, index) => (
              <View
                key={index}
                style={styles.serviceChecklistItemInlineFlexRow}
              >
                <View style={styles.checkmarkIconCircleBadgeBadge}>
                  <Text style={styles.checkmarkIconWhiteGlyphCharacter}>✓</Text>
                </View>
                <Text style={styles.serviceItemLabelDescriptionBodyStringText}>
                  {service}
                </Text>
              </View>
            ))}
          </View>

          {/* CARD 4: Professional Metrics KPI Quad Layout Grid */}
          <View style={styles.cardInfoWhiteContainerBox}>
            <Text style={styles.sectionBlockHeaderHeadingTitleText}>
              Professional Details
            </Text>
            <View style={styles.metricsQuadLayoutFlexWrapGridContainerRow}>
              {vendorProfile.metrics.map(metric => (
                <View
                  key={metric.id}
                  style={styles.metricIndividualDataBlockItemColumnBox}
                >
                  <Text style={styles.metricNumericKpiValueLabelText}>
                    {metric.value}
                  </Text>
                  <Text style={styles.metricMetaDescriptionLabelSubtext}>
                    {metric.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* CARD 5: Portfolio Grid Frame Box Elements layout mapping */}
          <View style={styles.cardInfoWhiteContainerBox}>
            <Text style={styles.sectionBlockHeaderHeadingTitleText}>
              Portfolio
            </Text>
            <View style={styles.portfolioGridItemsFlexWrapContainerRow}>
              {vendorProfile.portfolioPlaceholders.map((item, idx) => (
                <View
                  key={idx}
                  style={styles.portfolioIndividualSquareItemBoxFrame}
                >
                  <Image
                    source={data.categoryIcon || AppImages.camera}
                    style={styles.portfolioSquarePlaceholderAsset}
                  />
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* BOTTOM UTILITY ACTIONS SHELF PANEL COMPONENT */}
        <View style={styles.bottomFixedActionControlsWrapperStickyShelf}>
          {/* Main Hire status button component representation */}
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.primaryStatusHiredButtonInstance}
          >
            <Image
              source={AppImages.tick}
              style={styles.hiredStatusCheckmarkIconGlyphSymbol}
            />
            <Text style={styles.primaryStatusHiredButtonLabelTextString}>
              Hired
            </Text>
          </TouchableOpacity>

          {/* Secondary communication links button layouts wrapper bar */}
          {!userFlow && (
            <View style={styles.communicationTriggersFlexRowActionContainer}>
              <TouchableOpacity
                activeOpacity={0.75}
                style={styles.communicationActionControlBtnItem}
                onPress={() =>
                  navigation.navigate('UserChat', { thread: data })
                }
              >
                <Image
                  source={AppImages.chat}
                  style={styles.bottomBarActionAssetIcon}
                />
                <Text style={styles.communicationActionControlBtnItemLabelText}>
                  Message
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.75}
                style={styles.communicationActionControlBtnItem}
              >
                <Image
                  source={AppImages.phone}
                  style={styles.bottomBarActionAssetIcon}
                />
                <Text style={styles.communicationActionControlBtnItemLabelText}>
                  Call
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  mainInnerCanvasSheet: {
    flex: 1,
    marginTop: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(9),
    paddingTop: responsiveHeight(2.5),
  },
  navigationHeaderActionFlexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
  },
  backButtonTriggerInline: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backArrowAssetIcon: {
    height: responsiveHeight(2),
    width: responsiveWidth(4),
    marginRight: responsiveWidth(2),
    resizeMode: 'contain',
  },
  backButtonLabelTextText: {
    fontSize: responsiveFontSize(2),
    color: '#333333',
    fontWeight: '600',
  },
  homeCircleIconActionButton: {
    width: responsiveWidth(11),
    height: responsiveWidth(11),
    borderRadius: responsiveWidth(5.5),
    backgroundColor: '#262626',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeAssetIcon: {
    width: responsiveWidth(5),
    height: responsiveWidth(5),
    resizeMode: 'contain',
    tintColor: AppColors.primary,
  },
  screenMainHeadlineText: {
    fontSize: responsiveFontSize(3.2),
    fontWeight: '800',
    color: AppColors.black,
    marginBottom: responsiveHeight(2.5),
  },
  detailsViewScrollAreaContainer: {
    paddingBottom: responsiveHeight(28),
  },
  cardInfoWhiteContainerBox: {
    backgroundColor: AppColors.white,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    padding: responsiveWidth(5),
    marginBottom: responsiveHeight(2.5),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  vendorBrandHeadingTitleText: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '700',
    color: AppColors.black,
    marginBottom: responsiveHeight(0.3),
  },
  vendorCategorySublabelText: {
    fontSize: responsiveFontSize(1.7),
    color: '#888888',
    fontWeight: '500',
    marginBottom: responsiveHeight(2.2),
  },
  identityMetaDetailsInlineCompositeFlexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(2.5),
  },
  ratingStarGraphicGlyph: {
    color: '#FFC107',
    fontSize: responsiveFontSize(1.6),
    marginRight: responsiveWidth(1),
  },
  ratingNumericMetricValueText: {
    fontSize: responsiveFontSize(1.5),
    fontWeight: '700',
    color: AppColors.black,
  },
  reviewsMetaCountVolumeText: {
    fontSize: responsiveFontSize(1.4),
    color: '#888888',
    fontWeight: '400',
  },
  metaInlineSeparationDot: {
    fontSize: responsiveFontSize(1.4),
    color: '#888888',
    marginHorizontal: responsiveWidth(1),
  },
  cardInlineAssetIcon: {
    height: responsiveHeight(1.8),
    width: responsiveWidth(3.6),
    marginRight: responsiveWidth(1),
    resizeMode: 'contain',
    tintColor: AppColors.liteGray,
  },
  metaItemLabelStringBodyText: {
    fontSize: responsiveFontSize(1.4),
    color: '#666666',
    fontWeight: '500',
  },
  pricingSectionWrapperInlineFlexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pricingRangeEstimateMainValueStringText: {
    fontSize: responsiveFontSize(2.1),
    fontWeight: '700',
    color: AppColors.darkPink, // Match primary accent pricing color token from Vendors track
  },
  sectionBlockHeaderHeadingTitleText: {
    fontSize: responsiveFontSize(2.1),
    fontWeight: '700',
    color: AppColors.black,
    marginBottom: responsiveHeight(1.8),
  },
  aboutSectionParagraphDescriptionBodyContentText: {
    fontSize: responsiveFontSize(1.6),
    color: '#555555',
    lineHeight: responsiveHeight(2.4),
    fontWeight: '400',
  },
  serviceChecklistItemInlineFlexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(1.4),
  },
  checkmarkIconCircleBadgeBadge: {
    width: responsiveWidth(5.2),
    height: responsiveWidth(5.2),
    borderRadius: 15,
    backgroundColor: '#262626',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: responsiveWidth(3.5),
  },
  checkmarkIconWhiteGlyphCharacter: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.2),
    fontWeight: '700',
  },
  serviceItemLabelDescriptionBodyStringText: {
    fontSize: responsiveFontSize(1.6),
    color: '#555555',
    fontWeight: '500',
  },
  metricsQuadLayoutFlexWrapGridContainerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricIndividualDataBlockItemColumnBox: {
    backgroundColor: '#F9F6F2',
    borderRadius: 18,
    width: '48%',
    paddingVertical: responsiveHeight(1.8),
    paddingHorizontal: responsiveWidth(3),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsiveHeight(1.5),
  },
  metricNumericKpiValueLabelText: {
    fontSize: responsiveFontSize(2.6),
    fontWeight: '700',
    color: AppColors.black,
    marginBottom: responsiveHeight(0.4),
  },
  metricMetaDescriptionLabelSubtext: {
    fontSize: responsiveFontSize(1.35),
    color: '#777777',
    fontWeight: '500',
    textAlign: 'center',
  },
  portfolioGridItemsFlexWrapContainerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    height: responsiveHeight(15.5),
  },
  portfolioIndividualSquareItemBoxFrame: {
    width: '31%',
    aspectRatio: 1,
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsiveHeight(1.5),
  },
  portfolioSquarePlaceholderAsset: {
    width: responsiveWidth(8),
    height: responsiveWidth(8),
    resizeMode: 'contain',
    opacity: 0.15,
  },
  bottomFixedActionControlsWrapperStickyShelf: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: AppColors.white,
    paddingHorizontal: responsiveWidth(9),
    paddingTop: responsiveHeight(1.5),
    paddingBottom: responsiveHeight(3.5),
    borderTopWidth: 1,
    borderTopColor: '#FAFAFA',
  },
  primaryStatusHiredButtonInstance: {
    flexDirection: 'row',
    backgroundColor: AppColors.primary,
    borderRadius: 15,
    paddingVertical: responsiveHeight(1.8),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsiveHeight(1.5),
    shadowColor: AppColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  hiredStatusCheckmarkIconGlyphSymbol: {
    width: responsiveWidth(4.2),
    height: responsiveWidth(4.2),
    resizeMode: 'contain',
    tintColor: AppColors.black,
    marginRight: responsiveWidth(1.5),
  },
  primaryStatusHiredButtonLabelTextString: {
    color: AppColors.black,
    fontSize: responsiveFontSize(1.8),
    fontWeight: '500',
  },
  communicationTriggersFlexRowActionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  communicationActionControlBtnItem: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    backgroundColor: AppColors.white,
    borderRadius: 16,
    paddingVertical: responsiveHeight(1.6),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: responsiveWidth(1),
  },
  bottomBarActionAssetIcon: {
    width: responsiveWidth(4.2),
    height: responsiveWidth(4.2),
    resizeMode: 'contain',
    tintColor: AppColors.black,
    marginRight: responsiveWidth(1.5),
  },
  communicationActionControlBtnItemLabelText: {
    color: AppColors.black,
    fontSize: responsiveFontSize(1.7),
    fontWeight: '500',
  },
});

export default VendorDetails;
