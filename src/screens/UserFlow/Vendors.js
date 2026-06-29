import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
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
import PaymentModal from '../../components/Modals/PaymentModal';
import PaymentDetailsModal from '../../components/Modals/PaymentDetailsModal';

// Added 'Venue' to maintain symmetry with mock dataset item id '6'
const tabs = [
  'All',
  'Photography',
  'Catering',
  'Decoration',
  'Makeup',
  'Music',
  'Venue',
];

const Vendors = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [isVisible, setIsVisible] = useState(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentNote, setPaymentNote] = useState('');
  const [selectedVendor, setSelectedVendor] = useState(null);

  const summary = {
    hiredCount: 3,
    totalPaid: '$12.5K',
  };

  const [vendorsData, setVendorsData] = useState([
    {
      id: '1',
      name: 'Premium Event',
      category: 'Photography',
      rating: '4.9',
      reviewsCount: '127 reviews',
      location: 'Seattle, WA',
      jobsCount: '85 jobs',
      priceRange: '$800 - $1500',
      isActive: true,
      hasActionsBar: true,
      categoryIcon: AppImages.camera,
    },
    {
      id: '2',
      name: 'Royal Cate',
      category: 'Catering',
      rating: '4.8',
      reviewsCount: '203 reviews',
      location: 'Seattle, WA',
      jobsCount: '156 jobs',
      priceRange: '$3000 - $5000',
      isActive: true,
      hasActionsBar: true,
      categoryIcon: AppImages.catering,
    },
    {
      id: '3',
      name: 'Elegant Decor',
      category: 'Decoration',
      rating: '4.7',
      reviewsCount: '89 reviews',
      location: 'Bellevue, WA',
      jobsCount: '62 jobs',
      priceRange: '$2000 - $4000',
      isActive: false,
      hasActionsBar: false,
      categoryIcon: AppImages.decoration,
    },
    {
      id: '4',
      name: 'Glamour Ma..',
      category: 'Makeup',
      rating: '4.9',
      reviewsCount: '145 reviews',
      location: 'Seattle, WA',
      jobsCount: '198 jobs',
      priceRange: '$300 - $600',
      isActive: true,
      hasActionsBar: true,
      categoryIcon: AppImages.makeUp,
    },
    {
      id: '5',
      name: 'Sound & Beats..',
      category: 'Music',
      rating: '4.6',
      reviewsCount: '78 reviews',
      location: 'Seattle, WA',
      jobsCount: '91 jobs',
      priceRange: '$1000 - $2000',
      isActive: false,
      hasActionsBar: false,
      categoryIcon: AppImages.music,
    },
    {
      id: '6',
      name: 'Perfect Venue Hal',
      category: 'Venue',
      rating: '4.7',
      reviewsCount: '92 reviews',
      location: 'Bellevue, WA',
      jobsCount: '45 jobs',
      priceRange: '$5000 - $8000',
      isActive: false,
      hasActionsBar: false,
      categoryIcon: AppImages.venue,
    },
  ]);

  const filteredVendors = vendorsData.filter(vendor => {
    const matchesTab = activeTab === 'All' || vendor.category === activeTab;
    const matchesSearch = vendor.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Action helper to open the payment modal context
  const handlePayPress = vendor => {
    setSelectedVendor(vendor);
    setPaymentAmount('');
    setPaymentNote('');
    setIsVisible(true);
  };

  const handleConfirmPayment = () => {
    setIsVisible(false);
    setIsDetailsVisible(true);
  };

  return (
    <ScreenWrapper>
      <View style={styles.mainInnerCanvasSheet}>
        {/* Screen Header */}
        <View style={styles.topBarHeaderFlexRow}>
          <Text style={styles.screenMainHeadlineText}>Find Vendors</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.paymentHistoryTriggerButton}
            onPress={() => navigation.navigate('PaymentHistory')}
          >
            <Image source={AppImages.card} style={styles.cardIcon} />
            <Text style={styles.paymentHistoryBtnLabelStringText}>
              Payment History
            </Text>
          </TouchableOpacity>
        </View>

        {/* Hired Metrics Dashboard Grid */}
        <View style={styles.summaryKPIBlockWrapperFlexRow}>
          <TouchableOpacity
            style={styles.individualMetricDataBlockColumn}
            onPress={() => navigation.navigate('HiredVendors')}
          >
            <Text style={styles.kpiDataValueMetricNumberText}>
              {summary.hiredCount}
            </Text>
            <Text style={styles.kpiMetaLabelStringSubtext}>Hired Vendors</Text>
          </TouchableOpacity>
          <View style={styles.individualMetricDataBlockColumn}>
            <Text style={styles.kpiDataValueMetricNumberText}>
              {summary.totalPaid}
            </Text>
            <Text style={styles.kpiMetaLabelStringSubtext}>Total Paid</Text>
          </View>
        </View>

        {/* Search Input Filter Component */}
        <View style={styles.searchBarFormInteractionInlineRow}>
          <View style={styles.searchBarInnerLayoutFieldWrapper}>
            <Image
              source={AppImages.search || { uri: 'search_fallback' }}
              style={styles.searchInlineMagnifierIcon}
            />
            <TextInput
              style={styles.searchTextInputElement}
              placeholder="Search vendors..."
              placeholderTextColor="#A4A4A4"
              autoCapitalize="none"
              autoCorrect={false}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.filterFunnelGlyphIconButtonTrigger}
          >
            <Image source={AppImages.filter} style={styles.filterIcon} />
          </TouchableOpacity>
        </View>

        {/* Horizontal Filters Track Segment */}
        <View style={styles.horizontalFiltersScrollWrapperSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {tabs.map((tab, idx) => (
              <TouchableOpacity
                key={`${tab}-${idx}`}
                activeOpacity={0.85}
                style={[
                  styles.categoryContainer,
                  activeTab === tab && styles.categoryContainerActive,
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    activeTab === tab && styles.categoryTextActive,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Main Directory Feed */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.directoryVerticalFeedScrollAreaContainer
          }
        >
          {filteredVendors.map(vendor => (
            <View
              key={vendor.id}
              style={styles.vendorCardItemCompositeBoxContainer}
            >
              <View style={styles.vendorCardUpperCoreIdentityFlexRow}>
                {/* Fixed Overlap Reference Box Wrapper Container */}
                <View style={styles.iconContainer}>
                  <Image
                    source={vendor.categoryIcon}
                    style={styles.vendorCardCategoryIcon}
                  />
                </View>

                {/* Primary Meta Content Metadata */}
                <View style={styles.cardColumn}>
                  <View style={styles.titleRow}>
                    <Text
                      numberOfLines={1}
                      style={styles.vendorBrandHeadingTitleStringText}
                    >
                      {vendor.name}
                    </Text>
                    {vendor.isActive && (
                      <View style={styles.statusCapsule}>
                        <Text style={styles.status}>Active</Text>
                      </View>
                    )}
                  </View>

                  {/* Feedback Stars Composite View */}
                  <View
                    style={styles.feedbackRatingStarsInlineCompositeFlexRow}
                  >
                    <Text style={styles.ratingStarGraphicGlyphSymbol}>★</Text>
                    <Text style={styles.ratingNumericMetricScoreBodyText}>
                      {vendor.rating}
                    </Text>
                    <Text
                      style={styles.totalReviewsCounterVolumeMetaStringText}
                    >
                      ({vendor.reviewsCount})
                    </Text>
                  </View>

                  {/* Regional Information Locations Track */}
                  <View style={styles.locationRow}>
                    <Image
                      source={AppImages.location}
                      style={styles.cardIcon}
                    />
                    <Text style={styles.geoMarkerLabelBodyStringText}>
                      {vendor.location}
                    </Text>
                    <Image source={AppImages.jobs} style={styles.cardIcon} />
                    <Text style={styles.jobsVolumeCounterLabelBodyStringText}>
                      {vendor.jobsCount}
                    </Text>
                  </View>

                  {/* Pricing Fields Row Parameter */}
                  <Text style={styles.priceRange}>{vendor.priceRange}</Text>
                </View>
              </View>

              {/* Functional Bottom Utility Shelf Action Elements */}
              {vendor.hasActionsBar && (
                <View style={styles.cardActionUtilityButtonsClusterRowShelf}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('VendorDetails', {
                        data: vendor,
                      })
                    }
                    activeOpacity={0.75}
                    style={styles.viewActionControlBtnItem}
                  >
                    <Text style={styles.buttonText}>View</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.75}
                    style={styles.chatActionControlBtnItem}
                    onPress={() =>
                      navigation.navigate('UserChat', { thread: vendor })
                    }
                  >
                    <Image source={AppImages.chat} style={styles.chatIcon} />
                    <Text style={styles.buttonText}>Chat</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={() => handlePayPress(vendor)}
                    style={styles.payActionControlBtnItem}
                  >
                    <Image source={AppImages.card} style={styles.chatIcon} />
                    <Text style={styles.buttonText}>Pay</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </View>

      <PaymentModal
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        onConfirm={handleConfirmPayment}
        vendorName={selectedVendor ? selectedVendor.name : ''}
        amount={paymentAmount}
        setAmount={setPaymentAmount}
        note={paymentNote}
        setNote={setPaymentNote}
      />

      <PaymentDetailsModal
        isVisible={isDetailsVisible}
        onClose={() => setIsDetailsVisible(false)}
        onConfirm={() => {
          setIsDetailsVisible(false);
          navigation.navigate('HiredVendors');
        }}
        details={{
          vendor: selectedVendor ? selectedVendor.name : 'Vendor',
          service: selectedVendor ? selectedVendor.category : 'Service',
          invoice: 'INV-003',
          totalAmount: `$${paymentAmount || '0.00'}`,
        }}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  mainInnerCanvasSheet: {
    flex: 1,
    marginTop: responsiveHeight(2),
    marginHorizontal: responsiveWidth(9), // Cleaned wide gutter structure layout bounds
    paddingVertical: responsiveHeight(3.5),
  },
  topBarHeaderFlexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveHeight(3),
  },
  screenMainHeadlineText: {
    fontSize: responsiveFontSize(3.4),
    fontWeight: '800',
    color: AppColors.black,
  },
  paymentHistoryTriggerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.black,
    borderRadius: 20,
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(3.5),
  },
  cardIcon: {
    height: responsiveHeight(2),
    width: responsiveWidth(4),
    marginRight: responsiveWidth(1.5),
    resizeMode: 'contain',
  },
  paymentHistoryBtnLabelStringText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.4),
    fontWeight: '600',
  },
  summaryKPIBlockWrapperFlexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(3.5),
  },
  individualMetricDataBlockColumn: {
    marginRight: responsiveWidth(12),
  },
  kpiDataValueMetricNumberText: {
    fontSize: responsiveFontSize(3.6),
    fontWeight: '700',
    color: AppColors.black,
    marginBottom: responsiveHeight(0.4),
  },
  kpiMetaLabelStringSubtext: {
    fontSize: responsiveFontSize(1.6),
    color: '#666666',
    fontWeight: '500',
  },
  searchBarFormInteractionInlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: responsiveHeight(2.5),
  },
  searchBarInnerLayoutFieldWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 16,
    flex: 1,
    paddingHorizontal: responsiveWidth(4),
    height: responsiveHeight(6.2),
  },
  searchInlineMagnifierIcon: {
    width: responsiveWidth(4.5),
    height: responsiveWidth(4.5),
    tintColor: '#A4A4A4',
    marginRight: responsiveWidth(2.5),
  },
  searchTextInputElement: {
    flex: 1,
    fontSize: responsiveFontSize(1.8),
    color: AppColors.black,
    fontWeight: '500',
  },
  filterFunnelGlyphIconButtonTrigger: {
    marginLeft: responsiveWidth(3),
    padding: responsiveWidth(2),
  },
  filterIcon: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
    resizeMode: 'contain',
  },
  horizontalFiltersScrollWrapperSection: {
    marginBottom: responsiveHeight(3),
  },
  categoryContainer: {
    backgroundColor: '#F3F3F3',
    borderRadius: 14,
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(1.2),
    marginRight: responsiveWidth(2.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryContainerActive: {
    backgroundColor: AppColors.primary,
  },
  categoryText: {
    fontSize: responsiveFontSize(1.6),
    color: '#555555',
    fontWeight: '600',
  },
  categoryTextActive: {
    color: AppColors.black,
    fontWeight: '700',
  },
  directoryVerticalFeedScrollAreaContainer: {
    paddingBottom: responsiveHeight(5),
  },
  vendorCardItemCompositeBoxContainer: {
    backgroundColor: AppColors.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    padding: responsiveWidth(4.5),
    marginBottom: responsiveHeight(2.5),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  vendorCardUpperCoreIdentityFlexRow: {
    flexDirection: 'row',
  },
  iconContainer: {
    width: responsiveWidth(18),
    height: responsiveWidth(18),
    borderRadius: 16,
    backgroundColor: '#F9F8F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: responsiveWidth(4),
  },
  vendorCardCategoryIcon: {
    height: responsiveWidth(10),
    width: responsiveWidth(10),
    resizeMode: 'contain',
  },
  cardColumn: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveHeight(0.4),
  },
  vendorBrandHeadingTitleStringText: {
    fontSize: responsiveFontSize(2.1),
    fontWeight: '700',
    color: AppColors.black,
    flex: 1,
    marginRight: responsiveWidth(2),
  },
  statusCapsule: {
    backgroundColor: AppColors.secondary,
    borderRadius: 10,
    paddingHorizontal: responsiveWidth(2.5),
    paddingVertical: responsiveHeight(0.3),
  },
  status: {
    fontSize: responsiveFontSize(1.2),
    fontWeight: '700',
    color: AppColors.black,
  },
  feedbackRatingStarsInlineCompositeFlexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(0.6),
  },
  ratingStarGraphicGlyphSymbol: {
    color: '#FFC107',
    fontSize: responsiveFontSize(1.6),
    marginRight: responsiveWidth(1),
  },
  ratingNumericMetricScoreBodyText: {
    fontSize: responsiveFontSize(1.5),
    fontWeight: '700',
    color: AppColors.black,
    marginRight: responsiveWidth(1),
  },
  totalReviewsCounterVolumeMetaStringText: {
    fontSize: responsiveFontSize(1.4),
    color: AppColors.liteGray,
    fontWeight: '400',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(0.8),
  },
  geoMarkerLabelBodyStringText: {
    fontSize: responsiveFontSize(1.4),
    color: AppColors.liteGray,
    fontWeight: '500',
    marginRight: responsiveWidth(3),
  },
  jobsVolumeCounterLabelBodyStringText: {
    fontSize: responsiveFontSize(1.4),
    color: AppColors.liteGray,
    fontWeight: '500',
  },
  priceRange: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '700',
    color: AppColors.darkPink,
  },
  cardActionUtilityButtonsClusterRowShelf: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: responsiveHeight(2.2),
    borderTopWidth: 1,
    borderTopColor: '#FAFAFA',
    paddingTop: responsiveHeight(1.8),
  },
  viewActionControlBtnItem: {
    flex: 1,
    backgroundColor: '#86DDD4',
    borderRadius: 12,
    paddingVertical: responsiveHeight(1.3),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: responsiveWidth(2),
  },
  chatActionControlBtnItem: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: AppColors.primary,
    borderRadius: 12,
    paddingVertical: responsiveHeight(1.3),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: responsiveWidth(2),
  },
  chatIcon: {
    width: responsiveWidth(4),
    height: responsiveWidth(4),
    resizeMode: 'contain',
    tintColor: AppColors.black,
    marginRight: responsiveWidth(1),
  },
  buttonText: {
    color: AppColors.black,
    fontSize: responsiveFontSize(1.5),
    fontWeight: '500',
  },
  payActionControlBtnItem: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingVertical: responsiveHeight(1.3),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Vendors;
