import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
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

const UserJobDetails = ({ navigation, route }) => {
  let data = route?.params?.data;

  // Mock listing details & applicants array exactly from Screenshot 2026-07-01 at 4.53.30 AM.png
  const jobMeta = {
    title: 'Wedding Photographer Needed',
    status: 'Open',
    category: 'Photography',
    budget: '$2000 - $3000',
    location: 'New York, NY',
    serviceDate: 'Monday, December 15, 2025',
    description:
      'Looking for an experienced photographer for our wedding ceremony and reception.',
  };

  const applicantsList = [
    {
      id: '1',
      name: 'Sarah Photography',
      initials: 'S',
      rating: '4.9',
      reviews: '128 reviews',
      location: 'New York, NY',
      experience: '8 years exp',
      proposalAmount: '$2,500',
      bio: 'Award-winning photographer specializing in romantic wedding photography.',
      tags: ['Weddings', 'Portraits', 'Events'],
    },
    {
      id: '2',
      name: 'John Captures',
      initials: 'S',
      rating: '4.9',
      reviews: '128 reviews',
      location: 'Brooklyn, NY',
      experience: '5 years exp',
      proposalAmount: '$2,200',
      bio: 'Passionate about capturing authentic moments and emotions.',
      tags: ['Weddings', 'Portraits', 'Events'],
    },
    {
      id: '3',
      name: 'Elite Moments Studio',
      initials: 'S',
      rating: '4.9',
      reviews: '128 reviews',
      location: 'New York, NY',
      experience: '8 years exp',
      proposalAmount: '$1,800',
      bio: 'Award-winning photographer specializing in romantic wedding photography.',
      tags: ['Weddings', 'Portraits', 'Events'],
    },
  ];

  const renderApplicantCard = ({ item }) => (
    <View style={styles.applicantMainCardFrame}>
      {/* Dynamic Right Side Proposal Floating Tag */}
      <Text style={styles.applicantProposalTextAmount}>
        {item.proposalAmount}
      </Text>

      {/* Main Row Info Block */}
      <View style={styles.applicantProfileMetaFlexRow}>
        {/* Avatar Initials Placeholder Circle */}
        <View style={styles.avatarInitialsCircleWrapper}>
          <Text style={styles.avatarTextLabelSymbol}>{item.initials}</Text>
        </View>

        {/* Text Metrics Alignment */}
        <View style={styles.applicantNameDetailContainerColumn}>
          <Text style={styles.applicantProfileNameText}>{item.name}</Text>

          {/* Star Rating Layout Block */}
          <View style={styles.starRatingInlineFlexRow}>
            <Image source={AppImages.star} style={styles.starIconSmallAsset} />
            <Text style={styles.ratingNumberBoldText}>{item.rating} </Text>
            <Text style={styles.reviewsCountMutedTypography}>
              ({item.reviews})
            </Text>
          </View>

          {/* Geo Meta + Experience Sub Text Blocks */}
          <View style={styles.applicantSubDetailsHorizontalLine}>
            <Image
              source={AppImages.locationMarkerIcon}
              style={styles.subMetaTinyIconAsset}
            />
            <Text style={styles.subMetaMetricsLabelText}>
              {item.location} • {item.experience}
            </Text>
          </View>
        </View>
      </View>

      {/* Short Dynamic Professional Summary Pitch */}
      <Text style={styles.applicantBioParagraphSummary}>{item.bio}</Text>

      {/* Skill / Keyword Capsule Tags Flex Row Blocks */}
      <View style={styles.skillsCapsulesWrapperFlexRow}>
        {item.tags.map((tag, index) => (
          <View key={index} style={styles.skillCapsulePillItem}>
            <Text style={styles.skillCapsuleTextTypography}>{tag}</Text>
          </View>
        ))}
      </View>

      {/* Primary Split Action Controls Matrix Row */}
      <View style={styles.applicantActionControlsSplitRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.messageDirectActionTriggerButton}
          onPress={() => navigation.navigate('UserChat', { thread: item })}
        >
          <Image
            source={AppImages.messageCircleIcon}
            style={styles.messageActionBtnIconAsset}
          />
          <Text style={styles.messageButtonLabelText}>Message</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.viewProfileExternalTriggerButton}
          onPress={() =>
            navigation.navigate('VendorDetails', { data: item, type: 'user' })
          }
        >
          <Text style={styles.viewProfileButtonLabelText}>View Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // List Header Element containing main Job Parameters Specs Info Card
  const renderJobDetailsHeaderCard = () => (
    <View style={styles.topCompositeLayoutCardBlock}>
      {/* Structural Parameters Specs Main Layout Card */}
      <View style={styles.jobSpecsDetailsInformationWrapperCard}>
        <Text style={styles.jobSpecsInnerHeadingText}>Job Details</Text>

        {/* Param Spec Row item: Category */}
        <View style={styles.jobParameterDetailFlexRowItem}>
          <View style={styles.parameterLeftIconBoxContainer}>
            <Image
              source={AppImages.jobs}
              style={styles.paramItemSideIconAsset}
            />
          </View>
          <View style={styles.parameterRightLabelsColumn}>
            <Text style={styles.paramSubLabelTitleMutedText}>Category</Text>
            <Text style={styles.paramValueOutputBoldTypography}>
              {jobMeta.category}
            </Text>
          </View>
        </View>

        {/* Param Spec Row item: Budget */}
        <View style={styles.jobParameterDetailFlexRowItem}>
          <View style={styles.parameterLeftIconBoxContainer}>
            <Image
              source={AppImages.dollar}
              style={styles.paramItemSideIconAsset}
            />
          </View>
          <View style={styles.parameterRightLabelsColumn}>
            <Text style={styles.paramSubLabelTitleMutedText}>Budget</Text>
            <Text style={styles.paramValueOutputBoldTypography}>
              {jobMeta.budget}
            </Text>
          </View>
        </View>

        {/* Param Spec Row item: Location */}
        <View style={styles.jobParameterDetailFlexRowItem}>
          <View style={styles.parameterLeftIconBoxContainer}>
            <Image
              source={AppImages.location}
              style={styles.paramItemSideIconAsset}
            />
          </View>
          <View style={styles.parameterRightLabelsColumn}>
            <Text style={styles.paramSubLabelTitleMutedText}>Location</Text>
            <Text style={styles.paramValueOutputBoldTypography}>
              {jobMeta.location}
            </Text>
          </View>
        </View>

        {/* Param Spec Row item: Service Date */}
        <View style={styles.jobParameterDetailFlexRowItem}>
          <View style={styles.parameterLeftIconBoxContainer}>
            <Image
              source={AppImages.calendar}
              style={styles.paramItemSideIconAsset}
            />
          </View>
          <View style={styles.parameterRightLabelsColumn}>
            <Text style={styles.paramSubLabelTitleMutedText}>Service Date</Text>
            <Text style={styles.paramValueOutputBoldTypography}>
              {jobMeta.serviceDate}
            </Text>
          </View>
        </View>

        {/* Separator Divider Line Line break component style */}
        <View style={styles.horizontalDividerLineBreakElement} />

        {/* Block Row Description Box text layout */}
        <Text style={styles.jobDescriptionSectionHeaderLabelTitleText}>
          Description
        </Text>
        <Text style={styles.jobDescriptionTextContentBody}>
          {jobMeta.description}
        </Text>
      </View>

      {/* Applicants Section Header Dynamic Tracking Label */}
      <View style={styles.applicantsCounterSectionHeadingRow}>
        <Text style={styles.applicantsSectionTitleLabelHeadlineText}>
          Applicants
        </Text>
        <View style={styles.applicantsCounterPillMetricBox}>
          <Text style={styles.applicantsCountValueMetricLabelText}>
            {applicantsList.length} total
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScreenWrapper>
      <View style={styles.screenMainLayoutCanvasViewport}>
        {/* Dynamic Static Absolute Navigation Bar Setup Top Bar Stack header inline alignment */}
        <View style={styles.stickyHeaderActionFlexRow}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.backActionTouchLinkInline}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={AppImages.arrowLeft}
              style={styles.backIconArrowAsset}
            />
            <Text style={styles.backButtonActionTextLabel}>Back</Text>
          </TouchableOpacity>

          <View style={styles.rightSideSuiteIconContainerBoxSquareRounded}>
            <Image source={AppImages.jobs} style={styles.suiteIconAssetItem} />
          </View>
        </View>

        {/* Main Title Job Headliner & State Badge */}
        <View style={styles.mainJobHeadlineBlock}>
          <Text style={styles.jobMainTitleHeadlineText}>{jobMeta.title}</Text>
          <View style={styles.jobStateBadgeContainerFrameBlock}>
            <Text style={styles.jobStateBadgeTextLabelTypography}>
              {jobMeta.status}
            </Text>
          </View>
        </View>

        {/* Main Composite Feed Stream Roll list architecture layout hierarchy integration */}
        <FlatList
          data={applicantsList}
          keyExtractor={item => item.id}
          renderItem={renderApplicantCard}
          ListHeaderComponent={renderJobDetailsHeaderCard}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.mainScrollFeedListPaddingAdjustment}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  screenMainLayoutCanvasViewport: {
    flex: 1,
    paddingHorizontal: responsiveWidth(9),
  },
  stickyHeaderActionFlexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: responsiveHeight(3),
    marginBottom: responsiveHeight(2),
  },
  backActionTouchLinkInline: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIconArrowAsset: {
    height: responsiveHeight(1.8),
    width: responsiveWidth(4),
    marginRight: responsiveWidth(1.5),
    resizeMode: 'contain',
    tintColor: '#333333',
  },
  backButtonActionTextLabel: {
    fontSize: responsiveFontSize(1.8),
    color: '#333333',
    fontWeight: '600',
  },
  rightSideSuiteIconContainerBoxSquareRounded: {
    width: responsiveWidth(12),
    height: responsiveWidth(12),
    borderRadius: 14,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  suiteIconAssetItem: {
    width: responsiveWidth(5.5),
    height: responsiveWidth(5.5),
    resizeMode: 'contain',
    tintColor: '#FFFFFF',
  },
  mainJobHeadlineBlock: {
    marginBottom: responsiveHeight(3),
    alignItems: 'flex-start',
  },
  jobMainTitleHeadlineText: {
    fontSize: responsiveFontSize(2.8),
    fontWeight: 'bold',
    color: '#1A2530',
    lineHeight: responsiveFontSize(3.5),
    paddingRight: responsiveWidth(8),
  },
  jobStateBadgeContainerFrameBlock: {
    backgroundColor: '#1C1917', // Dark charcoal shade element variant framework structure matching exact tag graphics block
    paddingHorizontal: responsiveWidth(3.5),
    paddingVertical: responsiveHeight(0.5),
    borderRadius: 8,
    marginTop: responsiveHeight(1),
  },
  jobStateBadgeTextLabelTypography: {
    color: '#FFFFFF',
    fontSize: responsiveFontSize(1.3),
    fontWeight: '600',
  },
  mainScrollFeedListPaddingAdjustment: {
    paddingBottom: responsiveHeight(6),
  },
  topCompositeLayoutCardBlock: {
    marginBottom: responsiveHeight(1),
  },
  jobSpecsDetailsInformationWrapperCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F0F2F5',
    borderRadius: 24,
    padding: responsiveWidth(5),
    marginBottom: responsiveHeight(3.5),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
  },
  jobSpecsInnerHeadingText: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: '700',
    color: '#1A2530',
    marginBottom: responsiveHeight(2.5),
  },
  jobParameterDetailFlexRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
  },
  parameterLeftIconBoxContainer: {
    backgroundColor: '#EBF7F4', // Light layout custom tone fill matching layout color schemes frame elements
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: responsiveWidth(3.5),
  },
  paramItemSideIconAsset: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#5EA387',
  },
  parameterRightLabelsColumn: {
    justifyContent: 'center',
  },
  paramSubLabelTitleMutedText: {
    fontSize: responsiveFontSize(1.4),
    color: '#8896A6',
    fontWeight: '400',
  },
  paramValueOutputBoldTypography: {
    fontSize: responsiveFontSize(1.7),
    color: '#1A2530',
    fontWeight: '600',
    marginTop: responsiveHeight(0.2),
  },
  horizontalDividerLineBreakElement: {
    height: 1,
    backgroundColor: '#F0F2F5',
    marginVertical: responsiveHeight(1.5),
  },
  jobDescriptionSectionHeaderLabelTitleText: {
    fontSize: responsiveFontSize(1.5),
    color: '#8896A6',
    fontWeight: '500',
    marginBottom: responsiveHeight(0.8),
  },
  jobDescriptionTextContentBody: {
    fontSize: responsiveFontSize(1.6),
    color: '#4A5568',
    lineHeight: responsiveFontSize(2.2),
  },
  applicantsCounterSectionHeadingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveHeight(1.5),
  },
  applicantsSectionTitleLabelHeadlineText: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: '700',
    color: '#1A2530',
  },
  applicantsCounterPillMetricBox: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(0.6),
    borderRadius: 12,
  },
  applicantsCountValueMetricLabelText: {
    fontSize: responsiveFontSize(1.4),
    color: '#4B5563',
    fontWeight: '600',
  },
  applicantMainCardFrame: {
    backgroundColor: '#FDFBF7', // Off-white soft peach beige backdrop panel container context matching mockup profiles frame cards
    borderRadius: 20,
    padding: responsiveWidth(4.5),
    marginBottom: responsiveHeight(2.5),
    borderWidth: 1,
    borderColor: '#F5ECE1',
    position: 'relative',
  },
  applicantProposalTextAmount: {
    position: 'absolute',
    top: responsiveHeight(2),
    right: responsiveWidth(4.5),
    fontSize: responsiveFontSize(1.9),
    fontWeight: '700',
    color: '#1A2530',
  },
  applicantProfileMetaFlexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(1.5),
  },
  avatarInitialsCircleWrapper: {
    backgroundColor: '#FCA5A5', // Soft coral pink tone matching profile design
    width: responsiveWidth(12),
    height: responsiveWidth(12),
    borderRadius: responsiveWidth(6),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: responsiveWidth(3.5),
  },
  avatarTextLabelSymbol: {
    fontSize: responsiveFontSize(1.9),
    fontWeight: 'bold',
    color: '#000000',
  },
  applicantNameDetailContainerColumn: {
    justifyContent: 'center',
    flex: 1,
  },
  applicantProfileNameText: {
    fontSize: responsiveFontSize(2),
    fontWeight: '700',
    color: '#1A2530',
    paddingRight: responsiveWidth(18), // Safe offset boundary to avoid overlapping with absolute Proposal textual markers
  },
  starRatingInlineFlexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveHeight(0.4),
  },
  starIconSmallAsset: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    tintColor: '#FAB005',
    marginRight: responsiveWidth(1),
  },
  ratingNumberBoldText: {
    fontSize: responsiveFontSize(1.5),
    fontWeight: '700',
    color: '#1A2530',
  },
  reviewsCountMutedTypography: {
    fontSize: responsiveFontSize(1.5),
    color: '#71717A',
    fontWeight: '400',
  },
  applicantSubDetailsHorizontalLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveHeight(0.5),
  },
  subMetaTinyIconAsset: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    tintColor: '#A1A1AA',
    marginRight: responsiveWidth(1),
  },
  subMetaMetricsLabelText: {
    fontSize: responsiveFontSize(1.4),
    color: '#71717A',
    fontWeight: '400',
  },
  applicantBioParagraphSummary: {
    fontSize: responsiveFontSize(1.5),
    color: '#4B5563',
    lineHeight: responsiveFontSize(2.1),
    marginBottom: responsiveHeight(1.8),
  },
  skillsCapsulesWrapperFlexRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
  },
  skillCapsulePillItem: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(0.5),
    borderRadius: 8,
    marginRight: responsiveWidth(2),
    marginBottom: responsiveHeight(1),
  },
  skillCapsuleTextTypography: {
    fontSize: responsiveFontSize(1.3),
    color: '#374151',
    fontWeight: '500',
  },
  applicantActionControlsSplitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageDirectActionTriggerButton: {
    flexDirection: 'row',
    backgroundColor: AppColors.secondary, // Theme signature Turquoise dynamic action background
    flex: 1,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: responsiveWidth(3),
  },
  messageActionBtnIconAsset: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: '#1A2530',
    marginRight: responsiveWidth(1.5),
  },
  messageButtonLabelText: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '600',
    color: '#1A2530',
  },
  viewProfileExternalTriggerButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E4E4E7',
    flex: 1,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewProfileButtonLabelText: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '600',
    color: '#27272A',
  },
});

export default UserJobDetails;
