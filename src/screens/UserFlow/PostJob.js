import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Text from '../../components/CustomText';
import ScreenWrapper from '../../components/ScreenWrapper';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../utils/Responsive_Dimensions';
import { AppColors } from '../../utils/AppColors';
import { AppImages } from '../../assets/Images/Index';

const PostJob = ({ navigation }) => {
  // Form State Properties
  const [jobTitle, setJobTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [budgetRange, setBudgetRange] = useState('');
  const [guests, setGuests] = useState('');
  const [eventLocation, setEventLocation] = useState('');

  // Inline Date Picker Controls
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [eventDateText, setEventDateText] = useState('');

  // Categories Structure synced with Screenshot 2026-07-01 at 4.42.05 AM.png
  const categoriesList = [
    { id: '1', name: 'Photography', icon: AppImages.camera },
    { id: '2', name: 'Catering', icon: AppImages.catering },
    { id: '3', name: 'Decoration', icon: AppImages.decoration },
    { id: '4', name: 'Makeup Artist', icon: AppImages.makeUp },
    { id: '5', name: 'Venue', icon: AppImages.venue },
    { id: '6', name: 'Transportation', icon: AppImages.car },
  ];

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setDate(selectedDate);
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setEventDateText(formattedDate);
    }
  };

  const handlePostJobSubmission = () => {
    const jobPayload = {
      jobTitle,
      category: selectedCategory,
      jobDescription,
      budgetRange,
      eventDate: eventDateText,
      guests,
      eventLocation,
    };
    console.log('Post Job Form Payload Trigger: ', jobPayload);
    navigation.goBack();
    // Add logic here to sync backend dispatcher actions
  };

  return (
    <ScreenWrapper>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.mainContainerLayout}>
          {/* Header Back Navigation Stack Link */}
          <View style={styles.headerNavigationBlockRow}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.backButtonTriggerInline}
              onPress={() => navigation.goBack()}
            >
              <Image
                source={AppImages.arrowLeft}
                style={styles.backArrowAssetIcon}
              />
              <Text style={styles.backButtonLabelText}>Back</Text>
            </TouchableOpacity>
          </View>

          {/* Headline Titles */}
          <View style={styles.titleDescriptionBlock}>
            <Text style={styles.screenMainHeadlineText}>Post Job</Text>
            <Text style={styles.screenSubTextDescription}>
              Find the perfect vendor
            </Text>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollFormLayoutViewContainer}
          >
            {/* CARD 1: Job Title Block */}
            <View style={styles.formSectionWrapperCard}>
              <View style={styles.inputLabelHeaderRow}>
                <Image
                  source={AppImages.jobs}
                  style={styles.sectionHeaderIcon}
                />
                <Text style={styles.sectionInputCardLabelText}>Job Title</Text>
              </View>
              <TextInput
                style={styles.formTextInputField}
                placeholder="e.g., Wedding Photographer"
                placeholderTextColor="#A3A3A3"
                value={jobTitle}
                onChangeText={setJobTitle}
              />
            </View>

            {/* CARD 2: Categories Selection Block Grid */}
            <View style={styles.formSectionWrapperCard}>
              <Text style={styles.categoryBlockSectionLabel}>
                Select Category
              </Text>
              <View style={styles.categoriesSelectionGridBlock}>
                {categoriesList.map(category => {
                  const isCurrentTargetSelected =
                    selectedCategory === category.name;
                  return (
                    <TouchableOpacity
                      key={category.id}
                      activeOpacity={0.8}
                      onPress={() => setSelectedCategory(category.name)}
                      style={[
                        styles.categoryGridBoxElement,
                        isCurrentTargetSelected &&
                          styles.categoryGridBoxElementActiveSelected,
                      ]}
                    >
                      <Image
                        source={category.icon}
                        style={[
                          styles.categoryIconDisplayItem,
                          isCurrentTargetSelected &&
                            styles.categoryIconDisplayItemActive,
                        ]}
                      />
                      <Text style={styles.categoryElementLabelTypography}>
                        {category.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* CARD 3: Job Description Block */}
            <View style={styles.formSectionWrapperCard}>
              <View style={styles.inputLabelHeaderRow}>
                <Image
                  source={AppImages.doc}
                  style={styles.sectionHeaderIcon}
                />
                <Text style={styles.sectionInputCardLabelText}>
                  Job Description
                </Text>
              </View>
              <TextInput
                style={[
                  styles.formTextInputField,
                  styles.formMultiLineTextContainerArea,
                ]}
                placeholder="Describe your requirements in detail..."
                placeholderTextColor="#A3A3A3"
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
                value={jobDescription}
                onChangeText={setJobDescription}
              />
            </View>

            {/* CARD 4: Budget Range Block */}
            <View style={styles.formSectionWrapperCard}>
              <View style={styles.inputLabelHeaderRow}>
                <Image
                  source={AppImages.dollar}
                  style={styles.sectionHeaderIcon}
                />
                <Text style={styles.sectionInputCardLabelText}>
                  Budget Range
                </Text>
              </View>
              <TextInput
                style={styles.formTextInputField}
                placeholder="e.g., $500 - $1000"
                placeholderTextColor="#A3A3A3"
                value={budgetRange}
                onChangeText={setBudgetRange}
              />
            </View>

            {/* SPLIT HORIZONTAL ROW CARD: Event Date & Guests Setup */}
            <View style={styles.splitInputHorizontalFlexRow}>
              {/* Event Date Component Block */}
              <View
                style={[
                  styles.formSectionWrapperCard,
                  styles.halfWidthFlexChildBlock,
                ]}
              >
                <View style={styles.inputLabelHeaderRow}>
                  <Image
                    source={AppImages.calendar}
                    style={styles.sectionHeaderIcon}
                  />
                  <Text style={styles.sectionInputCardLabelText}>
                    Event Date
                  </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => setShowDatePicker(true)}
                  style={[
                    styles.formTextInputField,
                    styles.datePickerSimulatedTriggerInput,
                  ]}
                >
                  <Text
                    style={{
                      color: eventDateText ? '#000000' : '#A3A3A3',
                      fontSize: responsiveFontSize(1.6),
                    }}
                  >
                    {eventDateText || 'Select date'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Guests Count Control Block */}
              <View
                style={[
                  styles.formSectionWrapperCard,
                  styles.halfWidthFlexChildBlock,
                ]}
              >
                <View style={styles.inputLabelHeaderRow}>
                  <Image
                    source={AppImages.users}
                    style={styles.sectionHeaderIcon}
                  />
                  <Text style={styles.sectionInputCardLabelText}>Guests</Text>
                </View>
                <TextInput
                  style={styles.formTextInputField}
                  placeholder="150"
                  placeholderTextColor="#A3A3A3"
                  keyboardType="numeric"
                  value={guests}
                  onChangeText={setGuests}
                />
              </View>
            </View>

            {/* Inline Controlled DateTimePicker Module Layer */}
            {showDatePicker && (
              <View
                style={
                  Platform.OS === 'ios'
                    ? styles.iosDatePickerWrapperViewCard
                    : null
                }
              >
                <DateTimePicker
                  value={date}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  minimumDate={new Date()}
                  onChange={handleDateChange}
                />
                {Platform.OS === 'ios' && (
                  <TouchableOpacity
                    style={styles.iosDoneButtonTriggerElement}
                    onPress={() => setShowDatePicker(false)}
                  >
                    <Text style={styles.iosDoneButtonLabelTypographyText}>
                      Done
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            {/* CARD 5: Event Location Setup Block */}
            <View style={styles.formSectionWrapperCard}>
              <View style={styles.inputLabelHeaderRow}>
                <Image
                  source={AppImages.location}
                  style={styles.sectionHeaderIcon}
                />
                <Text style={styles.sectionInputCardLabelText}>
                  Event Location
                </Text>
              </View>
              <TextInput
                style={styles.formTextInputField}
                placeholder="e.g., Seattle, WA"
                placeholderTextColor="#A3A3A3"
                value={eventLocation}
                onChangeText={setEventLocation}
              />
            </View>

            {/* Main Action Form Control Trigger Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.postJobMainSubmitActionButton}
              onPress={handlePostJobSubmission}
            >
              <Image
                source={AppImages.send}
                style={styles.sendButtonIconAsset}
              />
              <Text style={styles.postJobSubmitButtonLabelText}>
                Post Job to Vendors
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  mainContainerLayout: {
    flex: 1,
    paddingHorizontal: responsiveWidth(9),
    paddingTop: responsiveHeight(3),
  },
  headerNavigationBlockRow: {
    paddingTop: responsiveHeight(2),
    marginBottom: responsiveHeight(1.5),
  },
  backButtonTriggerInline: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backArrowAssetIcon: {
    height: responsiveHeight(2),
    width: responsiveWidth(4),
    marginRight: responsiveWidth(2),
    resizeMode: 'contain',
    tintColor: '#333333',
  },
  backButtonLabelText: {
    fontSize: responsiveFontSize(1.9),
    color: '#333333',
    fontWeight: '600',
  },
  titleDescriptionBlock: {
    marginBottom: responsiveHeight(2.5),
  },
  screenMainHeadlineText: {
    fontSize: responsiveFontSize(3.2),
    fontWeight: 'bold',
    color: '#1A2530',
  },
  screenSubTextDescription: {
    fontSize: responsiveFontSize(1.8),
    color: '#555555',
    fontWeight: '400',
    marginTop: responsiveHeight(0.3),
  },
  scrollFormLayoutViewContainer: {
    paddingBottom: responsiveHeight(5),
  },
  formSectionWrapperCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F1F3F6',
    borderRadius: 16,
    padding: responsiveWidth(4),
    marginBottom: responsiveHeight(2),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  inputLabelHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(1.2),
  },
  sectionHeaderIcon: {
    width: responsiveWidth(4.5),
    height: responsiveWidth(4.5),
    resizeMode: 'contain',
    tintColor: '#5EA387', // Mockup icon light sage/green layout accents Tint
    marginRight: responsiveWidth(2),
  },
  sectionInputCardLabelText: {
    fontSize: responsiveFontSize(1.6),
    color: '#2C3E50',
    fontWeight: '600',
  },
  formTextInputField: {
    backgroundColor: '#F9F8F6', // Matching clean layout beige input block fillings style
    height: 48,
    borderRadius: 10,
    paddingHorizontal: responsiveWidth(3.5),
    fontSize: responsiveFontSize(1.6),
    color: '#000000',
  },
  categoryBlockSectionLabel: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: responsiveHeight(1.8),
  },
  categoriesSelectionGridBlock: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryGridBoxElement: {
    width: '31%',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingVertical: responsiveHeight(1.5),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsiveHeight(1.2),
    borderWidth: 1,
    borderColor: 'transparent',
  },
  categoryGridBoxElementActiveSelected: {
    backgroundColor: '#EBF7F4',
    borderColor: '#8ADED5',
  },
  categoryIconDisplayItem: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
    resizeMode: 'contain',
    tintColor: '#4A5568',
    marginBottom: responsiveHeight(0.8),
  },
  categoryIconDisplayItemActive: {
    tintColor: '#14B8A6',
  },
  categoryElementLabelTypography: {
    fontSize: responsiveFontSize(1.3),
    color: '#4A5568',
    fontWeight: '500',
    textAlign: 'center',
  },
  formMultiLineTextContainerArea: {
    height: 100,
    paddingTop: responsiveHeight(1.2),
  },
  splitInputHorizontalFlexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  halfWidthFlexChildBlock: {
    width: '48%',
  },
  datePickerSimulatedTriggerInput: {
    justifyContent: 'center',
  },
  iosDatePickerWrapperViewCard: {
    backgroundColor: '#F9F8F6',
    borderRadius: 12,
    padding: 8,
    marginBottom: responsiveHeight(2),
  },
  iosDoneButtonTriggerElement: {
    alignSelf: 'flex-end',
    padding: 6,
    marginRight: 4,
  },
  iosDoneButtonLabelTypographyText: {
    color: '#5EA387',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.6),
  },
  postJobMainSubmitActionButton: {
    flexDirection: 'row',
    backgroundColor: AppColors.primary,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(1),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  sendButtonIconAsset: {
    width: responsiveWidth(4.5),
    height: responsiveWidth(4.5),
    resizeMode: 'contain',
    marginRight: responsiveWidth(2),
    tintColor: '#000000',
  },
  postJobSubmitButtonLabelText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '600',
    color: '#000000',
  },
});

export default PostJob;
