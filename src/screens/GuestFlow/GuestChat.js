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
import ScallopBackground from '../../components/ScallopBackground';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../utils/Responsive_Dimensions';
import { AppImages } from '../../assets/Images/Index';
import { AppColors } from '../../utils/AppColors';
import ScreenWrapper from '../../components/ScreenWrapper';

const GuestChat = ({ navigation, route }) => {
  const thread = route?.params?.thread;
  const senderName = thread?.sender || 'Guest';
  const initialMessage = thread?.text || '';

  const [typedMessage, setTypedMessage] = useState('');
  const flatListRef = useRef(null);

  // Seed chat with the blessing message that was tapped + a mock reply
  const [messagesStream, setMessagesStream] = useState([
    {
      id: '1',
      text: initialMessage || 'Hello! Congratulations on your wedding! 🎉',
      timestamp: thread?.time || '12:00 PM',
      sender: 'them',
    },
    {
      id: '2',
      text: 'Thank you so much! We really appreciate your kind words and blessings. 💕',
      timestamp: '12:05 PM',
      sender: 'me',
    },
    {
      id: '3',
      text: "Can't wait for the big day! Is there anything you'd like us to bring?",
      timestamp: '12:08 PM',
      sender: 'them',
    },
    {
      id: '4',
      text: 'Just your presence and lots of love! See you there! 🥂',
      timestamp: '12:10 PM',
      sender: 'me',
    },
  ]);

  const handleSendMessage = () => {
    if (typedMessage.trim().length === 0) return;

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const formattedTime = `${hours % 12 || 12}:${
      minutes < 10 ? '0' : ''
    }${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;

    const newMessage = {
      id: String(Date.now()),
      text: typedMessage.trim(),
      timestamp: formattedTime,
      sender: 'me',
    };

    setMessagesStream(prev => [...prev, newMessage]);
    setTypedMessage('');

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 120);
  };

  const renderMessageBubble = ({ item }) => {
    const isMe = item.sender === 'me';
    return (
      <View
        style={[
          styles.messageRow,
          isMe ? styles.myAlignRow : styles.theirAlignRow,
        ]}
      >
        <View
          style={[
            styles.bubbleBox,
            isMe ? styles.myBubbleColor : styles.theirBubbleColor,
          ]}
        >
          <Text
            style={[
              styles.bubbleText,
              isMe ? styles.myTextColor : styles.theirTextColor,
            ]}
          >
            {item.text}
          </Text>
        </View>
        <Text
          style={[
            styles.timestampText,
            isMe ? styles.myTimestampAlign : styles.theirTimestampAlign,
          ]}
        >
          {item.timestamp}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScreenWrapper>
        <View style={styles.outerContainer}>
          {/* Header with back button and name */}
          <View style={styles.headerRow}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
              style={styles.backCircle}
            >
              <Image source={AppImages.arrowLeft} style={styles.backArrowImg} />
            </TouchableOpacity>
            <Text style={styles.headerName} numberOfLines={1}>
              {senderName}
            </Text>
            <View style={styles.headerSpacer} />
          </View>

          <View style={styles.divider} />

          {/* Chat Messages FlatList */}
          <FlatList
            ref={flatListRef}
            data={messagesStream}
            keyExtractor={item => item.id}
            renderItem={renderMessageBubble}
            contentContainerStyle={styles.chatListContent}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: false })
            }
            ListFooterComponent={
              <View style={styles.typingRow}>
                <View style={styles.typingBubble}>
                  <Text style={styles.typingDots}>•••</Text>
                </View>
              </View>
            }
          />

          {/* Bottom Input Bar */}
          <View style={styles.bottomInputBar}>
            <View style={styles.leftMediaBtns}>
              <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
                <Image source={AppImages.upload} style={styles.mediaIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
                <Image source={AppImages.smile} style={styles.mediaIcon} />
              </TouchableOpacity>
            </View>

            <View style={styles.inputFieldWrapper}>
              <TextInput
                style={styles.textInputField}
                placeholder="Type a message..."
                placeholderTextColor="#9E9E9E"
                multiline
                value={typedMessage}
                onChangeText={setTypedMessage}
              />
            </View>

            <View style={styles.rightControlBtns}>
              <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
                <Image source={AppImages.mic} style={styles.mediaIcon} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.sendBtn}
                activeOpacity={0.8}
                onPress={handleSendMessage}
              >
                <Image source={AppImages.send} style={styles.sendIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScreenWrapper>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  outerContainer: {
    flex: 1,
    marginHorizontal: responsiveWidth(9),
    paddingTop: responsiveHeight(3),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    paddingBottom: responsiveHeight(1.5),
  },
  backCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrowImg: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
  },
  headerName: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '700',
    color: AppColors.black,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  headerSpacer: {
    width: 36,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: responsiveHeight(1),
  },
  chatListContent: {
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(1),
  },
  messageRow: {
    marginBottom: responsiveHeight(1.8),
    maxWidth: '82%',
  },
  theirAlignRow: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  myAlignRow: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  bubbleBox: {
    borderRadius: 18,
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.4),
    borderWidth: 1,
  },
  theirBubbleColor: {
    backgroundColor: '#FFFFFF',
    borderColor: '#EFEFEF',
    borderBottomLeftRadius: 4,
  },
  myBubbleColor: {
    backgroundColor: AppColors.secondary,
    borderColor: 'transparent',
    borderBottomRightRadius: 4,
  },
  bubbleText: {
    fontSize: responsiveFontSize(1.6),
    lineHeight: responsiveFontSize(2.2),
  },
  theirTextColor: {
    color: AppColors.black,
  },
  myTextColor: {
    color: AppColors.black,
  },
  timestampText: {
    fontSize: responsiveFontSize(1.25),
    color: '#9E9E9E',
    marginTop: responsiveHeight(0.5),
    paddingHorizontal: responsiveWidth(2),
  },
  theirTimestampAlign: {
    textAlign: 'left',
  },
  myTimestampAlign: {
    textAlign: 'right',
  },
  typingRow: {
    alignSelf: 'flex-start',
    marginTop: responsiveHeight(0.5),
    marginBottom: responsiveHeight(1),
  },
  typingBubble: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 14,
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(0.6),
  },
  typingDots: {
    fontSize: responsiveFontSize(1.8),
    color: '#9E9E9E',
    letterSpacing: 1,
  },
  bottomInputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingTop: responsiveHeight(1),
    paddingBottom: responsiveHeight(0.5),
    width: '100%',
  },
  leftMediaBtns: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightControlBtns: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    width: responsiveWidth(8),
    height: responsiveWidth(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: responsiveWidth(0.5),
  },
  mediaIcon: {
    height: responsiveHeight(5),
    width: responsiveWidth(5),
    resizeMode: 'contain',
  },
  inputFieldWrapper: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    paddingVertical: responsiveHeight(0.5),
    paddingHorizontal: responsiveWidth(3),
    marginHorizontal: responsiveWidth(1),
    maxHeight: responsiveHeight(10),
    justifyContent: 'center',
  },
  textInputField: {
    fontSize: responsiveFontSize(1.55),
    color: AppColors.black,
    paddingVertical:
      Platform.OS === 'ios' ? responsiveHeight(0.8) : responsiveHeight(0.4),
    paddingHorizontal: 0,
  },
  sendBtn: {
    backgroundColor: AppColors.primary,
    width: responsiveWidth(9),
    height: responsiveWidth(9),
    borderRadius: responsiveWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: responsiveWidth(1),
  },
  sendIcon: {
    height: responsiveHeight(4),
    width: responsiveWidth(4),
    tintColor: AppColors.white,
    resizeMode: 'contain',
  },
});

export default GuestChat;
