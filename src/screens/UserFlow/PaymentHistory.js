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
// Modals Import
import PaymentModal from '../../components/Modals/PaymentModal';
import PaymentDetailsModal from '../../components/Modals/PaymentDetailsModal';

const paymentTabs = ['All', 'Paid', 'Pending'];

const PaymentHistory = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('All');

  // Modal Visibility and Data States
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [isDetailsModalVisible, setIsDetailsVisible] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentNote, setPaymentNote] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const paymentStats = {
    paidAmount: '$5,700',
    pendingAmount: '$3,350',
  };

  const [paymentHistoryData, setPaymentHistoryData] = useState([
    {
      id: '1',
      vendorName: 'Premium Events Co.',
      category: 'Photography',
      invoiceNumber: 'INV-001',
      amount: '$1200',
      status: 'Paid',
      dueDate: 'May 15, 2026',
      paidDate: 'May 10, 2026',
    },
    {
      id: '2',
      vendorName: 'Royal Catering Services',
      category: 'Catering',
      invoiceNumber: 'INV-002',
      amount: '$4500',
      status: 'Paid',
      dueDate: 'May 20, 2026',
      paidDate: 'May 18, 2026',
    },
    {
      id: '3',
      vendorName: 'Glamour Makeup Artists',
      category: 'Makeup',
      invoiceNumber: 'INV-003',
      amount: '$500',
      status: 'Pending',
      dueDate: 'June 10, 2026',
      paidDate: null,
    },
    {
      id: '4',
      vendorName: 'Elegant Decor Studio',
      category: 'Decoration',
      invoiceNumber: 'INV-004',
      amount: '$3000',
      status: 'Pending',
      dueDate: 'June 1, 2026',
      paidDate: null,
    },
  ]);

  const filteredPayments = paymentHistoryData.filter(item => {
    if (activeTab === 'All') return true;
    return item.status === activeTab;
  });

  // Pay Now Modal Trigger Logic
  const handlePayNow = item => {
    setSelectedTransaction(item);
    // Auto-fill raw numerical value from string if available (e.g. "500" from "$500")
    const cleanAmount = item.amount.replace('$', '');
    setPaymentAmount(cleanAmount);
    setPaymentNote('');
    setIsPaymentModalVisible(true);
  };

  const handleConfirmPayment = () => {
    setIsPaymentModalVisible(false);
    setIsDetailsVisible(true);
  };

  const renderPaymentCard = ({ item }) => {
    const isPaid = item.status === 'Paid';

    return (
      <View style={styles.paymentCardFrame}>
        {/* Upper Identity Panel */}
        <View style={styles.cardHeaderFlexRow}>
          <View style={styles.vendorMetaDetailsColumn}>
            <Text numberOfLines={1} style={styles.vendorBrandHeadingTitle}>
              {item.vendorName}
            </Text>
            <Text style={styles.vendorCategorySubText}>{item.category}</Text>
          </View>
          <View style={styles.priceInvoiceGroupColumn}>
            <Text style={styles.paymentAmountHeadingString}>{item.amount}</Text>
            <Text style={styles.invoiceMetaNumberText}>
              {item.invoiceNumber}
            </Text>
          </View>
        </View>

        {/* Status Capsule Indicator */}
        <View style={styles.badgeWrapperRowShelf}>
          <View
            style={[
              styles.statusCapsuleBadge,
              isPaid ? styles.paidBadgeBg : styles.pendingBadgeBg,
            ]}
          >
            <Text
              style={[
                styles.statusCapsuleBadgeText,
                isPaid ? styles.paidBadgeText : styles.pendingBadgeText,
              ]}
            >
              {item.status}
            </Text>
          </View>
        </View>

        {/* Schedule & History Metadata Timeline Line */}
        <View style={styles.timelineDetailsTwinColumnsFlexRow}>
          <View style={styles.scheduleMetaInfoBlockItem}>
            <Image
              source={AppImages.calender || { uri: 'calendar_icon' }}
              style={styles.fieldUtilityVectorGlyphIcon}
            />
            <View>
              <Text style={styles.fieldMetaLabelUpperKeyText}>Due Date</Text>
              <Text style={styles.fieldValueDataValueStringText}>
                {item.dueDate}
              </Text>
            </View>
          </View>

          {isPaid && (
            <View style={styles.scheduleMetaInfoBlockItem}>
              <Image
                source={AppImages.checkCircle || { uri: 'check_circle' }}
                style={[
                  styles.fieldUtilityVectorGlyphIcon,
                  { tintColor: AppColors.secondary },
                ]}
              />
              <View>
                <Text style={styles.fieldMetaLabelUpperKeyText}>Paid On</Text>
                <Text style={styles.fieldValueDataValueStringText}>
                  {item.paidDate}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Action Button Segment Track Panels */}
        <View style={styles.cardActionUtilityButtonsClusterRowShelf}>
          <TouchableOpacity
            activeOpacity={0.75}
            style={[
              styles.primaryActionControlBtnItem,
              !isPaid && styles.payNowActionControlBtnItem,
            ]}
            onPress={() => {
              if (isPaid) {
                // navigation.navigate('ViewReceipt', {
                //   invoiceId: item.invoiceNumber,
                // });
              } else {
                handlePayNow(item);
              }
            }}
          >
            {isPaid ? (
              <Text style={styles.actionBtnLabelCommonText}>View Receipt</Text>
            ) : (
              <View style={styles.inlineIconLabelBtnFlexRow}>
                <Image
                  source={AppImages.cardIcon || { uri: 'card_icon' }}
                  style={styles.paneIconGlyphSymbol}
                />
                <Text
                  style={[
                    styles.actionBtnLabelCommonText,
                    { color: AppColors.black },
                  ]}
                >
                  Pay Now
                </Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.75}
            style={styles.downloadIconActionControlBtnItem}
            onPress={() =>
              console.log(
                'Download invoice structural asset:',
                item.invoiceNumber,
              )
            }
          >
            <Image
              source={AppImages.download}
              style={styles.downloadIconGlyphSymbol}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        No payment statements found for "{activeTab}"
      </Text>
    </View>
  );

  return (
    <ScreenWrapper>
      <View style={styles.mainContainer}>
        {/* Header Block Section */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Image source={AppImages.arrowLeft} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={styles.headerTextWrapper}>
            <Text style={styles.screenTitle}>Vendor Payments</Text>
            <Text style={styles.screenSubTitle}>Track all your payments</Text>
          </View>
        </View>

        {/* Total Overview Dynamic Cards Grid */}
        <View style={styles.statsContainerGridCard}>
          <View style={[styles.statMetricsDataBoxCard, styles.paidMetricsBg]}>
            <View style={styles.inlineHeaderMetricsLabelFlexRow}>
              <Image
                source={AppImages.checkCircle || { uri: 'check_circle' }}
                style={styles.miniMetricsIconGlyph}
              />
              <Text style={styles.statLabelHeadingText}>Paid</Text>
            </View>
            <Text style={styles.statValueNumericStringText}>
              {paymentStats.paidAmount}
            </Text>
          </View>

          <View
            style={[styles.statMetricsDataBoxCard, styles.pendingMetricsBg]}
          >
            <View style={styles.inlineHeaderMetricsLabelFlexRow}>
              <Image
                source={AppImages.clockIcon || { uri: 'clock_icon' }}
                style={styles.miniMetricsIconGlyph}
              />
              <Text style={styles.statLabelHeadingText}>Pending</Text>
            </View>
            <Text style={styles.statValueNumericStringText}>
              {paymentStats.pendingAmount}
            </Text>
          </View>
        </View>

        {/* Segment Filters Control Slider Shelf */}
        <View style={styles.tabsContainerTrack}>
          {paymentTabs.map((tab, idx) => {
            const isSelected = activeTab === tab;
            let tabBgColor = '#F5F5F5';
            if (isSelected) {
              if (tab === 'All') tabBgColor = '#2C2D2F';
              if (tab === 'Paid') tabBgColor = AppColors.secondary;
              if (tab === 'Pending') tabBgColor = AppColors.primary;
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

        {/* Dynamic Payment Statements List Feed */}
        <FlatList
          data={filteredPayments}
          renderItem={renderPaymentCard}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollAreaContainer}
          ListEmptyComponent={renderEmptyComponent}
        />
      </View>

      {/* Layer 1: Context Processing Modal Sheet */}
      <PaymentModal
        isVisible={isPaymentModalVisible}
        onClose={() => setIsPaymentModalVisible(false)}
        onConfirm={handleConfirmPayment}
        vendorName={selectedTransaction ? selectedTransaction.vendorName : ''}
        amount={paymentAmount}
        setAmount={setPaymentAmount}
        note={paymentNote}
        setNote={setPaymentNote}
      />

      {/* Layer 2: Final Summary Ledger Statement View Sheet */}
      <PaymentDetailsModal
        isVisible={isDetailsModalVisible}
        onClose={() => setIsDetailsVisible(false)}
        onConfirm={() => {
          setIsDetailsVisible(false);
          setActiveTab('All'); // Action completed fallback track refresh trigger
        }}
        details={{
          vendor: selectedTransaction
            ? selectedTransaction.vendorName
            : 'Vendor',
          service: selectedTransaction
            ? selectedTransaction.category
            : 'Service',
          invoice: selectedTransaction
            ? selectedTransaction.invoiceNumber
            : 'INV-000',
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
  statsContainerGridCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsiveHeight(3.5),
  },
  statMetricsDataBoxCard: {
    width: '48%',
    borderRadius: 24,
    paddingVertical: responsiveHeight(2.2),
    paddingHorizontal: responsiveWidth(5),
  },
  paidMetricsBg: {
    backgroundColor: AppColors.secondary,
  },
  pendingMetricsBg: {
    backgroundColor: AppColors.primary,
  },
  inlineHeaderMetricsLabelFlexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(0.8),
  },
  miniMetricsIconGlyph: {
    width: responsiveWidth(4),
    height: responsiveWidth(4),
    resizeMode: 'contain',
    tintColor: AppColors.black,
    marginRight: responsiveWidth(1.5),
  },
  statLabelHeadingText: {
    fontSize: responsiveFontSize(1.6),
    color: AppColors.black,
    fontWeight: '500',
  },
  statValueNumericStringText: {
    fontSize: responsiveFontSize(2.8),
    fontWeight: '700',
    color: AppColors.black,
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
    flexGrow: 1,
  },
  paymentCardFrame: {
    backgroundColor: AppColors.white,
    borderRadius: 28,
    padding: responsiveWidth(5),
    marginBottom: responsiveHeight(2.5),
    borderWidth: 1,
    borderColor: '#F1F1F1',
  },
  cardHeaderFlexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: responsiveHeight(1.2),
  },
  vendorMetaDetailsColumn: {
    flex: 1,
    paddingRight: responsiveWidth(2),
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
  priceInvoiceGroupColumn: {
    alignItems: 'flex-end',
  },
  paymentAmountHeadingString: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: '700',
    color: AppColors.black,
  },
  invoiceMetaNumberText: {
    fontSize: responsiveFontSize(1.4),
    color: '#8E8E93',
    fontWeight: '400',
    marginTop: responsiveHeight(0.2),
  },
  badgeWrapperRowShelf: {
    flexDirection: 'row',
    marginBottom: responsiveHeight(2.2),
  },
  statusCapsuleBadge: {
    borderRadius: 12,
    paddingHorizontal: responsiveWidth(3.5),
    paddingVertical: responsiveHeight(0.5),
  },
  paidBadgeBg: {
    backgroundColor: '#E8FAF6',
  },
  pendingBadgeBg: {
    backgroundColor: '#FDF0ED',
  },
  statusCapsuleBadgeText: {
    fontSize: responsiveFontSize(1.3),
    fontWeight: '600',
  },
  paidBadgeText: {
    color: '#2BBFA5',
  },
  pendingBadgeText: {
    color: '#E06D53',
  },
  timelineDetailsTwinColumnsFlexRow: {
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
    tintColor: '#A4A4A4',
    marginRight: responsiveWidth(2.5),
  },
  fieldMetaLabelUpperKeyText: {
    fontSize: responsiveFontSize(1.3),
    color: '#8C8C8C',
    fontWeight: '400',
  },
  fieldValueDataValueStringText: {
    fontSize: responsiveFontSize(1.5),
    color: AppColors.black,
    fontWeight: '600',
    marginTop: responsiveHeight(0.2),
  },
  cardActionUtilityButtonsClusterRowShelf: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  primaryActionControlBtnItem: {
    width: '78%',
    backgroundColor: '#FAF7F6',
    borderRadius: 16,
    height: responsiveHeight(5.6),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  payNowActionControlBtnItem: {
    backgroundColor: AppColors.secondary,
    borderColor: AppColors.secondary,
  },
  inlineIconLabelBtnFlexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paneIconGlyphSymbol: {
    width: responsiveWidth(4.5),
    height: responsiveWidth(4.5),
    resizeMode: 'contain',
    tintColor: AppColors.black,
    marginRight: responsiveWidth(2),
  },
  actionBtnLabelCommonText: {
    color: '#555555',
    fontSize: responsiveFontSize(1.6),
    fontWeight: '600',
  },
  downloadIconActionControlBtnItem: {
    width: '18%',
    backgroundColor: AppColors.primary,
    borderRadius: 16,
    height: responsiveHeight(5.6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadIconGlyphSymbol: {
    width: responsiveWidth(4),
    height: responsiveWidth(4),
    resizeMode: 'contain',
    tintColor: AppColors.black,
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

export default PaymentHistory;
