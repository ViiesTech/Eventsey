import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
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

const Events = ({ navigation }) => {
  // Controlled array state configuration
  const [eventsData, setEventsData] = useState([
    {
      id: '1',
      category: 'Ceremony',
      title: 'Wedding Ceremony',
      date: '2025-12-15',
      time: '5:00 PM',
      venueName: 'Grand Ballroom, The Plaza Hotel',
      venueAddress: '768 5th Ave, New York, NY 10019',
    },
  ]);

  // Operational handler targeting item deletion block logic
  const handleDeleteEvent = id => {
    Alert.alert(
      'Delete Event',
      'Are you sure you want to remove this event entry permanently?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () =>
            setEventsData(prev => prev.filter(item => item.id !== id)),
        },
      ],
    );
  };

  const renderEventCard = ({ item }) => {
    return (
      <View style={styles.eventMainCardContainer}>
        <View style={styles.cardHeaderBackdropBlock}>
          <View style={styles.categoryBadgePill}>
            <Text style={styles.categoryBadgeText}>{item.category}</Text>
          </View>
          <Text style={styles.eventTitleHeadingText}>{item.title}</Text>
        </View>

        <View style={styles.cardBodyMetaContentBlock}>
          <View style={styles.metaInformationFlexRow}>
            <Image
              source={AppImages.calendar}
              style={styles.metaInlineIconAsset}
            />
            <Text style={styles.metaTextValueStyle}>{item.date}</Text>
          </View>

          <View style={styles.metaInformationFlexRow}>
            <Image source={AppImages.time} style={styles.metaInlineIconAsset} />
            <Text style={styles.metaTextValueStyle}>{item.time}</Text>
          </View>

          <View
            style={[
              styles.metaInformationFlexRow,
              { alignItems: 'flex-start' },
            ]}
          >
            <Image
              source={AppImages.location}
              style={[
                styles.metaInlineIconAsset,
                { marginTop: responsiveHeight(0.3) },
              ]}
            />
            <View style={styles.locationLabelsColumnContainer}>
              <Text style={styles.metaTextValueStyle}>{item.venueName}</Text>
              <Text style={styles.locationSubAddressTypographyText}>
                {item.venueAddress}
              </Text>
            </View>
          </View>

          <View style={styles.cardInnerHorizontalDividerLine} />

          <View style={styles.cardActionSuiteButtonsRowRow}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.previewActionTriggerButtonElement}
              onPress={() => navigation.navigate('PreviewCard', { data: item })}
            >
              <Image source={AppImages.eye} style={styles.btnActionAssetIcon} />
              <Text style={styles.previewButtonLabelText}>Preview</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.editActionTriggerButtonElement}
              onPress={() => navigation.navigate('CreateEvent', { data: item })}
            >
              <Image
                source={AppImages.edit}
                style={styles.btnActionAssetIcon}
              />
              <Text style={styles.editButtonLabelText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.deleteActionIconButtonFrame}
              onPress={() => handleDeleteEvent(item.id)}
            >
              <Image
                source={AppImages.delete}
                style={styles.trashIconAssetItem}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const listEmptyComponent = () => {
    return (
      <View style={styles.emptyComponentContainer}>
        <Text style={styles.emptyTitle}>No Events created yet.</Text>
      </View>
    );
  };

  return (
    <ScreenWrapper>
      <View style={styles.canvasMainLayoutContainer}>
        <View style={styles.navigationHeaderBlockFlexRow}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.backButtonTouchLinkInline}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={AppImages.arrowLeft}
              style={styles.backArrowAssetIconImage}
            />
            <Text style={styles.backButtonActionLabelText}>Back</Text>
          </TouchableOpacity>
          <View style={styles.homeCircleIconActionDisplayButton}>
            <Image source={AppImages.home} style={styles.homeIconAssetItem} />
          </View>
        </View>

        <View style={styles.headlineHeaderLabelsBlock}>
          <Text style={styles.screenDashboardTitleHeadline}>
            Wedding Profile 💖
          </Text>
          <Text style={styles.screenDashboardSubtitleDescriptor}>
            Customize your wedding story
          </Text>
        </View>

        <FlatList
          data={eventsData}
          keyExtractor={item => item.id}
          renderItem={renderEventCard}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={listEmptyComponent}
          contentContainerStyle={styles.scrollFeedContentContainerPaddingOffset}
        />

        <View style={styles.buttonMainView}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.createNewEventButton}
            onPress={() => navigation.navigate('CreateEvent')}
          >
            <Image source={AppImages.plus} style={styles.plusButtonIconAsset} />
            <Text style={styles.createNewEventButtonLabel}>
              Create New Event
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

