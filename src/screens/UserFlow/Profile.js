import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import { AppColors } from '../../utils/AppColors';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../utils/Responsive_Dimensions';
import { showToast } from '../../components/Toast';

const UserProfile = ({ navigation }) => {
  const handleLogout = () => {
    showToast('Success', 'Logged out successfully');
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
        {/* Profile Avatar Card */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarGlow}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitials}>W&E</Text>
            </View>
          </View>
          <Text style={styles.userName}>Wilson & Emma</Text>
          <Text style={styles.userEmail}>emma.wilson@example.com</Text>
        </View>

        {/* Settings Options */}
        <View style={styles.settingsGroup}>
          <Text style={styles.groupTitle}>Wedding Settings</Text>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => showToast('Info', 'Editing wedding date...')}
          >
            <Text style={styles.settingLabel}>Wedding Date</Text>
            <Text style={styles.settingValue}>Oct 18, 2026</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => showToast('Info', 'Editing theme colors...')}
          >
            <Text style={styles.settingLabel}>Theme Colors</Text>
            <Text style={styles.settingValue}>Rose Blush</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => showToast('Info', 'Editing guest password...')}
          >
            <Text style={styles.settingLabel}>Guest Code</Text>
            <Text style={styles.settingValue}>#LOVE2026</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.settingsGroup}>
          <Text style={styles.groupTitle}>Account & Privacy</Text>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => showToast('Info', 'Loading account details...')}
          >
            <Text style={styles.settingLabel}>Edit Account</Text>
            <Text style={styles.settingArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => showToast('Info', 'Loading notifications setup...')}
          >
            <Text style={styles.settingLabel}>Notification Settings</Text>
            <Text style={styles.settingArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Logout CTA */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutBtnText}>Logout</Text>
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
    backgroundColor: '#FDF7F5',
    borderWidth: 2,
    borderColor: AppColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(1.5),
  },
  avatarPlaceholder: {
    width: responsiveWidth(20),
    height: responsiveWidth(20),
    borderRadius: responsiveWidth(10),
    backgroundColor: AppColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: {
    color: AppColors.white,
    fontSize: responsiveFontSize(2.4),
    fontWeight: '700',
  },
  userName: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '700',
    color: AppColors.black,
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
    color: '#BC8D84',
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
    color: AppColors.black,
  },
  settingValue: {
    fontSize: responsiveFontSize(1.6),
    color: '#8E8E93',
    fontWeight: '500',
  },
  settingArrow: {
    fontSize: responsiveFontSize(2.2),
    color: '#BC8D84',
  },
  logoutBtn: {
    backgroundColor: '#FFF5F4',
    borderWidth: 1,
    borderColor: '#FEB1A3',
    borderRadius: 16,
    height: responsiveHeight(6.2),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(2),
  },
  logoutBtnText: {
    color: '#E04F38',
    fontWeight: '700',
    fontSize: responsiveFontSize(1.9),
  },
});

export default UserProfile;
