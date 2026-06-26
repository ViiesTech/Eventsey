import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Text from './CustomText';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../utils/Responsive_Dimensions';

const Button = ({
  title,
  onPress,
  type = 'primary', // 'primary' | 'secondary' | 'text'
  style,
  textStyle,
  disabled = false,
  ...props
}) => {
  const isPrimary = type === 'primary';
  const isSecondary = type === 'secondary';
  const isText = type === 'text';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[
        styles.button,
        isPrimary && styles.primaryButton,
        isSecondary && styles.secondaryButton,
        isText && styles.textButton,
        disabled && styles.disabledButton,
        style,
      ]}
      {...props}
    >
      <Text
        style={[
          styles.text,
          isPrimary && styles.primaryText,
          isSecondary && styles.secondaryText,
          isText && styles.textButtonText,
          disabled && styles.disabledText,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: responsiveHeight(6.2), // ~50px on standard screen
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveWidth(3.5),
    marginVertical: responsiveHeight(1),
  },
  primaryButton: {
    backgroundColor: '#7FD4CF', // Vibrant light turquoise/teal
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#7FD4CF',
  },
  textButton: {
    backgroundColor: 'transparent',
    height: 'auto',
    marginVertical: responsiveHeight(0.8),
  },
  disabledButton: {
    backgroundColor: '#E0E0E0',
    shadowOpacity: 0,
    elevation: 0,
    borderColor: '#CCCCCC',
  },
  text: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryText: {
    color: '#1A3330', // Deep charcoal/dark forest green to look high contrast and premium
  },
  secondaryText: {
    color: '#7FD4CF',
  },
  textButtonText: {
    color: '#1A3330', // Text color matching the screenshots for 'Skip'
    fontWeight: '500',
    fontSize: responsiveFontSize(1.6),
  },
  disabledText: {
    color: '#A0A0A0',
  },
});

export default Button;
