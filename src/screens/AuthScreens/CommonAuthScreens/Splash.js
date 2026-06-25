import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { AppImages } from '../../../assets/Images/Index';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';
import { AppColors } from '../../../utils/AppColors';

const Splash = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={AppImages.bgImage2}
        style={styles.frameOverlay}
        resizeMode="stretch"
        pointerEvents="none"
      />
      <View style={styles.logoContainer}>
        <Image source={AppImages.logo} style={styles.logo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 280,
    width: 280,
  },
  frameOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: responsiveHeight(100),
    width: responsiveWidth(100),
    zIndex: 2,
  },
});

export default Splash;
