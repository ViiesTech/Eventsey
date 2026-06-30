import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
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
// Import Native Date Picker Module
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchImageLibrary } from 'react-native-image-picker';
import { Alert } from 'react-native';

const UserEditProfile = ({ navigation }) => {
  // Form State Handles
  const [partnerOneName, setPartnerOneName] = useState('');
  const [partnerTwoName, setPartnerTwoName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');

  // Date State Control Objects
  const [weddingDate, setWeddingDate] = useState(new Date());
  const [weddingDateString, setWeddingDateString] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const handleImagePick = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Failed to select image');
        return;
      }
      if (response.assets && response.assets.length > 0) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  const handleSaveChanges = () => {
    const profilePayload = {
      partnerOneName,
      partnerTwoName,
      emailAddress,
      phoneNumber,
      location,
      weddingDate: weddingDateString,
    };
    console.log('Profile context changes payload submitted:', profilePayload);
    navigation.goBack();
  };

  // Date Change Callback Action
  const onChangeDate = (event, selectedDate) => {
    // Hide picker for Android right away on selection handle
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (selectedDate) {
      setWeddingDate(selectedDate);

      // Format to readable format structure: (YYYY-MM-DD or Month DD, YYYY)
      const formattedDate = selectedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      setWeddingDateString(formattedDate);
    }
  };

  const renderInputField = ({
    label,
    placeholder,
    value,
    onChangeText,
    icon,
    keyboardType = 'default',
  }) => (
    <View style={styles.inputFieldBlockGroup}>
      <View style={styles.fieldLabelInlineFlexRow}>
        <Image source={icon} style={styles.fieldLabelVectorGlyph} />
        <Text style={styles.fieldLabelLabelTitleText}>{label}</Text>
      </View>
      <TextInput
        style={styles.textInputElementControl}
        placeholder={placeholder}
        placeholderTextColor="#A0A0A5"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={keyboardType === 'email-address' ? 'none' : 'words'}
      />
    </View>
  );

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flexContainerTrack}
      >
        <View style={styles.mainContainer}>
          {/* Header Action Navbar Navigation Row */}
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

          {/* Master Identity Header Frame Segment */}
          <View style={styles.titleAndBadgeFlexRow}>
            <View style={styles.textMetaTitlesColumn}>
              <Text style={styles.screenMainHeadingTitle}>Edit Profile</Text>
              <Text style={styles.screenSubHeadingDescription}>
                Update your information
              </Text>
            </View>
            <View style={styles.headerRightAvatarBadgeContainer}>
              <Image
                source={AppImages.user}
                style={styles.badgeMiniVectorGlyph}
              />
            </View>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollFormContainerLayout}
          >
            {/* White Structured Main Card Frame Panel */}
            <View style={styles.profileCardFormContainerSurface}>
              {/* Profile Avatar Specifier Block */}
              <View style={styles.avatarSelectionCenterContainerBox}>
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={handleImagePick}
                  style={styles.avatarCircularInteractiveThumbBubble}
                >
                  {profileImage ? (
                    <Image
                      source={{ uri: profileImage }}
                      style={styles.renderedCircularProfileAssetImage}
                    />
                  ) : (
                    <Text
                      style={styles.fallbackAvatarPlaceholderLabelCenteredText}
                    >
                      Image
                    </Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} onPress={handleImagePick}>
                  <Text style={styles.triggerAvatarActionChangeLabelBtnText}>
                    Change Photo
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Input Form Elements Fields Collection Stack */}
              {renderInputField({
                label: 'Partner One Name',
                placeholder: 'Name',
                value: partnerOneName,
                onChangeText: setPartnerOneName,
                icon: AppImages.user,
              })}

              {renderInputField({
                label: 'Partner Two Name',
                placeholder: 'Partner name',
                value: partnerTwoName,
                onChangeText: setPartnerTwoName,
                icon: AppImages.user,
              })}

              {renderInputField({
                label: 'Email Address',
                placeholder: 'your.email@example.com',
                value: emailAddress,
                onChangeText: setEmailAddress,
                icon: AppImages.email,
                keyboardType: 'email-address',
              })}

              {renderInputField({
                label: 'Phone Number',
                placeholder: '+1 (555) 123-4567',
                value: phoneNumber,
                onChangeText: setPhoneNumber,
                icon: AppImages.phone,
                keyboardType: 'phone-pad',
              })}

              {renderInputField({
                label: 'Location',
                placeholder: 'City, State',
                value: location,
                onChangeText: setLocation,
                icon: AppImages.location,
              })}

              {/* Custom Clickable Wedding Date Field Container */}
              <View style={styles.inputFieldBlockGroup}>
                <View style={styles.fieldLabelInlineFlexRow}>
                  <Image
                    source={AppImages.calendar}
                    style={styles.fieldLabelVectorGlyph}
                  />
                  <Text style={styles.fieldLabelLabelTitleText}>
                    Wedding Date
                  </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.datePickerInteractiveButtonField}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text
                    style={[
                      styles.dateStringLabelOutput,
                      !weddingDateString && { color: '#A0A0A5' },
                    ]}
                  >
                    {weddingDateString || 'Select Wedding Date'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Native System Picker Sheet Mounting */}
              {showDatePicker && (
                <DateTimePicker
                  value={weddingDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={onChangeDate}
                  minimumDate={new Date()} // Prevents setting historic dates
                />
              )}

              {/* iOS Done Overlay Selection Button Wrapper */}
              {Platform.OS === 'ios' && showDatePicker && (
                <TouchableOpacity
                  style={styles.iosDoneActionOverlayBtn}
                  onPress={() => setShowDatePicker(false)}
                >
                  <Text style={styles.iosDoneActionBtnLabel}>Confirm Date</Text>
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.saveChangesPrimaryActionButtonControl}
              onPress={handleSaveChanges}
            >
              <Image
                source={AppImages.save}
                style={styles.actionBtnVectorIconSymbolGlyph}
              />
              <Text style={styles.saveChangesPrimaryActionButtonLabelText}>
                Save Changes
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  flexContainerTrack: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    paddingTop: responsiveHeight(2),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(9),
    marginBottom: responsiveHeight(2.5),
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
  titleAndBadgeFlexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(9),
    marginBottom: responsiveHeight(3.2),
  },
  textMetaTitlesColumn: {
    flex: 1,
  },
  screenMainHeadingTitle: {
    fontSize: responsiveFontSize(3.6),
    fontWeight: '800',
    color: AppColors.black,
  },
  screenSubHeadingDescription: {
    fontSize: responsiveFontSize(1.8),
    color: '#555555',
    fontWeight: '400',
    marginTop: responsiveHeight(0.5),
  },
  headerRightAvatarBadgeContainer: {
    width: responsiveWidth(13),
    height: responsiveWidth(13),
    borderRadius: 14,
    backgroundColor: AppColors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeMiniVectorGlyph: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
    resizeMode: 'contain',
    tintColor: AppColors.white,
  },
  scrollFormContainerLayout: {
    paddingHorizontal: responsiveWidth(9),
    paddingBottom: responsiveHeight(2),
  },
  profileCardFormContainerSurface: {
    backgroundColor: AppColors.white,
    borderRadius: 24,
    paddingHorizontal: responsiveWidth(5.5),
    paddingTop: responsiveHeight(3.5),
    paddingBottom: responsiveHeight(2.5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F9F9F9',
  },
  avatarSelectionCenterContainerBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsiveHeight(3.5),
  },
  avatarCircularInteractiveThumbBubble: {
    width: responsiveWidth(25),
    height: responsiveWidth(25),
    borderRadius: responsiveWidth(12.5),
    backgroundColor: '#FDB0A2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsiveHeight(1.5),
  },
  fallbackAvatarPlaceholderLabelCenteredText: {
    fontSize: responsiveFontSize(2.2),
    color: AppColors.black,
    fontWeight: '500',
  },
  triggerAvatarActionChangeLabelBtnText: {
    fontSize: responsiveFontSize(1.6),
    color: '#8E8E93',
    fontWeight: '400',
  },
  inputFieldBlockGroup: {
    marginBottom: responsiveHeight(2.4),
  },
  fieldLabelInlineFlexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(1),
    marginLeft: responsiveWidth(1),
  },
  fieldLabelVectorGlyph: {
    width: responsiveWidth(4.2),
    height: responsiveWidth(4.2),
    resizeMode: 'contain',
    tintColor: AppColors.secondary,
    marginRight: responsiveWidth(2),
  },
  fieldLabelLabelTitleText: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '600',
    color: AppColors.black,
  },
  textInputElementControl: {
    width: '100%',
    height: responsiveHeight(5.8),
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 12,
    paddingHorizontal: responsiveWidth(4),
    fontSize: responsiveFontSize(1.7),
    color: AppColors.black,
  },
  datePickerInteractiveButtonField: {
    width: '100%',
    height: responsiveHeight(5.8),
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 12,
    paddingHorizontal: responsiveWidth(4),
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  dateStringLabelOutput: {
    fontSize: responsiveFontSize(1.7),
    color: AppColors.black,
  },
  iosDoneActionOverlayBtn: {
    alignSelf: 'center',
    marginTop: responsiveHeight(1),
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(5),
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
  },
  iosDoneActionBtnLabel: {
    fontSize: responsiveFontSize(1.5),
    fontWeight: '600',
    color: AppColors.black,
  },
  saveChangesPrimaryActionButtonControl: {
    width: '100%',
    backgroundColor: AppColors.secondary,
    height: responsiveHeight(6.2),
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
    marginVertical: responsiveHeight(5),
  },
  actionBtnVectorIconSymbolGlyph: {
    width: responsiveWidth(4.8),
    height: responsiveWidth(4.8),
    resizeMode: 'contain',
    tintColor: AppColors.black,
    marginRight: responsiveWidth(2),
  },
  saveChangesPrimaryActionButtonLabelText: {
    fontSize: responsiveFontSize(1.9),
    fontWeight: '600',
    color: AppColors.black,
  },
  renderedCircularProfileAssetImage: {
    width: '100%',
    height: '100%',
    borderRadius: responsiveWidth(12.5),
    resizeMode: 'cover',
  },
});

export default UserEditProfile;
