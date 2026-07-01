import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
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

const WelcomeGuest = ({ navigation }) => {
  const {
    selectedEventId,
    setSelectedEventId,
    selectedEvent,
    events,
    guestProfile,
    setGuestProfile,
  } = useGuest();

  // State for Manage Profile Modal
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [tempName, setTempName] = useState(guestProfile.name);
  const [tempPhone, setTempPhone] = useState(guestProfile.phone);

  // State for Switch Event Dropdown Modal
  const [dropdownModalVisible, setDropdownModalVisible] = useState(false);

  const handleOpenProfileModal = () => {
    setTempName(guestProfile.name);
    setTempPhone(guestProfile.phone);
    setProfileModalVisible(true);
  };

  const handleSaveProfile = () => {
    if (!tempName.trim()) {
      return showToast('Validation Error', 'Please enter your name');
    }
    setGuestProfile({ name: tempName, phone: tempPhone });
    setProfileModalVisible(false);
    showToast('Success', 'Profile updated successfully!');
  };

  const handleSignOut = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'AuthStack' }],
    });
  };

  const handleShare = () => {
    showToast('Success', 'Invitation link copied & shared!');
  };

  const handleDownload = () => {
    showToast('Success', 'Invitation image saved to Gallery!');
  };

  // ---------------- RENDERING INVITE LIST (Home State) ----------------
  const renderInviteList = () => {
    return (
      <View style={styles.outerContainer}>
        {/* Top Header Row */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>
              Welcome, {guestProfile.name.split(' ')[0]} 💐
            </Text>
            <Text style={styles.headerSubtitle}>
              Here are your wedding invites
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleSignOut}
            activeOpacity={0.7}
            style={styles.signInBtn}
          >
            <Text style={styles.signInBtnText}>Sign in</Text>
          </TouchableOpacity>
        </View>

        {/* Scrollable list of invites */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {events.map(item => (
            <View key={item.id} style={styles.inviteCard}>
              {/* Card Header segment */}
              <View style={styles.cardHeaderSegment}>
                <Text style={styles.cardTitleText}>{item.title}</Text>
                <Text style={styles.cardCoupleText}>{item.couple}</Text>
              </View>

              {/* Info details */}
              <View style={styles.cardDetailsBox}>
                <View style={styles.infoRow}>
                  <Image source={AppImages.calendar} style={styles.infoIcon} />
                  <Text style={styles.infoText}>{item.date}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Image source={AppImages.location} style={styles.infoIcon} />
                  <Text style={styles.infoText}>{item.venue}</Text>
                </View>
              </View>

              {/* Open button */}
              <TouchableOpacity
                onPress={() => setSelectedEventId(item.id)}
                activeOpacity={0.8}
                style={styles.openBtn}
              >
                <Text style={styles.openBtnText}>Open Invitation</Text>
              </TouchableOpacity>
            </View>
          ))}

          {/* Manage Profile CTA */}
          <TouchableOpacity
            onPress={handleOpenProfileModal}
            activeOpacity={0.8}
            style={styles.manageProfileBtn}
          >
            <Image source={AppImages.user} style={styles.manageProfileIcon} />
            <Text style={styles.manageProfileText}>Manage My Profile</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Profile Editing Modal */}
        <Modal
          visible={profileModalVisible}
          animationType="fade"
          transparent
          onRequestClose={() => setProfileModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Manage Profile</Text>

              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                value={tempName}
                onChangeText={setTempName}
                placeholder="Enter your name"
                style={styles.textInput}
              />

              <Text style={styles.inputLabel}>Phone Number</Text>
              <TextInput
                value={tempPhone}
                onChangeText={setTempPhone}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
                style={styles.textInput}
              />

              <View style={styles.modalBtnRow}>
                <TouchableOpacity
                  onPress={() => setProfileModalVisible(false)}
                  style={[styles.modalBtn, styles.modalCancelBtn]}
                >
                  <Text style={styles.modalCancelBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSaveProfile}
                  style={[styles.modalBtn, styles.modalSaveBtn]}
                >
                  <Text style={styles.modalSaveBtnText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  // ---------------- RENDERING DETAILED VIEW (Active State) ----------------
  const renderInvitationDetails = () => {
    return (
      <View style={styles.outerContainer}>
        {/* Top Header Row for Detail Screen */}
        <View style={styles.headerRow}>
          <View style={styles.backContainer}>
            <TouchableOpacity
              onPress={() => setSelectedEventId(null)}
              activeOpacity={0.7}
              style={styles.backCircle}
            >
              <Image
                source={AppImages.arrowLeft}
                style={styles.backArrowImage}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignOut} activeOpacity={0.7}>
              <Text style={styles.signInBtnText}>Sign in</Text>
            </TouchableOpacity>
          </View>

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

        {/* Scrollable details */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.detailScrollContent}
        >
          <View style={styles.detailCard}>
            {/* Peach Top Segment */}
            <View style={styles.detailCardHeader}>
              <Text style={styles.invitedText}>You are invited to</Text>
              <Text style={styles.detailCoupleName}>
                {selectedEvent.couple.toUpperCase()}
              </Text>
              <Text style={styles.familiesText}>
                Together with their families
              </Text>
            </View>

            {/* Couple Wedding Photo */}
            <Image
              source={{ uri: selectedEvent.image }}
              style={styles.coupleImage}
            />

            {/* Invitation Description Text */}
            <Text style={styles.inviteDescription}>
              {selectedEvent.description}
            </Text>

            {/* Date & Time block */}
            <View style={styles.detailInfoBlock}>
              <View style={styles.detailInfoRow}>
                <Image
                  source={AppImages.calendar}
                  style={styles.detailInfoIcon}
                />
                <View>
                  <Text style={styles.detailInfoLabel}>Date</Text>
                  <Text style={styles.detailInfoValue}>
                    {selectedEvent.date.split(' • ')[0]}
                  </Text>
                </View>
              </View>

              <View style={[styles.detailInfoRow, { marginTop: 12 }]}>
                <Image source={AppImages.time} style={styles.detailInfoIcon} />
                <View>
                  <Text style={styles.detailInfoLabel}>Time</Text>
                  <Text style={styles.detailInfoValue}>
                    {selectedEvent.time}
                  </Text>
                </View>
              </View>
            </View>

            {/* Venue Info Block */}
            <View style={styles.detailInfoBlock}>
              <View style={styles.detailInfoRow}>
                <Image
                  source={AppImages.location}
                  style={styles.detailInfoIcon}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.detailInfoLabel}>Venue</Text>
                  <Text style={styles.detailInfoValue}>
                    {selectedEvent.venueDetails}
                  </Text>
                  <Text style={styles.detailInfoSubText}>
                    {selectedEvent.address}
                  </Text>
                </View>
              </View>
            </View>

            {/* Thumbnail decor photos */}
            <View style={styles.thumbnailRow}>
              {selectedEvent.thumbnails.map((thumbUrl, idx) => (
                <Image
                  key={idx}
                  source={{ uri: thumbUrl }}
                  style={styles.thumbnailImg}
                />
              ))}
            </View>

            {/* Blessing quote */}
            <Text style={styles.quoteText}>{selectedEvent.quote}</Text>
          </View>
          {/* Share & Download actions */}
          <View style={styles.detailActionButtonsRow}>
            <TouchableOpacity
              onPress={handleShare}
              activeOpacity={0.8}
              style={[styles.actionBtn, styles.shareBtn]}
            >
              <Image source={AppImages.share} style={styles.actionBtnIcon} />
              <Text style={styles.actionBtnText}>Share Invitation</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleDownload}
              activeOpacity={0.8}
              style={[styles.actionBtn, styles.downloadBtn]}
            >
              <Image
                source={AppImages.download}
                style={[styles.actionBtnIcon, { tintColor: AppColors.primary }]}
              />
              <Text
                style={[styles.actionBtnText, { color: AppColors.primary }]}
              >
                Download as Image
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 40 }} />
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
    );
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {selectedEventId === null
          ? renderInviteList()
          : renderInvitationDetails()}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: responsiveHeight(3),
    marginHorizontal: responsiveWidth(9),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 6,
    marginBottom: responsiveHeight(2),
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  backArrowImage: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '700',
    color: AppColors.black,
  },
  headerSubtitle: {
    fontSize: responsiveFontSize(1.6),
    color: AppColors.liteGray,
    marginTop: 2,
  },
  signInBtn: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  signInBtnText: {
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
    paddingBottom: 100,
  },
  detailScrollContent: {
    paddingBottom: 20,
  },
  inviteCard: {
    backgroundColor: AppColors.white,
    borderRadius: 24,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeaderSegment: {
    backgroundColor: '#FFECE8',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitleText: {
    fontSize: responsiveFontSize(2.0),
    fontWeight: '700',
    color: AppColors.black,
  },
  cardCoupleText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '500',
    color: '#8A6861',
    marginTop: 2,
  },
  cardDetailsBox: {
    marginBottom: 16,
    paddingHorizontal: 6,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: AppColors.primary,
    marginRight: 10,
  },
  infoText: {
    fontSize: responsiveFontSize(1.6),
    color: '#4B5563',
  },
  openBtn: {
    backgroundColor: AppColors.secondary,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  openBtnText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '700',
    color: AppColors.black,
  },
  manageProfileBtn: {
    flexDirection: 'row',
    backgroundColor: AppColors.primary,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  manageProfileIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: AppColors.white,
    marginRight: 8,
  },
  manageProfileText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '700',
    color: AppColors.white,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: AppColors.white,
    width: responsiveWidth(85),
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 6,
  },
  modalTitle: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '700',
    color: AppColors.black,
    textAlign: 'center',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: '600',
    color: AppColors.black,
    marginBottom: 6,
    marginTop: 12,
  },
  textInput: {
    backgroundColor: '#F5EFEA',
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 12,
    fontSize: responsiveFontSize(1.6),
    color: AppColors.black,
  },
  modalBtnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  modalBtn: {
    flex: 0.47,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCancelBtn: {
    backgroundColor: '#F3F4F6',
  },
  modalCancelBtnText: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: '600',
    color: AppColors.liteGray,
  },
  modalSaveBtn: {
    backgroundColor: AppColors.secondary,
  },
  modalSaveBtnText: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: '600',
    color: AppColors.black,
  },
  // Detailed Invitation Styles
  detailCard: {
    backgroundColor: 'rgba(255, 246, 249, 1)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 3,
  },
  detailCardHeader: {
    backgroundColor: AppColors.primary,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  invitedText: {
    fontSize: responsiveFontSize(1.7),
    color: '#8A6861',
    fontWeight: '500',
  },
  detailCoupleName: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: '800',
    color: AppColors.black,
    marginVertical: 4,
    letterSpacing: 0.5,
  },
  familiesText: {
    fontSize: responsiveFontSize(1.5),
    color: '#8A6861',
    fontStyle: 'italic',
  },
  coupleImage: {
    width: '100%',
    height: 300,
    marginBottom: 16,
    resizeMode: 'cover',
  },
  inviteDescription: {
    fontSize: responsiveFontSize(1.8),
    color: '#374151',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  detailInfoBlock: {
    backgroundColor: '#FDFBF7',
    borderRadius: 14,
    width: '90%',
    alignSelf: 'center',
    padding: 16,
    borderWidth: 0.2,
    borderColor: AppColors.primary,
    marginBottom: 12,
  },
  detailInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailInfoIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: AppColors.primary,
    marginRight: 12,
  },
  detailInfoLabel: {
    fontSize: responsiveFontSize(1.4),
    color: AppColors.liteGray,
  },
  detailInfoValue: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: '600',
    color: AppColors.black,
    marginTop: 1,
  },
  detailInfoSubText: {
    fontSize: responsiveFontSize(1.5),
    color: AppColors.liteGray,
    marginTop: 2,
  },
  thumbnailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    width: '90%',
    alignSelf: 'center',
  },
  thumbnailImg: {
    width: '23%',
    aspectRatio: 1,
    borderRadius: 10,
    resizeMode: 'cover',
    backgroundColor: '#FDFBF7',
  },
  quoteText: {
    fontSize: responsiveFontSize(1.6),
    fontStyle: 'italic',
    textAlign: 'center',
    color: AppColors.liteGray,
    marginVertical: 12,
    lineHeight: 20,
  },
  detailActionButtonsRow: {
    marginTop: 16,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 14,
    marginBottom: 12,
  },
  shareBtn: {
    backgroundColor: AppColors.secondary,
  },
  downloadBtn: {
    backgroundColor: AppColors.white,
    borderWidth: 1.5,
    borderColor: AppColors.primary,
  },
  actionBtnIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginRight: 8,
  },
  actionBtnText: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: '700',
    color: AppColors.black,
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
    ...StyleSheet.absoluteFill,
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

export default WelcomeGuest;
