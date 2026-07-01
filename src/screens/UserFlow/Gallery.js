import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  Share,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import ImageView from 'react-native-image-viewing';
import Text from '../../components/CustomText';
import ScreenWrapper from '../../components/ScreenWrapper';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../utils/Responsive_Dimensions';
import { AppColors } from '../../utils/AppColors';
import { AppImages } from '../../assets/Images/Index';

const { width } = Dimensions.get('window');
const CONTAINER_PADDING = responsiveWidth(9) * 2;
const GRID_SPACING = responsiveWidth(3);
const ITEM_SIZE = (width - CONTAINER_PADDING - GRID_SPACING * 2) / 3;

const Gallery = ({ navigation }) => {
  const [photos, setPhotos] = useState([]);

  // Viewer state managements
  const [viewerVisible, setViewerVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // --- 1. Pick Image via react-native-image-picker ---
  const handleAddMedia = () => {
    const remainingSlots = 15 - photos.length;
    if (remainingSlots <= 0) return;

    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: remainingSlots,
      },
      response => {
        if (response.didCancel || response.errorCode) return;

        if (response.assets) {
          const newUris = response.assets.map(asset => asset.uri);
          setPhotos(prev => [...prev, ...newUris].slice(0, 15));
        }
      },
    );
  };

  // --- 2. Remove Image ---
  const handleRemovePhoto = indexToRemove => {
    setPhotos(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  // --- 3. Fullscreen Preview and Individual Share Trigger ---
  const handlePhotoClick = index => {
    setCurrentImageIndex(index);
    setViewerVisible(true);
  };

  const handleIndividualShare = async imageUri => {
    try {
      await Share.share({
        url: imageUri, // iOS ke liye complete link
        message: `Check out this photo from the event: ${imageUri}`, // Android ke liye text message cascade
      });
    } catch (error) {
      console.log('Error sharing individual image:', error);
    }
  };

  // Construct data for the 15-slot grid
  const getGridData = () => {
    const data = [];
    photos.forEach((uri, index) => {
      data.push({ type: 'photo', uri, index });
    });
    if (data.length < 15) {
      data.push({ type: 'add_button', index: data.length });
    }
    while (data.length < 15) {
      data.push({ type: 'placeholder', index: data.length });
    }
    return data;
  };

  // --- 4. Single Gallery Item Component ---
  const renderGalleryItem = ({ item }) => {
    if (item.type === 'add_button') {
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.addMediaCard}
          onPress={handleAddMedia}
        >
          <Text style={styles.plusSign}>+</Text>
          <Text style={styles.addMediaText}>Add Media</Text>
        </TouchableOpacity>
      );
    }

    if (item.type === 'placeholder') {
      return (
        <View style={styles.photoContainer}>
          <View style={styles.emptyPhotoPlaceholder}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/685/685655.png',
              }}
              style={styles.cameraIcon}
            />
          </View>
        </View>
      );
    }

    // item.type === 'photo'
    return (
      <View style={styles.photoContainer}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.photoTouchable}
          onPress={() => handlePhotoClick(item.index)}
        >
          <Image source={{ uri: item.uri }} style={styles.galleryImage} />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.removeButton}
          onPress={() => handleRemovePhoto(item.index)}
        >
          <Text style={styles.removeButtonText}>×</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // React-native-image-viewing array format filter standard object array mapping
  const viewerImagesList = photos.map(uri => ({ uri }));

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* --- Top Header Section --- */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Image source={AppImages.arrowLeft} style={styles.backIcon} />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.homeCircleButton}
            onPress={() => navigation.navigate('UserFlow', { screen: 'Home' })}
          >
            <Image source={AppImages.home} style={styles.homeIcon} />
          </TouchableOpacity>
        </View>

        {/* --- Screen Headliners --- */}
        <View style={styles.headlineContainer}>
          <Text style={styles.mainTitleText}>Media & Sharing</Text>
          <Text style={styles.subtitleText}>
            Customize and share your invites
          </Text>
        </View>

        {/* --- Section Title --- */}
        <View style={styles.sectionTitleRow}>
          <Text style={styles.sectionTitleText}>Photo Gallery</Text>
        </View>

        {/* --- Photo Grid Setup --- */}
        <FlatList
          data={getGridData()}
          renderItem={renderGalleryItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          columnWrapperStyle={styles.gridRowWrapper}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.gridContentContainer}
        />

        {/* --- Fullscreen Image Viewer with Custom Share Footer Header --- */}
        <ImageView
          images={viewerImagesList}
          imageIndex={currentImageIndex}
          visible={viewerVisible}
          onRequestClose={() => setViewerVisible(false)}
          FooterComponent={({ imageIndex }) => (
            <View style={styles.viewerFooterContainer}>
              <TouchableOpacity
                style={styles.shareBtnIndividual}
                onPress={() =>
                  handleIndividualShare(viewerImagesList[imageIndex]?.uri)
                }
              >
                <Text style={styles.shareBtnText}>Share This Photo</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        {/* --- Sticky Save Button --- */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.saveButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: responsiveWidth(9),
    paddingTop: responsiveHeight(3),
    paddingBottom: responsiveHeight(2),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    height: responsiveHeight(5),
    width: responsiveWidth(5),
    marginRight: responsiveWidth(1.5),
    resizeMode: 'contain',
    tintColor: AppColors.black,
  },
  backText: {
    fontSize: responsiveFontSize(2),
    color: AppColors.black,
    fontWeight: '500',
  },
  homeCircleButton: {
    width: responsiveWidth(11),
    height: responsiveWidth(11),
    borderRadius: responsiveWidth(5.5),
    backgroundColor: AppColors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeIcon: {
    width: responsiveWidth(5),
    height: responsiveWidth(5),
    resizeMode: 'contain',
    tintColor: AppColors.white,
  },
  headlineContainer: {
    marginBottom: responsiveHeight(3),
  },
  mainTitleText: {
    fontSize: responsiveFontSize(3.2),
    fontWeight: '800',
    color: AppColors.black,
  },
  subtitleText: {
    fontSize: responsiveFontSize(1.8),
    color: '#3F3F46',
    marginTop: responsiveHeight(0.4),
  },
  searchBarRow: {
    flexDirection: 'row',
    backgroundColor: AppColors.white,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(4),
    borderWidth: 1,
    borderColor: '#E4E4E7',
    marginBottom: responsiveHeight(3),
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#A1A1AA',
    marginRight: responsiveWidth(2),
  },
  textInputStyle: {
    flex: 1,
    fontSize: responsiveFontSize(1.9),
    color: AppColors.black,
  },
  filterIcon: {
    width: 20,
    height: 20,
    tintColor: '#A1A1AA',
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
  },
  sectionTitleText: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '700',
    color: AppColors.black,
  },
  viewAllText: {
    fontSize: responsiveFontSize(1.7),
    color: '#9C6D76',
    fontWeight: '500',
  },
  gridContentContainer: {
    paddingBottom: responsiveHeight(10),
  },
  gridRowWrapper: {
    justifyContent: 'flex-start',
    marginBottom: GRID_SPACING,
  },
  photoContainer: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    marginRight: GRID_SPACING,
    borderRadius: 16,
    overflow: 'hidden',
  },
  photoTouchable: {
    width: '100%',
    height: '100%',
  },
  removeButton: {
    position: 'absolute',
    top: responsiveWidth(1.5),
    right: responsiveWidth(1.5),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: responsiveWidth(6),
    height: responsiveWidth(6),
    borderRadius: responsiveWidth(3),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  removeButtonText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.6),
    fontWeight: 'bold',
    lineHeight: responsiveFontSize(1.8),
  },
  galleryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  emptyPhotoPlaceholder: {
    flex: 1,
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderColor: '#F4F4F5',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
    resizeMode: 'contain',
    tintColor: '#E4E4E7',
  },
  addMediaCard: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    backgroundColor: AppColors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F4F5F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: GRID_SPACING,
  },
  plusSign: {
    fontSize: responsiveFontSize(3.0),
    color: AppColors.secondary,
    fontWeight: '300',
  },
  addMediaText: {
    fontSize: responsiveFontSize(1.4),
    color: '#3F3F46',
    fontWeight: '400',
    marginTop: responsiveHeight(0.2),
  },
  saveButton: {
    position: 'absolute',
    bottom: responsiveHeight(2),
    left: responsiveWidth(9),
    right: responsiveWidth(9),
    backgroundColor: AppColors.secondary,
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontSize: responsiveFontSize(2.0),
    fontWeight: '600',
    color: AppColors.black,
  },
  viewerFooterContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: responsiveHeight(5),
  },
  shareBtnIndividual: {
    backgroundColor: AppColors.secondary,
    paddingHorizontal: responsiveWidth(6),
    paddingVertical: responsiveHeight(1.5),
    borderRadius: 25,
  },
  shareBtnText: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: '600',
    color: AppColors.black,
  },
});

export default Gallery;
