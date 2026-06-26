import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Text from '../../../components/CustomText';
import { AppImages } from '../../../assets/Images/Index';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';
import { AppColors } from '../../../utils/AppColors';
import ScreenWrapper from '../../../components/ScreenWrapper';
import Button from '../../../components/Button';

const Welcome = ({ navigation }) => {
  return (
    <ScreenWrapper scrollable>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.description}>
            Please sign in or sign up to continue using our app.
          </Text>
        </View>

        <View style={styles.logoContainer}>
          <Image source={AppImages.logo} style={styles.logo} />
        </View>

        <View style={styles.buttonsContainer}>
          <Button
            title="User"
            type="primary"
            onPress={() =>
              navigation.navigate('UserAuth', { screen: 'UserLogin' })
            }
          />
          <Button
            title="Vendor"
            type="primary"
            onPress={() =>
              navigation.navigate('VendorAuth', { screen: 'VendorLogin' })
            }
          />
        </View>
      </View>
    </ScreenWrapper>
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
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(10),
    paddingHorizontal: responsiveWidth(10),
  },
  title: {
    fontSize: responsiveFontSize(3),
    fontWeight: '700',
    color: AppColors.primary,
    textAlign: 'center',
  },
  description: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '500',
    color: AppColors.secondary,
    textAlign: 'center',
    marginTop: responsiveHeight(0.5),
  },
  buttonsContainer: {
    marginHorizontal: responsiveWidth(10),
    marginBottom: 30,
  },
});

export default Welcome;
