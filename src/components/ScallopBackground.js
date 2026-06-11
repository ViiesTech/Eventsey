import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';
import {
  responsiveWidth,
  responsiveHeight,
} from '../utils/Responsive_Dimensions';

// Derived from Figma: bubble radius is 27 in a 346px-wide frame
const BUBBLE_RADIUS_RATIO = 27 / 346;
const SALMON_COLOR = '#FBAFA1';

const SW = responsiveWidth(100);
const SH = responsiveHeight(100);

const ScallopBackground = ({ children, backgroundColor = SALMON_COLOR }) => {
  const r = Math.round(BUBBLE_RADIUS_RATIO * SW);

  // Circle centers along top/bottom edges (step = diameter = 2r)
  const hCenters = [];
  for (let x = r; x <= SW - r + 1; x += 2 * r) {
    hCenters.push(x);
  }

  // Circle centers along left/right edges
  const vCenters = [];
  for (let y = r; y <= SH - r + 1; y += 2 * r) {
    vCenters.push(y);
  }

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <Svg
        width={SW}
        height={SH}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        {/* Inner white rectangle */}
        <Rect x={r} y={r} width={SW - 2 * r} height={SH - 2 * r} fill="white" />
        {/* Top edge bubbles */}
        {hCenters.map((cx, i) => (
          <Circle key={`t${i}`} cx={cx} cy={r} r={r} fill="white" />
        ))}
        {/* Bottom edge bubbles */}
        {hCenters.map((cx, i) => (
          <Circle key={`b${i}`} cx={cx} cy={SH - r} r={r} fill="white" />
        ))}
        {/* Left edge bubbles */}
        {vCenters.map((cy, i) => (
          <Circle key={`l${i}`} cx={r} cy={cy} r={r} fill="white" />
        ))}
        {/* Right edge bubbles */}
        {vCenters.map((cy, i) => (
          <Circle key={`ri${i}`} cx={SW - r} cy={cy} r={r} fill="white" />
        ))}
      </Svg>

      {/* Content area — inset by bubble radius on all sides */}
      <View style={{ flex: 1, marginHorizontal: r, marginVertical: r }}>
        {children}
      </View>
    </View>
  );
};

export default ScallopBackground;
