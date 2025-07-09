import React, { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

interface GlitterExplosionSkiaProps {
  isVisible: boolean;
}

// Simple Spark Component
const ExplosionSpark = ({ delay, angle, distance, color }: {
  delay: number;
  angle: number;
  distance: number;
  color: string;
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);

  React.useEffect(() => {
    const endX = Math.cos(angle) * distance;
    const endY = Math.sin(angle) * distance;
    
    setTimeout(() => {
      scale.value = withTiming(1, { duration: 100 });
      translateX.value = withTiming(endX, { 
        duration: 1000 + Math.random() * 500, 
        easing: Easing.out(Easing.quad) 
      });
      translateY.value = withTiming(endY + 200, { // Add gravity effect
        duration: 1000 + Math.random() * 500, 
        easing: Easing.out(Easing.quad) 
      });
      opacity.value = withSequence(
        withTiming(1, { duration: 200 }),
        withTiming(0, { duration: 800 })
      );
    }, delay);
  }, [angle, delay, distance, opacity, scale, translateX, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          position: 'absolute',
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: color,
          shadowColor: color,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: 10,
        }
      ]}
    />
  );
};

export default function GlitterExplosionSkia({ isVisible }: GlitterExplosionSkiaProps) {
  const [showSparks, setShowSparks] = useState(false);
  
  useEffect(() => {
    console.log('GlitterExplosionSkia - isVisible changed to:', isVisible);
    if (isVisible) {
      console.log('Starting explosion');
      setShowSparks(true);
      
      // Hide sparks after animation
      setTimeout(() => {
        setShowSparks(false);
      }, 2000);
    } else {
      setShowSparks(false);
    }
  }, [isVisible]);

  const sparkColors = ['#FFD700', '#FF6B35', '#FFA500', '#FFFFFF', '#FF4500'];

  return (
    <View style={{
      position: 'absolute',
      width,
      height,
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
    }}>
      {/* Debug circle - should be visible when active */}
      {isVisible && (
        <View style={{
          position: 'absolute',
          top: height * 0.75 - 20,
          left: width / 2 - 20,
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: '#FF0000',
          opacity: 0.8,
        }} />
      )}
      
      {/* Explosion center */}
      <View style={{
        position: 'absolute',
        top: height * 0.75,
        left: width / 2,
      }}>
        {showSparks && Array.from({ length: 20 }, (_, i) => (
          <ExplosionSpark
            key={i}
            delay={i * 30}
            angle={(Math.PI * 2 * i) / 20 + Math.random() * 0.5}
            distance={80 + Math.random() * 100}
            color={sparkColors[Math.floor(Math.random() * sparkColors.length)]}
          />
        ))}
      </View>
    </View>
  );
}
