import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppImages } from '../assets/Images/Index';
import { responsiveWidth } from '../utils/Responsive_Dimensions';
import { AppColors } from '../utils/AppColors';

const ScreenWrapper = ({
  children,
  backgroundColor = AppColors.white,
  scrollable = false,
  contentContainerStyle,
}) => {
  const insets = useSafeAreaInsets();
  const IOS = Platform.OS === 'ios';

  // Padding sirf top/bottom notch aur status bar se content bachane ke liye
  // Horizontal padding 0 hai taaki content corners ke andar tak maze se bleed kare!
  const paddingStyle = {
    paddingTop: IOS
      ? responsiveWidth(1)
      : Math.max(insets.top, responsiveWidth(4)),
    paddingBottom: IOS
      ? responsiveWidth(1)
      : Math.max(insets.bottom, responsiveWidth(4)),
  };

  return (
    <View style={styles.mainOuterContainer}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* LAYER 1: Interactive Content (Yeh peeche full-screen chalega) */}
      <View style={[styles.contentLayer, { backgroundColor }]}>
        {scrollable ? (
          <KeyboardAvoidingView
            style={styles.flexOne}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <ScrollView
              style={styles.flexOne}
              contentContainerStyle={[
                paddingStyle,
                styles.contentContainer,
                contentContainerStyle,
              ]}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>
          </KeyboardAvoidingView>
        ) : (
          <View style={[styles.staticContainer, paddingStyle]}>{children}</View>
        )}
      </View>

      {/* LAYER 2: Absolute Scallop Frame Overlay (Sabse upar) */}
      {/* pointerEvents="none" ka matlab hai user clicks directly text/buttons par lagenge */}
      <View style={styles.frameOverlay} pointerEvents="none">
        <Image
          source={AppImages.bgImage2}
          style={styles.frameImage}
          resizeMode="stretch"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainOuterContainer: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  contentContainer: {
    flexGrow: 1,
  },
  contentLayer: {
    ...StyleSheet.absoluteFill,
    zIndex: 1, // Content peeche hai lekin isko full width/height mili hui hai
  },
  staticContainer: {
    flex: 1,
  },
  flexOne: {
    flex: 1,
  },
  frameOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'transparent',
    zIndex: 99, // Hamesha content ke upar mask/overlay look dene ke liye
  },
  frameImage: {
    width: '100%',
    height: '100%',
  },
});

export default ScreenWrapper;
