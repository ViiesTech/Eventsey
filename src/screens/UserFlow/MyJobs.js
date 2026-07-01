import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
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

const MyJobs = ({ navigation }) => {
  // Mock listing array taken verbatim from Screenshot 2026-07-01 at 4.04.15 AM.png
  const jobPosts = [
    {
      id: '1',
      title: 'Wedding Photographer Needed',
      status: 'Open',
      category: 'Photography',
      description:
        'Looking for an experienced photographer for our wedding ceremony',
      priceRange: '$2000 - $3000',
      applicants: '8 applicants',
      location: 'New York, NY',
      date: '12/15/2025',
    },
    {
      id: '2',
      title: 'Makeup Artist Required',
      status: 'In Progress',
      category: 'Beauty',
      description: 'Professional makeup artist needed for bridal party of 6.',
      priceRange: '$500 - $800',
      applicants: '5 applicants',
      location: 'New York, NY',
      date: '12/15/2025',
    },
  ];

  const renderJobCard = ({ item }) => {
    const isOpen = item.status === 'Open';

    return (
      <View style={styles.jobPostCardElement}>
        {/* Card Header: Title & Status Badge */}
        <View style={styles.cardHeaderFlexRow}>
          <Text style={styles.jobTitleText}>{item.title}</Text>
          <View
            style={[
              styles.statusBadgeContainer,
              { backgroundColor: isOpen ? '#E6F7F0' : '#E8F0FE' },
            ]}
          >
            <Text
              style={[
                styles.statusBadgeText,
                { color: isOpen ? '#23A46D' : '#3B71CA' },
              ]}
            >
              {item.status}
            </Text>
          </View>
        </View>

        {/* Category Pill Tag */}
        <View style={styles.categoryTagPill}>
          <Text style={styles.categoryTagText}>{item.category}</Text>
        </View>

        {/* Short Description */}
        <Text style={styles.jobDescriptionParagraph}>{item.description}</Text>

        {/* 2x2 Grid Meta Metrics Row Block */}
        <View style={styles.metaDataGridBlock}>
          {/* Row 1 */}
          <View style={styles.metaGridRow}>
            <View style={styles.metaItemInline}>
              <Image source={AppImages.dollar} style={styles.metaIconAsset} />
              <Text style={styles.metaValueTypography}>{item.priceRange}</Text>
            </View>
            <View style={styles.metaItemInline}>
              <Image source={AppImages.users} style={styles.metaIconAsset} />
              <Text style={styles.metaValueTypography}>{item.applicants}</Text>
            </View>
          </View>

          {/* Row 2 */}
          <View style={styles.metaGridRow}>
            <View style={styles.metaItemInline}>
              <Image source={AppImages.location} style={styles.metaIconAsset} />
              <Text style={styles.metaValueTypography}>{item.location}</Text>
            </View>
            <View style={styles.metaItemInline}>
              <Image source={AppImages.calendar} style={styles.metaIconAsset} />
              <Text style={styles.metaValueTypography}>{item.date}</Text>
            </View>
          </View>
        </View>

        {/* Bottom Horizontal Action Control Split Buttons */}
        <View style={styles.cardActionButtonsRow}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.viewDetailsMainActionButton}
            onPress={() =>
              navigation.navigate('UserJobDetails', { data: item })
            }
          >
            <Image source={AppImages.eye} style={styles.eyeIconAsset} />
            <Text style={styles.viewDetailsButtonLabel}>View Details</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.deleteActionIconButton}
            onPress={() => console.log('Delete item action ID: ', item.id)}
          >
            <Image source={AppImages.delete} style={styles.trashIconAsset} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScreenWrapper>
      <View style={styles.mainLayoutContainer}>
        {/* Navigation Action Header & Suite Icon Shortcut */}
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

          <View style={styles.suiteCircleIconDisplayButton}>
            <Image source={AppImages.jobs} style={styles.suiteAssetIcon} />
          </View>
        </View>

        {/* Main Header Descriptor Title Blocks */}
        <View style={styles.screenHeaderTitleBlock}>
          <Text style={styles.screenMainTitleText}>My Jobs</Text>
          <Text style={styles.screenSubTitleText}>
            Post jobs and hire vendors
          </Text>
        </View>

        {/* Sub-Section Counter Tracking Block */}
        <View style={styles.subSectionTitleCounterRow}>
          <Text style={styles.subSectionHeadingText}>My Job Posts</Text>
          <Text style={styles.subSectionCounterMetricsLabel}>
            {jobPosts.length} active listings
          </Text>
        </View>

        {/* Stream Stack Data List */}
        <FlatList
          data={jobPosts}
          keyExtractor={item => item.id}
          renderItem={renderJobCard}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollListContainerPadding}
        />

        {/* Floating Absolute Action Dynamic Plus Add Button Trigger */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.floatingActionButtonTrigger}
          onPress={() => navigation.navigate('PostJob')}
        >
          <Image source={AppImages.plus} style={styles.floatingPlusIconAsset} />
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  mainLayoutContainer: {
    flex: 1,
    paddingHorizontal: responsiveWidth(9),
    paddingTop: responsiveHeight(3),
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
  suiteCircleIconDisplayButton: {
    width: responsiveWidth(13),
    height: responsiveWidth(13),
    borderRadius: responsiveWidth(4), // Semi-rounded block style matching layout perfectly
    backgroundColor: AppColors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  suiteAssetIcon: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
    resizeMode: 'contain',
    tintColor: AppColors.white,
  },
  screenHeaderTitleBlock: {
    marginBottom: responsiveHeight(4),
  },
  screenMainTitleText: {
    fontSize: responsiveFontSize(3.2),
    fontWeight: 'bold',
    color: AppColors.black,
  },
  screenSubTitleText: {
    fontSize: responsiveFontSize(1.7),
    color: '#6A798A',
    fontWeight: '400',
    marginTop: responsiveHeight(0.5),
  },
  subSectionTitleCounterRow: {
    marginBottom: responsiveHeight(2),
  },
  subSectionHeadingText: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '700',
    color: AppColors.black,
  },
  subSectionCounterMetricsLabel: {
    fontSize: responsiveFontSize(1.6),
    color: '#6A798A',
    fontWeight: '400',
    marginTop: responsiveHeight(0.3),
  },
  scrollListContainerPadding: {
    paddingBottom: responsiveHeight(12), // Cushion safe space boundary area for floating action buttons overlay offset layout
  },
  jobPostCardElement: {
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderColor: '#F0F2F5',
    borderRadius: 20,
    padding: responsiveWidth(5),
    marginBottom: responsiveHeight(2.5),
    shadowColor: AppColors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 3,
  },
  cardHeaderFlexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  jobTitleText: {
    fontSize: responsiveFontSize(2.1),
    fontWeight: '700',
    color: AppColors.black,
    flex: 1,
    paddingRight: responsiveWidth(2),
  },
  statusBadgeContainer: {
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(0.6),
    borderRadius: 8,
  },
  statusBadgeText: {
    fontSize: responsiveFontSize(1.4),
    fontWeight: '600',
  },
  categoryTagPill: {
    backgroundColor: '#F3F4F6',
    alignSelf: 'flex-start',
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(0.5),
    borderRadius: 8,
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(1.5),
  },
  categoryTagText: {
    fontSize: responsiveFontSize(1.4),
    color: '#4B5563',
    fontWeight: '500',
  },
  jobDescriptionParagraph: {
    fontSize: responsiveFontSize(1.6),
    color: '#4B5563',
    lineHeight: responsiveFontSize(2.2),
    marginBottom: responsiveHeight(2),
  },
  metaDataGridBlock: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
    paddingBottom: responsiveHeight(2),
    marginBottom: responsiveHeight(2),
  },
  metaGridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsiveHeight(1.2),
  },
  metaItemInline: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
  },
  metaIconAsset: {
    width: responsiveWidth(4.5),
    height: responsiveWidth(4.5),
    resizeMode: 'contain',
    tintColor: '#9CA3AF',
    marginRight: responsiveWidth(2),
  },
  metaValueTypography: {
    fontSize: responsiveFontSize(1.6),
    color: '#4B5563',
    fontWeight: '500',
  },
  cardActionButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewDetailsMainActionButton: {
    flexDirection: 'row',
    backgroundColor: AppColors.secondary, // Dynamic Turquoise layout theme
    flex: 1,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: responsiveWidth(3),
  },
  eyeIconAsset: {
    width: responsiveWidth(4.5),
    height: responsiveWidth(4.5),
    resizeMode: 'contain',
    marginRight: responsiveWidth(2),
    tintColor: AppColors.black,
  },
  viewDetailsButtonLabel: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: '600',
    color: AppColors.black,
  },
  deleteActionIconButton: {
    backgroundColor: '#FDF2F2', // Custom soft warning/red accent base structural highlight frame container
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trashIconAsset: {
    width: responsiveWidth(4.5),
    height: responsiveWidth(4.5),
    resizeMode: 'contain',
    tintColor: '#DC2626',
  },
  floatingActionButtonTrigger: {
    position: 'absolute',
    bottom: responsiveHeight(4),
    right: responsiveWidth(9),
    backgroundColor: AppColors.primary,
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    borderRadius: responsiveWidth(7.5),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: AppColors.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  floatingPlusIconAsset: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
    resizeMode: 'contain',
    tintColor: AppColors.black,
  },
});

export default MyJobs;
