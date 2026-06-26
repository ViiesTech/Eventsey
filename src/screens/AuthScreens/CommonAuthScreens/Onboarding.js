import React, { useState, useRef } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Text from '../../../components/CustomText';
import { useNavigation } from '@react-navigation/native';
import AppIntroSlider from 'react-native-app-intro-slider';
import ScreenWrapper from '../../../components/ScreenWrapper';
import Button from '../../../components/Button';
import { AppImages } from '../../../assets/Images/Index';
import { AppColors } from '../../../utils/AppColors';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../../../utils/Responsive_Dimensions';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CONTAINER_WIDTH = SCREEN_WIDTH;

const Onboarding = () => {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);

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
      isContainImage: true,
    },
    {
      id: '4',
      image: AppImages.onBoarding4,
      title: 'Determine the\nBudget',
      description: 'Everything you need, from venues to vows, in one place.',
    },
  ];

  const handleSlideChange = index => {
    setActiveIndex(index);
  };

  const handleNext = () => {
    if (activeIndex < onboardingData.length - 1) {
      const nextIndex = activeIndex + 1;
      sliderRef.current?.goToSlide(nextIndex, true);
      setActiveIndex(nextIndex);
    }
  };

  const handleSkip = () => {
    const lastIndex = onboardingData.length - 1;
    sliderRef.current?.goToSlide(lastIndex, true);
    setActiveIndex(lastIndex);
  };

  const handleGetStarted = () => {
    navigation.navigate('Welcome');
  };

  const renderItem = ({ item }) => {
    return (
      <View style={[styles.slide, { width: CONTAINER_WIDTH }]}>
        <View style={styles.imageContainer}>
          <Image
            source={item.image}
            style={[
              styles.image,
              item.isContainImage ? styles.imageContain : styles.imageCover,
            ]}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };

  const renderPagination = () => {
    return (
      <View style={styles.controlsContainer}>
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
    );
  };

  return (
    <ScreenWrapper scrollable={false} backgroundColor="#FFF">
      <View style={styles.container}>
        <AppIntroSlider
          ref={sliderRef}
          data={onboardingData}
          renderItem={renderItem}
          renderPagination={renderPagination}
          onSlideChange={handleSlideChange}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: responsiveWidth(10),
    paddingBottom: responsiveHeight(26),
    backgroundColor: 'transparent',
  },
  imageContainer: {
    height: responsiveHeight(16),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(2.6),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageCover: {
    borderRadius: responsiveWidth(1),
    resizeMode: 'cover',
  },
  imageContain: {
    resizeMode: 'contain',
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: responsiveFontSize(3),
    fontWeight: '700',
    color: AppColors.black,
    textAlign: 'center',
    marginBottom: responsiveHeight(1.5),
  },
  description: {
    fontSize: responsiveFontSize(1.8),
    color: AppColors.gray,
    textAlign: 'center',
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: responsiveWidth(10),
    paddingBottom: responsiveHeight(2),
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
    backgroundColor: AppColors.primary,
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

export default Onboarding;
