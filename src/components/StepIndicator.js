import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './CustomText';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from '../utils/Responsive_Dimensions';
import { AppColors } from '../utils/AppColors';

const StepIndicator = ({ currentStep, totalSteps = 4, stepLabels = [] }) => {
  return (
    <View style={styles.container}>
      {/* Numbers & Connectors Indicator Row */}
      <View style={styles.indicatorRow}>
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber <= currentStep;

          return (
            <React.Fragment key={stepNumber}>
              {/* Step Circle Badge */}
              <View
                style={[
                  styles.circle,
                  isActive ? styles.activeCircle : styles.inactiveCircle,
                ]}
              >
                <Text
                  style={[
                    styles.circleText,
                    isActive ? styles.activeText : styles.inactiveText,
                  ]}
                >
                  {stepNumber}
                </Text>
              </View>
              {/* Connector line between steps */}
              {index < totalSteps - 1 && (
                <View
                  style={[
                    styles.line,
                    stepNumber < currentStep
                      ? styles.activeLine
                      : styles.inactiveLine,
                  ]}
                />
              )}
            </React.Fragment>
          );
        })}
      </View>

      {/* Dynamic Text Label Descriptor */}
      <Text style={styles.stepDescriptorText}>
        Step {currentStep} of {totalSteps} : {stepLabels[currentStep - 1] || ''}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: responsiveHeight(3.5),
    width: '100%',
  },
  indicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsiveHeight(2),
    width: '80%',
  },
  circle: {
    width: responsiveWidth(7.5),
    height: responsiveWidth(7.5),
    borderRadius: responsiveWidth(3.75),
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCircle: {
    backgroundColor: AppColors.primary,
  },
  inactiveCircle: {
    backgroundColor: '#F5EFEA',
  },
  circleText: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '700',
  },
  activeText: {
    color: AppColors.white,
  },
  inactiveText: {
    color: '#BCBCBC',
  },
  line: {
    flex: 1,
    height: 3,
    marginHorizontal: responsiveWidth(1.5),
  },
  activeLine: {
    backgroundColor: AppColors.primary,
  },
  inactiveLine: {
    backgroundColor: '#F5EFEA',
  },
  stepDescriptorText: {
    fontSize: responsiveFontSize(1.8),
    color: '#7C7C7C',
    fontWeight: '500',
  },
});

export default StepIndicator;
