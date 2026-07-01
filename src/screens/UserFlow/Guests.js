import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
  Alert,
} from 'react-native';
import Text from '../../components/CustomText';
import ScreenWrapper from '../../components/ScreenWrapper';
import AddGuestModal from '../../components/Modals/AddGuestModal';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../utils/Responsive_Dimensions';
import { AppColors } from '../../utils/AppColors';
import { AppImages } from '../../assets/Images/Index';
import { showToast } from '../../components/Toast';

const Guests = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGuestForEdit, setSelectedGuestForEdit] = useState(null); // Pass object or null if adding

  const [guestsData, setGuestsData] = useState([
    {
      id: '1',
      name: 'Sarah Johnson',
      relation: 'Friend',
      phone: '+1234567890',
      email: '',
      status: 'Accepted',
    },
    {
      id: '2',
      name: 'Mike Anderson',
      relation: 'Colleague',
      phone: '',
      email: 'mike@email.com',
      status: 'Declined',
    },
    {
      id: '3',
      name: 'Emily Davis',
      relation: 'Family',
      phone: '+1234567891',
      email: '',
      status: 'Pending',
    },
    {
      id: '4',
      name: 'John Smith',
      relation: 'Friend',
      phone: '',
      email: 'john@email.com',
      status: 'Accepted',
    },
    {
      id: '5',
      name: 'Lisa Brown',
      relation: 'Family',
      phone: '+1234567892',
      email: '',
      status: 'Accepted',
    },
  ]);

  const totalCount = guestsData.length;
  const acceptedCount = guestsData.filter(g => g.status === 'Accepted').length;
  const declinedCount = guestsData.filter(g => g.status === 'Declined').length;
  const pendingCount = guestsData.filter(g => g.status === 'Pending').length;

  const filteredGuests = guestsData.filter(guest => {
    if (activeTab === 'All') return true;
    return guest.status === activeTab;
  });

  const getStatusColor = status => {
    switch (status) {
      case 'Accepted':
        return 'rgba(0, 124, 0, 1)';
      case 'Declined':
        return 'rgba(244, 62, 53, 1)';
      case 'Pending':
        return 'rgba(247, 215, 32, 1)';
      default:
        return 'rgba(113, 113, 130, 1)';
    }
  };

  const handleMessagePress = phoneNumber => {
    if (!phoneNumber) {
      showToast('Error', 'No phone number provided for this guest.');
      return;
    }
    Linking.openURL(`sms:${phoneNumber}`).catch(() =>
      showToast('Error', 'Unable to open messaging app.'),
    );
  };

  const handleEmailPress = emailAddress => {
    if (!emailAddress) {
      showToast('Error', 'No email address provided for this guest.');
      return;
    }
    Linking.openURL(`mailto:${emailAddress}`).catch(() =>
      showToast('Error', 'Unable to open email app.'),
    );
  };

  const handleEditPress = guest => {
    setSelectedGuestForEdit(guest);
    setModalVisible(true);
  };

  const handleDeletePress = guestId => {
    Alert.alert('Delete Guest', 'Are you sure you want to remove this guest?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setGuestsData(prevData => prevData.filter(g => g.id !== guestId));
        },
      },
    ]);
  };

  // Central save callback interface for handling both creation and mutations updates
  const handleSaveGuestData = formData => {
    if (selectedGuestForEdit) {
      // Edit Mode execution flow
      setGuestsData(prevData =>
        prevData.map(g =>
          g.id === selectedGuestForEdit.id
            ? {
                ...g,
                name: formData.name,
                relation: formData.relation,
                phone: formData.phone,
                email: formData.email,
              }
            : g,
        ),
      );
    } else {
      // Add Mode execution flow
      const newGuest = {
        id: Date.now().toString(),
        name: formData.name,
        relation: formData.relation,
        phone: formData.phone,
        email: formData.email,
        status: 'Pending',
      };
      setGuestsData([newGuest, ...guestsData]);
    }
    setSelectedGuestForEdit(null);
  };

  return (
    <ScreenWrapper>
      <View style={styles.contentContainer}>
        {/* Title Section */}
        <View style={styles.titleBlockContainer}>
          <Text style={styles.screenMainTitleText}>Guest Management</Text>
          <Text style={styles.screenSubTitleText}>
            Track RSVPs and invitations
          </Text>
        </View>

        {/* Counter Dashboard Grid Cards */}
        <View style={styles.counterDashboardRowLayout}>
          <View style={styles.statCounterItemBlock}>
            <Text
              style={[styles.counterNumericMetric, { color: AppColors.blue }]}
            >
              {totalCount}
            </Text>
            <Text style={styles.counterMetaTitleLabel}>Total</Text>
          </View>
          <View style={styles.statCounterItemBlock}>
            <Text
              style={[styles.counterNumericMetric, { color: AppColors.green }]}
            >
              {acceptedCount}
            </Text>
            <Text style={styles.counterMetaTitleLabel}>Accepted</Text>
          </View>
          <View style={styles.statCounterItemBlock}>
            <Text
              style={[styles.counterNumericMetric, { color: AppColors.red }]}
            >
              {declinedCount}
            </Text>
            <Text style={styles.counterMetaTitleLabel}>Declined</Text>
          </View>
          <View style={styles.statCounterItemBlock}>
            <Text
              style={[styles.counterNumericMetric, { color: AppColors.yellow }]}
            >
              {pendingCount}
            </Text>
            <Text style={styles.counterMetaTitleLabel}>Pending</Text>
          </View>
        </View>

        {/* Custom Status Segmented Tab Controls Filter Bar */}
        <View style={styles.segmentedTabWrapperBar}>
          {['All', 'Accepted', 'Declined', 'Pending'].map(tab => (
            <TouchableOpacity
              key={tab}
              activeOpacity={0.8}
              style={[
                styles.tabFilterButton,
                activeTab === tab && styles.tabFilterButtonActive,
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabButtonLabelText,
                  activeTab === tab && styles.tabButtonLabelTextActive,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Scrollable Guest Directory Cards Feed */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listScrollArea}
        >
          {filteredGuests.map(guest => (
            <View key={guest.id} style={styles.guestCardItemRowContainer}>
              <View style={styles.guestInfoMetaHeaderRow}>
                <View>
                  <View style={styles.nameAndTrashActionAlignmentRow}>
                    <Text style={styles.guestProfileMainNameText}>
                      {guest.name}
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      style={styles.trashActionIconTrigger}
                      onPress={() => handleDeletePress(guest.id)}
                    >
                      <Image source={AppImages.delete} style={styles.delete} />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.relationshipSubLabelMetaText}>
                    {guest.relation}
                  </Text>
                </View>

                <View
                  style={[
                    styles.statusCapsuleBadgeWrapper,
                    { backgroundColor: getStatusColor(guest.status) },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusCapsuleBadgeText,
                      guest.status === 'Pending' && { color: '#000000' },
                    ]}
                  >
                    {guest.status}
                  </Text>
                </View>
              </View>

              {guest.phone ? (
                <View style={styles.communicationDetailEntryInlineRow}>
                  <Image source={AppImages.phone} style={styles.phoneIcon} />
                  <Text style={styles.communicationDetailStringBodyText}>
                    {guest.phone}
                  </Text>
                </View>
              ) : (
                <View style={styles.communicationDetailEntryInlineRow}>
                  <Image source={AppImages.email} style={styles.phoneIcon} />
                  <Text style={styles.communicationDetailStringBodyText}>
                    {guest.email}
                  </Text>
                </View>
              )}

              <View style={styles.cardActionUtilityButtonsClusterRow}>
                <TouchableOpacity
                  activeOpacity={0.75}
                  style={styles.messageActionTriggerButtonInstance}
                  onPress={() => handleMessagePress(guest.phone)}
                >
                  <Image
                    source={AppImages.message}
                    style={styles.messageIcon}
                  />
                  <Text style={styles.messageActionTriggerButtonLabelText}>
                    Message
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.75}
                  style={styles.emailActionTriggerButtonInstance}
                  onPress={() => handleEmailPress(guest.email)}
                >
                  <Image source={AppImages.email} style={styles.emailIcon} />
                  <Text style={styles.emailActionTriggerButtonLabelText}>
                    Email
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.editActionTriggerButtonInstance}
                  onPress={() => handleEditPress(guest)}
                >
                  <Text style={styles.editActionTriggerButtonLabelText}>
                    Edit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Add Floating Action Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.floatingActionButtonCapsule}
          onPress={() => {
            setSelectedGuestForEdit(null); // Add flow explicit confirmation
            setModalVisible(true);
          }}
        >
          <Text style={styles.fabPlusSymbolSignIcon}>+</Text>
        </TouchableOpacity>

        {/* External Overlay Modularized Add / Edit Controller Instance */}
        <AddGuestModal
          visible={modalVisible}
          onClose={() => {
            setModalVisible(false);
            setSelectedGuestForEdit(null);
          }}
          onSave={handleSaveGuestData}
          editingGuest={selectedGuestForEdit}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: AppColors.white,
    marginHorizontal: responsiveWidth(5),
    borderRadius: 36,
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(4),
    position: 'relative',
  },
  titleBlockContainer: {
    marginBottom: responsiveHeight(2.5),
  },
  screenMainTitleText: {
    fontSize: responsiveFontSize(3.2),
    fontWeight: '800',
    color: AppColors.black,
  },
  screenSubTitleText: {
    fontSize: responsiveFontSize(1.9),
    color: '#555555',
    fontWeight: '400',
    marginTop: responsiveHeight(0.5),
  },
  counterDashboardRowLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: AppColors.white,
    borderRadius: 18,
    paddingVertical: responsiveHeight(1.6),
    paddingHorizontal: responsiveWidth(3),
    borderWidth: 1,
    borderColor: '#F0F0F0',
    marginBottom: responsiveHeight(2.5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 2,
  },
  statCounterItemBlock: {
    flex: 1,
    alignItems: 'center',
  },
  counterNumericMetric: {
    fontSize: responsiveFontSize(2.6),
    fontWeight: '700',
    marginBottom: responsiveHeight(0.4),
  },
  counterMetaTitleLabel: {
    fontSize: responsiveFontSize(1.4),
    color: '#888888',
    fontWeight: '500',
  },
  segmentedTabWrapperBar: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 14,
    padding: responsiveWidth(1),
    justifyContent: 'space-between',
    marginBottom: responsiveHeight(2.5),
  },
  tabFilterButton: {
    flex: 1,
    paddingVertical: responsiveHeight(1.1),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11,
  },
  tabFilterButtonActive: {
    backgroundColor: AppColors.primary,
  },
  tabButtonLabelText: {
    fontSize: responsiveFontSize(1.5),
    fontWeight: '600',
    color: '#666666',
  },
  tabButtonLabelTextActive: {
    color: AppColors.black,
  },
  listScrollArea: {
    paddingBottom: responsiveHeight(22),
  },
  guestCardItemRowContainer: {
    backgroundColor: AppColors.white,
    borderRadius: 20,
    padding: responsiveWidth(4.5),
    borderWidth: 1,
    borderColor: '#F5F5F5',
    marginBottom: responsiveHeight(2),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 3,
  },
  guestInfoMetaHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: responsiveHeight(1.2),
  },
  nameAndTrashActionAlignmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  guestProfileMainNameText: {
    fontSize: responsiveFontSize(2.1),
    fontWeight: '700',
    color: AppColors.black,
  },
  trashActionIconTrigger: {
    marginLeft: responsiveWidth(2),
    padding: 2,
  },
  delete: {
    height: responsiveWidth(4),
    width: responsiveWidth(4),
    resizeMode: 'contain',
    tintColor: AppColors.red,
  },
  relationshipSubLabelMetaText: {
    fontSize: responsiveFontSize(1.5),
    color: '#999999',
    fontWeight: '400',
    marginTop: responsiveHeight(0.2),
  },
  statusCapsuleBadgeWrapper: {
    paddingHorizontal: responsiveWidth(3.5),
    paddingVertical: responsiveHeight(0.5),
    borderRadius: 12,
    minWidth: responsiveWidth(22),
    alignItems: 'center',
  },
  statusCapsuleBadgeText: {
    fontSize: responsiveFontSize(1.35),
    color: AppColors.white,
    fontWeight: '700',
  },
  communicationDetailEntryInlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(1.8),
    paddingLeft: responsiveWidth(0.5),
  },
  phoneIcon: {
    height: responsiveWidth(4),
    width: responsiveWidth(4),
    resizeMode: 'contain',
    tintColor: AppColors.secondary,
    marginRight: responsiveWidth(2),
  },
  communicationDetailStringBodyText: {
    fontSize: responsiveFontSize(1.6),
    color: '#444444',
    fontWeight: '500',
  },
  cardActionUtilityButtonsClusterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageActionTriggerButtonInstance: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.black,
    borderRadius: 10,
    paddingVertical: responsiveHeight(1.2),
    paddingHorizontal: responsiveWidth(4),
    flex: 1.2,
    marginRight: responsiveWidth(2),
  },
  messageActionTriggerButtonLabelText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.5),
    fontWeight: '400',
  },
  messageIcon: {
    height: responsiveWidth(4),
    width: responsiveWidth(4),
    resizeMode: 'contain',
    tintColor: AppColors.white,
    marginRight: responsiveWidth(2),
  },
  emailActionTriggerButtonInstance: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.primary,
    borderRadius: 10,
    paddingVertical: responsiveHeight(1.2),
    paddingHorizontal: responsiveWidth(4),
    flex: 1.2,
    marginRight: responsiveWidth(2),
  },
  emailActionTriggerButtonLabelText: {
    color: AppColors.black,
    fontSize: responsiveFontSize(1.5),
    fontWeight: '400',
  },
  emailIcon: {
    height: responsiveWidth(4),
    width: responsiveWidth(4),
    resizeMode: 'contain',
    tintColor: AppColors.black,
    marginRight: responsiveWidth(2),
  },
  editActionTriggerButtonInstance: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    paddingVertical: responsiveHeight(1.2),
    paddingHorizontal: responsiveWidth(3.5),
    flex: 0.7,
    alignItems: 'center',
  },
  editActionTriggerButtonLabelText: {
    color: '#555555',
    fontSize: responsiveFontSize(1.5),
    fontWeight: '600',
  },
  floatingActionButtonCapsule: {
    position: 'absolute',
    bottom: responsiveHeight(11.5),
    right: responsiveWidth(5),
    backgroundColor: AppColors.primary,
    width: responsiveWidth(14),
    height: responsiveWidth(14),
    borderRadius: responsiveWidth(7),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    shadowColor: AppColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  fabPlusSymbolSignIcon: {
    fontSize: responsiveFontSize(3.2),
    color: AppColors.black,
    fontWeight: '400',
    marginTop: -2,
  },
});

export default Guests;
