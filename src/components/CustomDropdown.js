import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../utils/Responsive_Dimensions';
import Entypo from '@react-native-vector-icons/entypo';
import { AppColors } from '../utils/AppColors';

const CustomDropdown = ({
  data,
  value,
  onChange,
  placeholder,
  search = false,
  searchPlaceholder = 'Search...',
}) => {
  return (
    <Dropdown
      style={styles.dropdownFrameBox}
      placeholderStyle={styles.placeholderTextStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search={search}
      maxHeight={240}
      labelField="label"
      valueField="value"
      placeholder={placeholder || 'Select item'}
      searchPlaceholder={searchPlaceholder}
      value={value}
      onChange={onChange}
      containerStyle={styles.dropdownListWrapperContainer}
      itemTextStyle={styles.listItemTextInsideStyle}
      activeColor="#E8F8F6"
      renderRightIcon={() => (
        <Entypo name="chevron-down" size={16} color="rgba(113, 113, 130, 1)" />
      )}
    />
  );
};

const styles = StyleSheet.create({
  dropdownFrameBox: {
    backgroundColor: '#F5F6F8',
    borderRadius: 12,
    height: responsiveHeight(5.5),
    paddingHorizontal: responsiveWidth(3.5),
    justifyContent: 'center',
  },
  placeholderTextStyle: {
    fontSize: responsiveFontSize(1.5),
    color: '#BDBDBD',
  },
  selectedTextStyle: {
    fontSize: responsiveFontSize(1.5),
    color: AppColors.black,
  },
  inputSearchStyle: {
    height: responsiveHeight(5),
    fontSize: responsiveFontSize(1.4),
    borderRadius: 8,
  },
  dropdownChevronDownwardIndicatorArrow: {
    fontSize: responsiveFontSize(1.1),
    color: '#9E9E9E',
  },
  dropdownListWrapperContainer: {
    top: -30,
    borderRadius: 12,
    marginTop: responsiveHeight(0.5),
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  listItemTextInsideStyle: {
    fontSize: responsiveFontSize(1.5),
    color: AppColors.black,
  },
});

export default CustomDropdown;
