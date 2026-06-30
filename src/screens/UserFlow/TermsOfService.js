import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
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

const TermsOfService = ({ navigation }) => {
  return (
    <ScreenWrapper>
      <View style={styles.masterFlexContainer}>
        {/* Navigation Control Header Bar */}
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

        {/* Brand Metadata Stack Identity Section */}
        <View style={styles.identityTitleAndBadgeRow}>
          <View style={styles.textColumnContext}>
            <Text style={styles.mainTitleHeadingText}>Terms of Service</Text>
            <View style={styles.metaUpdateDateInlineRow}>
              <Image
                source={AppImages.calendar}
                style={styles.calendarMiniGlyphSymbol}
              />
              <Text style={styles.subTitleDescriptionText}>
                Last updated: January 26, 2026
              </Text>
            </View>
          </View>
          <View style={styles.badgeIconSquareContainer}>
            <Image
              source={AppImages.doc}
              style={styles.headerRightBadgeIconSymbol}
            />
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContentLayoutContainer}
        >
          {/* White Structured Main Card Frame Panel */}
          <View style={styles.termsCardContainerSurface}>
            {/* Section 1 */}
            <View style={styles.clauseParagraphBlockGroup}>
              <Text style={styles.clauseSectionHeadingLabelTitle}>
                1. Acceptance of Terms
              </Text>
              <Text style={styles.clauseBodyTextDescription}>
                By accessing and using the Wedding Planner App ("the App"), you
                accept and agree to be bound by the terms and provisions of this
                agreement. If you do not agree to these terms, please do not use
                the App.
              </Text>
            </View>

            {/* Section 2 */}
            <View style={styles.clauseParagraphBlockGroup}>
              <Text style={styles.clauseSectionHeadingLabelTitle}>
                2. User Account
              </Text>
              <Text style={styles.clauseBodyTextDescription}>
                You are responsible for maintaining the confidentiality of your
                account and password. You agree to accept responsibility for all
                activities that occur under your account. You must notify us
                immediately of any unauthorized use of your account.
              </Text>
            </View>

            {/* Section 3 */}
            <View style={styles.clauseParagraphBlockGroup}>
              <Text style={styles.clauseSectionHeadingLabelTitle}>
                3. Vendor Services
              </Text>
              <Text style={styles.clauseBodyTextDescription}>
                The App provides a platform to connect with vendors. We are not
                responsible for the quality, timing, or legality of vendor
                services. All agreements are between you and the vendor. We
                recommend reviewing vendor credentials and obtaining written
                contracts.
              </Text>
            </View>

            {/* Section 4 */}
            <View style={styles.clauseParagraphBlockGroup}>
              <Text style={styles.clauseSectionHeadingLabelTitle}>
                4. Payment and Fees
              </Text>
              <Text style={styles.clauseBodyTextDescription}>
                Basic use of the App is free. Premium features may require
                payment. All fees are non-refundable unless otherwise stated.
                Payments to vendors are separate transactions and not processed
                through the App unless explicitly stated.
              </Text>
            </View>

            {/* Section 5 */}
            <View style={styles.clauseParagraphBlockGroup}>
              <Text style={styles.clauseSectionHeadingLabelTitle}>
                5. Privacy
              </Text>
              <Text style={styles.clauseBodyTextDescription}>
                Your privacy is important to us. Please review our Privacy
                Policy to understand how we collect, use, and protect your
                personal information.
              </Text>
            </View>

            {/* Section 6 */}
            <View style={styles.clauseParagraphBlockGroup}>
              <Text style={styles.clauseSectionHeadingLabelTitle}>
                6. Contact Information
              </Text>
              <Text style={styles.clauseBodyTextDescription}>
                If you have questions about these Terms of Service, please
                contact us at:
              </Text>
              <View style={styles.contactDetailsSubMetaBlock}>
                <Text style={styles.contactDetailLineItemText}>
                  Email:{' '}
                  <Text style={styles.highlightedContactAnchor}>
                    legal@weddingplanner.app
                  </Text>
                </Text>
                <Text style={styles.contactDetailLineItemText}>
                  Phone: +1 (555) 123-4567
                </Text>
                <Text style={styles.contactDetailLineItemText}>
                  Address: 123 Wedding Lane, Love City, LC 12345
                </Text>
              </View>
            </View>
          </View>

          {/* Bottom Acknowledgment Subtext */}
          <View style={styles.bottomDisclosureFooterWrapper}>
            <Text style={styles.bottomDisclosureFooterLabelText}>
              By using this app, you acknowledge that you have read and
              understood these Terms of Service.
            </Text>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  masterFlexContainer: {
    flex: 1,
    paddingTop: responsiveHeight(4),
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
  identityTitleAndBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(9),
    marginBottom: responsiveHeight(3.5),
  },
  textColumnContext: {
    flex: 1,
  },
  mainTitleHeadingText: {
    fontSize: responsiveFontSize(3.6),
    fontWeight: '800',
    color: '#1A1C1E',
  },
  metaUpdateDateInlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveHeight(0.8),
  },
  calendarMiniGlyphSymbol: {
    width: responsiveWidth(4),
    height: responsiveWidth(4),
    resizeMode: 'contain',
    tintColor: '#555555',
    marginRight: responsiveWidth(1.5),
  },
  subTitleDescriptionText: {
    fontSize: responsiveFontSize(1.6),
    color: '#555555',
    fontWeight: '400',
  },
  badgeIconSquareContainer: {
    width: responsiveWidth(13),
    height: responsiveWidth(13),
    borderRadius: 14,
    backgroundColor: '#1A1C1E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRightBadgeIconSymbol: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
    resizeMode: 'contain',
    tintColor: AppColors.white,
  },
  scrollContentLayoutContainer: {
    paddingHorizontal: responsiveWidth(9),
    paddingBottom: responsiveHeight(6),
  },
  termsCardContainerSurface: {
    backgroundColor: AppColors.white,
    borderRadius: 24,
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(1),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F9F9F9',
  },
  clauseParagraphBlockGroup: {
    marginBottom: responsiveHeight(1),
  },
  clauseSectionHeadingLabelTitle: {
    fontSize: responsiveFontSize(2.1),
    fontWeight: '800',
    color: '#1A1C1E',
    marginBottom: responsiveHeight(1.2),
  },
  clauseBodyTextDescription: {
    fontSize: responsiveFontSize(1.6),
    color: '#4A4C50',
    lineHeight: responsiveFontSize(2.5),
    fontWeight: '400',
    textAlign: 'left',
  },
  contactDetailsSubMetaBlock: {
    marginTop: responsiveHeight(1.5),
    paddingLeft: responsiveWidth(1),
  },
  contactDetailLineItemText: {
    fontSize: responsiveFontSize(1.6),
    color: '#4A4C50',
    lineHeight: responsiveFontSize(2.6),
    fontWeight: '400',
    marginBottom: responsiveHeight(0.4),
  },
  highlightedContactAnchor: {
    color: '#1A1C1E',
    fontWeight: '500',
  },
  bottomDisclosureFooterWrapper: {
    marginTop: responsiveHeight(4),
    marginBottom: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(4),
    alignItems: 'center',
  },
  bottomDisclosureFooterLabelText: {
    fontSize: responsiveFontSize(1.4),
    color: '#9FA1A7',
    textAlign: 'center',
    lineHeight: responsiveFontSize(2.1),
    fontWeight: '400',
  },
});

export default TermsOfService;
