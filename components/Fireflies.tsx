// components/Fireflies.tsx

import React, { useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface FireflyProps {
  count?: number; // number of fireflies
}

const Firefly = ({ x, y, r }: { x: number; y: number; r: number }) => {
  const dx = useSharedValue(x);
  const dy = useSharedValue(y);

  useEffect(() => {
    dx.value = withRepeat(
      withTiming(Math.random() * width, {
        duration: 7000 + Math.random() * 3000,
        easing: Easing.inOut(Easing.quad),
      }),
      -1,
      true
    );

    dy.value = withRepeat(
      withTiming(Math.random() * height, {
        duration: 7000 + Math.random() * 3000,
        easing: Easing.inOut(Easing.quad),
      }),
      -1,
      true
    );
  }, [dx, dy]);

  const animatedProps = useAnimatedProps(() => ({
    cx: dx.value,
    cy: dy.value,
  }));

  return (
    <AnimatedCircle
      r={r}
      fill="#FFD700"
      opacity={0.6}
      animatedProps={animatedProps}
    />
  );
};

const Fireflies = ({ count = 15 }: FireflyProps) => {
  const fireflies = Array.from({ length: count }).map((_, i) => {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const r = 2 + Math.random() * 3; // random radius between 2–5

    return <Firefly key={i} x={x} y={y} r={r} />;
  });

  return (
    <Svg style={StyleSheet.absoluteFill}>
      {fireflies}
    </Svg>
  );
};

export default Fireflies;
