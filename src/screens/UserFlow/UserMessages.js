import React, { useState } from 'react';
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
import { AppColors } from '../../utils/AppColors';
import { AppImages } from '../../assets/Images/Index';

const UserMessages = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Vendor');

  // Exact mock data string text details verified from layout screenshot structure
  const chatThreads = [
    {
      id: '1',
      name: 'Sarah & John',
      lastMessage: 'Great! Can we schedule a',
      time: '10:35 AM',
      unreadCount: 2,
      isOnline: true,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    },
    {
      id: '2',
      name: 'Emily & Mike',
      lastMessage: 'Thank you! We loved your',
      time: 'Yesterday',
      unreadCount: 0,
      isOnline: false,
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    },
    {
      id: '3',
      name: 'Lisa & David',
      lastMessage: 'Can you send me the',
      time: '2 days ago',
      unreadCount: 1,
      isOnline: true,
      avatar:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    },
    {
      id: '4',
      name: 'Anna Martinez',
      lastMessage: 'Perfect! See you on the',
      time: '3 days ago',
      unreadCount: 0,
      isOnline: false,
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    },
    {
      id: '5',
      name: 'Tom & Jerry',
      lastMessage: 'We need to discuss the',
      time: '5 days ago',
      unreadCount: 0,
      isOnline: false,
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    },
  ];

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatCardTile}
      activeOpacity={0.85}
      onPress={() => navigation?.navigate('UserChat', { thread: item })}
    >
      {/* Avatar Section Container with dynamic online state status badge */}
      <View style={styles.avatarWrapperContainer}>
        <Image
          source={{ uri: item.avatar }}
          style={styles.clientAvatarThumbnail}
        />
        {item.isOnline && <View style={styles.onlineStatusIndicatorDot} />}
      </View>

      {/* Meta structural typography labels fields */}
      <View style={styles.chatTextDetailsGroup}>
        <View style={styles.titleTimestampRow}>
          <Text style={styles.clientProfileNameText} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.timestampLabelText}>{item.time}</Text>
        </View>

        <View style={styles.messageBadgeRow}>
          <Text style={styles.lastMessageExcerptText} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unreadCount > 0 && (
            <View style={styles.unreadCountBadgeCapsule}>
              <Text style={styles.unreadCountValueText}>
                {item.unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper>
      <View style={styles.mainLayoutContainer}>
        {/* Navigation Action Pop Stack Row Control Header */}

        <View style={styles.headerRow}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Image source={AppImages.arrowLeft} style={styles.backIcon} />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>

        {/* Dynamic Static App Titles Typography Blocks */}
        <View style={styles.screenHeaderTitleBlock}>
          <Text style={styles.screenMainTitleText}>Messages</Text>
          <Text style={styles.screenSubTitleText}>View messages</Text>
        </View>

        {/* Dynamic Custom Segmented Controls Toggle Switch Pill Block */}
        <View style={styles.segmentedTabWrapperBar}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={[
              styles.tabFilterButton,
              activeTab === 'Guest'
                ? styles.tabFilterButtonActive
                : styles.tabFilterButtonInactive,
            ]}
            onPress={() => setActiveTab('Guest')}
          >
            <Text style={styles.tabButtonLabelText}>Guest</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            style={[
              styles.tabFilterButton,
              activeTab === 'Vendor'
                ? styles.tabFilterButtonActive
                : styles.tabFilterButtonInactive,
            ]}
            onPress={() => setActiveTab('Vendor')}
          >
            <Text style={styles.tabButtonLabelText}>Vendor</Text>
          </TouchableOpacity>
        </View>

        {/* FlatList Thread Stream Core Renderer Feed View */}
        <FlatList
          data={chatThreads}
          keyExtractor={item => item.id}
          renderItem={renderChatItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.threadsListStreamContainer}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  mainLayoutContainer: {
    flex: 1,
    paddingTop: responsiveHeight(4),
    paddingHorizontal: responsiveWidth(9),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(1),
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsiveHeight(1),
    paddingRight: responsiveWidth(4),
  },
  backIcon: {
    width: responsiveWidth(4.5),
    height: responsiveWidth(4.5),
    resizeMode: 'contain',
    tintColor: AppColors.black,
    marginRight: responsiveWidth(2),
  },
  backButtonText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '500',
    color: AppColors.black,
  },
  screenHeaderTitleBlock: {
    marginBottom: responsiveHeight(3.5),
  },
  screenMainTitleText: {
    fontSize: responsiveFontSize(3.8),
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  screenSubTitleText: {
    fontSize: responsiveFontSize(1.9),
    color: '#555555',
    fontWeight: '400',
    marginTop: responsiveHeight(0.5),
  },
  segmentedTabWrapperBar: {
    flexDirection: 'row',
    backgroundColor: '#F3EFEA',
    borderRadius: 10,
    padding: responsiveWidth(1.2),
    justifyContent: 'space-between',
    marginBottom: responsiveHeight(3.5),
  },
  tabFilterButton: {
    flex: 1,
    paddingVertical: responsiveHeight(1.2),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  tabFilterButtonActive: {
    backgroundColor: AppColors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  tabFilterButtonInactive: {
    backgroundColor: 'transparent',
  },
  tabButtonLabelText: {
    fontSize: responsiveFontSize(1.75),
    fontWeight: '500',
    color: AppColors.black,
  },
  threadsListStreamContainer: {
    paddingBottom: responsiveHeight(4),
  },
  chatCardTile: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 15,
    padding: responsiveWidth(4.2),
    marginBottom: responsiveHeight(1.8),
  },
  avatarWrapperContainer: {
    position: 'relative',
    marginRight: responsiveWidth(4),
  },
  clientAvatarThumbnail: {
    width: responsiveWidth(14.5),
    height: responsiveWidth(14.5),
    borderRadius: responsiveWidth(7.25),
    backgroundColor: '#F9F9F9',
  },
  onlineStatusIndicatorDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#39B54A', // Authentic match matching layout dots palette profile status marker
    borderWidth: 2.5,
    borderColor: AppColors.white,
  },
  chatTextDetailsGroup: {
    flex: 1,
    justifyContent: 'center',
  },
  titleTimestampRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveHeight(0.5),
  },
  clientProfileNameText: {
    fontSize: responsiveFontSize(2.0),
    fontWeight: '500',
    color: AppColors.black,
    flex: 1,
    marginRight: responsiveWidth(2),
  },
  timestampLabelText: {
    fontSize: responsiveFontSize(1.4),
    color: '#8A8A8F',
    fontWeight: '400',
  },
  messageBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessageExcerptText: {
    fontSize: responsiveFontSize(1.65),
    color: '#666666',
    flex: 1,
    marginRight: responsiveWidth(3),
  },
  unreadCountBadgeCapsule: {
    backgroundColor: AppColors.primary, // Matching active theme badges palette profile highlights array color
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  unreadCountValueText: {
    fontSize: responsiveFontSize(1.3),
    color: AppColors.black,
    fontWeight: '500',
  },
});

export default UserMessages;
