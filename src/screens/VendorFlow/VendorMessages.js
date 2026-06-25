import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../utils/Responsive_Dimensions';
import { AppImages } from '../../assets/Images/Index';
import { AppColors } from '../../utils/AppColors';

const VendorMessages = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data mapping details verbatim from Screenshot 2026-06-23 at 11.26.40 PM.jpg
  const chatThreads = [
    {
      id: '1',
      name: 'Sarah & John',
      lastMessage: 'Great! Can we schedule a call to',
      time: '10:35 AM',
      unreadCount: 2,
      isOnline: true,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    },
    {
      id: '2',
      name: 'Emily & Mike',
      lastMessage: 'Thank you! We loved your portfolio.',
      time: 'Yesterday',
      unreadCount: 0,
      isOnline: false,
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    },
    {
      id: '3',
      name: 'Lisa & David',
      lastMessage: 'Can you send me the decoration',
      time: '2 days ago',
      unreadCount: 1,
      isOnline: true,
      avatar:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    },
    {
      id: '4',
      name: 'Anna Martinez',
      lastMessage: 'Perfect! See you on the wedding day.',
      time: '3 days ago',
      unreadCount: 0,
      isOnline: false,
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    },
    {
      id: '5',
      name: 'Tom & Jerry',
      lastMessage: 'We need to discuss the photography tir',
      time: '5 days ago',
      unreadCount: 0,
      isOnline: false,
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    },
  ];

  // Client live search filtration logic
  const filteredChats = chatThreads.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatCardTile}
      activeOpacity={0.85}
      onPress={() => navigation?.navigate('VendorChat', { thread: item })}
    >
      {/* Avatar Section with dynamic Online Presence indicator */}
      <View style={styles.avatarWrapperContainer}>
        <Image
          source={{ uri: item.avatar }}
          style={styles.clientAvatarThumbnail}
        />
        {item.isOnline && <View style={styles.onlineStatusIndicatorDot} />}
      </View>

      {/* Meta Text details group context */}
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
    <ScreenWrapper scrollable>
      <View style={styles.contentContainer}>
        {/* Persistent App Header Node Wrapper */}
        <View style={styles.brandHeroContainer}>
          <View style={styles.avatarMainFrame}>
            <Image source={AppImages.logo} style={styles.logo} />
          </View>
          <Text style={styles.subtextTag}>Vendors</Text>
          <Text style={styles.welcomeTitle}>Messages</Text>
          <Text style={styles.statusDescriptionText}>
            Chat with your clients
          </Text>
        </View>

        {/* Input Search Module Element */}
        <View style={styles.searchBarInputWrapperField}>
          <Image
            source={AppImages.search}
            style={styles.searchIconGraphicMirror}
          />
          <TextInput
            style={styles.textInputElementField}
            placeholder="Search clients..."
            placeholderTextColor="#9E9E9E"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCorrect={false}
          />
        </View>

        {/* FlatList Content Layer Module */}
        <FlatList
          data={filteredChats}
          keyExtractor={item => item.id}
          renderItem={renderChatItem}
          scrollEnabled={false} // Wrapper parent handles the unified layout scrolling safely
          contentContainerStyle={styles.threadsListStreamContainer}
          ListEmptyComponent={
            <View style={styles.emptyStateContainerBlock}>
              <Text style={styles.emptyStateFallbackMessage}>
                No conversation history found.
              </Text>
            </View>
          }
        />
      </View>
      <View style={{ height: responsiveHeight(4) }} />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: AppColors.white || '#FFFFFF',
    marginHorizontal: responsiveWidth(6),
    borderRadius: 36,
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(3),
    paddingBottom: responsiveHeight(4),
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(2),
    minHeight: '95%',
  },
  brandHeroContainer: {
    alignItems: 'center',
    marginVertical: responsiveHeight(1),
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
  welcomeTitle: {
    fontSize: responsiveFontSize(2.2),
    color: AppColors.black || '#000000',
    fontWeight: '600',
    marginTop: responsiveHeight(1.2),
  },
  statusDescriptionText: {
    fontSize: responsiveFontSize(1.6),
    color: AppColors.black,
    marginTop: responsiveHeight(1.5),
    alignSelf: 'flex-start',
  },
  searchBarInputWrapperField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(209, 213, 220, 1)',
    borderRadius: 14,
    paddingHorizontal: responsiveWidth(4),
    height: responsiveHeight(5.5),
    marginTop: responsiveHeight(1.5),
    marginBottom: responsiveHeight(2.5),
  },
  searchIconGraphicMirror: {
    height: responsiveWidth(4),
    width: responsiveWidth(4),
    resizeMode: 'contain',
    marginRight: responsiveWidth(2.5),
  },
  textInputElementField: {
    flex: 1,
    fontSize: responsiveFontSize(1.6),
    color: AppColors.black,
    padding: 0, // Resets native structural padding overrides inside Android
  },
  threadsListStreamContainer: {
    paddingBottom: responsiveHeight(1),
  },
  chatCardTile: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 18,
    padding: responsiveWidth(3.8),
    marginBottom: responsiveHeight(1.6),
  },
  avatarWrapperContainer: {
    position: 'relative',
    marginRight: responsiveWidth(3.5),
  },
  clientAvatarThumbnail: {
    width: responsiveWidth(13.5),
    height: responsiveWidth(13.5),
    borderRadius: responsiveWidth(6.75),
    backgroundColor: '#F5F5F5',
  },
  onlineStatusIndicatorDot: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00C851', // Bright green representation matching screenshot interface
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  chatTextDetailsGroup: {
    flex: 1,
    justifyContent: 'center',
  },
  titleTimestampRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveHeight(0.4),
  },
  clientProfileNameText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '500',
    color: AppColors.black,
    flex: 1,
    marginRight: responsiveWidth(2),
  },
  timestampLabelText: {
    fontSize: responsiveFontSize(1.3),
    color: '#9E9E9E',
    fontWeight: '400',
  },
  messageBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessageExcerptText: {
    fontSize: responsiveFontSize(1.55),
    color: '#666666',
    flex: 1,
    marginRight: responsiveWidth(3),
  },
  unreadCountBadgeCapsule: {
    backgroundColor: '#8ADED5', // Signature unread count color accent block from core layout screenshots
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  unreadCountValueText: {
    fontSize: responsiveFontSize(1.25),
    color: '#1A2E2B',
    fontWeight: '700',
  },
  emptyStateContainerBlock: {
    alignItems: 'center',
    paddingVertical: responsiveHeight(6),
  },
  emptyStateFallbackMessage: {
    fontSize: responsiveFontSize(1.5),
    color: '#9E9E9E',
  },
});

export default VendorMessages;
