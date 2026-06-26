import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Text from './CustomText';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../utils/Responsive_Dimensions';
import { AppColors } from '../utils/AppColors';
import { AppImages } from '../assets/Images/Index';
import { useNavigation } from '@react-navigation/native';

const JobCard = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('JobDetails')}
      style={styles.jobCardFrame}
    >
      {/* Category and Price Line */}
      <View style={styles.cardHeaderRow}>
        <Text style={styles.categoryTitleText}>{item.category}</Text>
        <Text style={styles.priceHighlightText}>{item.price}</Text>
      </View>

      {/* New Job Badge */}
      <View style={styles.statusBadgeWrapper}>
        <Text style={styles.statusBadgeText}>{item.statusTag}</Text>
      </View>

      {/* Details (Client, Date, Location) */}
      <View style={styles.metaSpecificationsContainer}>
        <View style={styles.specItemRow}>
          <Image source={AppImages.user} style={styles.inlineSpecIcon} />
          <Text style={styles.specLabelText}>{item.client}</Text>
        </View>

        <View style={styles.specItemRow}>
          <Image source={AppImages.calendar} style={styles.inlineSpecIcon} />
          <Text style={styles.specLabelText}>{item.date}</Text>
        </View>

        <View style={styles.specItemRow}>
          <Image source={AppImages.location} style={styles.inlineSpecIcon} />
          <Text style={styles.specLabelText}>{item.location}</Text>
        </View>
      </View>

      {/* Description Block */}
      <View style={styles.descriptionBlockWrapper}>
        <Text style={styles.descriptionHeadingText}>Description</Text>
        <Text style={styles.descriptionBodyText}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  jobCardFrame: {
    backgroundColor: AppColors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    padding: responsiveWidth(5),
    marginBottom: responsiveHeight(2),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryTitleText: {
    fontSize: responsiveFontSize(2),
    fontWeight: '500',
    color: AppColors.black,
  },
  priceHighlightText: {
    fontSize: responsiveFontSize(2),
    fontWeight: '700',
    color: AppColors.primary,
  },
  statusBadgeWrapper: {
    backgroundColor: AppColors.secondary,
    alignSelf: 'flex-start',
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(0.4),
    borderRadius: 8,
    marginTop: responsiveHeight(0.8),
    marginBottom: responsiveHeight(1),
  },
  statusBadgeText: {
    fontSize: responsiveFontSize(1.2),
    color: AppColors.black,
    fontWeight: '400',
  },
  metaSpecificationsContainer: {
    marginVertical: responsiveHeight(0.5),
  },
  specItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(1),
  },
  inlineSpecIcon: {
    height: 15,
    width: 15,
    tintColor: AppColors.black,
    resizeMode: 'contain',
    marginRight: responsiveWidth(2),
  },
  specLabelText: {
    fontSize: responsiveFontSize(1.3),
    color: AppColors.black,
    fontWeight: '400',
  },
  descriptionBlockWrapper: {
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    paddingTop: responsiveHeight(1.5),
    marginTop: responsiveHeight(0.5),
  },
  descriptionHeadingText: {
    fontSize: responsiveFontSize(1.4),
    fontWeight: '700',
    color: AppColors.black,
    marginBottom: responsiveHeight(0.5),
  },
  descriptionBodyText: {
    fontSize: responsiveFontSize(1.3),
    color: AppColors.black,
    lineHeight: responsiveFontSize(2.2),
  },
});

export default JobCard;
