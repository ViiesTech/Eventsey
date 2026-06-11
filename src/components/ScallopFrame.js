import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Defs, Mask, Rect, Path } from 'react-native-svg'; // <-- Yahan 'Defs' theek kar diya
import { responsiveWidth } from '../utils/Responsive_Dimensions';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const SCALLOP_RADIUS = responsiveWidth(3.9);
const STEP = SCALLOP_RADIUS * 2;

const ScallopFrame = () => {
  // Center Window Path (Scalloped Rectangle)
  let maskPath = `M ${SCALLOP_RADIUS} ${SCALLOP_RADIUS} `;

  // Top Edge
  for (let x = SCALLOP_RADIUS; x < SCREEN_WIDTH - SCALLOP_RADIUS; x += STEP) {
    maskPath += `A ${SCALLOP_RADIUS} ${SCALLOP_RADIUS} 0 0 0 ${Math.min(
      x + STEP,
      SCREEN_WIDTH - SCALLOP_RADIUS,
    )} ${SCALLOP_RADIUS} `;
  }

  // Right Edge
  for (let y = SCALLOP_RADIUS; y < SCREEN_HEIGHT - SCALLOP_RADIUS; y += STEP) {
    maskPath += `A ${SCALLOP_RADIUS} ${SCALLOP_RADIUS} 0 0 0 ${
      SCREEN_WIDTH - SCALLOP_RADIUS
    } ${Math.min(y + STEP, SCREEN_HEIGHT - SCALLOP_RADIUS)} `;
  }

  // Bottom Edge
  for (let x = SCREEN_WIDTH - SCALLOP_RADIUS; x > SCALLOP_RADIUS; x -= STEP) {
    maskPath += `A ${SCALLOP_RADIUS} ${SCALLOP_RADIUS} 0 0 0 ${Math.max(
      x - STEP,
      SCALLOP_RADIUS,
    )} ${SCREEN_HEIGHT - SCALLOP_RADIUS} `;
  }

  // Left Edge
  for (let y = SCREEN_HEIGHT - SCALLOP_RADIUS; y > SCALLOP_RADIUS; y -= STEP) {
    maskPath += `A ${SCALLOP_RADIUS} ${SCALLOP_RADIUS} 0 0 0 ${SCALLOP_RADIUS} ${Math.max(
      y - STEP,
      SCALLOP_RADIUS,
    )} `;
  }

  maskPath += 'Z';

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT}
        style={StyleSheet.absoluteFill}
      >
        <Defs>
          {' '}
          {/* <-- Yahan bilkul perfect Defs tag hai */}
          <Mask id="scallopMask">
            {/* Poori screen white (everything visible) */}
            <Rect width={SCREEN_WIDTH} height={SCREEN_HEIGHT} fill="#FFFFFF" />
            {/* Center window black (banega transparent cutout) */}
            <Path d={maskPath} fill="#000000" />
          </Mask>
        </Defs>

        {/* Aapka custom frame color (Pink background ya jo bhi border color rakhna ho) */}
        {/* Abhi ke liye tumne screenshot me white dikhaya tha toh main #FFFFFF rakh raha hun */}
        <Rect
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT}
          fill="#FFFFFF"
          mask="url(#scallopMask)"
        />
      </Svg>
    </View>
  );
};

export default ScallopFrame;
