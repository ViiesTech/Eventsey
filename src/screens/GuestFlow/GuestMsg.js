import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import Text from '../../components/CustomText';
import ScallopBackground from '../../components/ScallopBackground';
import { AppColors } from '../../utils/AppColors';
import { AppImages } from '../../assets/Images/Index';
import { useGuest } from '../../routes/GuestContext';
import { showToast } from '../../components/Toast';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../utils/Responsive_Dimensions';
import ScreenWrapper from '../../components/ScreenWrapper';

const GuestMsg = ({ navigation }) => {
  const {
    selectedEventId,
    setSelectedEventId,
    selectedEvent,
    events,
    blessings,
  } = useGuest();

  // State for dropdown event-switcher modal
  const [dropdownModalVisible, setDropdownModalVisible] = useState(false);

  const handleSignOut = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'AuthStack' }],
    });
  };

  // Mock badge counts for initial list
  const getBadgeCount = msgId => {
    if (msgId === 'b1') return 3;
    if (msgId === 'b4') return 1;
    return 0;
  };

  // ---------------- FALLBACK: NO EVENT ACTIVE ----------------
  if (!selectedEventId) {
    return (
      <ScallopBackground>
        <View style={styles.fallbackContainer}>
          <Text style={styles.fallbackTitle}>No Invitation Open</Text>
          <Text style={styles.fallbackSubtext}>
            Please select and open a wedding invitation from the Home tab first
            to access message history.
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            activeOpacity={0.8}
            style={styles.fallbackBtn}
          >
            <Text style={styles.fallbackBtnText}>View Invitations</Text>
          </TouchableOpacity>
        </View>
      </ScallopBackground>
    );
  }

  const activeBlessings = blessings[selectedEventId] || [];

  // ---------------- ACTIVE STATE: RENDER MESSAGES ----------------
  return (
    <ScreenWrapper>
      <View style={styles.outerContainer}>
        {/* Top Header Row */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={handleSignOut}
            activeOpacity={0.7}
            style={styles.signOutBtn}
          >
            <Text style={styles.signOutBtnText}>Sign in</Text>
          </TouchableOpacity>

          {/* Event Switcher Dropdown Trigger */}
          <TouchableOpacity
            onPress={() => setDropdownModalVisible(true)}
            activeOpacity={0.7}
            style={styles.dropdownTrigger}
          >
            <Text style={styles.dropdownTriggerText} numberOfLines={1}>
              {selectedEvent.couple}
            </Text>
            <Image
              source={AppImages.arrowDown}
              style={styles.dropdownArrowIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Header Hero Section */}
        <View style={styles.heroTextContainer}>
          <Text style={styles.heroTitle}>Message History</Text>
          <Text style={styles.heroSubtitle}>
            {selectedEvent.couple.replace(' & ', ' ♥️ ')}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Your Messages</Text>

        {/* Scrollable list of messages */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.messageListCard}>
            {activeBlessings.length === 0 ? (
              <View style={styles.emptyMessagesContainer}>
                <Text style={styles.emptyMessagesText}>
                  No messages yet. Send a blessing to the couple on the RSVP
                  tab!
                </Text>
              </View>
            ) : (
              activeBlessings.map((msg, index) => {
                const badgeCount = getBadgeCount(msg.id);
                return (
                  <TouchableOpacity
                    key={msg.id}
                    activeOpacity={0.7}
                    onPress={() =>
                      navigation.navigate('GuestChat', { thread: msg })
                    }
                    style={[
                      styles.messageItemRow,
                      index === activeBlessings.length - 1 && {
                        borderBottomWidth: 0,
                      },
                    ]}
                  >
                    <View style={styles.messageHeaderRow}>
                      <Text style={styles.senderName}>{msg.sender}</Text>
                      <Text style={styles.messageTime}>{msg.time}</Text>
                    </View>

                    <View style={styles.messageBodyRow}>
                      <Text style={styles.messageText} numberOfLines={1}>
                        {msg.text}
                      </Text>
                      {badgeCount > 0 && (
                        <View style={styles.badgeCircle}>
                          <Text style={styles.badgeText}>{badgeCount}</Text>
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })
            )}
          </View>
          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Dropdown Switcher Modal */}
        <Modal
          visible={dropdownModalVisible}
          animationType="fade"
          transparent
          onRequestClose={() => setDropdownModalVisible(false)}
        >
          <View style={styles.dropdownModalOverlay}>
            <TouchableOpacity
              style={styles.dropdownOverlayDismiss}
              onPress={() => setDropdownModalVisible(false)}
            />
            <View style={styles.dropdownCard}>
              <Text style={styles.dropdownTitle}>SWITCH EVENT</Text>

              {events.map(evt => (
                <TouchableOpacity
                  key={evt.id}
                  onPress={() => {
                    setSelectedEventId(evt.id);
                    setDropdownModalVisible(false);
                    showToast('Info', `Switched to ${evt.couple}'s wedding`);
                  }}
                  activeOpacity={0.7}
                  style={styles.dropdownItemRow}
                >
                  <View style={styles.dropdownItemLeft}>
                    <View style={styles.dropdownItemThumbBox}>
                      <Image
                        source={{ uri: evt.image }}
                        style={styles.dropdownItemThumb}
                      />
                    </View>
                    <View>
                      <Text style={styles.dropdownItemName}>{evt.couple}</Text>
                      <Text style={styles.dropdownItemDate}>
                        {evt.date.split(' • ')[0]}
                      </Text>
                    </View>
                  </View>
                  {selectedEventId === evt.id && (
                    <Image
                      source={AppImages.tick}
                      style={styles.dropdownCheckmark}
                    />
                  )}
                </TouchableOpacity>
              ))}

              <View style={styles.dropdownDivider} />

              <TouchableOpacity
                onPress={() => {
                  setSelectedEventId(null);
                  setDropdownModalVisible(false);
                  navigation.navigate('Home');
                }}
                activeOpacity={0.7}
                style={[styles.dropdownItemRow, { paddingVertical: 12 }]}
              >
                <View style={styles.dropdownItemLeft}>
                  <View
                    style={[
                      styles.dropdownItemThumbBox,
                      {
                        backgroundColor: '#F0F0F0',
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                    ]}
                  >
                    <Image
                      source={AppImages.home}
                      style={{
                        width: 16,
                        height: 16,
                        tintColor: AppColors.liteGray,
                      }}
                    />
                  </View>
                  <Text
                    style={[
                      styles.dropdownItemName,
                      { color: AppColors.liteGray },
                    ]}
                  >
                    View All Invites
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  fallbackTitle: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: '700',
    color: AppColors.black,
    marginBottom: 12,
  },
  fallbackSubtext: {
    fontSize: responsiveFontSize(1.7),
    color: AppColors.liteGray,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  fallbackBtn: {
    backgroundColor: AppColors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  fallbackBtnText: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: '700',
    color: AppColors.white,
  },
  outerContainer: {
    flex: 1,
    paddingTop: responsiveHeight(3),
    marginHorizontal: responsiveWidth(9),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 6,
    marginBottom: responsiveHeight(1.5),
  },
  signOutBtn: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  signOutBtnText: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: '600',
    color: AppColors.black,
  },
  dropdownTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    maxWidth: responsiveWidth(45),
  },
  dropdownTriggerText: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: '600',
    color: AppColors.black,
    marginRight: 6,
  },
  dropdownArrowIcon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    tintColor: AppColors.black,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  heroTextContainer: {
    alignItems: 'center',
    marginVertical: 12,
  },
  heroTitle: {
    fontSize: responsiveFontSize(2.6),
    fontWeight: '800',
    color: AppColors.black,
  },
  heroSubtitle: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '600',
    color: AppColors.liteGray,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: responsiveFontSize(1.9),
    fontWeight: '700',
    color: AppColors.black,
    marginVertical: 12,
    paddingHorizontal: 6,
  },
  messageListCard: {
    backgroundColor: AppColors.white,
    borderRadius: 24,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 3,
  },
  emptyMessagesContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyMessagesText: {
    fontSize: responsiveFontSize(1.6),
    color: AppColors.liteGray,
    textAlign: 'center',
    lineHeight: 20,
  },
  messageItemRow: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  messageHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  senderName: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '700',
    color: AppColors.black,
  },
  messageTime: {
    fontSize: responsiveFontSize(1.4),
    color: AppColors.liteGray,
  },
  messageBodyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageText: {
    fontSize: responsiveFontSize(1.6),
    color: AppColors.liteGray,
    flex: 1,
    paddingRight: 10,
  },
  badgeCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: AppColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: responsiveFontSize(1.3),
    fontWeight: '700',
    color: AppColors.white,
  },
  // Dropdown Swticher Modal Styles
  dropdownModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: responsiveHeight(8),
    paddingRight: responsiveWidth(4),
  },
  dropdownOverlayDismiss: {
    ...StyleSheet.absoluteFillObject,
  },
  dropdownCard: {
    backgroundColor: AppColors.white,
    width: responsiveWidth(55),
    borderRadius: 20,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  dropdownTitle: {
    fontSize: responsiveFontSize(1.4),
    fontWeight: '700',
    color: AppColors.liteGray,
    paddingHorizontal: 16,
    paddingVertical: 4,
    letterSpacing: 1,
  },
  dropdownItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  dropdownItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownItemThumbBox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    overflow: 'hidden',
    marginRight: 10,
  },
  dropdownItemThumb: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  dropdownItemName: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '600',
    color: AppColors.black,
  },
  dropdownItemDate: {
    fontSize: responsiveFontSize(1.3),
    color: AppColors.liteGray,
    marginTop: 1,
  },
  dropdownCheckmark: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    tintColor: AppColors.primary,
  },
  dropdownDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 6,
  },
});

export default GuestMsg;
