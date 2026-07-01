import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
  Platform,
} from 'react-native';
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

const VendorProfile = ({ navigation }) => {
  // Toggle states for services list layout mapping
  const [services, setServices] = useState([
    {
      id: '1',
      name: 'Wedding Catering - Full',
      price: '$3,500',
      category: 'Catering',
      active: true,
    },
    {
      id: '2',
      name: 'Corporate Event Photography',
      price: '$2,800',
      category: 'Photography',
      active: true,
    },
    {
      id: '3',
      name: 'Kids Party Decorations',
      price: '$1,200',
      category: 'Decorations',
      active: false,
    },
  ]);

  // Global system notification toggle parameter state tracking
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Dynamic toggle switch interaction handler for services item listing
  const handleToggleService = id => {
    setServices(prevServices =>
      prevServices.map(item =>
        item.id === id ? { ...item, active: !item.active } : item,
      ),
    );
  };

  // Service item execution list controller
  const handleDeleteService = id => {
    setServices(prevServices => prevServices.filter(item => item.id !== id));
  };

  return (
    <ScreenWrapper scrollable>
      <View style={styles.contentContainer}>
        <LogoHeader title="Profile & Settings" profileIcon headerHeight={25} />

        {/* Primary Operational Identity Information Tags Group */}
        <View style={styles.vendorPrimaryTitleBlock}>
          <Text style={styles.vendorProfileDisplayTitleText}>Vendor Name</Text>
          <Text style={styles.premiumBadgeSubtitleLabelText}>
            Premium Member
          </Text>
        </View>

        {/* Business Analytics Statistical Triple Row Counters Matrix Component */}
        <View style={styles.statisticsMetricsRowContainerGrid}>
          <View style={styles.metricItemDashboardCardFrame}>
            <Image source={AppImages.tickCirlcle} style={styles.icon} />
            <Text style={styles.metricCounterNumericalValueHeading}>47</Text>
            <Text style={styles.metricSecondaryMetaLabelText}>Completed</Text>
          </View>

          <View style={styles.metricItemDashboardCardFrame}>
            <Image source={AppImages.star} style={styles.icon} />
            <Text style={styles.metricCounterNumericalValueHeading}>4.9</Text>
            <Text style={styles.metricSecondaryMetaLabelText}>Rating</Text>
          </View>

          <View style={styles.metricItemDashboardCardFrame}>
            <Image source={AppImages.reviews} style={styles.icon} />
            <Text style={styles.metricCounterNumericalValueHeading}>12</Text>
            <Text style={styles.metricSecondaryMetaLabelText}>Reviews</Text>
          </View>
        </View>

        {/* Block Module Section Label: Business Managed Offerings Grid */}
        <View style={styles.sectionHeaderFlexContainerRow}>
          <Text style={styles.blockSectionHeadingTitleText}>My Services</Text>
          <TouchableOpacity
            style={styles.addActionPillCapsuleButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('AddService')}
          >
            <Image source={AppImages.plus} style={styles.plusIcon} />
            <Text style={styles.addActionButtonLabelText}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* My Offerings Managed FlatList Queue Loop */}
        <View style={styles.listContainerWrapperBlock}>
          {services.map(item => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.6}
              onPress={() =>
                navigation.navigate('ServiceDetails', { data: item })
              }
              style={styles.serviceOfferingItemRowTileCard}
            >
              <View style={styles.serviceMetaIconBoxPlaceholderFrame}>
                <Image source={AppImages.jobs} style={styles.serviceIcon} />
              </View>

              <View style={styles.serviceItemIdentityTextLabelsGroup}>
                <Text style={styles.serviceItemMainTitleText} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.serviceItemRatePriceTagLabel}>
                  {item.price}
                </Text>
              </View>

              <View style={styles.serviceActionInteractiveControllersCluster}>
                <Switch
                  trackColor={{ false: '#DCDCDC', true: '#8ADED5' }}
                  thumbColor={'#FFFFFF'}
                  ios_backgroundColor="#DCDCDC"
                  onValueChange={() => handleToggleService(item.id)}
                  value={item.active}
                  style={
                    Platform.OS === 'ios'
                      ? { transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }
                      : {}
                  }
                />
                <TouchableOpacity
                  style={styles.serviceActionButton}
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('AddService')}
                >
                  <Image source={AppImages.edit} style={styles.deleteIcon} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.serviceActionButton}
                  activeOpacity={0.7}
                  onPress={() => handleDeleteService(item.id)}
                >
                  <Image source={AppImages.delete} style={styles.deleteIcon} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Block Module Section Label: Standard Settings Navigation Controls */}
        <Text style={styles.settingsTitleText}>Settings</Text>

        {/* Global Settings Composite Group Options Control Panel Layout */}
        <View style={styles.settingsGroupListConsoleStackCardContainer}>
          {/* Option Node: Edit Business Profile Profile Card Information */}
          <TouchableOpacity
            style={styles.settingsNavigationStandardHyperlinkRowTile}
            activeOpacity={0.75}
            onPress={() => navigation.navigate('VendorEditProfile')}
          >
            <View style={[styles.settingIconContainer]}>
              <Image source={AppImages.edit} style={styles.settingIcon} />
            </View>
            <View style={styles.settingMetaContentLabelBlockColumn}>
              <Text style={styles.settingPrimaryActionLabelHeadingText}>
                Edit Profile
              </Text>
              <Text style={styles.settingMetaSubtextDescriptionLabel}>
                Update business information
              </Text>
            </View>
            <Image source={AppImages.arrowRight} style={styles.arrowRight} />
          </TouchableOpacity>

          {/* Option Node: Modify Accounts Credentials Access */}
          <TouchableOpacity
            style={styles.settingsNavigationStandardHyperlinkRowTile}
            activeOpacity={0.75}
          >
            <View style={[styles.settingIconContainer]}>
              <Image source={AppImages.lock} style={styles.settingIcon} />
            </View>
            <View style={styles.settingMetaContentLabelBlockColumn}>
              <Text style={styles.settingPrimaryActionLabelHeadingText}>
                Change Password
              </Text>
              <Text style={styles.settingMetaSubtextDescriptionLabel}>
                Update security settings
              </Text>
            </View>
            <Image source={AppImages.arrowRight} style={styles.arrowRight} />
          </TouchableOpacity>

          {/* Option Node: Broadcast Alerts Subsystem Configurations Trigger Block */}
          <View style={styles.settingsNavigationStandardHyperlinkRowTile}>
            <View style={[styles.settingIconContainer]}>
              <Image source={AppImages.bell} style={styles.settingIcon} />
            </View>
            <View style={styles.settingMetaContentLabelBlockColumn}>
              <Text style={styles.settingPrimaryActionLabelHeadingText}>
                Notifications
              </Text>
              <Text style={styles.settingMetaSubtextDescriptionLabel}>
                Receive job alerts
              </Text>
            </View>
            <Switch
              trackColor={{ false: '#DCDCDC', true: '#8ADED5' }}
              thumbColor={'#FFFFFF'}
              ios_backgroundColor="#DCDCDC"
              onValueChange={setNotificationsEnabled}
              value={notificationsEnabled}
              style={
                Platform.OS === 'ios'
                  ? { transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }
                  : {}
              }
            />
          </View>

          {/* Option Node: Account Closure Destruction Subsystem De-authenticator Trigger */}
          <TouchableOpacity
            onPress={() =>
              navigation.replace('AuthStack', { screen: 'Splash' })
            }
            style={[
              styles.settingsNavigationStandardHyperlinkRowTile,
              { borderBottomWidth: 0, marginBottom: 0 },
            ]}
            activeOpacity={0.75}
          >
            <View style={[styles.settingIconContainer]}>
              <Image source={AppImages.logout} style={styles.settingIcon} />
            </View>
            <View style={styles.settingMetaContentLabelBlockColumn}>
              <Text style={[styles.logoutText]}>Log Out</Text>
              <Text style={styles.settingMetaSubtextDescriptionLabel}>
                Sign out of your account
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ height: responsiveHeight(4) }} />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: AppColors.white,
    marginHorizontal: responsiveWidth(4),
    borderRadius: 36,
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(4),
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(2),
    minHeight: '95%',
  },
  vendorPrimaryTitleBlock: {
    alignItems: 'center',
    marginBottom: responsiveHeight(2.5),
  },
  vendorProfileDisplayTitleText: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '600',
    color: AppColors.black,
  },
  premiumBadgeSubtitleLabelText: {
    fontSize: responsiveFontSize(1.75),
    color: '#4A4A4A',
    fontWeight: '400',
    marginTop: responsiveHeight(0.4),
  },
  statisticsMetricsRowContainerGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveHeight(2.5),
  },
  metricItemDashboardCardFrame: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 16,
    paddingVertical: responsiveHeight(1.8),
    alignItems: 'center',
    marginHorizontal: responsiveWidth(1.2),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  icon: {
    height: responsiveWidth(5),
    width: responsiveWidth(5),
    resizeMode: 'contain',
    fontSize: responsiveFontSize(2),
    marginBottom: responsiveHeight(0.6),
  },
  metricCounterNumericalValueHeading: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '700',
    color: AppColors.black,
  },
  metricSecondaryMetaLabelText: {
    fontSize: responsiveFontSize(1.25),
    color: '#9E9E9E',
    fontWeight: '500',
    marginTop: responsiveHeight(0.4),
  },
  sectionHeaderFlexContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(1.2),
    width: '100%',
  },
  blockSectionHeadingTitleText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '600',
    color: AppColors.black,
  },
  addActionPillCapsuleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8ADED5', // Visual signature palette layout match
    paddingHorizontal: responsiveWidth(3.5),
    paddingVertical: responsiveHeight(0.6),
    borderRadius: 8,
  },
  plusIcon: {
    height: responsiveWidth(4),
    width: responsiveWidth(4),
    resizeMode: 'contain',
    marginRight: responsiveWidth(1),
  },
  addActionButtonLabelText: {
    fontSize: responsiveFontSize(1.45),
    color: '#1A2E2B',
    fontWeight: '600',
  },
  listContainerWrapperBlock: {
    width: '100%',
  },
  serviceOfferingItemRowTileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 16,
    padding: responsiveWidth(3.8),
    marginBottom: responsiveHeight(1.4),
  },
  serviceMetaIconBoxPlaceholderFrame: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(188, 138, 77, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: responsiveWidth(3.5),
  },
  serviceIcon: {
    height: responsiveWidth(4),
    width: responsiveWidth(4),
    resizeMode: 'contain',
    tintColor: AppColors.primary,
  },
  serviceItemIdentityTextLabelsGroup: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: responsiveWidth(2),
  },
  serviceItemMainTitleText: {
    fontSize: responsiveFontSize(1.55),
    fontWeight: '600',
    color: AppColors.black,
    marginBottom: responsiveHeight(0.2),
  },
  serviceItemRatePriceTagLabel: {
    fontSize: responsiveFontSize(1.35),
    color: '#757575',
    fontWeight: '500',
  },
  serviceActionInteractiveControllersCluster: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceActionButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: responsiveWidth(2.5),
  },
  deleteIcon: {
    height: responsiveWidth(4),
    width: responsiveWidth(4),
    resizeMode: 'contain',
  },
  settingsTitleText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '600',
    color: AppColors.black,
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(1.5),
  },
  settingsGroupListConsoleStackCardContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 18,
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1),
    width: '100%',
  },
  settingsNavigationStandardHyperlinkRowTile: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsiveHeight(1.6),
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  settingIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: responsiveWidth(4),
    backgroundColor: AppColors.secondary,
  },
  settingIcon: {
    height: responsiveWidth(4),
    width: responsiveWidth(4),
    resizeMode: 'contain',
    tintColor: AppColors.black,
  },
  settingMetaContentLabelBlockColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  settingPrimaryActionLabelHeadingText: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '500',
    color: AppColors.black,
    marginBottom: responsiveHeight(0.2),
  },
  logoutText: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '500',
    color: AppColors.red,
    marginBottom: responsiveHeight(0.2),
  },
  settingMetaSubtextDescriptionLabel: {
    fontSize: responsiveFontSize(1.3),
    color: '#9E9E9E',
    fontWeight: '400',
  },
  arrowRight: {
    height: responsiveWidth(4),
    width: responsiveWidth(4),
    resizeMode: 'contain',
  },
});

export default VendorProfile;
