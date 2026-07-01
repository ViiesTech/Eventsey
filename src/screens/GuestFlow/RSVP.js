import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
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

const RSVP = ({ navigation }) => {
  const {
    selectedEventId,
    setSelectedEventId,
    selectedEvent,
    events,
    rsvps,
    submitRSVP,
    addBlessing,
  } = useGuest();

  // State for RSVP Selection
  const [selectedStatus, setSelectedStatus] = useState('Maybe'); // Accept, Decline, Maybe
  const [guestCount, setGuestCount] = useState('1');

  // State for blessings
  const [blessingText, setBlessingText] = useState('');

  // State for dropdown event-switcher modal
  const [dropdownModalVisible, setDropdownModalVisible] = useState(false);

  // Sync state if RSVP was already submitted previously
  useEffect(() => {
    if (selectedEventId && rsvps[selectedEventId]) {
      setSelectedStatus(rsvps[selectedEventId].status);
      setGuestCount(rsvps[selectedEventId].guestCount);
    } else {
      setSelectedStatus('Maybe');
      setGuestCount('1');
    }
  }, [selectedEventId, rsvps]);

  const handleSignOut = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'AuthStack' }],
    });
  };

  const handleRSVPSubmit = () => {
    if (!guestCount.trim()) {
      return showToast('Validation Error', 'Please specify number of guests');
    }
    submitRSVP(selectedEvent.id, selectedStatus, guestCount);
    showToast(
      'Success',
      `RSVP submitted: ${selectedStatus} (${guestCount} guest(s))`,
    );
  };

  const handleSendMessage = () => {
    if (!blessingText.trim()) {
      return showToast(
        'Validation Error',
        'Please type a blessing message first',
      );
    }
    addBlessing(selectedEvent.id, blessingText);
    setBlessingText('');
    showToast('Success', 'Your blessing has been sent to the couple!');
  };

  // ---------------- FALLBACK: NO EVENT ACTIVE ----------------
  if (!selectedEventId) {
    return (
      <ScallopBackground>
        <View style={styles.fallbackContainer}>
          <Text style={styles.fallbackTitle}>No Invitation Open</Text>
          <Text style={styles.fallbackSubtext}>
            Please select and open a wedding invitation from the Home tab first
            to submit your RSVP and blessings.
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

  // ---------------- ACTIVE STATE: RENDER RSVP FORM ----------------
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

        {/* Scrollable RSVP Content */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Couple Header text */}
          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>RSVP & Messages</Text>
            <Text style={styles.heroSubtitle}>
              {selectedEvent.couple.replace(' & ', ' ♥️ ')}
            </Text>
          </View>

          {/* Card 1: Will you attend? */}
          <View style={styles.rsvpCard}>
            <Text style={styles.cardSectionHeading}>
              Will you attend this wedding?
            </Text>

            {/* Accept / Decline / Maybe Choice buttons */}
            <View style={styles.choicesRow}>
              {/* Accept */}
              <TouchableOpacity
                onPress={() => setSelectedStatus('Accept')}
                activeOpacity={0.8}
                style={[
                  styles.choiceItem,
                  selectedStatus === 'Accept' && styles.choiceItemActive,
                ]}
              >
                <View
                  style={[
                    styles.choiceIconCircle,
                    selectedStatus === 'Accept' &&
                      styles.choiceIconCircleActive,
                  ]}
                >
                  <Image
                    source={AppImages.tick}
                    style={[
                      styles.choiceIcon,
                      {
                        tintColor:
                          selectedStatus === 'Accept'
                            ? AppColors.white
                            : '#4B5563',
                      },
                    ]}
                  />
                </View>
                <Text
                  style={[
                    styles.choiceLabel,
                    selectedStatus === 'Accept' && styles.choiceLabelActive,
                  ]}
                >
                  Accept
                </Text>
              </TouchableOpacity>

              {/* Decline */}
              <TouchableOpacity
                onPress={() => setSelectedStatus('Decline')}
                activeOpacity={0.8}
                style={[
                  styles.choiceItem,
                  selectedStatus === 'Decline' && styles.choiceItemActive,
                ]}
              >
                <View
                  style={[
                    styles.choiceIconCircle,
                    selectedStatus === 'Decline' &&
                      styles.choiceIconCircleActive,
                  ]}
                >
                  <Image
                    source={AppImages.delete}
                    style={[
                      styles.choiceIcon,
                      {
                        tintColor:
                          selectedStatus === 'Decline'
                            ? AppColors.white
                            : '#4B5563',
                      },
                    ]}
                  />
                </View>
                <Text
                  style={[
                    styles.choiceLabel,
                    selectedStatus === 'Decline' && styles.choiceLabelActive,
                  ]}
                >
                  Decline
                </Text>
              </TouchableOpacity>

              {/* Maybe */}
              <TouchableOpacity
                onPress={() => setSelectedStatus('Maybe')}
                activeOpacity={0.8}
                style={[
                  styles.choiceItem,
                  selectedStatus === 'Maybe' && styles.choiceItemActive,
                ]}
              >
                <View
                  style={[
                    styles.choiceIconCircle,
                    selectedStatus === 'Maybe' && styles.choiceIconCircleActive,
                  ]}
                >
                  <Image
                    source={AppImages.question}
                    style={[
                      styles.choiceIcon,
                      {
                        tintColor:
                          selectedStatus === 'Maybe'
                            ? AppColors.white
                            : '#4B5563',
                      },
                    ]}
                  />
                </View>
                <Text
                  style={[
                    styles.choiceLabel,
                    selectedStatus === 'Maybe' && styles.choiceLabelActive,
                  ]}
                >
                  Maybe
                </Text>
              </TouchableOpacity>
            </View>

            {/* Input Segment */}
            <Text style={styles.inputLabel}>Number of Guests:</Text>
            <TextInput
              value={guestCount}
              onChangeText={setGuestCount}
              keyboardType="numeric"
              placeholder="e.g. 2"
              style={styles.textInput}
            />

            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleRSVPSubmit}
              activeOpacity={0.8}
              style={styles.submitRSVPBtn}
            >
              <Text style={styles.submitRSVPBtnText}>Submit RSVP</Text>
            </TouchableOpacity>
          </View>

          {/* Card 2: Blessings for the couple */}
          <View style={styles.blessingCard}>
            <Text style={styles.cardSectionHeading}>
              Write your blessings for the couple 💖
            </Text>

            <TextInput
              value={blessingText}
              onChangeText={setBlessingText}
              placeholder="Type your congratulations message..."
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              style={styles.blessingTextInput}
            />

            {/* Send Message */}
            <TouchableOpacity
              onPress={handleSendMessage}
              activeOpacity={0.8}
              style={styles.sendMessageBtn}
            >
              <Image source={AppImages.send} style={styles.sendMessageIcon} />
              <Text style={styles.sendMessageBtnText}>Send Message</Text>
            </TouchableOpacity>

            {/* Go to Message History */}
            <TouchableOpacity
              onPress={() => navigation.navigate('Msg')}
              activeOpacity={0.8}
              style={styles.viewHistoryBtn}
            >
              <Text style={styles.viewHistoryBtnText}>
                View Message History
              </Text>
            </TouchableOpacity>
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
  rsvpCard: {
    backgroundColor: AppColors.white,
    borderRadius: 24,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 3,
  },
  cardSectionHeading: {
    fontSize: responsiveFontSize(1.9),
    fontWeight: '700',
    color: AppColors.black,
    marginBottom: 16,
  },
  choicesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  choiceItem: {
    width: '31%',
    height: 76,
    borderRadius: 14,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  choiceItemActive: {
    backgroundColor: AppColors.primary,
    borderColor: AppColors.primary,
    // Shadow
    shadowColor: AppColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  choiceIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  choiceIconCircleActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  choiceIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
  },
  choiceLabel: {
    fontSize: responsiveFontSize(1.5),
    fontWeight: '600',
    color: '#4B5563',
  },
  choiceLabelActive: {
    color: AppColors.white,
  },
  inputLabel: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '600',
    color: AppColors.black,
    marginBottom: 6,
  },
  textInput: {
    backgroundColor: '#F5EFEA',
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 12,
    fontSize: responsiveFontSize(1.6),
    color: AppColors.black,
    marginBottom: 20,
  },
  submitRSVPBtn: {
    backgroundColor: AppColors.primary,
    borderRadius: 14,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitRSVPBtnText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '700',
    color: AppColors.white,
  },
  blessingCard: {
    backgroundColor: AppColors.white,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 3,
  },
  blessingTextInput: {
    backgroundColor: '#F5EFEA',
    borderRadius: 12,
    padding: 12,
    fontSize: responsiveFontSize(1.6),
    color: AppColors.black,
    minHeight: 100,
    marginBottom: 16,
  },
  sendMessageBtn: {
    flexDirection: 'row',
    backgroundColor: AppColors.secondary,
    borderRadius: 14,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  sendMessageIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginRight: 8,
    tintColor: AppColors.black,
  },
  sendMessageBtnText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '400',
    color: AppColors.black,
  },
  viewHistoryBtn: {
    backgroundColor: '#F3F4F6',
    borderRadius: 14,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewHistoryBtnText: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: '600',
    color: AppColors.liteGray,
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

export default RSVP;
