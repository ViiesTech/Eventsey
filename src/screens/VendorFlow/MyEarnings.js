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

const MyEarnings = ({ navigation }) => {
  // Mock Data matching your transaction history image exactly
  const transactions = [
    {
      id: '1',
      title: 'Wedding Catering - Sarah & John',
      date: 'Nov 4, 2025',
      amount: '$3,500',
      status: 'Paid',
    },
    {
      id: '2',
      title: 'Photography - Emily & Mike',
      date: 'Nov 2, 2025',
      amount: '$2,800',
      status: 'Paid',
    },
    {
      id: '3',
      title: 'Decoration - Lisa & David',
      date: 'Oct 28, 2025',
      amount: '$4,200',
      status: 'Pending',
    },
    {
      id: '4',
      title: 'Makeup - Anna Martinez',
      date: 'Oct 25, 2025',
      amount: '$850',
      status: 'Paid',
    },
  ];

  const handleWithdraw = () => {
    console.log('Withdraw Funds Triggered');
    // Add your withdrawal navigation or modal logic here
  };

  return (
    <ScreenWrapper scrollable>
      <View style={styles.contentContainer}>
        {/* Top Header Row Navigation */}
        <View style={styles.navigationHeaderRow}>
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
        </View>

        {/* Brand Core Identity Area */}
        <View style={styles.brandHeroContainer}>
          <View style={styles.avatarMainFrame}>
            <Image source={AppImages.logo} style={styles.logo} />
          </View>
          <Text style={styles.subtextTag}>Vendors</Text>
        </View>

        {/* Screen Title & Description */}
        <View style={styles.headlineContainer}>
          <Text style={styles.mainHeadingTitle}>My Earnings 💵</Text>
          <Text style={styles.subHeadingDescription}>
            Track your income and withdrawals
          </Text>
        </View>

        {/* STATS METRICS ROW */}
        <View style={styles.statsRowFrame}>
          {/* Total Earned */}
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Image
                source={AppImages.stats}
                style={styles.statIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.statAmountText}>$12,450</Text>
            <Text style={styles.statLabelText}>Total Earned</Text>
          </View>

          {/* Pending */}
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Image source={AppImages.time} style={styles.statIcon} />
            </View>
            <Text style={styles.statAmountText}>$2,100</Text>
            <Text style={styles.statLabelText}>Pending</Text>
          </View>

          {/* Withdrawn */}
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Image source={AppImages.tick} style={styles.statIcon} />
            </View>
            <Text style={styles.statAmountText}>$10,350</Text>
            <Text style={styles.statLabelText}>Withdrawn</Text>
          </View>
        </View>

        {/* WITHDRAW FUNDS BUTTON */}
        <TouchableOpacity
          style={styles.withdrawActionButton}
          onPress={handleWithdraw}
          activeOpacity={0.85}
        >
          <Image source={AppImages.arrowUp} style={styles.statIcon} />
          <Text style={styles.withdrawButtonText}> Withdraw Funds</Text>
        </TouchableOpacity>

        {/* TRANSACTION HISTORY SECTION */}
        <View style={styles.historySectionHeader}>
          <Text style={styles.historySectionTitle}>Transaction History</Text>
        </View>

        {/* List of Transactions */}
        <View style={styles.listBlockContainer}>
          {transactions.map(item => (
            <View key={item.id} style={styles.transactionListItemCard}>
              <View style={styles.transactionLeftColumn}>
                <Text style={styles.transactionMainTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.transactionDateSubtext}>{item.date}</Text>
              </View>

              <View style={styles.transactionRightColumn}>
                <Text style={styles.transactionAmountValue}>{item.amount}</Text>
                <View
                  style={[
                    styles.statusBadgeFrame,
                    item.status === 'Paid'
                      ? styles.statusPaidBackground
                      : styles.statusPendingBackground,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusBadgeText,
                      item.status === 'Paid'
                        ? styles.statusPaidText
                        : styles.statusPendingText,
                    ]}
                  >
                    {item.status === 'Paid' ? '✓ Paid' : 'Pending'}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: AppColors.white,
    marginHorizontal: responsiveWidth(9),
    borderRadius: 36,
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
  headlineContainer: {
    alignItems: 'center',
    marginVertical: responsiveHeight(1),
  },
  mainHeadingTitle: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: '700',
    color: AppColors.black,
    textAlign: 'center',
  },
  subHeadingDescription: {
    fontSize: responsiveFontSize(1.6),
    color: '#555555',
    textAlign: 'center',
    marginTop: responsiveHeight(0.6),
  },
  statsRowFrame: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: responsiveHeight(2.5),
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 16,
    width: '31%',
    paddingVertical: responsiveHeight(1.5),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  statIconContainer: {
    backgroundColor: '#F5F5F5',
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(1),
  },
  statIcon: {
    height: responsiveWidth(5),
    width: responsiveWidth(5),
    resizeMode: 'contain',
  },
  statAmountText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '700',
    color: AppColors.black,
    marginBottom: responsiveHeight(0.4),
  },
  statLabelText: {
    fontSize: responsiveFontSize(1.2),
    color: '#666666',
    textAlign: 'center',
  },
  withdrawActionButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.secondary,
    height: responsiveHeight(5.5),
    borderRadius: 12,
    marginBottom: responsiveHeight(3),
  },
  withdrawButtonText: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '500',
    color: AppColors.black,
  },
  historySectionHeader: {
    marginBottom: responsiveHeight(1.5),
  },
  historySectionTitle: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '700',
    color: AppColors.black,
  },
  listBlockContainer: {},
  transactionListItemCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 16,
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveHeight(1.5),
  },
  transactionLeftColumn: {
    flex: 1,
    marginRight: responsiveWidth(2),
  },
  transactionMainTitle: {
    fontSize: responsiveFontSize(1.5),
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: responsiveHeight(0.4),
  },
  transactionDateSubtext: {
    fontSize: responsiveFontSize(1.3),
    color: '#777777',
  },
  transactionRightColumn: {
    alignItems: 'flex-end',
  },
  transactionAmountValue: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '700',
    color: AppColors.black,
    marginBottom: responsiveHeight(0.6),
  },
  statusBadgeFrame: {
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(0.4),
    borderRadius: 8,
  },
  statusPaidBackground: {
    backgroundColor: '#F5B0A3', // Soft peach matching image theme tint
  },
  statusPendingBackground: {
    backgroundColor: '#9AD6CE', // Soft teal background
  },
  statusBadgeText: {
    fontSize: responsiveFontSize(1.2),
    fontWeight: '600',
  },
  statusPaidText: {
    color: '#6E2A1E',
  },
  statusPendingText: {
    color: '#1E534C',
  },
});

export default MyEarnings;