// ... (Styles same as your base configuration code block)
const styles = StyleSheet.create({
  canvasMainLayoutContainer: { flex: 1, paddingHorizontal: responsiveWidth(9) },
  navigationHeaderBlockFlexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: responsiveHeight(3),
    marginBottom: responsiveHeight(1.5),
  },
  backButtonTouchLinkInline: { flexDirection: 'row', alignItems: 'center' },
  backArrowAssetIconImage: {
    height: responsiveHeight(2),
    width: responsiveWidth(4),
    marginRight: responsiveWidth(2),
    resizeMode: 'contain',
    tintColor: '#333333',
  },
  backButtonActionLabelText: {
    fontSize: responsiveFontSize(1.9),
    color: '#333333',
    fontWeight: '600',
  },
  homeCircleIconActionDisplayButton: {
    width: responsiveWidth(12),
    height: responsiveWidth(12),
    borderRadius: responsiveWidth(6),
    backgroundColor: AppColors.black,
    alignItems: 'center',
    justifyYontent: 'center',
    justifyContent: 'center',
  },
  homeIconAssetItem: {
    width: responsiveWidth(5),
    height: responsiveWidth(5),
    resizeMode: 'contain',
    tintColor: AppColors.white,
  },
  headlineHeaderLabelsBlock: { marginBottom: responsiveHeight(4) },
  screenDashboardTitleHeadline: {
    fontSize: responsiveFontSize(3.2),
    fontWeight: 'bold',
    color: AppColors.black,
  },
  screenDashboardSubtitleDescriptor: {
    fontSize: responsiveFontSize(1.8),
    color: '#4B5563',
    fontWeight: '400',
    marginTop: responsiveHeight(0.5),
  },
  scrollFeedContentContainerPaddingOffset: {
    flexGrow: 1,
    paddingBottom: responsiveHeight(14),
  },
  eventMainCardContainer: {
    backgroundColor: AppColors.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#F0F2F5',
    overflow: 'hidden',
    elevation: 3,
    marginBottom: responsiveHeight(3),
  },
  cardHeaderBackdropBlock: {
    backgroundColor: AppColors.primary,
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(2.5),
    paddingBottom: responsiveHeight(3),
    alignItems: 'flex-start',
  },
  categoryBadgePill: {
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    paddingHorizontal: responsiveWidth(3.5),
    paddingVertical: responsiveHeight(0.5),
    borderRadius: 8,
    marginBottom: responsiveHeight(1.2),
  },
  categoryBadgeText: {
    fontSize: responsiveFontSize(1.4),
    color: AppColors.black,
    fontWeight: '600',
  },
  eventTitleHeadingText: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: '700',
    color: AppColors.black,
  },
  cardBodyMetaContentBlock: { padding: responsiveWidth(5) },
  metaInformationFlexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(1.8),
  },
  metaInlineIconAsset: {
    width: responsiveWidth(4.5),
    height: responsiveWidth(4.5),
    resizeMode: 'contain',
    tintColor: '#9CA3AF',
    marginRight: responsiveWidth(3.5),
  },
  metaTextValueStyle: {
    fontSize: responsiveFontSize(1.7),
    color: '#4A5568',
    fontWeight: '500',
  },
  locationLabelsColumnContainer: { flex: 1 },
  locationSubAddressTypographyText: {
    fontSize: responsiveFontSize(1.4),
    color: '#71717A',
    fontWeight: '400',
    marginTop: responsiveHeight(0.3),
  },
  cardInnerHorizontalDividerLine: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: responsiveHeight(1.5),
  },
  cardActionSuiteButtonsRowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(0.5),
  },
  previewActionTriggerButtonElement: {
    flexDirection: 'row',
    backgroundColor: AppColors.primary,
    height: 46,
    borderRadius: 12,
    alignItems: 'center',
    justifyYontent: 'center',
    justifyContent: 'center',
    width: '40%',
  },
  previewButtonLabelText: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '600',
    color: AppColors.black,
  },
  btnActionAssetIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginRight: responsiveWidth(1.5),
    tintColor: AppColors.black,
  },
  editActionTriggerButtonElement: {
    flexDirection: 'row',
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    height: 46,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
  },
  editButtonLabelText: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '600',
    color: AppColors.black,
  },
  deleteActionIconButtonFrame: {
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    width: 46,
    height: 46,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trashIconAssetItem: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: AppColors.red,
  },
  buttonMainView: {
    position: 'absolute',
    bottom: responsiveHeight(3),
    left: responsiveWidth(9),
    right: responsiveWidth(9),
    backgroundColor: 'transparent',
  },
  createNewEventButton: {
    flexDirection: 'row',
    backgroundColor: AppColors.secondary,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  plusButtonIconAsset: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    marginRight: responsiveWidth(2),
    tintColor: AppColors.black,
  },
  createNewEventButtonLabel: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '600',
    color: AppColors.black,
  },
  emptyComponentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '500',
    color: AppColors.black,
    fontStyle: 'italic',
  },
});

export default Events;
