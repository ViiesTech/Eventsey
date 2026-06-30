import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
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

const UserProfile = ({ navigation }) => {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  const toggleSwitch = type => {
    if (type === 'push') setPushNotifications(previousState => !previousState);
    if (type === 'email') setEmailAlerts(previousState => !previousState);
  };

  const renderSettingRow = ({
    icon,
    label,
    onPress,
    isLast = false,
    showArrow = true,
  }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.settingRowItem, isLast && styles.noBottomBorder]}
    >
      <View style={styles.leftInfoBlock}>
        <Image source={icon} style={styles.rowIconGlyph} />
        <Text style={styles.rowLabelText}>{label}</Text>
      </View>
      {showArrow && (
        <Image source={AppImages.arrowRight} style={styles.chevronIcon} />
      )}
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper>
      <View style={styles.mainContainer}>
        <View style={styles.titleContainerTextWrapper}>
          <Text style={styles.screenTitleHeading}>Settings</Text>
          <Text style={styles.screenSubTitleHeading}>
            Manage your preferences
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollAreaContainer}
        >
          {/* ================= ACCOUNT SECTION ================= */}
          <Text style={styles.sectionHeaderLabelKeyText}>Account</Text>
          <View style={styles.settingsGroupCardWrapper}>
            {renderSettingRow({
              icon: AppImages.user,
              label: 'Edit Profile',
              onPress: () => navigation.navigate('UserEditProfile'),
            })}
            {renderSettingRow({
              icon: AppImages.heartOutline,
              label: 'Manage Wedding',
              // onPress: () => navigation.navigate('ManageWedding'),
              isLast: true,
            })}
          </View>

          {/* ================= NOTIFICATIONS SECTION ================= */}
          <Text style={styles.sectionHeaderLabelKeyText}>Notifications</Text>
          <View style={styles.settingsGroupCardWrapper}>
            {/* Push Notifications Row */}
            <View style={styles.settingRowItem}>
              <View style={styles.leftInfoBlock}>
                <Image source={AppImages.bell} style={styles.rowIconGlyph} />
                <Text style={styles.rowLabelText}>Push Notifications</Text>
              </View>
              <Switch
                trackColor={{ false: '#767577', true: '#F7C6BC' }}
                thumbColor={pushNotifications ? '#FFA293' : '#f4f3f4'}
                ios_backgroundColor="#EFEFEF"
                onValueChange={() => toggleSwitch('push')}
                value={pushNotifications}
              />
            </View>

            {/* Email Alerts Row */}
            <View style={[styles.settingRowItem, styles.noBottomBorder]}>
              <View style={styles.leftInfoBlock}>
                <Image source={AppImages.email} style={styles.rowIconGlyph} />
                <Text style={styles.rowLabelText}>Email Alerts</Text>
              </View>
              <Switch
                trackColor={{ false: '#767577', true: '#F7C6BC' }}
                thumbColor={emailAlerts ? '#FFA293' : '#f4f3f4'}
                ios_backgroundColor="#EFEFEF"
                onValueChange={() => toggleSwitch('email')}
                value={emailAlerts}
              />
            </View>
          </View>

          {/* ================= SUPPORT SECTION ================= */}
          <Text style={styles.sectionHeaderLabelKeyText}>Support</Text>
          <View style={styles.settingsGroupCardWrapper}>
            {renderSettingRow({
              icon: AppImages.question,
              label: 'Help & Support',
              onPress: () => navigation.navigate('HelpAndSupport'),
            })}
            {renderSettingRow({
              icon: AppImages.doc,
              label: 'Terms of Service',
              onPress: () => navigation.navigate('TermsOfService'),
            })}
            {renderSettingRow({
              icon: AppImages.shield,
              label: 'Privacy Policy',
              onPress: () => navigation.navigate('PrivacyPolicy'),
              isLast: true,
            })}
          </View>

          {/* ================= DANGER ZONE SECTION ================= */}
          <Text
            style={[styles.sectionHeaderLabelKeyText, { color: '#6A1B29' }]}
          >
            Danger Zone
          </Text>
          <View style={styles.settingsGroupCardWrapper}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => console.log('Trigger Delete Flow')}
              style={[styles.settingRowItem, styles.noBottomBorder]}
            >
              <View style={styles.leftInfoBlock}>
                <Image
                  source={AppImages.delete}
                  style={[styles.rowIconGlyph, { tintColor: '#8B2635' }]}
                />
                <Text
                  style={[
                    styles.rowLabelText,
                    { color: '#8B2635', fontWeight: '500' },
                  ]}
                >
                  Delete Wedding
                </Text>
              </View>
              <Image source={AppImages.arrowRight} style={styles.chevronIcon} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: responsiveHeight(4),
    paddingHorizontal: responsiveWidth(9),
  },
  titleContainerTextWrapper: {
    marginBottom: responsiveHeight(3.5),
  },
  screenTitleHeading: {
    fontSize: responsiveFontSize(3.6),
    fontWeight: '800',
    color: '#222325',
  },
  screenSubTitleHeading: {
    fontSize: responsiveFontSize(1.8),
    color: '#555555',
    fontWeight: '400',
    marginTop: responsiveHeight(0.5),
  },
  scrollAreaContainer: {
    paddingBottom: responsiveHeight(6),
  },
  sectionHeaderLabelKeyText: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '700',
    color: '#5E2B3E',
    textTransform: 'capitalize',
    marginBottom: responsiveHeight(1.5),
    marginLeft: responsiveWidth(2),
  },
  settingsGroupCardWrapper: {
    backgroundColor: AppColors.white,
    borderRadius: 20,
    paddingHorizontal: responsiveWidth(5),
    marginBottom: responsiveHeight(3.5),
    // Drop shadows matched with screenshot subtle elevation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F9F9F9',
  },
  settingRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: responsiveHeight(2.2),
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  noBottomBorder: {
    borderBottomWidth: 0,
  },
  leftInfoBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowIconGlyph: {
    width: responsiveWidth(5.5),
    height: responsiveWidth(5.5),
    resizeMode: 'contain',
    marginRight: responsiveWidth(4),
    tintColor: AppColors.secondary,
  },
  rowLabelText: {
    fontSize: responsiveFontSize(1.8),
    color: '#222325',
    fontWeight: '500',
  },
  chevronIcon: {
    width: responsiveWidth(4),
    height: responsiveWidth(4),
    resizeMode: 'contain',
    tintColor: '#A4A4A4',
  },
});

export default UserProfile;
