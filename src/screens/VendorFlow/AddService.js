import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import Text from '../../components/CustomText';
import { launchImageLibrary } from 'react-native-image-picker'; // Image Picker Import
import ScreenWrapper from '../../components/ScreenWrapper';
import CustomDropdown from '../../components/CustomDropdown';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../utils/Responsive_Dimensions';
import { AppImages } from '../../assets/Images/Index';
import { AppColors } from '../../utils/AppColors';
import LogoHeader from '../../components/LogoHeader';

const AddService = ({ navigation }) => {
  // Information States
  const [serviceTitle, setServiceTitle] = useState('');
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState('');

  // Pricing & Metrics States
  const [basePrice, setBasePrice] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [duration, setDuration] = useState('');
  const [whatsIncluded, setWhatsIncluded] = useState('');

  // Sample Media Content Cache Storage State
  const [selectedImages, setSelectedImages] = useState([]);

  // Extended Parameters States
  const [notesForCouples, setNotesForCouples] = useState('');

  // Additional Option Control Checkboxes
  const [instantBooking, setInstantBooking] = useState(true);
  const [customizablePackage, setCustomizablePackage] = useState(false);
  const [makeVisible, setMakeVisible] = useState(true);

  // Dropdown Lists Data Sources Mapping Matrix
  const categoriesList = [
    { label: 'Catering Service', value: 'catering' },
    { label: 'Wedding Photography', value: 'photography' },
    { label: 'Venue Decoration', value: 'decoration' },
    { label: 'Makeup & Styling', value: 'makeup' },
  ];

  const currenciesList = [
    { label: 'USD ($)', value: 'USD' },
    { label: 'PKR (Rs)', value: 'PKR' },
    { label: 'EUR (€)', value: 'EUR' },
    { label: 'AED (د.إ)', value: 'AED' },
    { label: 'GBP (£)', value: 'GBP' },
  ];

  // Device Native Photo Picker Launch Handling Protocol
  const handleSelectImages = async () => {
    if (selectedImages.length >= 6) {
      Alert.alert(
        'Limit Reached',
        'You can upload a maximum of 6 work sample images.',
      );
      return;
    }

    const configurations = {
      mediaType: 'photo',
      selectionLimit: 6 - selectedImages.length, // Remaining limit dynamically evaluated
      includeBase64: false,
    };

    launchImageLibrary(configurations, response => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert(
          'Error',
          response.errorMessage || 'Failed to fetch asset image',
        );
        return;
      }

      if (response.assets) {
        const structuralImageURIs = response.assets.map(asset => asset.uri);
        setSelectedImages(prevData => [...prevData, ...structuralImageURIs]);
      }
    });
  };

  // Local selected images array splice processing sequence
  const handleRemoveImage = indexToRemove => {
    setSelectedImages(prevData =>
      prevData.filter((_, index) => index !== indexToRemove),
    );
  };

  const handleSaveService = () => {
    if (!serviceTitle || !category || !description || !basePrice) {
      Alert.alert(
        'Required Fields Missing',
        'Please fill out all fields marked with an asterisk (*).',
      );
      return;
    }

    const payload = {
      serviceTitle,
      category,
      description,
      pricing: { basePrice, currency, duration, whatsIncluded },
      images: selectedImages, // Attached assets pipeline sequence
      notesForCouples,
      options: { instantBooking, customizablePackage, makeVisible },
    };
    console.log('Saving Package Payload Matrix: ', payload);
    navigation?.goBack();
  };

  return (
    <ScreenWrapper scrollable>
      <View style={styles.contentContainer}>
        <LogoHeader
          goBack
          headerHeight={25}
          title="Add Service"
          description="Create a new package for clients"
        />

        {/* SECTION CARD BLOCK ONE: Basic Core Information */}
        <View style={styles.formSectionModuleCardContainer}>
          <Text style={styles.cardHeaderTitleTextHeading}>Information</Text>

          <Text style={styles.fieldLabelInputHeadingText}>Service Title *</Text>
          <TextInput
            style={styles.standardSingleLineInputFieldBox}
            placeholder="e.g., Premium Wedding Photography..."
            placeholderTextColor="#BDBDBD"
            value={serviceTitle}
            onChangeText={setServiceTitle}
          />

          <Text style={styles.fieldLabelInputHeadingText}>Category *</Text>
          {/* Custom Reusable Dropdown Applied */}
          <CustomDropdown
            data={categoriesList}
            value={category}
            placeholder="Select category"
            onChange={item => setCategory(item.value)}
          />

          <Text style={styles.fieldLabelInputHeadingText}>
            Service Description *
          </Text>
          <View style={styles.multilineTextInputFlexWrapperBox}>
            <TextInput
              style={styles.multilineTextAreaInputFieldInstance}
              placeholder="Describe what's included in this service package..."
              placeholderTextColor="#BDBDBD"
              multiline
              numberOfLines={4}
              maxLength={500}
              value={description}
              onChangeText={setDescription}
              textAlignVertical="top"
            />
            <Text style={styles.characterCounterLimitLabelMetricsText}>
              {description.length} / 500 characters
            </Text>
          </View>
        </View>

        {/* SECTION CARD BLOCK TWO: Pricing Details Components */}
        <View style={styles.formSectionModuleCardContainer}>
          <Text style={styles.cardHeaderTitleTextHeading}>Pricing Details</Text>

          <View style={styles.dualColumnFlexRowInputsGrid}>
            <View style={styles.leftInputColumnProportionScale}>
              <Text style={styles.fieldLabelInputHeadingText}>
                Base Price *
              </Text>
              <View style={styles.currencyIconPrefixedInputFieldRowField}>
                <Text style={styles.prefixCurrencySymbolIconGlyphText}>$</Text>
                <TextInput
                  style={styles.numericValueInputFieldBoxElement}
                  placeholder="0.00"
                  placeholderTextColor="#BDBDBD"
                  keyboardType="numeric"
                  value={basePrice}
                  onChangeText={setBasePrice}
                />
              </View>
            </View>

            <View style={styles.rightInputColumnProportionScale}>
              <Text style={styles.fieldLabelInputHeadingText}>Currency</Text>
              {/* Custom Reusable Currency Dropdown Applied */}
              <CustomDropdown
                data={currenciesList}
                value={currency}
                placeholder="USD"
                onChange={item => setCurrency(item.value)}
              />
            </View>
          </View>

          <Text style={styles.fieldLabelInputHeadingText}>
            Service Duration
          </Text>
          <TextInput
            style={styles.standardSingleLineInputFieldBox}
            placeholder="e.g., 8 hours, Full day, 2 days"
            placeholderTextColor="#BDBDBD"
            value={duration}
            onChangeText={setDuration}
          />

          <Text style={styles.fieldLabelInputHeadingText}>What's Included</Text>
          <TextInput
            style={[
              styles.multilineTextAreaInputFieldInstance,
              styles.boxExtendedFixedTextTrayArea,
            ]}
            placeholder="List items/features included in this package (e.g., 2 photographers, edited photos, photo album)"
            placeholderTextColor="#BDBDBD"
            multiline
            numberOfLines={3}
            value={whatsIncluded}
            onChangeText={setWhatsIncluded}
            textAlignVertical="top"
          />
        </View>

        {/* SECTION CARD BLOCK THREE: Media File Attachments Upload Block */}
        <View style={styles.formSectionModuleCardContainer}>
          <Text style={styles.cardHeaderTitleTextHeading}>Sample Images</Text>
          <Text style={styles.subtextMetaInformationGuidelinesSpanText}>
            Upload photos of your previous work to showcase this service
          </Text>

          {/* Render Preview Strip if Asset State contains selection values */}
          {selectedImages.length > 0 && (
            <View style={styles.imageHorizontalStripWrapperContainer}>
              {selectedImages.map((uri, index) => (
                <View key={index} style={styles.thumbnailContainerPreviewBox}>
                  <Image
                    source={{ uri }}
                    style={styles.thumbnailImageInstance}
                  />
                  <TouchableOpacity
                    style={styles.badgeAbsoluteRemoveCrossIndicatorCircle}
                    onPress={() => handleRemoveImage(index)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.removeCrossTextIconGlyph}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          <TouchableOpacity
            style={styles.interactiveDashBorderMediaUploadZoneBox}
            activeOpacity={0.75}
            onPress={handleSelectImages}
          >
            <Image source={AppImages.uploadImage} style={styles.uploadIcon} />
            <Text style={styles.uploadZoneCallToActionMainHeadingLabel}>
              {selectedImages.length > 0 ? 'Add More Images' : 'Upload Images'}
            </Text>
            <Text style={styles.uploadZoneMaxConstraintsGuidelinesFooterLabel}>
              {selectedImages.length} of 6 selected images
            </Text>
          </TouchableOpacity>
        </View>

        {/* SECTION CARD BLOCK FOUR: Notes For Couples */}
        <View style={styles.formSectionModuleCardContainer}>
          <Text style={styles.cardHeaderTitleTextHeading}>
            Notes for couples
          </Text>
          <Text style={styles.subtextMetaInformationGuidelinesSpanText}>
            Special notes / non-profit & food donations
          </Text>
          <TextInput
            style={[
              styles.multilineTextAreaInputFieldInstance,
              styles.notesFixedStandaloneInputAreaBox,
            ]}
            placeholder="Text.."
            placeholderTextColor="#BDBDBD"
            multiline
            value={notesForCouples}
            onChangeText={setNotesForCouples}
            textAlignVertical="top"
          />
          <Text style={styles.bottomDisclaimerLabelInformationNoticeText}>
            These notes will appear on your service listing for brides and
            grooms.
          </Text>
        </View>

        {/* SECTION CARD BLOCK FIVE: Additional Selection Controls Form Checkboxes Group */}
        <View style={styles.formSectionModuleCardContainer}>
          <Text style={styles.cardHeaderTitleTextHeading}>
            Additional Options
          </Text>

          {/* Checkbox Trigger Core Row Block One */}
          <TouchableOpacity
            style={styles.checkboxInteractiveRowSelectionTileLine}
            activeOpacity={0.8}
            onPress={() => setInstantBooking(!instantBooking)}
          >
            <View
              style={[
                styles.checkboxSquareBoxFrameBorder,
                instantBooking &&
                  styles.checkboxActiveStateFilledBackgroundColor,
              ]}
            >
              {instantBooking && (
                <Text style={styles.checkmarkIconSymbolVectorGlyph}>✓</Text>
              )}
            </View>
            <View style={styles.checkboxLabelMetaTextBlockColumn}>
              <Text style={styles.checkboxMainLabelTitleText}>
                Available for instant booking
              </Text>
              <Text style={styles.checkboxSecondaryMetaLabelSubtextSpan}>
                Clients can book without approval
              </Text>
            </View>
          </TouchableOpacity>

          {/* Checkbox Trigger Core Row Block Two */}
          <TouchableOpacity
            style={styles.checkboxInteractiveRowSelectionTileLine}
            activeOpacity={0.8}
            onPress={() => setCustomizablePackage(!customizablePackage)}
          >
            <View
              style={[
                styles.checkboxSquareBoxFrameBorder,
                customizablePackage &&
                  styles.checkboxActiveStateFilledBackgroundColor,
              ]}
            >
              {customizablePackage && (
                <Text style={styles.checkmarkIconSymbolVectorGlyph}>✓</Text>
              )}
            </View>
            <View style={styles.checkboxLabelMetaTextBlockColumn}>
              <Text style={styles.checkboxMainLabelTitleText}>
                Customizable package
              </Text>
              <Text style={styles.checkboxSecondaryMetaLabelSubtextSpan}>
                Allow clients to request modifications
              </Text>
            </View>
          </TouchableOpacity>

          {/* Checkbox Trigger Core Row Block Three */}
          <TouchableOpacity
            style={[
              styles.checkboxInteractiveRowSelectionTileLine,
              { marginBottom: 0 },
            ]}
            activeOpacity={0.8}
            onPress={() => setMakeVisible(!makeVisible)}
          >
            <View
              style={[
                styles.checkboxSquareBoxFrameBorder,
                makeVisible && styles.checkboxActiveStateFilledBackgroundColor,
              ]}
            >
              {makeVisible && (
                <Text style={styles.checkmarkIconSymbolVectorGlyph}>✓</Text>
              )}
            </View>
            <View style={styles.checkboxLabelMetaTextBlockColumn}>
              <Text style={styles.checkboxMainLabelTitleText}>
                Make service visible
              </Text>
              <Text style={styles.checkboxSecondaryMetaLabelSubtextSpan}>
                Show this service in your public profile
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Primary Screen Process Save Button Capsule Action Node */}
        <TouchableOpacity
          style={styles.primaryProcessCommitActionPillButtonCapsule}
          activeOpacity={0.85}
          onPress={handleSaveService}
        >
          <Image source={AppImages.save} style={styles.saveIcon} />
          <Text style={styles.primaryProcessCommitActionButtonTextLabel}>
            Save Service
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: AppColors.white,
    marginHorizontal: responsiveWidth(9),
    borderRadius: 36,
    paddingTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(4),
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(2),
    minHeight: '95%',
  },
  formSectionModuleCardContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 22,
    paddingHorizontal: responsiveWidth(4.5),
    paddingTop: responsiveHeight(2.2),
    paddingBottom: responsiveHeight(2.5),
    width: '100%',
    marginBottom: responsiveHeight(2.2),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.015,
    shadowRadius: 8,
    elevation: 1,
  },
  cardHeaderTitleTextHeading: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '600',
    color: AppColors.black,
    marginBottom: responsiveHeight(1.5),
  },
  fieldLabelInputHeadingText: {
    fontSize: responsiveFontSize(1.45),
    color: AppColors.black,
    fontWeight: '600',
    marginBottom: responsiveHeight(0.8),
    marginTop: responsiveHeight(1.2),
  },
  standardSingleLineInputFieldBox: {
    backgroundColor: '#F5F6F8',
    borderRadius: 12,
    height: responsiveHeight(5.5),
    paddingHorizontal: responsiveWidth(3.5),
    fontSize: responsiveFontSize(1.5),
    color: AppColors.black,
    borderWidth: 0,
  },
  multilineTextInputFlexWrapperBox: {
    backgroundColor: '#F5F6F8',
    borderRadius: 12,
    paddingHorizontal: responsiveWidth(3.5),
    paddingTop: responsiveHeight(1.2),
    paddingBottom: responsiveHeight(0.8),
  },
  multilineTextAreaInputFieldInstance: {
    fontSize: responsiveFontSize(1.5),
    color: AppColors.black,
    minHeight: responsiveHeight(10),
    padding: 0,
  },
  characterCounterLimitLabelMetricsText: {
    fontSize: responsiveFontSize(1.2),
    color: '#9E9E9E',
    textAlign: 'left',
    marginTop: responsiveHeight(0.6),
  },
  dualColumnFlexRowInputsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  leftInputColumnProportionScale: {
    flex: 1.4,
    marginRight: responsiveWidth(3.5),
  },
  rightInputColumnProportionScale: {
    flex: 1,
  },
  currencyIconPrefixedInputFieldRowField: {
    backgroundColor: '#F5F6F8',
    borderRadius: 12,
    height: responsiveHeight(5.5),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(3.5),
  },
  prefixCurrencySymbolIconGlyphText: {
    fontSize: responsiveFontSize(1.6),
    color: '#8ADED5',
    fontWeight: '600',
    marginRight: responsiveWidth(1.5),
  },
  numericValueInputFieldBoxElement: {
    flex: 1,
    fontSize: responsiveFontSize(1.5),
    color: AppColors.black,
    padding: 0,
  },
  boxExtendedFixedTextTrayArea: {
    backgroundColor: '#F5F6F8',
    borderRadius: 12,
    paddingHorizontal: responsiveWidth(3.5),
    paddingVertical: responsiveHeight(1.2),
    minHeight: responsiveHeight(8.5),
  },
  subtextMetaInformationGuidelinesSpanText: {
    fontSize: responsiveFontSize(1.35),
    color: '#757575',
    fontWeight: '400',
    marginBottom: responsiveHeight(2),
    marginTop: -responsiveHeight(0.5),
  },
  imageHorizontalStripWrapperContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: responsiveHeight(1.5),
  },
  thumbnailContainerPreviewBox: {
    position: 'relative',
    marginRight: responsiveWidth(2),
    marginBottom: responsiveHeight(1),
  },
  thumbnailImageInstance: {
    width: responsiveWidth(13.5),
    height: responsiveWidth(13.5),
    borderRadius: 10,
    backgroundColor: '#F5F6F8',
  },
  badgeAbsoluteRemoveCrossIndicatorCircle: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF5252',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeCrossTextIconGlyph: {
    color: '#FFFFFF',
    fontSize: responsiveFontSize(1.2),
    fontWeight: '700',
    lineHeight: 16,
  },
  interactiveDashBorderMediaUploadZoneBox: {
    borderWidth: 1,
    borderColor: '#DCDCDC',
    borderStyle: 'dashed',
    borderRadius: 14,
    paddingVertical: responsiveHeight(3),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: responsiveHeight(0.5),
  },
  uploadIcon: {
    height: responsiveHeight(5),
    width: responsiveWidth(5),
    resizeMode: 'contain',
  },
  uploadZoneCallToActionMainHeadingLabel: {
    fontSize: responsiveFontSize(1.55),
    fontWeight: '600',
    color: '#4A4A4A',
    marginBottom: responsiveHeight(0.4),
  },
  uploadZoneMaxConstraintsGuidelinesFooterLabel: {
    fontSize: responsiveFontSize(1.2),
    color: '#9E9E9E',
  },
  notesFixedStandaloneInputAreaBox: {
    backgroundColor: '#F5F6F8',
    borderRadius: 12,
    paddingHorizontal: responsiveWidth(3.5),
    paddingVertical: responsiveHeight(1.2),
    minHeight: responsiveHeight(11),
    marginBottom: responsiveHeight(1.2),
  },
  bottomDisclaimerLabelInformationNoticeText: {
    fontSize: responsiveFontSize(1.25),
    color: '#757575',
    lineHeight: responsiveFontSize(1.7),
  },
  checkboxInteractiveRowSelectionTileLine: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: responsiveHeight(2.2),
    width: '100%',
  },
  checkboxSquareBoxFrameBorder: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: AppColors.black,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: responsiveWidth(3.5),
    marginTop: responsiveHeight(0.2),
  },
  checkboxActiveStateFilledBackgroundColor: {
    backgroundColor: '#FFFFFF',
  },
  checkmarkIconSymbolVectorGlyph: {
    fontSize: responsiveFontSize(1.35),
    fontWeight: '900',
    color: AppColors.black,
  },
  checkboxLabelMetaTextBlockColumn: {
    flex: 1,
  },
  checkboxMainLabelTitleText: {
    fontSize: responsiveFontSize(1.55),
    fontWeight: '600',
    color: AppColors.black,
    marginBottom: responsiveHeight(0.2),
  },
  checkboxSecondaryMetaLabelSubtextSpan: {
    fontSize: responsiveFontSize(1.3),
    color: '#757575',
    fontWeight: '400',
  },
  primaryProcessCommitActionPillButtonCapsule: {
    backgroundColor: '#8ADED5',
    borderRadius: 14,
    height: responsiveHeight(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: responsiveHeight(1),
    shadowColor: '#8ADED5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 2,
  },
  saveIcon: {
    height: responsiveHeight(4),
    width: responsiveWidth(4),
    resizeMode: 'contain',
    tintColor: AppColors.black,
    marginRight: responsiveWidth(2),
  },
  primaryProcessCommitActionButtonTextLabel: {
    fontSize: responsiveFontSize(1.65),
    fontWeight: '600',
    color: AppColors.black,
  },
});

export default AddService;
