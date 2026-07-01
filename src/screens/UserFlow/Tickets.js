import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import * as Progress from 'react-native-progress';
import Text from '../../components/CustomText';
import ScreenWrapper from '../../components/ScreenWrapper';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../utils/Responsive_Dimensions';
import { AppColors } from '../../utils/AppColors';
import { AppImages } from '../../assets/Images/Index';
import CreatePassModal from '../../components/Modals/CreatePassModal';

const Tickets = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const ticketsSold = 35;
  const totalTickets = 50;
  const ticketPrice = 150;
  const remainingPasses = totalTickets - ticketsSold;
  const progressRatio = ticketsSold / totalTickets;

  const handleCreatePassType = data => {
    console.log('New Ticket Form Formulated Object Payload: ', data);
    setModalVisible(false); // Close modal on submit trigger success action
  };

  return (
    <ScreenWrapper>
      <View style={styles.mainLayoutContainer}>
        {/* Navigation Action Row & Home Icon Shortcut */}
        <View style={styles.navigationHeaderActionFlexRow}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.backButtonTriggerInline}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={AppImages.arrowLeft}
              style={styles.backArrowAssetIcon}
            />
            <Text style={styles.backButtonLabelTextText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.homeCircleIconActionButton}
            onPress={() => navigation.navigate('UserFlow', { screen: 'Home' })}
          >
            <Image source={AppImages.home} style={styles.homeAssetIcon} />
          </TouchableOpacity>
        </View>

        {/* Header Display Info Blocks */}
        <View style={styles.screenHeaderTitleBlock}>
          <Text style={styles.screenMainTitleText}>Wedding Admission</Text>
          <Text style={styles.screenSubTitleText}>
            Manage wedding admission passes
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContentLayoutStream}
        >
          {/* Core Ticket Pill Label Accent Header */}
          <View style={styles.ticketPillLabelBadgeRow}>
            <Image source={AppImages.ticket} style={styles.ticketIcon} />
            <Text style={styles.ticketPillLabelText}>Wedding Pass</Text>
          </View>

          {/* Main Core Ticket Information Tracking Analytics Card */}
          <View style={styles.admissionTrackingCardElement}>
            {/* Header Content Group Label Row */}
            <View style={styles.metaLabelRow}>
              <Text style={styles.ticketCategoryBoldTitle}>Free</Text>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.soldTextLabelSubtitle}>Sold</Text>
                <Text style={styles.soldNumericalMetricsCount}>
                  {ticketsSold}{' '}
                  <Text style={{ color: '#666666', fontWeight: '400' }}>
                    / {totalTickets}
                  </Text>
                </Text>
              </View>
            </View>

            {/* Price Value Parameter Text Label Block */}
            <Text style={styles.ticketPriceMetricsHighlight}>
              $ {ticketPrice}
            </Text>

            {/* react-native-progress Implementation */}
            <View style={styles.progressWrapper}>
              <Progress.Bar
                progress={progressRatio}
                width={null}
                height={responsiveHeight(1)}
                color={AppColors.secondary}
                unfilledColor="#F3EFEA"
                borderWidth={0}
                borderRadius={5}
              />
            </View>

            {/* Inventory Count Tracking Status Block */}
            <Text style={styles.remainingPassesCountText}>
              {remainingPasses} passes remaining
            </Text>

            {/* Action Dynamic Trigger Component: Share Pass Link Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.sharePassLinkActionTrigger}
              onPress={() => console.log('Link shared internally')}
            >
              <Image source={AppImages.share} style={styles.shareIcon} />
              <Text style={styles.sharePassButtonTextLabel}>
                Share Ticket Link
              </Text>
            </TouchableOpacity>

            <Text style={styles.shareInstructionalTextDescription}>
              Share this pass link with all guests via text or email.
            </Text>
          </View>

          {/* Action Dynamic Trigger Component: Create New Custom Pass Setup Block */}
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.createNewPassActionOutlineCard}
            onPress={() => setModalVisible(true)} // Toggles state view dynamic layout active array modal stack
          >
            <Image source={AppImages.plus} style={styles.plusIcon} />
            <Text style={styles.createNewPassButtonTextLabel}>
              Create New Pass Type
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Decoupled Sub-Modal Component Injector Interface */}
        <CreatePassModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onCreate={handleCreatePassType}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  mainLayoutContainer: {
    flex: 1,
    backgroundColor: AppColors.white,
    paddingHorizontal: responsiveWidth(9),
    paddingTop: responsiveHeight(4),
  },
  navigationHeaderActionFlexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
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
  },
  backButtonLabelTextText: {
    fontSize: responsiveFontSize(2),
    color: '#333333',
    fontWeight: '600',
  },
  homeCircleIconActionButton: {
    width: responsiveWidth(11),
    height: responsiveWidth(11),
    borderRadius: responsiveWidth(5.5),
    backgroundColor: '#262626',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeAssetIcon: {
    width: responsiveWidth(5),
    height: responsiveWidth(5),
    resizeMode: 'contain',
    tintColor: AppColors.primary,
  },
  screenHeaderTitleBlock: {
    marginBottom: responsiveHeight(3.5),
  },
  screenMainTitleText: {
    fontSize: responsiveFontSize(2.8),
    fontWeight: 'bold',
    color: AppColors.black,
  },
  screenSubTitleText: {
    fontSize: responsiveFontSize(1.5),
    color: '#555555',
    fontWeight: '400',
    marginTop: responsiveHeight(0.5),
  },
  scrollContentLayoutStream: {
    paddingBottom: responsiveHeight(4),
  },
  ticketPillLabelBadgeRow: {
    height: 50,
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: AppColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsiveHeight(3.5),
  },
  ticketIcon: {
    width: responsiveWidth(4.5),
    height: responsiveHeight(4.5),
    resizeMode: 'contain',
    tintColor: AppColors.black,
    marginRight: responsiveWidth(2),
  },
  ticketPillLabelText: {
    fontSize: responsiveFontSize(1.9),
    fontWeight: '400',
    color: AppColors.black,
  },
  admissionTrackingCardElement: {
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 22,
    padding: responsiveWidth(5),
    shadowColor: AppColors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: responsiveHeight(2.5),
  },
  metaLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  ticketCategoryBoldTitle: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: 'bold',
    color: AppColors.black,
  },
  soldTextLabelSubtitle: {
    fontSize: responsiveFontSize(1.6),
    color: '#8A8A8F',
    fontWeight: '400',
    marginBottom: responsiveHeight(0.2),
  },
  soldNumericalMetricsCount: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '600',
    color: AppColors.black,
  },
  ticketPriceMetricsHighlight: {
    fontSize: responsiveFontSize(4),
    fontWeight: '700',
    color: AppColors.primary,
    marginBottom: responsiveHeight(1.5),
  },
  progressWrapper: {
    marginBottom: responsiveHeight(1.2),
    marginTop: responsiveHeight(0.5),
  },
  remainingPassesCountText: {
    fontSize: responsiveFontSize(1.6),
    color: '#777777',
    fontWeight: '400',
    marginBottom: responsiveHeight(2.5),
  },
  sharePassLinkActionTrigger: {
    flexDirection: 'row',
    backgroundColor: AppColors.primary,
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsiveHeight(1.5),
  },
  shareIcon: {
    width: responsiveWidth(4),
    height: responsiveWidth(4),
    resizeMode: 'contain',
    marginRight: responsiveWidth(2),
  },
  sharePassButtonTextLabel: {
    fontSize: responsiveFontSize(1.9),
    fontWeight: '400',
    color: AppColors.black,
  },
  shareInstructionalTextDescription: {
    fontSize: responsiveFontSize(1.5),
    color: '#666666',
    textAlign: 'center',
    lineHeight: responsiveFontSize(2.2),
    alignSelf: 'center',
    width: '75%',
  },
  createNewPassActionOutlineCard: {
    flexDirection: 'row',
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 14,
    paddingVertical: responsiveHeight(1.8),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(1),
  },
  createNewPassButtonTextLabel: {
    fontSize: responsiveFontSize(1.5),
    fontWeight: '400',
    color: AppColors.black,
  },
  plusIcon: {
    width: responsiveWidth(4),
    height: responsiveWidth(4),
    resizeMode: 'contain',
    marginRight: responsiveWidth(1),
  },
});

export default Tickets;
