import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
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
import PaymentModal from '../../components/Modals/PaymentModal';
import PaymentDetailsModal from '../../components/Modals/PaymentDetailsModal';

const tabs = ['All', 'Upcoming', 'Completed'];

const HiredVendors = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('All');

  const [isVisible, setIsVisible] = useState(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentNote, setPaymentNote] = useState('');
  const [selectedVendor, setSelectedVendor] = useState(null);

  const stats = {
    upcoming: 3,
    paid: 2,
    total: '$6,200',
  };

  const [hiredData, setHiredData] = useState([
    {
      id: '1',
      name: 'Premium Events Co.',
      category: 'Photography',
      rating: '4.9',
      hiredTime: 'Hired 3 days ago',
      status: 'Upcoming',
      paymentStatus: 'Partial Payment',
      eventDate: 'June 15, 2026',
      amount: '$1200',
      categoryIcon: AppImages.camera,
      canPay: true,
    },
    {
      id: '2',
      name: 'Royal Catering Services',
      category: 'Catering',
      rating: '4.8',
      hiredTime: 'Hired 1 week ago',
      status: 'Upcoming',
      paymentStatus: 'Paid',
      eventDate: 'June 15, 2026',
      amount: '$4500',
      categoryIcon: AppImages.catering,
      canPay: false,
    },
    {
      id: '3',
      name: 'Glamour Makeup Artists',
      category: 'Makeup',
      rating: '4.9',
      hiredTime: 'Hired 2 weeks ago',
      status: 'Upcoming',
      paymentStatus: 'Paid',
      eventDate: 'June 15, 2026',
      amount: '$500',
      categoryIcon: AppImages.makeUp,
      canPay: false,
    },
  ]);

  const filteredData = hiredData.filter(item => {
    if (activeTab === 'All') return true;
    return item.status === activeTab;
  });

  // Action Helpers for Modals Flow Trigger
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

  // Render Item Component for FlatList
  const renderVendorCard = ({ item: vendor }) => (
    <View style={styles.vendorCompositeItemCard}>
      {/* Upper Identity Section */}
      <View style={styles.vendorUpperInfoFlexRow}>
        <View style={styles.iconWrapperBox}>
          <Image
            source={vendor.categoryIcon}
            style={styles.vendorCategoryIconGraphic}
          />
        </View>

        <View style={styles.identityTextColumn}>
          <Text numberOfLines={1} style={styles.vendorBrandHeadingTitle}>
            {vendor.name}
          </Text>
          <Text style={styles.vendorCategorySubText}>{vendor.category}</Text>

          <View style={styles.ratingAndTimelineFlexRow}>
            <Text style={styles.ratingStarSymbol}>★</Text>
            <Text style={styles.ratingNumericScore}>{vendor.rating}</Text>
            <Text style={styles.timePassedMetaLabelString}>
              • {vendor.hiredTime}
            </Text>
          </View>
        </View>
      </View>

      {/* Badges Flow Track */}
      <View style={styles.badgesInlineContainerRowShelf}>
        <View style={styles.statusBlackCapsuleBadge}>
          <Text style={styles.statusBlackCapsuleBadgeText}>
            {vendor.status}
          </Text>
        </View>
        <View style={styles.paymentStatusLightCapsuleBadge}>
          <Text style={styles.paymentStatusLightCapsuleBadgeText}>
            {vendor.paymentStatus}
          </Text>
        </View>
      </View>

      {/* Event Schedule Info Grid Table Line */}
      <View style={styles.scheduleDetailsTwinColumnsFlexRow}>
        <View style={styles.scheduleMetaInfoBlockItem}>
          <Image
            source={AppImages.calender || { uri: 'calendar_icon' }}
            style={styles.fieldUtilityVectorGlyphIcon}
          />
          <View>
            <Text style={styles.fieldMetaLabelUpperKeyText}>Event Date</Text>
            <Text style={styles.fieldValueDataValueStringText}>
              {vendor.eventDate}
            </Text>
          </View>
        </View>

        <View style={styles.scheduleMetaInfoBlockItem}>
          <Text style={styles.currencySymbolPrefixInlineGlyph}>$</Text>
          <View>
            <Text style={styles.fieldMetaLabelUpperKeyText}>Amount</Text>
            <Text style={styles.fieldValueDataValueStringText}>
              {vendor.amount}
            </Text>
          </View>
        </View>
      </View>

      {/* Lower Utility Control Action Buttons Panel Row */}
      <View style={styles.cardActionUtilityButtonsClusterRowShelf}>
        <TouchableOpacity
          activeOpacity={0.75}
          style={styles.viewActionControlBtnItem}
          onPress={() => navigation.navigate('VendorDetails', { data: vendor })}
        >
          <Text style={styles.actionBtnLabelCommonText}>View</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.75}
          style={styles.chatActionControlBtnItem}
          onPress={() => navigation.navigate('UserChat', { thread: vendor })}
        >
          <Image source={AppImages.chat} style={styles.paneIconGlyphSymbol} />
          <Text style={styles.actionBtnLabelCommonText}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.75}
          disabled={!vendor.canPay}
          onPress={() => handlePayPress(vendor)}
          style={[
            styles.payActionControlBtnItem,
            !vendor.canPay && styles.payActionControlDisabledBtnItem,
          ]}
        >
          <Text
            style={[
              styles.currencySymbolPrefixInlineGlyph,
              {
                fontSize: responsiveFontSize(1.6),
                color: '#555555',
                marginRight: responsiveWidth(1),
              },
            ]}
          >
            $
          </Text>
          <Text
            style={[
              styles.actionBtnLabelCommonText,
              { color: vendor.canPay ? AppColors.black : '#A4A4A4' },
            ]}
          >
            Pay
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Empty State Component
  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No vendors found for "{activeTab}"</Text>
    </View>
  );

  return (
    <ScreenWrapper>
      <View style={styles.mainContainer}>
        {/* Header Section */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Image source={AppImages.arrowLeft} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={styles.headerTextWrapper}>
            <Text style={styles.screenTitle}>Hired Vendors</Text>
            <Text style={styles.screenSubTitle}>3 vendors working for you</Text>
          </View>
        </View>

        {/* Stats Row Grid */}
        <View style={styles.statsContainerCard}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{stats.upcoming}</Text>
            <Text style={styles.statLabel}>Upcoming</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{stats.paid}</Text>
            <Text style={styles.statLabel}>Paid</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
        </View>

        {/* Segment Tabs Control Track */}
        <View style={styles.tabsContainerTrack}>
          {tabs.map((tab, idx) => {
            const isSelected = activeTab === tab;
            let tabBgColor = '#F5F5F5';
            if (isSelected) {
              if (tab === 'All') tabBgColor = '#2C2D2F';
              if (tab === 'Upcoming') tabBgColor = '#F7C6BC';
              if (tab === 'Completed') tabBgColor = '#82DDD3';
            }

            return (
              <TouchableOpacity
                key={`${tab}-${idx}`}
                activeOpacity={0.85}
                style={[styles.tabItemButton, { backgroundColor: tabBgColor }]}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[
                    styles.tabItemButtonText,
                    {
                      color:
                        isSelected && tab === 'All'
                          ? AppColors.white
                          : AppColors.black,
                    },
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Main Hired Feed Content List via FlatList */}
        <FlatList
          data={filteredData}
          renderItem={renderVendorCard}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollAreaContainer}
          ListEmptyComponent={renderEmptyComponent}
        />
      </View>

      {/* Layer 1: Context Processing Modal Sheet */}
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

      {/* Layer 2: Final Summary Ledger Statement View Sheet */}
      <PaymentDetailsModal
        isVisible={isDetailsVisible}
        onClose={() => setIsDetailsVisible(false)}
        onConfirm={() => {
          setIsDetailsVisible(false);
          setActiveTab('All');
        }}
        details={{
          vendor: selectedVendor ? selectedVendor.name : 'Vendor',
          service: selectedVendor ? selectedVendor.category : 'Service',
          invoice: 'INV-004',
          totalAmount: `$${paymentAmount || '0.00'}`,
        }}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: responsiveHeight(4),
    paddingHorizontal: responsiveWidth(9),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(3.5),
  },
  backButton: {
    paddingVertical: responsiveHeight(1),
    paddingRight: responsiveWidth(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: responsiveWidth(5),
    height: responsiveWidth(5),
    resizeMode: 'contain',
    tintColor: AppColors.black,
  },
  headerTextWrapper: {
    flex: 1,
  },
  screenTitle: {
    fontSize: responsiveFontSize(2.8),
    fontWeight: '700',
    color: AppColors.black,
  },
  screenSubTitle: {
    fontSize: responsiveFontSize(1.6),
    color: '#666666',
    fontWeight: '400',
    marginTop: responsiveHeight(0.3),
  },
  statsContainerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: AppColors.white,
    borderRadius: 24,
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(4),
    marginBottom: responsiveHeight(3.5),
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: responsiveFontSize(2.6),
    fontWeight: '700',
    color: AppColors.black,
    marginBottom: responsiveHeight(0.5),
  },
  statLabel: {
    fontSize: responsiveFontSize(1.5),
    color: '#777777',
    fontWeight: '400',
  },
  tabsContainerTrack: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsiveHeight(3),
  },
  tabItemButton: {
    width: '31%',
    height: responsiveHeight(5.2),
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItemButtonText: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '500',
  },
  scrollAreaContainer: {
    paddingBottom: responsiveHeight(4),
    flexGrow: 1, // Empty component center karne ke liye flexGrow zaroori hai
  },
  vendorCompositeItemCard: {
    backgroundColor: AppColors.white,
    borderRadius: 28,
    padding: responsiveWidth(5),
    marginBottom: responsiveHeight(2.5),
    borderWidth: 1,
    borderColor: '#F1F1F1',
  },
  vendorUpperInfoFlexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
  },
  iconWrapperBox: {
    width: responsiveWidth(16),
    height: responsiveWidth(16),
    borderRadius: 16,
    backgroundColor: '#FAF7F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: responsiveWidth(4),
  },
  vendorCategoryIconGraphic: {
    width: responsiveWidth(8),
    height: responsiveWidth(8),
    resizeMode: 'contain',
  },
  identityTextColumn: {
    flex: 1,
  },
  vendorBrandHeadingTitle: {
    fontSize: responsiveFontSize(2.1),
    fontWeight: '700',
    color: AppColors.black,
  },
  vendorCategorySubText: {
    fontSize: responsiveFontSize(1.6),
    color: '#8E8E93',
    fontWeight: '400',
    marginTop: responsiveHeight(0.2),
  },
  ratingAndTimelineFlexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveHeight(0.4),
  },
  ratingStarSymbol: {
    color: '#FFB300',
    fontSize: responsiveFontSize(1.6),
    marginRight: responsiveWidth(1),
  },
  ratingNumericScore: {
    fontSize: responsiveFontSize(1.5),
    fontWeight: '600',
    color: AppColors.black,
    marginRight: responsiveWidth(1),
  },
  timePassedMetaLabelString: {
    fontSize: responsiveFontSize(1.4),
    color: '#8E8E93',
    fontWeight: '400',
  },
  badgesInlineContainerRowShelf: {
    flexDirection: 'row',
    marginBottom: responsiveHeight(2),
  },
  statusBlackCapsuleBadge: {
    backgroundColor: '#222325',
    borderRadius: 12,
    paddingHorizontal: responsiveWidth(3.5),
    paddingVertical: responsiveHeight(0.6),
    marginRight: responsiveWidth(2),
  },
  statusBlackCapsuleBadgeText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.3),
    fontWeight: '500',
  },
  paymentStatusLightCapsuleBadge: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: responsiveWidth(3.5),
    paddingVertical: responsiveHeight(0.6),
  },
  paymentStatusLightCapsuleBadgeText: {
    color: '#555555',
    fontSize: responsiveFontSize(1.3),
    fontWeight: '500',
  },
  scheduleDetailsTwinColumnsFlexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#F8F8F8',
    paddingBottom: responsiveHeight(2),
    marginBottom: responsiveHeight(2),
  },
  scheduleMetaInfoBlockItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
  },
  fieldUtilityVectorGlyphIcon: {
    width: responsiveWidth(4.5),
    height: responsiveWidth(4.5),
    resizeMode: 'contain',
    tintColor: '#FFA293',
    marginRight: responsiveWidth(2.5),
  },
  currencySymbolPrefixInlineGlyph: {
    fontSize: responsiveFontSize(2),
    fontWeight: '400',
    color: '#FFA293',
    marginRight: responsiveWidth(2),
  },
  fieldMetaLabelUpperKeyText: {
    fontSize: responsiveFontSize(1.3),
    color: '#8C8C8C',
    fontWeight: '400',
  },
  fieldValueDataValueStringText: {
    fontSize: responsiveFontSize(1.6),
    color: AppColors.black,
    fontWeight: '600',
    marginTop: responsiveHeight(0.2),
  },
  cardActionUtilityButtonsClusterRowShelf: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewActionControlBtnItem: {
    width: '31%',
    backgroundColor: '#82DDD3',
    borderRadius: 14,
    height: responsiveHeight(5.2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatActionControlBtnItem: {
    width: '31%',
    flexDirection: 'row',
    backgroundColor: '#F7C6BC',
    borderRadius: 14,
    height: responsiveHeight(5.2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  payActionControlBtnItem: {
    width: '31%',
    flexDirection: 'row',
    backgroundColor: '#FAF7F6',
    borderRadius: 14,
    height: responsiveHeight(5.2),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  payActionControlDisabledBtnItem: {
    backgroundColor: '#F8F8F8',
    borderColor: '#F0F0F0',
  },
  paneIconGlyphSymbol: {
    width: responsiveWidth(4),
    height: responsiveWidth(4),
    resizeMode: 'contain',
    tintColor: AppColors.black,
    marginRight: responsiveWidth(1),
  },
  actionBtnLabelCommonText: {
    color: AppColors.black,
    fontSize: responsiveFontSize(1.5),
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: responsiveHeight(10),
  },
  emptyText: {
    fontSize: responsiveFontSize(1.8),
    color: '#8E8E93',
    fontWeight: '500',
  },
});

export default HiredVendors;
