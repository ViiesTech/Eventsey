import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import { AppColors } from '../../utils/AppColors';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../utils/Responsive_Dimensions';
import { showToast } from '../../components/Toast';

const VendorProfile = ({ navigation }) => {
  const handleLogout = () => {
    showToast('Success', 'Merchant logged out');
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'AuthStack' }],
      });
    }, 800);
  };

  return (
    <ScreenWrapper scrollable backgroundColor={AppColors.white}>
      <View style={styles.container}>
        {/* Profile Header Block */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarGlow}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>CC</Text>
            </View>
          </View>
          <Text style={styles.userName}>Classic Catering Co.</Text>
          <Text style={styles.userEmail}>partner@classiccatering.com</Text>
        </View>

        {/* Business Settings */}
        <View style={styles.settingsGroup}>
          <Text style={styles.groupTitle}>Business Profile</Text>

          <TouchableOpacity style={styles.settingItem} onPress={() => showToast('Info', 'Editing company info...')}>
            <Text style={styles.settingLabel}>Company Details</Text>
            <Text style={styles.settingValue}>Food & Beverage</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={() => showToast('Info', 'Opening portfolio files...')}>
            <Text style={styles.settingLabel}>Menu Portfolio</Text>
            <Text style={styles.settingValue}>3 Active Catalogs</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={() => showToast('Info', 'Editing service locations...')}>
            <Text style={styles.settingLabel}>Service Radius</Text>
            <Text style={styles.settingValue}>Los Angeles (50mi)</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.settingsGroup}>
          <Text style={styles.groupTitle}>Payouts & Billing</Text>

          <TouchableOpacity style={styles.settingItem} onPress={() => showToast('Info', 'Opening payout methods...')}>
            <Text style={styles.settingLabel}>Bank Accounts</Text>
            <Text style={styles.settingArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={() => showToast('Info', 'Opening transaction logs...')}>
            <Text style={styles.settingLabel}>Earning Invoices</Text>
            <Text style={styles.settingArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutBtnText}>Logout Account</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(6),
    paddingTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(12),
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: responsiveHeight(4),
  },
  avatarGlow: {
    width: responsiveWidth(24),
    height: responsiveWidth(24),
    borderRadius: responsiveWidth(12),
    backgroundColor: '#F0F9F8',
    borderWidth: 2,
    borderColor: AppColors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(1.5),
  },
  avatarPlaceholder: {
    width: responsiveWidth(20),
    height: responsiveWidth(20),
    borderRadius: responsiveWidth(10),
    backgroundColor: AppColors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#1A2E2B',
    fontSize: responsiveFontSize(2.4),
    fontWeight: '700',
  },
  userName: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '700',
    color: '#1A1A1A',
  },
  userEmail: {
    fontSize: responsiveFontSize(1.6),
    color: '#8E8E93',
    marginTop: responsiveHeight(0.4),
  },
  settingsGroup: {
    marginBottom: responsiveHeight(3.5),
  },
  groupTitle: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '700',
    color: '#6E8A85',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: responsiveHeight(1.5),
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 14,
    padding: responsiveWidth(4.5),
    marginBottom: responsiveHeight(1.2),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.01,
    shadowRadius: 2,
    elevation: 0.5,
  },
  settingLabel: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: '600',
    color: '#1A1A1A',
  },
  settingValue: {
    fontSize: responsiveFontSize(1.6),
    color: '#8E8E93',
    fontWeight: '500',
  },
  settingArrow: {
    fontSize: responsiveFontSize(2.2),
    color: '#6E8A85',
  },
  logoutBtn: {
    backgroundColor: '#F6FBFB',
    borderWidth: 1,
    borderColor: AppColors.secondary,
    borderRadius: 16,
    height: responsiveHeight(6.2),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(2),
  },
  logoutBtnText: {
    color: '#1A2E2B',
    fontWeight: '700',
    fontSize: responsiveFontSize(1.9),
  },
});

export default VendorProfile;
