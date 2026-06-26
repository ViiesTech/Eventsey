import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

const CustomText = React.forwardRef(({ style, ...props }, ref) => {
  let newStyle = {};

  if (style) {
    const flattened = StyleSheet.flatten(style);

    let fontFamily = flattened.fontFamily;
    if (!fontFamily || fontFamily === 'Arial') {
      const weight = flattened.fontWeight
        ? String(flattened.fontWeight)
        : '400';
      const isItalic = flattened.fontStyle === 'italic';

      // Map weights to custom Arial font variants
      if (
        weight === 'bold' ||
        weight === '700' ||
        weight === '800' ||
        weight === '900'
      ) {
        fontFamily = isItalic ? 'Arial-BoldItalic' : 'Arial-Bold';
      } else if (weight === '500' || weight === '600') {
        fontFamily = isItalic ? 'Arial-Italic' : 'Arial-Medium';
      } else {
        fontFamily = isItalic ? 'Arial-Italic' : 'Arial-Regular';
      }
    }

    newStyle = {
      ...flattened,
      fontFamily,
    };

    // Remove fontWeight and fontStyle since the fontFamily fully determines them
    delete newStyle.fontWeight;
    delete newStyle.fontStyle;
  } else {
    newStyle = { fontFamily: 'Arial-Regular' };
  }

  return <RNText ref={ref} style={newStyle} {...props} />;
});

export default CustomText;
