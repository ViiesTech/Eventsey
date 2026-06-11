import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../../../components/ScreenWrapper';
import Button from '../../../components/Button';
import { AppImages } from '../../../assets/Images/Index';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../../utils/Responsive_Dimensions';

const { width: SCREEN_WIDTH } = Dimensions.get('window'); // Total width available for each slide inside the safe window:

// Available width inside the safe responsive windows
const CONTAINER_WIDTH = SCREEN_WIDTH;
const OnboardingScreen = () => {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const onboardingData = [
    {
      id: '1',
      image: AppImages.onBoarding1,
      title: 'Track Guests\n& RSVPs',
      description:
        'Manage your guest list, send invites, and track responses all in one place.',
    },
    {
      id: '2',
      image: AppImages.onBoarding2,
      title: 'Save the Date &\nWedding Invites',
      description:
        'Create and share stunning digital save-the-dates and invitations that your guests will love.',
    },
    {
      id: '3',
      image: AppImages.onBoarding3,
      title: 'Import Your Guest\nList Instantly',
      description:
        'Skip manual entry. Import your entire guest list from a CSV or Excel file in seconds.',
      isContainImage: true, // Laptop image sits nicer in contain mode
    },
    {
      id: '4',
      image: AppImages.onBoarding4,
      title: 'Determine the\nBudget',
      description: 'Everything you need, from venues to vows, in one place.',
    },
  ];

  const handleScroll = event => {
    const scrollOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollOffset / CONTAINER_WIDTH);
    if (index >= 0 && index < onboardingData.length) {
      setActiveIndex(index);
    }
  };

  const handleNext = () => {
    if (activeIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
      setActiveIndex(activeIndex + 1);
    }
  };

  const handleSkip = () => {
    flatListRef.current?.scrollToIndex({
      index: onboardingData.length - 1,
      animated: true,
    });
    setActiveIndex(onboardingData.length - 1);
  };

  const handleGetStarted = () => {
    // Navigate to Login/Register screen in the current stack
    // (UserAuth or VendorAuth)
    navigation.navigate('Login');
  };

  const renderItem = ({ item }) => {
    return (
      // Background explicitly transparent rakhein taaki frame ke piche se kuch leak na ho
      <View style={[styles.slide, { width: CONTAINER_WIDTH }]}>
        {/* Top visual content container */}
        <View style={styles.imageContainer}>
          <Image
            source={item.image}
            style={[
              styles.image,
              item.isContainImage ? styles.imageContain : styles.imageCover,
            ]}
          />
        </View>

        {/* Text information */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <ScreenWrapper scrollable={true} backgroundColor="#FFF">
      {/* Main flexible container bina space-between ke */}
      <View style={styles.container}>
        {/* 1. Sliders list top se position legi */}
        <View style={styles.listWrapper}>
          <FlatList
            ref={flatListRef}
            data={onboardingData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            snapToInterval={CONTAINER_WIDTH}
            decelerationRate="fast"
            style={styles.flatList}
            contentContainerStyle={{ backgroundColor: 'transparent' }}
          />
        </View>

        {/* 2. Controls Panel elements ke bilkul neeche aayega */}
        <View style={styles.controlsContainer}>
          {/* Custom Elongated Page Indicator Dots */}
          <View style={styles.dotsContainer}>
            {onboardingData.map((_, index) => {
              const isActive = index === activeIndex;
              return (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    isActive ? styles.activeDot : styles.inactiveDot,
                  ]}
                />
              );
            })}
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonWrapper}>
            {activeIndex < onboardingData.length - 1 ? (
              <>
                <Button title="Next" onPress={handleNext} type="primary" />
                <Button title="Skip" onPress={handleSkip} type="text" />
              </>
            ) : (
              <>
                <Button
                  title="Get Started"
                  onPress={handleGetStarted}
                  type="primary"
                />
                <View style={styles.bottomSpacer} />
              </>
            )}
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  listWrapper: {
    // height: responsiveHeight(65), // Image aur text ke liye solid top height block
    justifyContent: 'center',
  },
  flatList: {
    flex: 1,
    // backgroundColor: 'transparent',
  },
  slide: {
    width: CONTAINER_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: responsiveWidth(4),
    backgroundColor: 'transparent',
  },
  imageContainer: {
    width: '100%',
    height: responsiveHeight(32),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(3),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageCover: {
    borderRadius: responsiveWidth(5),
    resizeMode: 'cover',
  },
  imageContain: {
    resizeMode: 'contain',
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(2),
  },
  title: {
    fontSize: responsiveFontSize(3.0),
    fontWeight: '700',
    color: '#1A3330',
    textAlign: 'center',
    lineHeight: responsiveFontSize(3.8),
    marginBottom: responsiveHeight(1.5),
  },
  description: {
    fontSize: responsiveFontSize(1.65),
    color: '#6E8A85',
    textAlign: 'center',
    lineHeight: responsiveFontSize(2.4),
    paddingHorizontal: responsiveWidth(4),
  },
  controlsContainer: {
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(6),
    marginTop: responsiveHeight(2),
    backgroundColor: 'transparent',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsiveHeight(2.5),
  },
  dot: {
    height: responsiveHeight(0.8),
    borderRadius: responsiveHeight(0.4),
    marginHorizontal: responsiveWidth(1.2),
  },
  activeDot: {
    width: responsiveWidth(6.5),
    backgroundColor: '#FBAFA1',
  },
  inactiveDot: {
    width: responsiveWidth(1.8),
    backgroundColor: '#FCE4E0',
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  bottomSpacer: {
    height: responsiveHeight(4.5),
  },
});

export default OnboardingScreen;
