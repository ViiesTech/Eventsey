import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import Text from '../../components/CustomText';
import { launchImageLibrary } from 'react-native-image-picker';
import ScreenWrapper from '../../components/ScreenWrapper';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../utils/Responsive_Dimensions';
import { AppImages } from '../../assets/Images/Index';
import { AppColors } from '../../utils/AppColors';
import LogoHeader from '../../components/LogoHeader';

const VendorEditProfile = ({ navigation }) => {
  // Input Form States
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [businessBio, setBusinessBio] = useState('');

  // Profile Picture State
  const [profileImage, setProfileImage] = useState(null);

  // Avatar Picker Handler
  const handleUpdateAvatar = () => {
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
    const updatePayload = {
      fullName,
      businessName,
      emailAddress,
      phoneNumber,
      location,
      yearsOfExperience,
      businessBio,
      profileImage,
    };
    console.log('Updating Profile Data: ', updatePayload);
    navigation?.goBack();
  };

  return (
    <ScreenWrapper scrollable>
      {/* MAIN WHITE CARD CONTAINER */}
      <View style={styles.contentContainer}>
        <LogoHeader goBack title="Edit Profile" headerHeight={25} />

        {/* PROFILE PICTURE HERO BANNER (Teal Accent Card) */}
        <View style={styles.profilePictureBannerContainer}>
          <TouchableOpacity
            style={styles.avatarClickTargetFrame}
            onPress={handleUpdateAvatar}
            activeOpacity={0.85}
          >
            <Image
              source={
                profileImage
                  ? { uri: profileImage }
                  : AppImages.vendorPlaceholderUser || {
                      uri: 'https://picsum.photos/150',
                    }
              }
              style={styles.avatarImageCircle}
            />
            <Text style={styles.bannerActionInstructionText}>
              Click to change profile picture
            </Text>
          </TouchableOpacity>
        </View>

        {/* SECTION ONE: Personal Information */}
        <View style={styles.formCardSectionContainer}>
          <View style={styles.sectionHeaderIconRow}>
            <Image
              source={AppImages.jobs}
              style={styles.sectionInlineIcon}
              resizeMode="contain"
            />
            <Text style={styles.cardHeaderTitleTextHeading}>
              Personal Information
            </Text>
          </View>

          <Text style={styles.fieldLabelInputHeadingText}>Full Name</Text>
          <TextInput
            style={styles.standardSingleLineInputFieldBox}
            placeholder="Vendor Name"
            placeholderTextColor="#BDBDBD"
            value={fullName}
            onChangeText={setFullName}
          />

          <Text style={styles.fieldLabelInputHeadingText}>Business Name</Text>
          <TextInput
            style={styles.standardSingleLineInputFieldBox}
            placeholder="Elegant Events Co."
            placeholderTextColor="#BDBDBD"
            value={businessName}
            onChangeText={setBusinessName}
          />
        </View>

        {/* SECTION TWO: Contact Information */}
        <View style={styles.formCardSectionContainer}>
          <View style={styles.sectionHeaderIconRow}>
            <Image
              source={AppImages.phone}
              style={styles.sectionInlineIcon}
              resizeMode="contain"
            />
            <Text style={styles.cardHeaderTitleTextHeading}>
              Contact Information
            </Text>
          </View>

          <Text style={styles.fieldLabelInputHeadingText}>Email Address</Text>
          <View style={styles.prefixedIconInputFieldRow}>
            <Image
              source={AppImages.email}
              style={styles.inputPrefixIconGlyph}
              resizeMode="contain"
            />
            <TextInput
              style={styles.innerValueInputFieldBoxElement}
              placeholder="vendor@example.com"
              placeholderTextColor="#BDBDBD"
              keyboardType="email-address"
              value={emailAddress}
              onChangeText={setEmailAddress}
            />
          </View>

          <Text style={styles.fieldLabelInputHeadingText}>Phone Number</Text>
          <View style={styles.prefixedIconInputFieldRow}>
            <Image
              source={AppImages.phone}
              style={styles.inputPrefixIconGlyph}
              resizeMode="contain"
            />
            <TextInput
              style={styles.innerValueInputFieldBoxElement}
              placeholder="+1 (555) 123-4567"
              placeholderTextColor="#BDBDBD"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>

          <Text style={styles.fieldLabelInputHeadingText}>Location</Text>
          <View style={styles.prefixedIconInputFieldRow}>
            <Image
              source={AppImages.location}
              style={styles.inputPrefixIconGlyph}
              resizeMode="contain"
            />
            <TextInput
              style={styles.innerValueInputFieldBoxElement}
              placeholder="New York, NY"
              placeholderTextColor="#BDBDBD"
              value={location}
              onChangeText={setLocation}
            />
          </View>
        </View>

        {/* SECTION THREE: Business Details */}
        <View style={styles.formCardSectionContainer}>
          <Text style={styles.cardHeaderTitleTextHeading}>
            Business Details
          </Text>

          <Text style={styles.fieldLabelInputHeadingText}>
            Years of Experience
          </Text>
          <TextInput
            style={styles.standardSingleLineInputFieldBox}
            placeholder="5"
            placeholderTextColor="#BDBDBD"
            keyboardType="numeric"
            value={yearsOfExperience}
            onChangeText={setYearsOfExperience}
          />

          <Text style={styles.fieldLabelInputHeadingText}>Business Bio</Text>
          <View style={styles.multilineTextInputFlexWrapperBox}>
            <TextInput
              style={styles.multilineTextAreaInputFieldInstance}
              placeholder="Tell couples about your business..."
              placeholderTextColor="#BDBDBD"
              multiline
              maxLength={500}
              value={businessBio}
              onChangeText={setBusinessBio}
              textAlignVertical="top"
            />
          </View>
          <Text style={styles.characterCounterLimitLabelMetricsText}>
            {businessBio.length} / 500 characters
          </Text>
        </View>
      </View>

      {/* FIXED: Button contentContainer se bahar scroll main flow me rakh diya hai */}
      <View style={styles.buttonOuterWrapper}>
        <TouchableOpacity
          style={styles.primaryProcessCommitActionPillButtonCapsule}
          activeOpacity={0.85}
          onPress={handleSaveChanges}
        >
          <Image source={AppImages.save} style={styles.saveIcon} />
          <Text style={styles.primaryProcessCommitActionButtonTextLabel}>
            Save Changes
          </Text>
        </TouchableOpacity>
      </View>

      {/* Dynamic bottom scroll buffer space */}
      <View style={{ height: responsiveHeight(6) }} />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: AppColors.white,
    marginHorizontal: responsiveWidth(9),
    borderRadius: 36,
    paddingTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(2),
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(1),
  },
  profilePictureBannerContainer: {
    backgroundColor: '#8ADED5',
    borderRadius: 16,
    paddingVertical: responsiveHeight(2.5),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsiveHeight(2),
  },
  avatarClickTargetFrame: {
    alignItems: 'center',
    width: '100%',
  },
  avatarImageCircle: {
    width: responsiveWidth(24),
    height: responsiveWidth(24),
    borderRadius: responsiveWidth(12),
    backgroundColor: '#E0E0E0',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    resizeMode: 'cover',
  },
  bannerActionInstructionText: {
    fontSize: responsiveFontSize(1.45),
    fontWeight: '500',
    color: '#333333',
    marginTop: responsiveHeight(1.5),
  },
  formCardSectionContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 18,
    paddingHorizontal: responsiveWidth(4.5),
    paddingTop: responsiveHeight(2.2),
    paddingBottom: responsiveHeight(2.5),
    marginBottom: responsiveHeight(2.2),
  },
  sectionHeaderIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(1),
  },
  sectionInlineIcon: {
    width: 20,
    height: 20,
    marginRight: responsiveWidth(2.5),
    tintColor: '#FF9E80',
  },
  cardHeaderTitleTextHeading: {
    fontSize: responsiveFontSize(1.75),
    fontWeight: '600',
    color: AppColors.black,
  },
  fieldLabelInputHeadingText: {
    fontSize: responsiveFontSize(1.45),
    color: AppColors.black,
    fontWeight: '500',
    marginBottom: responsiveHeight(0.8),
    marginTop: responsiveHeight(1.5),
  },
  standardSingleLineInputFieldBox: {
    backgroundColor: '#F5F6F8',
    borderRadius: 10,
    height: responsiveHeight(5.5),
    paddingHorizontal: responsiveWidth(3.5),
    fontSize: responsiveFontSize(1.5),
    color: AppColors.black,
  },
  prefixedIconInputFieldRow: {
    backgroundColor: '#F5F6F8',
    borderRadius: 10,
    height: responsiveHeight(5.5),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(3.5),
  },
  inputPrefixIconGlyph: {
    width: 18,
    height: 18,
    tintColor: '#9E9E9E',
    marginRight: responsiveWidth(2.5),
  },
  innerValueInputFieldBoxElement: {
    flex: 1,
    fontSize: responsiveFontSize(1.5),
    color: AppColors.black,
    padding: 0,
  },
  multilineTextInputFlexWrapperBox: {
    backgroundColor: '#F5F6F8',
    borderRadius: 10,
    paddingHorizontal: responsiveWidth(3.5),
    paddingVertical: responsiveHeight(1.2),
    height: responsiveHeight(16), // Height bounded dynamically
  },
  multilineTextAreaInputFieldInstance: {
    fontSize: responsiveFontSize(1.5),
    color: AppColors.black,
    padding: 0,
    height: '100%',
  },
  characterCounterLimitLabelMetricsText: {
    fontSize: responsiveFontSize(1.2),
    color: '#9E9E9E',
    textAlign: 'left',
    marginTop: responsiveHeight(0.6),
  },
  buttonOuterWrapper: {
    width: '100%',
    paddingHorizontal: responsiveWidth(9),
    marginTop: responsiveHeight(1),
  },
  primaryProcessCommitActionPillButtonCapsule: {
    flexDirection: 'row',
    backgroundColor: '#8ADED5',
    borderRadius: 10,
    height: responsiveHeight(5.5),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  primaryProcessCommitActionButtonTextLabel: {
    fontSize: responsiveFontSize(1.65),
    fontWeight: '600',
    color: '#000000',
  },
  saveIcon: {
    height: responsiveHeight(4),
    width: responsiveWidth(4),
    resizeMode: 'contain',
    tintColor: AppColors.black,
    marginRight: responsiveWidth(2),
  },
});

export default VendorEditProfile;
