import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppImages } from '../../../assets/Images/Index';

const SplashScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* 1. Scrollable Content Layer */}
      <ScrollView
        horizontal // Enables horizontal scrolling
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          {
            // Notch aur bottom bar se space, safety ke liye
            paddingTop: insets.top > 0 ? insets.top + 15 : 30,
            paddingBottom: insets.bottom > 0 ? insets.bottom + 15 : 30,
          },
        ]}
        showsHorizontalScrollIndicator={false}
      >
        {/* Main Row Content */}
        <View style={styles.innerContent}>
          <Text style={styles.text}> Your Content Here 1 </Text>
          <Text style={styles.text}> Your Content Here 2 </Text>
          <Text style={styles.text}> Your Content Here 3 </Text>
          <Text style={styles.text}> Your Content Here 4 </Text>
          <Text style={styles.text}> Your Content Here 5 </Text>
          <Text style={styles.text}> Your Content Here 6 </Text>
          <Text style={styles.text}> Your Content Here 7 </Text>
          <Text style={styles.text}> Your Content Here 8 </Text>
          <Text style={styles.text}> Your Content Here 9 </Text>
          <Text style={styles.text}> Your Content Here 10 </Text>
          <Text style={styles.text}> Your Content Here 11 </Text>
          <Text style={styles.text}> Your Content Here 12 </Text>
        </View>
      </ScrollView>

      {/* 2. Border Frame Layer (Stays fixed on top) */}
      <Image
        source={AppImages.bgImage2}
        style={styles.frameOverlay}
        resizeMode="stretch"
        pointerEvents="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // FIX: Removed '#' to make it valid string
  },
  scrollView: {
    flex: 1,
    zIndex: 1,
    overflow: 'hidden',
  },
  scrollContent: {
    // Left aur right side ke pink cut borders se content ko door rakhne ke liye padding
    paddingHorizontal: 45,
    justifyContent: 'center',
  },
  innerContent: {
    // FIX: Removed `flex: 1` taake yeh horizontal auto-expand ho sakay
    flexDirection: 'row',
    alignItems: 'center',
  },
  frameOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 2,
  },
  text: {
    color: '#000',
    fontSize: 16,
    marginHorizontal: 10, // Text elements ke beech mein gap ke liye
  },
});

export default SplashScreen;
