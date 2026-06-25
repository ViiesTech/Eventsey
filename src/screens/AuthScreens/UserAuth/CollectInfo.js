import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ScreenWrapper from '../../../components/ScreenWrapper';
import Button from '../../../components/Button';
import InputField from '../../../components/InputField';
import StepIndicator from '../../../components/StepIndicator';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../../utils/Responsive_Dimensions';
import { showToast } from '../../../components/Toast';

// Native Package Imports
import DatePicker from 'react-native-date-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { AppImages } from '../../../assets/Images/Index';
import { AppColors } from '../../../utils/AppColors';

const CollectInfo = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);

  // Form States matching layout parameters
  const [partnerOne, setPartnerOne] = useState('');
  const [partnerTwo, setPartnerTwo] = useState('');

  // Date Picker States
  const [date, setDate] = useState(new Date());
  const [weddingDate, setWeddingDate] = useState('');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // Image Picker State
  const [selectedImage, setSelectedImage] = useState(null);

  const [selectedTheme, setSelectedTheme] = useState('Rose Blush');

  const stepLabels = [
    'Couple Names',
    'Wedding Date',
    'Your Photo',
    'Theme Color',
  ];
  const themeColors = [
    AppColors.black,
    '#F5EFEA',
    '#A33B43',
    '#2A3439',
    '#FF7F50',
  ];

  const handleNext = () => {
    if (currentStep === 1 && (!partnerOne || !partnerTwo)) {
      return showToast('Required Fields', 'Please enter both partner names.');
    }
    if (currentStep === 2 && !weddingDate) {
      return showToast('Required Field', 'Please provide your wedding date.');
    }
    if (currentStep === 3 && !selectedImage) {
      return showToast('Required Field', 'Please select a photo to proceed.');
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      showToast('Success', 'Configuration saved completely!');
      setTimeout(() => {
        navigation.navigate('UserLogin');
      }, 1500);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Image Picker Trigger Handler
  const handlePickImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        showToast('Cancelled', 'User cancelled image selection');
      } else if (response.errorMessage) {
        showToast('Error', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const source = { uri: response.assets[0].uri };
        setSelectedImage(source);
        showToast('Success', 'Image attached successfully!');
      }
    });
  };

  return (
    <ScreenWrapper scrollable style={styles.screenBackground}>
      <View style={styles.contentContainer}>
        {/* Modular Step Segment Tracker */}
        <StepIndicator
          currentStep={currentStep}
          totalSteps={4}
          stepLabels={stepLabels}
        />

        {/* Central Component Content Configuration Wrapper Card */}
        <View style={styles.wizardCard}>
          {/* ================= STEP 1: COUPLE NAMES ================= */}
          {currentStep === 1 && (
            <View style={styles.innerStepContainer}>
              <Image source={AppImages.heart} style={styles.heartIcon} />
              <Text style={styles.cardHeaderTitle}>What are your names?</Text>
              <Text style={styles.cardSubTitle}>
                Tell us about the happy couple
              </Text>

              <Text style={styles.inputLabel}>First Partner's Name</Text>
              <InputField
                placeHolder="e.g., Wilson"
                value={partnerOne}
                handlePress={setPartnerOne}
                inputContainerStyle={styles.customInputContainer}
              />

              <Text style={styles.inputLabel}>Second Partner's Name</Text>
              <InputField
                placeHolder="e.g., Emma"
                value={partnerTwo}
                handlePress={setPartnerTwo}
                inputContainerStyle={styles.customInputContainer}
              />

              <Button
                title="Next"
                onPress={handleNext}
                style={styles.actionBtn}
                textStyle={styles.btnText}
              />
            </View>
          )}

          {/* ================= STEP 2: WEDDING DATE ================= */}
          {currentStep === 2 && (
            <View style={styles.innerStepContainer}>
              <Image source={AppImages.calendar} style={styles.calendarIcon} />
              <Text style={styles.cardHeaderTitle}>When's the big day?</Text>
              <Text style={styles.cardSubTitle}>Choose your wedding date</Text>

              <Text style={styles.inputLabel}>Wedding Date</Text>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setIsDatePickerOpen(true)}
                style={styles.datePickerTriggerWrapper}
              >
                <View pointerEvents="none" style={{ width: '100%' }}>
                  <InputField
                    placeHolder="Select Date"
                    value={weddingDate}
                    handlePress={() => {}}
                    editable={false}
                    inputContainerStyle={styles.customInputContainer}
                  />
                </View>
              </TouchableOpacity>

              {/* Native Date Picker Engine Component */}
              <DatePicker
                modal
                mode="date"
                open={isDatePickerOpen}
                date={date}
                minimumDate={new Date()}
                onConfirm={selectedDate => {
                  setIsDatePickerOpen(false);
                  setDate(selectedDate);
                  // Formatting Date to YYYY-MM-DD
                  const formattedDate = selectedDate
                    .toISOString()
                    .split('T')[0];
                  setWeddingDate(formattedDate);
                }}
                onCancel={() => {
                  setIsDatePickerOpen(false);
                }}
              />

              <View style={styles.buttonRow}>
                <Button
                  title="Back"
                  onPress={handleBack}
                  style={styles.backBtn}
                  textStyle={styles.btnText}
                />

                <Button
                  title="Next"
                  onPress={handleNext}
                  style={styles.rowActionBtn}
                  textStyle={styles.btnText}
                />
              </View>
            </View>
          )}

          {/* ================= STEP 3: PHOTO UPLOAD ================= */}
          {currentStep === 3 && (
            <View style={styles.innerStepContainer}>
              <Image
                source={AppImages.download}
                style={styles.uploadMainIcon}
              />
              <Text style={styles.cardHeaderTitle}>Add your photo</Text>
              <Text style={styles.cardSubTitle}>
                Upload a beautiful couple photo
              </Text>

              {/* Box Dropzone Segment with Image Preview Toggle Logic */}
              <TouchableOpacity
                style={styles.dropZoneBox}
                onPress={handlePickImage}
              >
                {selectedImage ? (
                  <Image
                    source={selectedImage}
                    style={styles.previewImageStyle}
                  />
                ) : (
                  <>
                    {/* <Text style={styles.uploadArrow}>📤</Text> */}
                    <Image
                      source={AppImages.download}
                      style={styles.uploadArrow}
                    />
                    <Text style={styles.dropZonePrimaryText}>
                      Click to upload or drag and drop
                    </Text>
                    <Text style={styles.dropZoneSubText}>
                      PNG, JPG up to 10MB
                    </Text>
                  </>
                )}
              </TouchableOpacity>

              <View style={styles.buttonRow}>
                <Button
                  title="Back"
                  onPress={handleBack}
                  style={styles.backBtn}
                  textStyle={styles.btnText}
                />

                <Button
                  title="Next"
                  onPress={handleNext}
                  style={styles.rowActionBtn}
                  textStyle={styles.btnText}
                />
              </View>
            </View>
          )}

          {/* ================= STEP 4: COLOR THEME CHOICE ================= */}
          {currentStep === 4 && (
            <View style={styles.innerStepContainer}>
              <View
                style={[
                  styles.previewColorBubble,
                  { backgroundColor: AppColors.primary },
                ]}
              />
              <Text style={styles.cardHeaderTitle}>Pick your theme</Text>
              <Text style={styles.cardSubTitle}>
                Choose your wedding color scheme
              </Text>

              {/* Color Block Swatches Horizontal Selection Row */}
              <View style={styles.colorPaletteRow}>
                {themeColors.map((color, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={[styles.colorSwatch, { backgroundColor: color }]}
                    onPress={() =>
                      setSelectedTheme(
                        idx === 2 ? 'Rose Blush' : 'Custom Palette',
                      )
                    }
                  />
                ))}
              </View>
              <Text style={styles.selectionLabel}>
                Selected: {selectedTheme}
              </Text>

              <View style={styles.buttonRow}>
                <Button
                  title="Back"
                  onPress={handleBack}
                  style={styles.backBtn}
                  textStyle={styles.btnText}
                />

                <Button
                  title="Complete"
                  onPress={handleNext}
                  style={styles.rowActionBtn}
                  textStyle={styles.btnText}
                />
              </View>
            </View>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  screenBackground: {
    backgroundColor: AppColors.primary,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: responsiveWidth(10),
    paddingTop: responsiveHeight(8),
    paddingBottom: responsiveHeight(5),
  },
  wizardCard: {
    backgroundColor: AppColors.white,
    borderRadius: 24,
    paddingHorizontal: responsiveWidth(6),
    paddingVertical: responsiveHeight(4),
    width: '100%',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 5,
  },
  innerStepContainer: {
    alignItems: 'center',
    width: '100%',
  },
  heartIcon: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    marginBottom: responsiveHeight(1),
  },
  calendarIcon: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    marginBottom: responsiveHeight(1),
  },
  uploadMainIcon: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    marginBottom: responsiveHeight(1),
  },
  previewColorBubble: {
    width: responsiveWidth(14),
    height: responsiveWidth(14),
    borderRadius: responsiveWidth(7),
    marginBottom: responsiveHeight(2),
  },
  cardHeaderTitle: {
    fontSize: responsiveFontSize(2.6),
    fontWeight: '700',
    color: AppColors.primary,
    textAlign: 'center',
    marginBottom: responsiveHeight(0.8),
  },
  cardSubTitle: {
    fontSize: responsiveFontSize(1.7),
    color: '#9E9E9E',
    textAlign: 'center',
    marginBottom: responsiveHeight(3.5),
  },
  inputLabel: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: '600',
    color: AppColors.black,
    alignSelf: 'flex-start',
    marginBottom: responsiveHeight(0.8),
  },
  datePickerTriggerWrapper: {
    width: '100%',
  },
  customInputContainer: {
    backgroundColor: '#F5EFEA',
    borderRadius: 14,
    borderWidth: 0,
    height: responsiveHeight(6),
    marginBottom: responsiveHeight(2.2),
    paddingHorizontal: responsiveWidth(4),
    width: '100%',
  },
  dropZoneBox: {
    borderWidth: 1,
    borderColor: '#E0D8D0',
    borderStyle: 'dashed',
    borderRadius: 14,
    width: '100%',
    height: responsiveHeight(18),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsiveHeight(4),
    overflow: 'hidden',
  },
  previewImageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  uploadArrow: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginBottom: responsiveHeight(1),
    tintColor: '#9E9E9E',
  },
  dropZonePrimaryText: {
    fontSize: responsiveFontSize(1.6),
    color: '#7C7C7C',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: responsiveHeight(0.5),
  },
  dropZoneSubText: {
    fontSize: responsiveFontSize(1.4),
    color: '#BCBCBC',
    textAlign: 'center',
  },
  colorPaletteRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: responsiveHeight(2),
  },
  colorSwatch: {
    width: responsiveWidth(9),
    height: responsiveWidth(9),
    borderRadius: responsiveWidth(4.5),
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectionLabel: {
    fontSize: responsiveFontSize(1.6),
    color: '#7C7C7C',
    fontWeight: '500',
    marginBottom: responsiveHeight(4),
  },
  actionBtn: {
    backgroundColor: AppColors.secondary,
    borderRadius: 14,
    height: responsiveHeight(6.2),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: responsiveHeight(1.5),
  },
  rowActionBtn: {
    backgroundColor: AppColors.secondary,
    borderRadius: 14,
    height: responsiveHeight(6.2),
    justifyContent: 'center',
    alignItems: 'center',
    width: '48%',
  },
  backBtn: {
    backgroundColor: '#F5EFEA',
    borderRadius: 14,
    height: responsiveHeight(6.2),
    justifyContent: 'center',
    alignItems: 'center',
    width: '48%',
  },
  backBtnText: {
    color: AppColors.black,
    fontWeight: '600',
    fontSize: responsiveFontSize(2),
  },
  btnText: {
    color: '#1A2E2B',
    fontWeight: '600',
    fontSize: responsiveFontSize(2),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: responsiveHeight(1.5),
  },
});

export default CollectInfo;
