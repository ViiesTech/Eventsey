import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Text from '../../components/CustomText';
import ScreenWrapper from '../../components/ScreenWrapper';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../utils/Responsive_Dimensions';
import { AppImages } from '../../assets/Images/Index';
import { AppColors } from '../../utils/AppColors';
import LogoHeader from '../../components/LogoHeader';

const UserChat = ({ navigation, route }) => {
  const [typedMessage, setTypedMessage] = useState('');
  const flatListRef = useRef(null);

  // Dynamic initialization fallback parameters mapping incoming parameters safely
  const clientName = route?.params?.thread?.name || 'Sarah & Johr';
  console.log('clientName:-', clientName);
  // Core structured logging mock dialogue sequence data directly from layout reference image
  const [messagesStream, setMessagesStream] = useState([
    {
      id: '1',
      text: "Hi! We're excited about the event.\nDo you have availability for our date?",
      timestamp: '10:30 AM',
      sender: 'client',
    },
    {
      id: '2',
      text: "Hello! Yes, I'm available for June 15th.\nI'd love to discuss the details with you.",
      timestamp: '10:32 AM',
      sender: 'vendor',
    },
    {
      id: '3',
      text: 'Great! Can we schedule a call to\ngo over the menu options?',
      timestamp: '10:35 AM',
      sender: 'client',
    },
    {
      id: '4',
      text: "Absolutely! I'm free tomorrow\nafternoon. What time works best for\nyou?",
      timestamp: '10:37 AM',
      sender: 'vendor',
    },
  ]);

  // Transmit action operational processing script
  const handleSendMessage = () => {
    if (typedMessage.trim().length === 0) return;

    const currentHours = new Date().getHours();
    const currentMinutes = new Date().getMinutes();
    const localizedTimeFormatted = `${currentHours % 12 || 12}:${
      currentMinutes < 10 ? '0' : ''
    }${currentMinutes} ${currentHours >= 12 ? 'PM' : 'AM'}`;

    const newlyCreatedMessageNode = {
      id: String(messagesStream.length + 1),
      text: typedMessage.trim(),
      timestamp: localizedTimeFormatted,
      sender: 'vendor',
    };

    setMessagesStream(prevData => [...prevData, newlyCreatedMessageNode]);
    setTypedMessage('');

    // Safely shift view focus timeline layout parameters downwards instantly
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 120);
  };

  const renderMessageBubble = ({ item }) => {
    const isVendor = item.sender === 'vendor';
    return (
      <View
        style={[
          styles.messageRowGroupContainer,
          isVendor ? styles.vendorAlignRow : styles.clientAlignRow,
        ]}
      >
        <View
          style={[
            styles.bubbleBaseLayerBox,
            isVendor
              ? styles.vendorBubbleStyleColor
              : styles.clientBubbleStyleColor,
          ]}
        >
          <Text
            style={[
              styles.bubbleTextContentParagraph,
              isVendor ? styles.vendorTextFontFill : styles.clientTextFontFill,
            ]}
          >
            {item.text}
          </Text>
        </View>
        <Text
          style={[
            styles.timestampLabelMarkerText,
            isVendor
              ? styles.vendorTimestampTextAlignment
              : styles.clientTimestampTextAlignment,
          ]}
        >
          {item.timestamp}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardViewportRootContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScreenWrapper>
        <View style={styles.contentContainer}>
          <LogoHeader goBack title="Messages" />

          <View style={{ flex: 1 }}>
            {/* Persistent Dynamic Direct Active Entity Identity Header Label Segment */}
            <View style={styles.clientIdentityTitleHeaderBox}>
              <Text style={styles.clientHeaderNameText}>{clientName}</Text>
              <View style={styles.horizontalDivisionBoundaryLineBreak} />
            </View>

            {/* Scrollable Conversation Feed Node Area */}
            <FlatList
              ref={flatListRef}
              data={messagesStream}
              keyExtractor={item => item.id}
              renderItem={renderMessageBubble}
              contentContainerStyle={
                styles.dialogueListContentScrollAreaContainer
              }
              showsVerticalScrollIndicator={false}
              onContentSizeChange={() =>
                flatListRef.current?.scrollToEnd({ animated: false })
              }
              ListFooterComponent={
                /* Typing State Indicator Icon Wrapper Placeholder */
                <View style={styles.clientTypingStateIndicatorWrapperRow}>
                  <View style={styles.typingIndicatorBubbleFrameCapsule}>
                    <Text style={styles.typingIndicatorEllipsisGraphemeSpan}>
                      •••
                    </Text>
                  </View>
                </View>
              }
            />

            {/* Action Input Bottom Command Panel Console Dock */}
            <View style={styles.bottomControlBarConsoleRowWrapper}>
              <View style={styles.mediaUtilityButtonsClusterGroup}>
                <TouchableOpacity
                  style={styles.circularFormAccessoryIconButton}
                  activeOpacity={0.7}
                >
                  <Image
                    source={AppImages.upload}
                    style={styles.utilityMediaIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.circularFormAccessoryIconButton}
                  activeOpacity={0.7}
                >
                  <Image
                    source={AppImages.smile}
                    style={styles.utilityMediaIcon}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.inputTextFieldMasterWrapperBox}>
                <TextInput
                  style={styles.textInputConsoleFieldInstance}
                  placeholder="Type a message..."
                  placeholderTextColor="#9E9E9E"
                  multiline
                  value={typedMessage}
                  onChangeText={setTypedMessage}
                />
              </View>

              <View style={styles.rightSideInteractiveControlsGroup}>
                <TouchableOpacity
                  style={styles.circularFormAccessoryIconButton}
                  activeOpacity={0.7}
                >
                  <Image
                    source={AppImages.mic}
                    style={styles.utilityMediaIcon}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.brandActionButtonColorCapsuleTileButton}
                  activeOpacity={0.8}
                  onPress={handleSendMessage}
                >
                  <Image source={AppImages.send} style={styles.sendIcon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScreenWrapper>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardViewportRootContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: responsiveWidth(9),
    paddingTop: responsiveHeight(3),
    paddingBottom: responsiveHeight(1),
  },
  clientIdentityTitleHeaderBox: {
    alignItems: 'center',
    width: '100%',
    marginTop: responsiveHeight(1.5),
  },
  clientHeaderNameText: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '600',
    color: AppColors.black,
    marginBottom: responsiveHeight(1.2),
  },
  horizontalDivisionBoundaryLineBreak: {
    width: '100%',
    height: 1,
    backgroundColor: AppColors.black,
    opacity: 0.8,
  },
  dialogueListContentScrollAreaContainer: {
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(1),
  },
  messageRowGroupContainer: {
    marginBottom: responsiveHeight(2),
    maxWidth: '82%',
  },
  clientAlignRow: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  vendorAlignRow: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  bubbleBaseLayerBox: {
    borderRadius: 18,
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.4),
    borderWidth: 1,
  },
  clientBubbleStyleColor: {
    backgroundColor: '#FFFFFF',
    borderColor: '#EFEFEF',
    borderBottomLeftRadius: 4,
  },
  vendorBubbleStyleColor: {
    backgroundColor: '#8ADED5', // Standard core theme primary accent matching your visual application layout context
    borderColor: 'transparent',
    borderBottomRightRadius: 4,
  },
  bubbleTextContentParagraph: {
    fontSize: responsiveFontSize(1.6),
    lineHeight: responsiveFontSize(2.2),
  },
  clientTextFontFill: {
    color: AppColors.black,
  },
  vendorTextFontFill: {
    color: '#1A2E2B',
  },
  timestampLabelMarkerText: {
    fontSize: responsiveFontSize(1.25),
    color: '#9E9E9E',
    marginTop: responsiveHeight(0.6),
    paddingHorizontal: responsiveWidth(2),
  },
  clientTimestampTextAlignment: {
    textAlign: 'left',
  },
  vendorTimestampTextAlignment: {
    textAlign: 'right',
  },
  clientTypingStateIndicatorWrapperRow: {
    alignSelf: 'flex-start',
    marginTop: responsiveHeight(0.5),
    marginBottom: responsiveHeight(1),
  },
  typingIndicatorBubbleFrameCapsule: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 14,
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(0.6),
  },
  typingIndicatorEllipsisGraphemeSpan: {
    fontSize: responsiveFontSize(1.8),
    color: '#9E9E9E',
    letterSpacing: 1,
  },
  bottomControlBarConsoleRowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingTop: responsiveHeight(1.5),
    width: '100%',
  },
  mediaUtilityButtonsClusterGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSideInteractiveControlsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circularFormAccessoryIconButton: {
    width: responsiveWidth(8),
    height: responsiveWidth(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: responsiveWidth(1),
  },
  utilityMediaIcon: {
    height: responsiveHeight(5),
    width: responsiveWidth(5),
    resizeMode: 'contain',
  },
  inputTextFieldMasterWrapperBox: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    paddingVertical: responsiveHeight(0.5),
    paddingHorizontal: responsiveWidth(3),
    marginHorizontal: responsiveWidth(1),
    maxHeight: responsiveHeight(10),
    justifyContent: 'center',
  },
  textInputConsoleFieldInstance: {
    fontSize: responsiveFontSize(1.55),
    color: AppColors.black,
    paddingVertical:
      Platform.OS === 'ios' ? responsiveHeight(0.8) : responsiveHeight(0.4),
    paddingHorizontal: 0,
  },
  brandActionButtonColorCapsuleTileButton: {
    backgroundColor: AppColors.primary,
    width: responsiveWidth(9),
    height: responsiveWidth(9),
    borderRadius: responsiveWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: responsiveWidth(1.5),
  },
  sendIcon: {
    height: responsiveHeight(4),
    width: responsiveWidth(4),
    tintColor: AppColors.white,
    resizeMode: 'contain',
  },
});

export default UserChat;
