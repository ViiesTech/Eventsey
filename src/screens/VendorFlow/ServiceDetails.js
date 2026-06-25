import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../utils/Responsive_Dimensions';
import { AppImages } from '../../assets/Images/Index';
import { AppColors } from '../../utils/AppColors';

const ServiceDetails = ({ navigation, route }) => {
  const { data } = route.params;
  // Mocking layout structural media dataset explicitly matched to the target grid
  const sampleGalleryImages = [
    {
      id: '1',
      source: { uri: 'https://picsum.photos/200' },
    },
    {
      id: '2',
      source: { uri: 'https://picsum.photos/201' },
    },
    {
      id: '3',
      source: { uri: 'https://picsum.photos/202' },
    },
    {
      id: '4',
      source: { uri: 'https://picsum.photos/203' },
    },
    {
      id: '5',
      source: { uri: 'https://picsum.photos/204' },
    },
    {
      id: '6',
      source: { uri: 'https://picsum.photos/205' },
    },
  ];

  // Specific features bullet metrics parsed exactly from layout file text layers
  const includedFeatures = [
    'High-resolution edited digital photos',
    '1 Cinematic highlight video (3-5 mins)',
    'Online private gallery for sharing',
    'Professional photo album (Optional)',
  ];

  return (
    <ScreenWrapper scrollable>
      <View style={styles.contentContainer}>
        {/* Top Absolute Position Interactive Action Strip Bar */}
        <View style={styles.navigationHeaderRow}>
          <TouchableOpacity
            onPress={() => navigation?.goBack()}
            style={styles.backButtonTile}
            activeOpacity={0.7}
          >
            <Image
              source={AppImages.arrowLeft}
              style={styles.backArrowIcon}
              resizeMode="contain"
            />
            <Text style={styles.backActionLabelText}>Back</Text>
          </TouchableOpacity>
        </View>

        {/* Core App Header Logo Block Group */}
        <View style={styles.brandHeroContainer}>
          <View style={styles.avatarMainFrame}>
            <Image source={AppImages.logo} style={styles.logo} />
          </View>
          <Text style={styles.subtextTag}>Vendors</Text>
          <Text style={styles.welcomeTitle}>Service Details</Text>
        </View>

        {/* SECTION CARD ONE: Comprehensive Inner Details Module Container */}
        <View style={styles.mainDetailsBlueBorderCard}>
          {/* Header Row: Title, Category and Price Tag */}
          <View style={styles.titlePriceRowContainer}>
            <View style={styles.titleCategoryBlock}>
              <Text style={styles.serviceMainHeadingTitle}>{data?.name}</Text>
              <Text style={styles.serviceCategoryLabelSubtext}>
                {data?.category}
              </Text>
            </View>
            <Text style={styles.priceHighlightBadgeText}>{data?.price}</Text>
          </View>

          {/* Description Block */}
          <Text style={styles.sectionInnerLabelHeading}>
            Service Description:
          </Text>
          <Text style={styles.paragraphDescriptionBodyText}>
            Capture the magic of your special day with our premium photography
            service. We specialize in a blend of candid emotions and cinematic
            shots. Our goal is to tell your unique love story through
            high-quality visuals that you will cherish forever.
          </Text>

          {/* Duration Block */}
          <Text style={styles.sectionInnerLabelHeading}>Service Duration:</Text>
          <Text style={styles.metaDataValueNormalText}>8 Hours.</Text>

          {/* Features and Bullet Checklist Segment */}
          <Text style={styles.sectionInnerLabelHeading}>What’s Included:</Text>
          <Text style={styles.metaDataValueNormalText}>
            2 Professional Photographers
          </Text>

          <View style={styles.bulletListStackContainer}>
            {includedFeatures.map((feature, index) => (
              <View key={index} style={styles.bulletPointRowItem}>
                <Text style={styles.bulletDotGlyph}>•</Text>
                <Text style={styles.bulletPointContentText}>{feature}</Text>
              </View>
            ))}
          </View>

          {/* Fixed 3-Column Work Showcase Images Matrix Grid */}
          <View style={styles.imageMatrixGridThreeColumns}>
            {sampleGalleryImages.map(item => (
              <View key={item.id} style={styles.gridImageContainerFrame}>
                <Image
                  source={item?.source}
                  style={styles.showcaseGridImageInstance}
                />
              </View>
            ))}
          </View>
        </View>

        {/* SECTION CARD TWO: Static Additional Options Overview Display Board */}
        <View style={styles.additionalOptionsCardBox}>
          <Text style={styles.optionsSectionTitleTextHeading}>
            Additional Options
          </Text>

          {/* Pre-Selected Visual Option Row Unit One */}
          <View style={styles.disabledCheckboxRowLineContainer}>
            <View style={styles.squareCheckboxIndicatorBoxChecked}>
              <Text style={styles.checkmarkIconSymbolGlyph}>✓</Text>
            </View>
            <View style={styles.checkboxMetaLabelTextBlockColumn}>
              <Text style={styles.optionMainLabelHeadingText}>
                Available for instant booking
              </Text>
              <Text style={styles.optionSubtextMetaDescriptionSpan}>
                Clients can book without approval
              </Text>
            </View>
          </View>

          {/* Pre-Selected Visual Option Row Unit Two */}
          <View
            style={[
              styles.disabledCheckboxRowLineContainer,
              { marginBottom: 0 },
            ]}
          >
            <View style={styles.squareCheckboxIndicatorBoxChecked}>
              <Text style={styles.checkmarkIconSymbolGlyph}>✓</Text>
            </View>
            <View style={styles.checkboxMetaLabelTextBlockColumn}>
              <Text style={styles.optionMainLabelHeadingText}>
                Make service visible
              </Text>
              <Text style={styles.optionSubtextMetaDescriptionSpan}>
                Show this service in your public profile
              </Text>
            </View>
          </View>
        </View>
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
  navigationHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: responsiveHeight(1),
  },
  backButtonTile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrowIcon: {
    height: 20,
    width: 20,
    tintColor: AppColors.black,
    resizeMode: 'contain',
    marginRight: responsiveWidth(2),
  },
  backActionLabelText: {
    fontSize: responsiveFontSize(1.6),
    color: AppColors.black,
    fontWeight: '500',
  },
  brandHeroContainer: {
    alignItems: 'center',
    marginTop: -responsiveHeight(2),
    marginBottom: responsiveHeight(1),
  },
  avatarMainFrame: {
    width: responsiveWidth(20),
    height: responsiveWidth(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: responsiveHeight(50),
    width: responsiveWidth(50),
    resizeMode: 'contain',
  },
  subtextTag: {
    fontSize: responsiveFontSize(1.3),
    fontWeight: '700',
    color: AppColors.black,
    marginTop: responsiveHeight(0.6),
  },
  welcomeTitle: {
    fontSize: responsiveFontSize(2),
    color: AppColors.black,
    fontWeight: '500',
    marginTop: responsiveHeight(1),
  },
  mainDetailsBlueBorderCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 8,
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(2.5),
    width: '100%',
    marginBottom: responsiveHeight(2.5),
  },
  titlePriceRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: responsiveHeight(1.5),
  },
  titleCategoryBlock: {
    flex: 1,
    paddingRight: responsiveWidth(2),
  },
  serviceMainHeadingTitle: {
    fontSize: responsiveFontSize(1.85),
    fontWeight: '600',
    color: AppColors.black,
    lineHeight: responsiveFontSize(2.4),
  },
  serviceCategoryLabelSubtext: {
    fontSize: responsiveFontSize(1.65),
    color: '#757575',
    fontWeight: '400',
    marginTop: responsiveHeight(0.4),
  },
  priceHighlightBadgeText: {
    fontSize: responsiveFontSize(1.85),
    fontWeight: '700',
    color: '#8ADED5', // Platform core signature teal layout identity mapping
  },
  sectionInnerLabelHeading: {
    fontSize: responsiveFontSize(1.65),
    fontWeight: '600',
    color: AppColors.black,
    marginTop: responsiveHeight(1.6),
    marginBottom: responsiveHeight(0.6),
  },
  paragraphDescriptionBodyText: {
    fontSize: responsiveFontSize(1.45),
    color: '#4A4A4A',
    lineHeight: responsiveFontSize(2.1),
    textAlign: 'left',
  },
  metaDataValueNormalText: {
    fontSize: responsiveFontSize(1.45),
    color: '#4A4A4A',
    lineHeight: responsiveFontSize(2),
  },
  bulletListStackContainer: {
    marginTop: responsiveHeight(0.4),
    paddingLeft: responsiveWidth(1),
  },
  bulletPointRowItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: responsiveHeight(0.3),
    width: '100%',
  },
  bulletDotGlyph: {
    fontSize: responsiveFontSize(1.5),
    color: '#4A4A4A',
    marginRight: responsiveWidth(2),
    lineHeight: responsiveFontSize(1.9),
  },
  bulletPointContentText: {
    flex: 1,
    fontSize: responsiveFontSize(1.45),
    color: '#4A4A4A',
    lineHeight: responsiveFontSize(2),
  },
  imageMatrixGridThreeColumns: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: responsiveHeight(2.5),
  },
  gridImageContainerFrame: {
    width: '31.5%', // Flawless standard equal gap grid computing scale matching 3 items across
    aspectRatio: 1,
    marginBottom: responsiveHeight(1.2),
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
  },
  showcaseGridImageInstance: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  additionalOptionsCardBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 18,
    paddingHorizontal: responsiveWidth(4.5),
    paddingVertical: responsiveHeight(2.2),
    width: '100%',
  },
  optionsSectionTitleTextHeading: {
    fontSize: responsiveFontSize(1.65),
    fontWeight: '600',
    color: AppColors.black,
    marginBottom: responsiveHeight(2),
  },
  disabledCheckboxRowLineContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: responsiveHeight(2),
    width: '100%',
    opacity: 0.85, // Read-only standard styling indicator matching static review layers
  },
  squareCheckboxIndicatorBoxChecked: {
    width: 19,
    height: 19,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: AppColors.black,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: responsiveWidth(3.5),
    marginTop: responsiveHeight(0.2),
    backgroundColor: '#FFFFFF',
  },
  checkmarkIconSymbolGlyph: {
    fontSize: responsiveFontSize(1.25),
    fontWeight: '900',
    color: AppColors.black,
  },
  checkboxMetaLabelTextBlockColumn: {
    flex: 1,
  },
  optionMainLabelHeadingText: {
    fontSize: responsiveFontSize(1.5),
    fontWeight: '600',
    color: AppColors.black,
    marginBottom: responsiveHeight(0.2),
  },
  optionSubtextMetaDescriptionSpan: {
    fontSize: responsiveFontSize(1.25),
    color: '#757575',
    fontWeight: '400',
  },
});

export default ServiceDetails;
