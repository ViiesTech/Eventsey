import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Linking,
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

// Accordion Item Component for Handling Collapsible State
const FAQAccordionItem = ({ question, answer }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={styles.faqRowCardSurface}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.faqHeaderTriggerRow}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Text style={styles.faqQuestionTextLabel}>{question}</Text>
        <Image
          source={AppImages.arrowRight}
          style={[
            styles.chevronVectorGlyphIcon,
            isExpanded && { transform: [{ rotate: '90deg' }] },
          ]}
        />
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.faqExpandedContentBodyPanel}>
          <Text style={styles.faqAnswerTextDescription}>
            {answer ||
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Setup details can be customized as per backend API response strings.'}
          </Text>
        </View>
      )}
    </View>
  );
};

const HelpAndSupport = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Static Structured Array for Categories and FAQ Data Matching Image Layout
  const faqDataSchema = [
    {
      category: 'Getting Started',
      items: [
        { id: 'gs1', question: 'How do I create my wedding profile?' },
        { id: 'gs2', question: 'Can I have multiple events for my wedding?' },
      ],
    },
    {
      category: 'Budget & Planning',
      items: [
        { id: 'bp1', question: 'How does the budget tracker work?' },
        { id: 'bp2', question: 'Can I share my to-do list with my partner?' },
      ],
    },
    {
      category: 'Guests & Invitations',
      items: [
        { id: 'gi1', question: 'How do I send invitations to guests?' },
        { id: 'gi2', question: 'Can guests RSVP through the app?' },
      ],
    },
    {
      category: 'Vendors & Jobs',
      items: [
        { id: 'vj1', question: 'How do I hire vendors?' },
        { id: 'vj2', question: 'Is there a fee for posting jobs?' },
      ],
    },
    {
      category: 'Media & Gallery',
      items: [
        { id: 'mg1', question: 'How do I add photos to my wedding gallery?' },
      ],
    },
    {
      category: 'Account & Privacy',
      items: [{ id: 'ap1', question: 'How do I delete my wedding data?' }],
    },
  ];

  const handleLiveChat = () => {
    console.log('Initialize Live Chat Support SDK Flow');
  };

  const handleEmailUs = () => {
    Linking.openURL('mailto:support@wedding.app');
  };

  const handlePhoneCall = () => {
    Linking.openURL('tel:+15551234567');
  };

  const handleExternalHelpCenter = () => {
    Linking.openURL('https://wedding.app/help');
  };

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

        {/* Brand/Identity Metadata Stack Section */}
        <View style={styles.identityTitleAndBadgeRow}>
          <View style={styles.textColumnContext}>
            <Text style={styles.mainTitleHeadingText}>Help & Support</Text>
            <Text style={styles.subTitleDescriptionText}>
              We're here to help you
            </Text>
          </View>
          <View style={styles.badgeIconSquareContainer}>
            <Image
              source={AppImages.question}
              style={styles.headerRightBadgeIconSymbol}
            />
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContentLayoutContainer}
        >
          {/* Dynamic Search Box Input Component Wrapper */}
          <View style={styles.searchBarContainerBoxField}>
            <Image
              source={AppImages.search}
              style={styles.searchBarVectorIconMagnifier}
            />
            <TextInput
              style={styles.searchBarInputElement}
              placeholder="Search for help..."
              placeholderTextColor="#A0A0A5"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Dual Multi-Channel Cards Row Block */}
          <View style={styles.communicationMediumsFlexRow}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.mediumCardInteractiveContainer}
              onPress={handleLiveChat}
            >
              <View
                style={[
                  styles.mediumCircularIconFrame,
                  { backgroundColor: '#FCECE9' },
                ]}
              >
                <Image
                  source={AppImages.chat}
                  style={[
                    styles.mediumVectorIconGlyph,
                    { tintColor: AppColors.primary },
                  ]}
                />
              </View>
              <Text style={styles.mediumPrimaryLabelTitleText}>Live Chat</Text>
              <Text style={styles.mediumSecondaryLabelSubtitleText}>
                Chat with us
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.mediumCardInteractiveContainer}
              onPress={handleEmailUs}
            >
              <View
                style={[
                  styles.mediumCircularIconFrame,
                  { backgroundColor: '#E9ECF7' },
                ]}
              >
                <Image
                  source={AppImages.email}
                  style={[
                    styles.mediumVectorIconGlyph,
                    { tintColor: '#5B72C7' },
                  ]}
                />
              </View>
              <Text style={styles.mediumPrimaryLabelTitleText}>Email Us</Text>
              <Text style={styles.mediumSecondaryLabelSubtitleText}>
                support@wedding.app
              </Text>
            </TouchableOpacity>
          </View>

          {/* Phone Standalone Detailed Help Strip Panel */}
          <View style={styles.phoneSupportMasterContainerCard}>
            <View style={styles.phoneMetaRowDetailsFlex}>
              <View style={styles.phoneVectorGlyphContainerBackground}>
                <Image
                  source={AppImages.phone}
                  style={styles.phoneVectorGlyphIconSymbol}
                />
              </View>
              <View style={styles.phoneHoursMetaTextColumn}>
                <Text style={styles.phonePrimaryTitleLabelText}>
                  Phone Support
                </Text>
                <Text style={styles.phoneSecondarySubtitleHoursLabel}>
                  Mon-Fri, 9AM - 6PM EST
                </Text>
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.phoneTriggerPrimaryActionButtonControl}
              onPress={handlePhoneCall}
            >
              <Text style={styles.phoneActionBtnLabelText}>
                Call +1 (555) 123-4567
              </Text>
            </TouchableOpacity>
          </View>

          {/* Structural Header Divider Label Title */}
          <Text style={styles.frequentlyAskedHeadingSectionLabelTitle}>
            Frequently Asked Questions
          </Text>

          {/* Grouped Lists Map Assembly rendering target */}
          {faqDataSchema.map(group => (
            <View
              key={group.category}
              style={styles.faqCategoryGroupWrapperBlock}
            >
              <Text style={styles.faqCategorySectionHeaderTitleTextLabel}>
                {group.category}
              </Text>
              <View style={styles.faqCardStackBorderOutlineWrapper}>
                {group.items.map(item => (
                  <FAQAccordionItem
                    key={item.id}
                    question={item.question}
                    answer={item.answer}
                  />
                ))}
              </View>
            </View>
          ))}

          {/* Bottom Callout Frame Extension Redirection Anchor */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.externalHelpCenterRowActionContainerBar}
            onPress={handleExternalHelpCenter}
          >
            <View style={styles.externalLeftFlexContainerRow}>
              <Image
                source={AppImages.visit}
                style={styles.externalLinkVectorGlyphIndicatorIcon}
              />
              <Text style={styles.externalActionTitleLabelText}>
                Visit Help Center
              </Text>
            </View>
            <Image
              source={AppImages.arrowRight}
              style={styles.externalRightChevronArrowVectorIcon}
            />
          </TouchableOpacity>
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
    marginBottom: responsiveHeight(3),
  },
  textColumnContext: {
    flex: 1,
  },
  mainTitleHeadingText: {
    fontSize: responsiveFontSize(3.6),
    fontWeight: '800',
    color: AppColors.black,
  },
  subTitleDescriptionText: {
    fontSize: responsiveFontSize(1.8),
    color: '#555555',
    fontWeight: '400',
    marginTop: responsiveHeight(0.5),
  },
  badgeIconSquareContainer: {
    width: responsiveWidth(13),
    height: responsiveWidth(13),
    borderRadius: 14,
    backgroundColor: AppColors.black,
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
    paddingBottom: responsiveHeight(8),
  },
  searchBarContainerBoxField: {
    width: '100%',
    height: responsiveHeight(5.8),
    backgroundColor: AppColors.white,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(4),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: responsiveHeight(3.2),
  },
  searchBarVectorIconMagnifier: {
    width: responsiveWidth(4.5),
    height: responsiveWidth(4.5),
    resizeMode: 'contain',
    tintColor: '#9FA1A7',
    marginRight: responsiveWidth(3),
  },
  searchBarInputElement: {
    flex: 1,
    height: '100%',
    fontSize: responsiveFontSize(1.7),
    color: AppColors.black,
  },
  communicationMediumsFlexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsiveHeight(2.4),
  },
  mediumCardInteractiveContainer: {
    width: '47.5%',
    backgroundColor: '#FAF8F5',
    borderRadius: 16,
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(2.2),
  },
  mediumCircularIconFrame: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    borderRadius: responsiveWidth(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsiveHeight(1.5),
  },
  mediumVectorIconGlyph: {
    width: responsiveWidth(4.8),
    height: responsiveWidth(4.8),
    resizeMode: 'contain',
  },
  mediumPrimaryLabelTitleText: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: '700',
    color: AppColors.black,
    marginBottom: responsiveHeight(0.4),
  },
  mediumSecondaryLabelSubtitleText: {
    fontSize: responsiveFontSize(1.4),
    color: '#8E8E93',
    fontWeight: '400',
  },
  phoneSupportMasterContainerCard: {
    backgroundColor: AppColors.white,
    borderRadius: 20,
    padding: responsiveWidth(5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 3,
    marginBottom: responsiveHeight(4),
  },
  phoneMetaRowDetailsFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(2.2),
  },
  phoneVectorGlyphContainerBackground: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: responsiveWidth(3.5),
  },
  phoneVectorGlyphIconSymbol: {
    width: responsiveWidth(4.5),
    height: responsiveWidth(4.5),
    resizeMode: 'contain',
    tintColor: AppColors.black,
  },
  phoneHoursMetaTextColumn: {
    flex: 1,
  },
  phonePrimaryTitleLabelText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '700',
    color: AppColors.black,
  },
  phoneSecondarySubtitleHoursLabel: {
    fontSize: responsiveFontSize(1.4),
    color: '#8E8E93',
    marginTop: responsiveHeight(0.2),
  },
  phoneTriggerPrimaryActionButtonControl: {
    backgroundColor: AppColors.secondary,
    width: '100%',
    height: responsiveHeight(5.5),
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneActionBtnLabelText: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: '600',
    color: AppColors.black,
  },
  frequentlyAskedHeadingSectionLabelTitle: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: '800',
    color: AppColors.black,
    marginBottom: responsiveHeight(2.5),
  },
  faqCategoryGroupWrapperBlock: {
    marginBottom: responsiveHeight(3),
  },
  faqCategorySectionHeaderTitleTextLabel: {
    fontSize: responsiveFontSize(1.6),
    color: '#8E8E93',
    fontWeight: '500',
    marginBottom: responsiveHeight(1.2),
    marginLeft: responsiveWidth(1),
  },
  faqCardStackBorderOutlineWrapper: {
    backgroundColor: AppColors.white,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F2F2F2',
  },
  faqRowCardSurface: {
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    backgroundColor: AppColors.white,
  },
  faqHeaderTriggerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(4.5),
  },
  faqQuestionTextLabel: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '600',
    color: AppColors.black,
    flex: 1,
    paddingRight: responsiveWidth(2),
  },
  chevronVectorGlyphIcon: {
    width: responsiveWidth(3.8),
    height: responsiveWidth(3.8),
    resizeMode: 'contain',
    tintColor: '#8E8E93',
  },
  faqExpandedContentBodyPanel: {
    paddingHorizontal: responsiveWidth(4.5),
    paddingBottom: responsiveHeight(2),
    backgroundColor: '#FAFAFA',
  },
  faqAnswerTextDescription: {
    fontSize: responsiveFontSize(1.5),
    color: '#555555',
    lineHeight: responsiveFontSize(2.2),
  },
  externalHelpCenterRowActionContainerBar: {
    backgroundColor: AppColors.white,
    height: responsiveHeight(6.5),
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(5),
    marginTop: responsiveHeight(1.5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  externalLeftFlexContainerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  externalLinkVectorGlyphIndicatorIcon: {
    width: responsiveWidth(4.8),
    height: responsiveWidth(4.8),
    resizeMode: 'contain',
    tintColor: '#53D2C1',
    marginRight: responsiveWidth(3),
  },
  externalActionTitleLabelText: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: '600',
    color: AppColors.black,
  },
  externalRightChevronArrowVectorIcon: {
    width: responsiveWidth(4),
    height: responsiveWidth(4),
    resizeMode: 'contain',
    tintColor: '#C7C7CC',
  },
});

export default HelpAndSupport;
