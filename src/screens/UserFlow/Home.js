import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
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

const UserHome = ({ navigation }) => {
  const weddingMenu = [
    {
      id: '1',
      title: 'Post Job',
      desc: 'Hire vendors',
      badge: 'New',
      badgeColor: AppColors.secondary,
      badgeTextColor: AppColors.black,
      icon: AppImages.plus,
      route: 'PostJob',
    },
    {
      id: '2',
      title: 'Events',
      desc: 'Manage ceremony & reception',
      badge: '3 events',
      badgeColor: AppColors.secondary,
      badgeTextColor: AppColors.black,
      icon: AppImages.calendar,
      route: 'Events',
    },
    {
      id: '3',
      title: 'Budget',
      desc: 'Track your expenses',
      badge: '75% spent',
      badgeColor: AppColors.secondary,
      badgeTextColor: AppColors.black,
      icon: AppImages.dollar,
      route: 'Budget',
    },
    {
      id: '4',
      title: 'To-Do List',
      desc: 'Complete your tasks',
      badge: '8 pending',
      badgeColor: AppColors.secondary,
      badgeTextColor: AppColors.black,
      icon: AppImages.tasks, // Replace with to-do icon if available
      route: 'ToDoList',
    },
    {
      id: '5',
      title: 'Guests',
      desc: 'Manage guest list',
      badge: '120 guests',
      badgeColor: AppColors.secondary,
      badgeTextColor: AppColors.black,
      icon: AppImages.users, // Replace with appropriate profile/guests icon
      route: 'Guests',
    },
    {
      id: '6',
      title: 'Tickets',
      desc: 'Registry & payments',
      badge: 'New',
      badgeColor: AppColors.secondary,
      badgeTextColor: AppColors.black,
      icon: AppImages.ticket, // Replace with ticket/payment icon
      route: 'Tickets',
    },
    {
      id: '7',
      title: 'Gallery',
      desc: 'Photos & themes',
      badge: '24 photos',
      badgeColor: AppColors.secondary,
      badgeTextColor: AppColors.black,
      icon: AppImages.gallery, // Replace with gallery/image icon
      route: 'Gallery',
    },
    {
      id: '8',
      title: 'Messages',
      desc: 'Create a new message',
      badge: 'New',
      badgeColor: AppColors.secondary,
      badgeTextColor: AppColors.black,
      icon: AppImages.chat,
      route: 'Chat',
    },
  ];

  return (
    <ScreenWrapper scrollable>
      <View style={styles.contentContainer}>
        {/* Header Action Row */}
        <View style={styles.topActionHeaderRow}>
          <TouchableOpacity activeOpacity={0.7} style={styles.headerIconCircle}>
            <Image source={AppImages.heart} style={styles.topHeaderIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            activeOpacity={0.7}
            style={styles.headerIconCircle}
          >
            <Image source={AppImages.settings} style={styles.topHeaderIcon} />
          </TouchableOpacity>
        </View>

        {/* Welcome Text Section */}
        <View style={styles.welcomeHeroContainer}>
          <Text style={styles.welcomeHeadingText}>
            Welcome, Wilson{'\n'}& Emma 💕
          </Text>
          <Text style={styles.countdownDescriptionText}>
            Your wedding is{' '}
            <Text style={styles.highlightBoldText}>42 days</Text> away!
          </Text>
        </View>

        {/* Planning Progress Bar Section */}
        <View style={styles.progressContainerBlock}>
          <View style={styles.progressLabelRow}>
            <Text style={styles.progressMetaLabel}>Planning Progress</Text>
            <Text style={styles.progressPercentageText}>65%</Text>
          </View>
          <View style={styles.progressBarOuterTrack}>
            <View style={[styles.progressBarFilledInner, { width: '65%' }]} />
          </View>
        </View>

        {/* Wedding Menu Heading */}
        <Text style={styles.blockSectionHeading}>Wedding Menu</Text>

        {/* Grid Layout Cards */}
        <View style={styles.menuGridMasterContainer}>
          {weddingMenu.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.gridItemCard}
              activeOpacity={0.8}
              // onPress={() => navigation.navigate(item.route)}
            >
              <View style={styles.menuIconBadgeWrapper}>
                <Image source={item.icon} style={styles.menuItemIcon} />
              </View>
              <Text style={styles.menuItemTitleText}>{item.title}</Text>
              <Text style={styles.menuItemDescText}>{item.desc}</Text>

              <View
                style={[
                  styles.badgeContainerCapsule,
                  { backgroundColor: item.badgeColor },
                ]}
              >
                <Text
                  style={[
                    styles.badgeTextLabel,
                    { color: item.badgeTextColor },
                  ]}
                >
                  {item.badge}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Upcoming Deadlines Block */}
        <Text style={styles.blockSectionHeading}>Upcoming</Text>
        <View style={styles.listCardItemContainerRow}>
          <View style={styles.iconAccentContainer}>
            <Image source={AppImages.calendar} style={styles.listCardRowIcon} />
          </View>
          <View style={styles.listCardContentColumn}>
            <Text style={styles.listCardTitleMainText}>
              Upcoming: Venue Visit
            </Text>
            <Text style={styles.listCardSubLabelText}>Tomorrow at 2:00 PM</Text>
          </View>
          <View style={styles.activeStatusNotificationDot} />
        </View>

        <View style={styles.listCardItemContainerRow}>
          <View style={styles.iconAccentContainer}>
            <Image source={AppImages.jobs} style={styles.listCardRowIcon} />
          </View>
          <View style={styles.listCardContentColumn}>
            <Text style={styles.listCardTitleMainText}>
              3 Tasks Due This Week
            </Text>
            <Text style={styles.listCardSubLabelText}>
              Complete to stay on track
            </Text>
          </View>
        </View>

        {/* New Proposals Section */}
        <View style={styles.sectionHeaderFlexContainer}>
          <Text style={styles.blockSectionHeadingInline}>New Proposals</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.viewAllActionLabelLink}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listCardItemContainerRow}>
          <View style={styles.iconAccentContainer}>
            <Image source={AppImages.jobs} style={styles.listCardRowIcon} />
          </View>
          <View style={styles.listCardContentColumn}>
            <Text style={styles.listCardTitleMainText}>
              Wedding Photography
            </Text>
            <Text style={styles.listCardSubLabelText}>
              3 new proposals received
            </Text>
          </View>
          <View style={styles.numericCounterNotificationBadge}>
            <Text style={styles.numericCounterBadgeLabelText}>3</Text>
          </View>
        </View>

        {/* Your Vendors Section */}
        <View style={styles.sectionHeaderFlexContainer}>
          <Text style={styles.blockSectionHeadingInline}>Your Vendors</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.viewAllActionLabelLink}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listCardItemContainerRow}>
          <View style={styles.iconAccentContainer}>
            <Image source={AppImages.logo} style={styles.listCardRowIcon} />
          </View>
          <View style={styles.listCardContentColumn}>
            <Text style={styles.listCardTitleMainText}>2 Active Vendors</Text>
            <Text style={styles.listCardSubLabelText}>
              Premium Events Co., Royal Catering
            </Text>
          </View>
        </View>

        <View style={styles.footerSpacingSpacer} />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: AppColors.white,
    marginHorizontal: responsiveWidth(5),
    borderRadius: 36,
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(2.5),
    paddingBottom: responsiveHeight(4),
    marginTop: responsiveHeight(1.5),
    marginBottom: responsiveHeight(2),
  },
  topActionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveHeight(1.5),
  },
  headerIconCircle: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    borderRadius: responsiveWidth(5),
    backgroundColor: AppColors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topHeaderIcon: {
    width: '55%',
    height: '55%',
    resizeMode: 'contain',
    tintColor: AppColors.primary,
  },
  welcomeHeroContainer: {
    marginBottom: responsiveHeight(2.5),
  },
  welcomeHeadingText: {
    fontSize: responsiveFontSize(3.2),
    fontWeight: '800',
    color: AppColors.black,
    lineHeight: responsiveHeight(4.5),
  },
  countdownDescriptionText: {
    fontSize: responsiveFontSize(1.9),
    color: '#555555',
    marginTop: responsiveHeight(1),
  },
  highlightBoldText: {
    fontWeight: '700',
    color: AppColors.black,
  },
  progressContainerBlock: {
    marginBottom: responsiveHeight(3.5),
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveHeight(1),
  },
  progressMetaLabel: {
    fontSize: responsiveFontSize(1.7),
    color: '#666666',
    fontWeight: '500',
  },
  progressPercentageText: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: '700',
    color: AppColors.black,
  },
  progressBarOuterTrack: {
    width: '100%',
    height: responsiveHeight(1.2),
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  progressBarFilledInner: {
    height: '100%',
    backgroundColor: AppColors.secondary,
    borderRadius: 10,
  },
  blockSectionHeading: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '700',
    color: AppColors.black,
    marginBottom: responsiveHeight(1),
    marginTop: responsiveHeight(2),
  },
  sectionHeaderFlexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: responsiveHeight(3),
    marginBottom: responsiveHeight(2),
  },
  blockSectionHeadingInline: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '700',
    color: AppColors.black,
    marginBottom: -responsiveHeight(1),
  },
  viewAllActionLabelLink: {
    fontSize: responsiveFontSize(1.6),
    color: '#888888',
    fontWeight: '500',
  },
  menuGridMasterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: responsiveHeight(2),
  },
  gridItemCard: {
    backgroundColor: AppColors.white,
    borderRadius: 18,
    width: '48%',
    padding: responsiveWidth(4.5),
    borderWidth: 1,
    borderColor: '#F2F2F2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 3,
  },
  menuIconBadgeWrapper: {
    backgroundColor: '#F5F5F5',
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
  },
  menuItemIcon: {
    height: '50%',
    width: '50%',
    tintColor: AppColors.black,
    resizeMode: 'contain',
  },
  menuItemTitleText: {
    fontSize: responsiveFontSize(2.0),
    fontWeight: '700',
    color: AppColors.black,
    marginBottom: responsiveHeight(0.5),
  },
  menuItemDescText: {
    fontSize: responsiveFontSize(1.4),
    color: '#888888',
    lineHeight: responsiveFontSize(1.9),
    marginBottom: responsiveHeight(1.5),
  },
  badgeContainerCapsule: {
    alignSelf: 'flex-start',
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(0.5),
    borderRadius: 12,
  },
  badgeTextLabel: {
    fontSize: responsiveFontSize(1.3),
    fontWeight: '600',
  },
  listCardItemContainerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.white,
    borderRadius: 16,
    padding: responsiveWidth(4),
    borderWidth: 1,
    borderColor: '#F2F2F2',
    marginBottom: responsiveHeight(1.5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  iconAccentContainer: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: responsiveWidth(3.5),
  },
  listCardRowIcon: {
    width: '50%',
    height: '50%',
    tintColor: AppColors.black,
    resizeMode: 'contain',
  },
  listCardContentColumn: {
    flex: 1,
  },
  listCardTitleMainText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '600',
    color: AppColors.black,
    marginBottom: responsiveHeight(0.3),
  },
  listCardSubLabelText: {
    fontSize: responsiveFontSize(1.45),
    color: '#777777',
  },
  activeStatusNotificationDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: AppColors.secondary,
    marginLeft: responsiveWidth(2),
  },
  numericCounterNotificationBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: AppColors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: responsiveWidth(2),
  },
  numericCounterBadgeLabelText: {
    fontSize: responsiveFontSize(1.3),
    fontWeight: '700',
    color: AppColors.black,
  },
  footerSpacingSpacer: {
    height: responsiveHeight(2),
  },
});

export default UserHome;
