import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Text from '../../components/CustomText';
import ScreenWrapper from '../../components/ScreenWrapper';
import { AppColors } from '../../utils/AppColors';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../utils/Responsive_Dimensions';

const UserHome = () => {
  return (
    <ScreenWrapper scrollable backgroundColor={AppColors.white}>
      <View style={styles.container}>
        {/* Top Header Card */}
        <View style={styles.headerCard}>
          <Text style={styles.greetingText}>Happy Planning,</Text>
          <Text style={styles.coupleNames}>Wilson & Emma</Text>
          <View style={styles.divider} />
          <Text style={styles.weddingDateText}>October 18, 2026</Text>
        </View>

        {/* Countdown Section */}
        <View style={styles.countdownContainer}>
          <View style={styles.countdownCircle}>
            <Text style={styles.countdownNumber}>142</Text>
            <Text style={styles.countdownLabel}>Days Left</Text>
          </View>
        </View>

        {/* Quick Stats Grid */}
        <Text style={styles.sectionTitle}>Planning Progress</Text>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12 / 48</Text>
            <Text style={styles.statLabel}>Tasks Done</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>84</Text>
            <Text style={styles.statLabel}>Guests RSVP'd</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>$18,400</Text>
            <Text style={styles.statLabel}>Budget Spent</Text>
          </View>
        </View>

        {/* Tip / Inspiration Section */}
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>💡 Wedding Tip of the Day</Text>
          <Text style={styles.tipText}>
            Confirm with your photographer at least 4 months in advance. Review
            their portfolio and share your shot list checklist!
          </Text>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(6),
    paddingTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(12), // Keep padding so floating tab bar doesn't overlay text
  },
  headerCard: {
    backgroundColor: '#FDF7F5',
    borderRadius: 24,
    padding: responsiveWidth(6),
    borderWidth: 1,
    borderColor: '#FBE8E2',
    alignItems: 'center',
    marginBottom: responsiveHeight(3),
  },
  greetingText: {
    fontSize: responsiveFontSize(1.8),
    color: '#BC8D84',
    fontWeight: '500',
    marginBottom: responsiveHeight(0.5),
  },
  coupleNames: {
    fontSize: responsiveFontSize(3.2),
    fontWeight: '700',
    color: AppColors.primary,
    textAlign: 'center',
  },
  divider: {
    width: '30%',
    height: 2,
    backgroundColor: AppColors.primary,
    marginVertical: responsiveHeight(1.5),
    opacity: 0.6,
  },
  weddingDateText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '600',
    color: '#8A6861',
  },
  countdownContainer: {
    alignItems: 'center',
    marginBottom: responsiveHeight(3),
  },
  countdownCircle: {
    width: responsiveWidth(36),
    height: responsiveWidth(36),
    borderRadius: responsiveWidth(18),
    backgroundColor: AppColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: AppColors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  countdownNumber: {
    fontSize: responsiveFontSize(4.2),
    fontWeight: '800',
    color: AppColors.white,
  },
  countdownLabel: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '600',
    color: AppColors.white,
    marginTop: responsiveHeight(-0.5),
  },
  sectionTitle: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '700',
    color: AppColors.black,
    marginBottom: responsiveHeight(2),
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsiveHeight(3),
  },
  statCard: {
    width: '31%',
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 16,
    paddingVertical: responsiveHeight(2),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: responsiveFontSize(2.0),
    fontWeight: '700',
    color: AppColors.black,
    marginBottom: responsiveHeight(0.5),
  },
  statLabel: {
    fontSize: responsiveFontSize(1.4),
    color: '#8E8E93',
    textAlign: 'center',
  },
  tipCard: {
    backgroundColor: '#F5EFEA',
    borderRadius: 16,
    padding: responsiveWidth(5),
  },
  tipTitle: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '700',
    color: '#8A6861',
    marginBottom: responsiveHeight(0.8),
  },
  tipText: {
    fontSize: responsiveFontSize(1.6),
    color: '#4A4A4A',
    lineHeight: responsiveHeight(2.4),
  },
});

export default UserHome;
