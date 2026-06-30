import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
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

const PrivacyPolicy = ({ navigation }) => {
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

        {/* Header Metadata Section */}
        <View style={styles.identityTitleAndBadgeRow}>
          <View style={styles.textColumnContext}>
            <Text style={styles.mainTitleHeadingText}>Privacy Policy</Text>
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
              source={AppImages.shield}
              style={styles.headerRightBadgeIconSymbol}
            />
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContentLayoutContainer}
        >
          {/* Main Content White Surface Panel */}
          <View style={styles.policyCardContainerSurface}>
            {/* Section 1: Information We Collect */}
            <View style={styles.clauseParagraphBlockGroup}>
              <Text style={styles.clauseSectionHeadingLabelTitle}>
                1. Information We Collect
              </Text>
              <Text style={styles.clauseBodyTextDescription}>
                We collect information that you provide directly to us,
                including:
              </Text>

              {/* Nested Content Bullets Stack */}
              <View style={styles.bulletListStackContainer}>
                <Text style={styles.bulletPointLineItem}>
                  • Account information (names, email, phone number)
                </Text>
                <Text style={styles.bulletPointLineItem}>
                  • Wedding details (date, venue, guest count, budget)
                </Text>

                {/* Secondary Indented Nested Bullets */}
                <View style={styles.nestedSubBulletContainer}>
                  <Text style={styles.bulletPointLineItem}>
                    - Photos and media files you upload
                  </Text>
                  <Text style={styles.bulletPointLineItem}>
                    - Guest lists and contact information
                  </Text>
                </View>

                <Text style={styles.bulletPointLineItem}>
                  • Payment information for premium features
                </Text>
                <Text style={styles.bulletPointLineItem}>
                  • Communications with vendors through the app
                </Text>
              </View>
            </View>

            {/* Section 2: Data Retention */}
            <View style={styles.clauseParagraphBlockGroup}>
              <Text style={styles.clauseSectionHeadingLabelTitle}>
                2. Data Retention
              </Text>
              <Text style={styles.clauseBodyTextDescription}>
                We retain your information for as long as your account is active
                or as needed to provide services. You can request deletion of
                your data at any time through Settings. Some information may be
                retained for legal or operational purposes even after deletion.
              </Text>
            </View>

            {/* Section 3: Changes to Privacy Policy */}
            <View style={styles.clauseParagraphBlockGroup}>
              <Text style={styles.clauseSectionHeadingLabelTitle}>
                3. Changes to Privacy Policy
              </Text>
              <Text style={styles.clauseBodyTextDescription}>
                We may update this privacy policy from time to time. We will
                notify you of any material changes via email or in-app
                notification. Your continued use of the app after changes
                indicates acceptance of the updated policy.
              </Text>
            </View>

            {/* Section 4: Contact Us */}
            <View style={styles.clauseParagraphBlockGroup}>
              <Text style={styles.clauseSectionHeadingLabelTitle}>
                4. Contact Us
              </Text>
              <Text style={styles.clauseBodyTextDescription}>
                If you have questions about this Privacy Policy or our data
                practices, please contact us at:
              </Text>
              <View style={styles.contactDetailsSubMetaBlock}>
                <Text style={styles.contactDetailLineItemText}>
                  Email:{' '}
                  <Text style={styles.highlightedContactAnchor}>
                    privacy@weddingplanner.app
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
              understood this Privacy Policy.
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
    width: responsiveWidth(5.5),
    height: responsiveWidth(5.5),
    resizeMode: 'contain',
    tintColor: AppColors.white,
  },
  scrollContentLayoutContainer: {
    paddingHorizontal: responsiveWidth(9),
    paddingBottom: responsiveHeight(6),
  },
  policyCardContainerSurface: {
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
  },
  bulletListStackContainer: {
    marginTop: responsiveHeight(1),
    paddingLeft: responsiveWidth(2),
  },
  bulletPointLineItem: {
    fontSize: responsiveFontSize(1.6),
    color: '#4A4C50',
    lineHeight: responsiveFontSize(2.6),
    marginBottom: responsiveHeight(0.6),
    fontWeight: '400',
  },
  nestedSubBulletContainer: {
    paddingLeft: responsiveWidth(5),
    marginVertical: responsiveHeight(0.2),
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

export default PrivacyPolicy;
