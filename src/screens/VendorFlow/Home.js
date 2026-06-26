import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Text from '../../components/CustomText';
import ScreenWrapper from '../../components/ScreenWrapper';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../utils/Responsive_Dimensions';
import { AppImages } from '../../assets/Images/Index';
import { AppColors } from '../../utils/AppColors';
import LogoHeader from '../../components/LogoHeader';

const VendorHome = ({ navigation }) => {
  const stats = [
    { id: '1', title: 'Active Jobs', value: '8', icon: AppImages.jobs },
    {
      id: '2',
      title: 'Pending Requests',
      value: '12',
      icon: AppImages.calendar,
    },
    { id: '3', title: 'Completed', value: '47', icon: AppImages.stats },
    {
      id: '4',
      title: 'Total Earnings',
      value: '$12.4K',
      icon: AppImages.dollar,
    },
  ];

  const recentActivities = [
    {
      id: '1',
      text: 'New job request from Sarah & John',
      time: '2 hours ago',
      color: '#74B9FF',
    },
    {
      id: '2',
      text: 'Payment received - $850',
      time: '5 hours ago',
      color: '#55E6C1',
    },
    {
      id: '3',
      text: 'Message from Emily Wilson',
      time: '1 day ago',
      color: '#D6A2E8',
    },
  ];

  return (
    <ScreenWrapper scrollable>
      <View style={styles.contentContainer}>
        <LogoHeader title="Welcome back" />

        {/* Profile Details Bar */}
        <View style={styles.profileStripRow}>
          <View style={styles.vendorIdentityGroup}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
              }}
              style={styles.avatarThumbnail}
            />
            <Text style={styles.profileNameText}>John Wilson 👑</Text>
          </View>
          <TouchableOpacity style={styles.bellActionCircle} activeOpacity={0.7}>
            <Image source={AppImages.bell} style={styles.bell} />
            <View style={styles.activeNotificationDot} />
          </TouchableOpacity>
        </View>

        <Text style={styles.statusDescriptionText}>
          Here's what's happening with your business
        </Text>

        {/* Matrix Stats Cards Layout */}
        <View style={styles.metricsGridContainer}>
          {stats.map(card => (
            <View key={card.id} style={styles.metricItemCard}>
              <View style={styles.metricIconBadgeWrapper}>
                <Image source={card.icon} style={styles.optionsIcon} />
              </View>
              <Text style={styles.metricNumericValue}>{card.value}</Text>
              <Text style={styles.metricMetaLabel}>{card.title}</Text>
            </View>
          ))}
        </View>

        {/* Quick Action Block */}
        <Text style={styles.blockSectionHeading}>Quick Actions</Text>
        <View style={styles.actionGridContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Jobs')}
            style={styles.actionGridTile}
            activeOpacity={0.8}
          >
            <Image source={AppImages.jobs} style={styles.quickActionsIcon} />
            <Text style={styles.actionTileTextLabel}>Jobs</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Chat')}
            style={styles.actionGridTile}
            activeOpacity={0.8}
          >
            <Image source={AppImages.chat} style={styles.quickActionsIcon} />
            <Text style={styles.actionTileTextLabel}>Messages</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('MyEarnings')}
            style={styles.actionGridTile}
            activeOpacity={0.8}
          >
            <Image source={AppImages.dollar} style={styles.quickActionsIcon} />
            <Text style={styles.actionTileTextLabel}>My Earnings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionGridTile}
            onPress={() => navigation.navigate('Premium')}
            activeOpacity={0.8}
          >
            <Image source={AppImages.star} style={styles.quickActionsIcon} />
            <Text style={styles.actionTileTextLabel}>Premium</Text>
          </TouchableOpacity>
        </View>

        {/* Business Log Activity Segment */}
        <Text style={styles.blockSectionHeading}>Recent Activity</Text>
        <View style={styles.activityMasterLogContainer}>
          {recentActivities.map(log => (
            <View key={log.id} style={styles.activityFeedItemRow}>
              <View
                style={[
                  styles.activityStatusIndicatorDot,
                  { backgroundColor: log.color },
                ]}
              />
              <View style={styles.activityContentDescriptionGroup}>
                <Text style={styles.activityLogCoreText}>{log.text}</Text>
                <Text style={styles.activityTimeOffsetLabel}>{log.time}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.footerSpacing} />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: AppColors.white,
    marginHorizontal: responsiveWidth(6),
    borderRadius: 36,
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(3),
    paddingBottom: responsiveHeight(4),
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(2),
    minHeight: '95%',
  },
  profileStripRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(2),
  },
  vendorIdentityGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarThumbnail: {
    height: responsiveWidth(11),
    width: responsiveWidth(11),
    borderRadius: responsiveWidth(5.5),
    marginRight: responsiveWidth(3),
  },
  profileNameText: {
    fontSize: responsiveFontSize(2.1),
    fontWeight: '700',
    color: AppColors.black,
  },
  bellActionCircle: {
    width: responsiveWidth(11),
    height: responsiveWidth(11),
    borderRadius: responsiveWidth(5.5),
    borderWidth: 1,
    borderColor: '#EFEFEF',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.white,
    position: 'relative',
  },
  bell: {
    height: responsiveWidth(5.5),
    width: responsiveWidth(5.5),
    resizeMode: 'contain',
  },
  activeNotificationDot: {
    position: 'absolute',
    top: responsiveHeight(1.2),
    right: responsiveWidth(3),
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: AppColors.secondary,
  },
  statusDescriptionText: {
    fontSize: responsiveFontSize(1.7),
    color: '#4A4A4A',
    marginBottom: responsiveHeight(2.5),
  },
  metricsGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricItemCard: {
    backgroundColor: AppColors.white,
    borderRadius: 18,
    width: '48%',
    padding: responsiveWidth(4),
    marginBottom: responsiveHeight(2),
    borderWidth: 1,
    borderColor: '#F5F5F5',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  metricIconBadgeWrapper: {
    backgroundColor: '#F9F6F0',
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
  },
  optionsIcon: {
    height: responsiveWidth(5.5),
    width: responsiveWidth(5.5),
    tintColor: AppColors.black,
    resizeMode: 'contain',
  },
  metricNumericValue: {
    fontSize: responsiveFontSize(3),
    fontWeight: '700',
    color: AppColors.black,
    marginBottom: responsiveHeight(0.3),
  },
  metricMetaLabel: {
    fontSize: responsiveFontSize(1.5),
    color: '#7C7C7C',
    fontWeight: '500',
  },
  blockSectionHeading: {
    fontSize: responsiveFontSize(2.1),
    fontWeight: '700',
    color: AppColors.black,
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(1.5),
  },
  actionGridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  quickActionsIcon: {
    height: responsiveWidth(6),
    width: responsiveWidth(6),
    tintColor: AppColors.black,
    resizeMode: 'contain',
  },
  actionGridTile: {
    backgroundColor: '#8ADED5',
    width: '48%',
    height: responsiveHeight(10.5),
    borderRadius: 16,
    paddingLeft: responsiveWidth(5),
    justifyContent: 'center',
    marginBottom: responsiveHeight(2),
  },
  actionTileTextLabel: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '600',
    color: '#1A2E2B',
    marginTop: responsiveHeight(0.8),
  },
  activityMasterLogContainer: {
    backgroundColor: AppColors.white,
    borderRadius: 18,
    paddingHorizontal: responsiveWidth(4.5),
    paddingVertical: responsiveHeight(1),
    borderWidth: 1,
    borderColor: '#EFEFEF',
    marginBottom: responsiveHeight(2),
  },
  activityFeedItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsiveHeight(1.6),
  },
  activityStatusIndicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: responsiveWidth(3.5),
  },
  activityContentDescriptionGroup: {
    flex: 1,
  },
  activityLogCoreText: {
    fontSize: responsiveFontSize(1.65),
    fontWeight: '500',
    color: AppColors.black,
    marginBottom: responsiveHeight(0.3),
  },
  activityTimeOffsetLabel: {
    fontSize: responsiveFontSize(1.35),
    color: '#9E9E9E',
  },
  footerSpacing: {
    height: responsiveHeight(5),
  },
});

export default VendorHome;
