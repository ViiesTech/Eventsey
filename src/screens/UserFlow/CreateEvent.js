import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchImageLibrary } from 'react-native-image-picker';
import Text from '../../components/CustomText';
import ScreenWrapper from '../../components/ScreenWrapper';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../utils/Responsive_Dimensions';
import { AppColors } from '../../utils/AppColors';
import { AppImages } from '../../assets/Images/Index';

const CreateEvent = ({ navigation, route }) => {
  // Target dynamic structure route parameter configuration safely
  const editData = route?.params?.data;

  // --- Controlled Forms States Setup ---
  const [eventType, setEventType] = useState('Wedding Ceremony');
  const [story, setStory] = useState('');
  const [venue, setVenue] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('Classic');

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [coverPhoto, setCoverPhoto] = useState(null);
  const [galleryPhotos, setGalleryPhotos] = useState([]);

  // Use Effect listener to fill existing configuration parameters dynamically
  useEffect(() => {
    if (editData) {
      setEventType(editData.title || editData.category || 'Wedding Ceremony');
      setVenue(editData.venueName || '');

      if (editData.date) {
        const parsedDate = new Date(editData.date);
        if (!isNaN(parsedDate)) setDate(parsedDate);
      }
      // Note: Parsing custom static text like "5:00 PM" directly into a Date object might need manual string operations
    }
  }, [editData]);

  const templatesList = [
    { id: '1', name: 'Classic', color: '#FBCFE8' },
    { id: '2', name: 'Minimal', color: '#EDE9FE' },
    { id: '3', name: 'Floral', color: '#F472B6' },
    { id: '4', name: 'Royal', color: '#FAE8FF' },
  ];

  const formatDate = rawDate => rawDate.toISOString().split('T')[0];
  const formatTime = rawTime =>
    rawTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handlePickCoverPhoto = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, response => {
      if (!response.didCancel && !response.errorCode && response.assets) {
        setCoverPhoto(response.assets[0].uri);
      }
    });
  };

  const handlePickGalleryPhoto = () => {
    if (galleryPhotos.length >= 6) return alert('Max limit reached.');
    launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, response => {
      if (!response.didCancel && !response.errorCode && response.assets) {
        setGalleryPhotos(prev => [...prev, response.assets[0].uri]);
      }
    });
  };

  return (
    <ScreenWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.headerBlock}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Image source={AppImages.arrowLeft} style={styles.backIcon} />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <View style={styles.homeCircleBtn}>
            <Image source={AppImages.home} style={styles.homeIcon} />
          </View>
        </View>

        <View style={styles.titleContainer}>
          <View>
            <Text style={styles.mainTitle}>
              {editData ? 'Edit Profile 💖' : 'Wedding Profile 💖'}
            </Text>
            <Text style={styles.subtitleText}>
              Customize your wedding story
            </Text>
          </View>
          <Text style={styles.totalBadge}>Total: 02</Text>
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.inputLabel}>
            Event Type <Text style={{ color: AppColors.red }}>*</Text>
          </Text>
          <TextInput
            style={styles.textInputStyle}
            value={eventType}
            onChangeText={setEventType}
            placeholder="Enter event type"
          />
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.sectionHeaderRow}>
            <Image
              source={AppImages.heart || AppImages.edit}
              style={styles.sectionIcon}
            />
            <Text style={styles.sectionHeading}>Our Story</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.coverPhotoPlaceholder}
            onPress={handlePickCoverPhoto}
          >
            {coverPhoto ? (
              <Image
                source={{ uri: coverPhoto }}
                style={styles.uploadedCoverImage}
              />
            ) : (
              <>
                <Image
                  source={AppImages.camera || AppImages.eye}
                  style={styles.placeholderCamIcon}
                />
                <Text style={styles.placeholderLabelText}>Add cover photo</Text>
              </>
            )}
          </TouchableOpacity>

          <View style={styles.storyActionsRow}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.uploadBtn}
              onPress={handlePickCoverPhoto}
            >
              <Image
                source={AppImages.camera || AppImages.eye}
                style={styles.btnInlineIcon}
              />
              <Text style={styles.uploadBtnText}>
                {coverPhoto ? 'Change Photo' : 'Upload Photo'}
              </Text>
            </TouchableOpacity>
            <View style={styles.plusSquareBtn}>
              <Text style={styles.plusSquareText}>+</Text>
            </View>
          </View>

          <TextInput
            style={[styles.textInputStyle, styles.textAreaInputStyle]}
            placeholder="Share your love story..."
            multiline
            value={story}
            onChangeText={setStory}
          />
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.sectionHeaderRow}>
            <Image source={AppImages.calendar} style={styles.sectionIcon} />
            <Text style={styles.sectionHeading}>Event Details</Text>
          </View>

          <Text style={styles.fieldSubLabel}>Date</Text>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.pickerTouchField}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.pickerText}>{formatDate(date)}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(e, sd) => {
                setShowDatePicker(false);
                if (sd) setDate(sd);
              }}
            />
          )}

          <Text style={styles.fieldSubLabel}>Time</Text>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.pickerTouchField}
            onPress={() => setShowTimePicker(true)}
          >
            <Text style={styles.pickerText}>{formatTime(time)}</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              is24Hour={false}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(e, st) => {
                setShowTimePicker(false);
                if (st) setTime(st);
              }}
            />
          )}

          <Text style={styles.fieldSubLabel}>Venue</Text>
          <View style={styles.venueInputWrapper}>
            <Image source={AppImages.location} style={styles.venueIcon} />
            <TextInput
              style={styles.venueInputField}
              placeholder="Grand Palace Hotel"
              value={venue}
              onChangeText={setVenue}
            />
          </View>

          <View style={styles.mapPreviewFrame}>
            <Image source={AppImages.location} style={styles.mapCenterIcon} />
            <Text style={styles.mapLabelText}>Map Preview</Text>
          </View>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.sectionHeaderRow}>
            <Image
              source={AppImages.camera || AppImages.eye}
              style={styles.sectionIcon}
            />
            <Text style={styles.sectionHeading}>Photo Gallery</Text>
          </View>

          <View style={styles.galleryGridContainer}>
            <TouchableOpacity
              style={styles.galleryAddBox}
              onPress={handlePickGalleryPhoto}
            >
              <Text style={styles.galleryAddPlus}>+</Text>
            </TouchableOpacity>

            {[...Array(5)].map((_, index) => {
              const photoUri = galleryPhotos[index];
              return (
                <View key={index} style={styles.galleryEmptyBox}>
                  {photoUri ? (
                    <Image
                      source={{ uri: photoUri }}
                      style={styles.galleryImage}
                    />
                  ) : (
                    <Image
                      source={AppImages.camera || AppImages.eye}
                      style={styles.galleryBoxCamIcon}
                    />
                  )}
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.announcementHeadingText}>
            Choose Announcements & Invites
          </Text>
          <View style={styles.templatesGrid}>
            {templatesList.map(t => {
              const isSelected = selectedTemplate === t.name;
              return (
                <TouchableOpacity
                  key={t.id}
                  activeOpacity={0.9}
                  style={[
                    styles.templateCardItem,
                    isSelected && styles.templateCardItemSelected,
                  ]}
                  onPress={() => setSelectedTemplate(t.name)}
                >
                  <View
                    style={[
                      styles.templateColorBlock,
                      { backgroundColor: t.color },
                    ]}
                  />
                  <Text style={styles.templateLabelName}>{t.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.primarySaveSubmitButton}
          onPress={() => navigation.goBack()}
        >
          <Image source={AppImages.edit} style={styles.saveBtnIcon} />
          <Text style={styles.saveBtnText}>
            {editData ? 'Update changes' : 'Save changes'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: responsiveWidth(9),
    paddingBottom: responsiveHeight(4),
    paddingTop: responsiveHeight(3),
  },
  headerBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveHeight(1.5),
  },
  backButton: { flexDirection: 'row', alignItems: 'center' },
  backIcon: {
    height: responsiveHeight(2),
    width: responsiveWidth(4),
    marginRight: responsiveWidth(2),
    resizeMode: 'contain',
    tintColor: '#333333',
  },
  backText: {
    fontSize: responsiveFontSize(1.9),
    color: '#333333',
    fontWeight: '600',
  },
  homeCircleBtn: {
    width: responsiveWidth(11),
    height: responsiveWidth(11),
    borderRadius: responsiveWidth(5.5),
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeIcon: {
    width: responsiveWidth(4.5),
    height: responsiveWidth(4.5),
    resizeMode: 'contain',
    tintColor: AppColors.white,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: responsiveHeight(3),
  },
  mainTitle: {
    fontSize: responsiveFontSize(3.0),
    fontWeight: 'bold',
    color: AppColors.black,
  },
  subtitleText: {
    fontSize: responsiveFontSize(1.7),
    color: '#6B7280',
    marginTop: responsiveHeight(0.3),
  },
  totalBadge: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '700',
    color: AppColors.black,
    marginTop: responsiveHeight(0.8),
  },
  cardContainer: {
    backgroundColor: AppColors.white,
    borderRadius: 20,
    padding: responsiveWidth(4.5),
    borderWidth: 1,
    borderColor: '#F3F4F6',
    marginBottom: responsiveHeight(2.5),
  },
  inputLabel: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: '600',
    color: '#374151',
    marginBottom: responsiveHeight(1.2),
  },
  textInputStyle: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 24,
    height: 48,
    paddingHorizontal: responsiveWidth(4),
    fontSize: responsiveFontSize(1.7),
    color: AppColors.black,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
  },
  sectionIcon: {
    width: responsiveWidth(5),
    height: responsiveWidth(5),
    resizeMode: 'contain',
    tintColor: AppColors.secondary,
    marginRight: responsiveWidth(2),
  },
  sectionHeading: {
    fontSize: responsiveFontSize(2.0),
    fontWeight: '700',
    color: AppColors.black,
  },
  coverPhotoPlaceholder: {
    height: responsiveHeight(18),
    backgroundColor: '#F5F5F4',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsiveHeight(2),
    overflow: 'hidden',
  },
  uploadedCoverImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  placeholderCamIcon: {
    width: responsiveWidth(7),
    height: responsiveWidth(7),
    tintColor: '#D1D5DB',
    marginBottom: responsiveHeight(0.8),
    resizeMode: 'contain',
  },
  placeholderLabelText: { fontSize: responsiveFontSize(1.5), color: '#9CA3AF' },
  storyActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
  },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: AppColors.secondary,
    borderRadius: 12,
    height: 44,
    flex: 1,
    marginRight: responsiveWidth(3),
  },
  btnInlineIcon: {
    width: 16,
    height: 16,
    tintColor: AppColors.secondary,
    marginRight: responsiveWidth(1.5),
    resizeMode: 'contain',
  },
  uploadBtnText: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '600',
    color: AppColors.secondary,
  },
  plusSquareBtn: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusSquareText: { fontSize: 22, color: '#9CA3AF', fontWeight: '300' },
  textAreaInputStyle: {
    height: 100,
    borderRadius: 16,
    textAlignVertical: 'top',
    paddingTop: responsiveHeight(1.5),
  },
  fieldSubLabel: {
    fontSize: responsiveFontSize(1.5),
    color: '#9CA3AF',
    marginBottom: responsiveHeight(0.6),
  },
  pickerTouchField: {
    backgroundColor: '#F5F5F4',
    height: 44,
    borderRadius: 12,
    paddingHorizontal: responsiveWidth(4),
    justifyContent: 'center',
    marginBottom: responsiveHeight(2),
  },
  pickerText: { fontSize: responsiveFontSize(1.6), color: AppColors.black },
  venueInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F4',
    height: 44,
    borderRadius: 12,
    paddingHorizontal: responsiveWidth(3.5),
    marginBottom: responsiveHeight(2),
  },
  venueIcon: {
    width: 16,
    height: 16,
    tintColor: AppColors.secondary,
    marginRight: responsiveWidth(2),
    resizeMode: 'contain',
  },
  venueInputField: {
    flex: 1,
    fontSize: responsiveFontSize(1.6),
    color: AppColors.black,
  },
  mapPreviewFrame: {
    height: responsiveHeight(14),
    backgroundColor: '#F5F5F4',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapCenterIcon: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
    tintColor: '#D1D5DB',
    marginBottom: responsiveHeight(0.5),
    resizeMode: 'contain',
  },
  mapLabelText: { fontSize: responsiveFontSize(1.5), color: '#9CA3AF' },
  galleryGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  galleryAddBox: {
    width: '31%',
    aspectRatio: 1,
    backgroundColor: '#F5F5F4',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsiveHeight(1.5),
  },
  galleryAddPlus: { fontSize: 24, fontWeight: '400', color: '#333333' },
  galleryEmptyBox: {
    width: '31%',
    aspectRatio: 1,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsiveHeight(1.5),
    overflow: 'hidden',
  },
  galleryImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  galleryBoxCamIcon: {
    width: 20,
    height: 20,
    tintColor: '#E5E7EB',
    resizeMode: 'contain',
  },
  announcementHeadingText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '700',
    color: AppColors.black,
    marginBottom: responsiveHeight(2),
  },
  templatesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  templateCardItem: {
    width: '47%',
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: responsiveWidth(3),
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
  },
  templateCardItemSelected: {
    borderColor: AppColors.secondary,
    borderWidth: 1.5,
  },
  templateColorBlock: {
    width: '100%',
    height: responsiveHeight(10),
    borderRadius: 12,
    marginBottom: responsiveHeight(1),
  },
  templateLabelName: {
    fontSize: responsiveFontSize(1.5),
    fontWeight: '600',
    color: '#4B5563',
  },
  primarySaveSubmitButton: {
    flexDirection: 'row',
    backgroundColor: AppColors.secondary,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(1),
    elevation: 3,
  },
  saveBtnIcon: {
    width: 16,
    height: 16,
    tintColor: AppColors.black,
    marginRight: responsiveWidth(2),
    resizeMode: 'contain',
  },
  saveBtnText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '500',
    color: AppColors.black,
  },
});

export default CreateEvent;
