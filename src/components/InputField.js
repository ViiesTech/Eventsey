import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Text from './CustomText';
import SvgXml from './SvgXml';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';
import { AppColors } from '../utils/AppColors';
import { AppIcons } from '../assets/Icons/Index';

const InputField = ({
  placeHolder,
  placeholderTxtColor = '#9CA3AF',
  color = AppColors.black,
  fontSize = responsiveFontSize(1.6),
  fontWeight = '400',
  handlePress,
  setShowPassword,
  showPassword = false,
  keyboardType = 'default',
  elevation = false,
  xmlIcon = false,
  label,
  security = false,
  value,
  autoCapitalize = 'none',
  showDivider = false,
}) => {
  const hasShadow = xmlIcon && elevation;

  return (
    <View style={styles.outerWrapper}>
      {label && <Text style={styles.labelText}>{label}</Text>}

      <View
        style={[
          styles.container,
          hasShadow ? styles.containerShadow : styles.containerBorder,
        ]}
      >
        {/* Optional Left Icon Element */}
        {xmlIcon && (
          <View style={styles.iconWrapper}>
            <SvgXml icon={xmlIcon} height={20} width={20} />
            {showDivider && <View style={styles.divider} />}
          </View>
        )}

        {/* Input Core Wrapper */}
        <View style={styles.inputCoreRow}>
          <TextInput
            keyboardType={keyboardType}
            placeholderTextColor={placeholderTxtColor}
            placeholder={placeHolder}
            secureTextEntry={security ? !showPassword : false}
            value={value}
            autoCorrect={false}
            spellCheck={false}
            textContentType="none"
            importantForAutofill="no"
            autoComplete="off"
            autoCapitalize={autoCapitalize}
            style={[
              styles.textInput,
              {
                color: color,
                fontSize: fontSize,
                fontWeight: fontWeight,
              },
              xmlIcon && styles.textInputIconPadding,
            ]}
            onChangeText={text => handlePress && handlePress(text)}
          />

          {/* Security Password Visibility Toggle */}
          {security && (
            <TouchableOpacity
              style={styles.securityToggle}
              onPress={() => setShowPassword && setShowPassword(!showPassword)}
            >
              <SvgXml
                icon={showPassword ? AppIcons.eye : AppIcons.eyeOff}
                height={20}
                width={20}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerWrapper: {
    width: '100%',
    marginBottom: responsiveHeight(2.2),
  },
  labelText: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: '600',
    color: AppColors.primary,
    marginBottom: responsiveHeight(0.8),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.white,
    borderRadius: responsiveWidth(3.5),
    height: responsiveHeight(5.8),
    paddingHorizontal: responsiveWidth(4),
  },
  containerShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  containerBorder: {
    borderColor: '#E5E7EB',
    borderWidth: 1.2,
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    height: '60%',
    width: 0.9,
    backgroundColor: '#CCCCCC',
    marginLeft: responsiveWidth(2),
  },
  inputCoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textInput: {
    flex: 1,
    height: '100%',
    paddingVertical: 0, // Fixes baseline cuts on Android
  },
  textInputIconPadding: {
    paddingLeft: responsiveWidth(2),
  },
  securityToggle: {
    marginLeft: responsiveWidth(2),
  },
});

export default InputField;
