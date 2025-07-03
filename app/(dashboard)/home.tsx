import React, { useEffect } from 'react';
import { Dimensions, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';


const { width, height } = Dimensions.get('window');

/* COMMENTED OUT - ALL EXPLOSION COMPONENTS AND LOGIC
// All explosion-related constants, components, and logic have been commented out
// to be replaced with the GlitterExplosionSkia component.
// This includes: ExplosionRay, MainExplosionRay, SubExplosionRay, ExplosionParticle,
// ExplosionWave, GlitterParticle, SparkleParticle, IntenseExplosionRay, MagicalExplosion
// and all their associated constants and animations.
*/

const messages = [
  { id: 1, text: 'Hello there! 🌟' },
  { id: 2, text: 'Welcome to Kokoro! 💫' },
  { id: 3, text: 'How are you feeling today? ✨' },
  { id: 4, text: 'Hope you have a magical day! 🌙' },
  { id: 5, text: 'You are amazing! 💖' },
  { id: 6, text: 'Dreams come true here! ⭐' },
  { id: 7, text: 'Feel the magic around you! 🔮' },
  { id: 8, text: 'Nature whispers secrets! 🍃' },
  { id: 9, text: 'Peaceful moments await! 🕯️' },
  { id: 10, text: 'Light up the darkness! 💡' },
  { id: 11, text: 'Believe in yourself! 🌈' },
  { id: 12, text: 'Every moment is precious! 💎' },
  { id: 13, text: 'Magic flows through you! ✨' },
  { id: 14, text: 'Serenity surrounds you! 🌸' },
  { id: 15, text: 'Wonder awaits discovery! 🦋' },
  { id: 16, text: 'Gentle spirits guide you! 👻' },
  { id: 17, text: 'Moonlight blesses your path! 🌙' },
  { id: 18, text: 'Stars align for you! ⭐' },
  { id: 19, text: 'Magic is everywhere! ✨' },
  { id: 20, text: 'Shine bright tonight! 🌟' },
  { id: 21, text: 'Dance with the light! 💫' },
  { id: 22, text: 'Follow your dreams! 🌙' },
  { id: 23, text: 'Sparkle and glow! ⭐' },
  { id: 24, text: 'Nature\'s magic surrounds you! 🍃' },
  { id: 25, text: 'Embrace the wonder! 🦋' },
  { id: 26, text: 'Light up the world! 💡' },
  { id: 27, text: 'Golden moments await! 🌟' },
  { id: 28, text: 'Mystical energy flows! 🔮' },
  { id: 29, text: 'Sparkles of joy! ✨' },
  { id: 30, text: 'Magic surrounds you! 🌙' },
  { id: 31, text: 'Peaceful dreams! 💫' },
  { id: 32, text: 'Shining bright! ⭐' },
  { id: 33, text: 'Gentle whispers! 🍃' },
  { id: 34, text: 'Dancing lights! 💃' },
  { id: 35, text: 'Sweet serenity! 🌸' },
  { id: 36, text: 'Magical moments! 🔮' },
  { id: 37, text: 'Glowing beauty! 🌟' },
  { id: 38, text: 'Floating dreams! 💭' },
  { id: 39, text: 'Twinkling magic! ✨' },
  { id: 40, text: 'Gentle spirits! 👻' },
];

const Firefly = ({ message }: { message: { id: number; text: string } }) => {
  // Random starting position anywhere on screen
  const x = useSharedValue(Math.random() * width);
  const y = useSharedValue(Math.random() * height * 0.8);
  const opacity = useSharedValue(0.6 + Math.random() * 0.4);
  const scale = useSharedValue(0.8 + Math.random() * 0.3);
  const glowIntensity = useSharedValue(0.8);
  const wingFlutter = useSharedValue(0);
  const rotation = useSharedValue(Math.random() * 30 - 15);
  
  // Circular glow effect for tap
  const circularGlowScale = useSharedValue(0);
  const circularGlowOpacity = useSharedValue(0);
  
  // Animation variables
  const speedMultiplier = 0.3 + Math.random() * 0.4;
  const baseVelocityX = (Math.random() - 0.5) * 1.2 * speedMultiplier; // Increased for more horizontal movement
  const baseVelocityY = (Math.random() - 0.5) * 0.6 * speedMultiplier; // Increased for more vertical movement
  const velocityX = useSharedValue(baseVelocityX);
  const velocityY = useSharedValue(baseVelocityY);

  useEffect(() => {
    // Start continuous floating animation immediately
    const baseDuration = 4000 + Math.random() * 3000;
    const durationX = baseDuration / speedMultiplier;
    const durationY = (baseDuration * 1.2) / speedMultiplier;
    
    const moveSmooth = () => {
      const changeAmount = speedMultiplier * 0.12; // Increased for more dynamic movement
      velocityX.value += (Math.random() - 0.5) * changeAmount;
      velocityY.value += (Math.random() - 0.5) * changeAmount * 0.7;
      
      const maxVelX = 0.8 + speedMultiplier * 0.6; // Increased max velocity for more horizontal movement
      const maxVelY = 0.4 + speedMultiplier * 0.3; // Increased max velocity for more vertical movement
      
      velocityX.value = Math.max(-maxVelX, Math.min(maxVelX, velocityX.value));
      velocityY.value = Math.max(-maxVelY, Math.min(maxVelY, velocityY.value));
      
      const distance = 600 + speedMultiplier * 400; // Increased distance for more movement
      const targetX = x.value + velocityX.value * distance;
      const targetY = y.value + velocityY.value * distance * 0.8;
      
      x.value = withTiming(targetX, {
        duration: durationX,
        easing: Easing.linear,
      });
      
      y.value = withTiming(targetY, {
        duration: durationY,
        easing: Easing.linear,
      });
      
      const rotTarget = Math.atan2(velocityY.value, velocityX.value) * (180 / Math.PI) * 0.15;
      rotation.value = withTiming(rotTarget, {
        duration: 3000 / speedMultiplier,
        easing: Easing.out(Easing.quad),
      });
    };
    
    // Start movement immediately - no delay
    moveSmooth();
    
    const intervalTime = 3000 + Math.random() * 1500; // Reduced interval for more frequent direction changes
    
    const interval = setInterval(() => {
      let currentX = x.value;
      let currentY = y.value;
      
      // Screen wrapping - smooth transitions
      if (currentX < -30) {
        x.value = width + 20;
        velocityX.value = Math.abs(velocityX.value) * 0.7;
      } else if (currentX > width + 30) {
        x.value = -20;
        velocityX.value = -Math.abs(velocityX.value) * 0.7;
      }
      
      // Keep fireflies in area with smooth redirects
      if (currentY < height * 0.1) {
        y.value = height * 0.15;
        velocityY.value = Math.abs(velocityY.value) * 0.8;
      } else if (currentY > height * 0.85) {
        y.value = height * 0.8;
        velocityY.value = -Math.abs(velocityY.value) * 0.8;
      }
      
      moveSmooth();
    }, intervalTime);

    // Start glow animations
    const glowSpeed = 1.0 + speedMultiplier * 0.3;
    
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: (1200 + Math.random() * 600) / glowSpeed }),
        withTiming(0.4, { duration: (600 + Math.random() * 300) / glowSpeed }),
        withTiming(0.95, { duration: 400 / glowSpeed }),
        withTiming(0.3, { duration: (1000 + Math.random() * 500) / glowSpeed })
      ),
      -1,
      true
    );

    const intensityBase = 0.9 + speedMultiplier * 0.4;
    glowIntensity.value = withRepeat(
      withSequence(
        withTiming(intensityBase + 0.5, { duration: 800 / glowSpeed }),
        withTiming(intensityBase * 0.8, { duration: 600 / glowSpeed }),
        withTiming(intensityBase + 0.2, { duration: 900 / glowSpeed }),
        withTiming(intensityBase * 0.6, { duration: 1100 / glowSpeed })
      ),
      -1,
      true
    );

    const flutterSpeed = speedMultiplier * 1.5;
    wingFlutter.value = withRepeat(
      withSequence(
        withTiming(7 * flutterSpeed, { duration: 70 / flutterSpeed }),
        withTiming(-5 * flutterSpeed, { duration: 70 / flutterSpeed }),
        withTiming(3 * flutterSpeed, { duration: 70 / flutterSpeed }),
        withTiming(-1 * flutterSpeed, { duration: 70 / flutterSpeed }),
        withTiming(0, { duration: 250 / flutterSpeed })
      ),
      -1,
      false
    );

    return () => clearInterval(interval);
  }, [glowIntensity, opacity, speedMultiplier, wingFlutter, x, y, velocityX, velocityY, rotation]);



  const animatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    transform: [
      { translateX: x.value },
      { translateY: y.value },
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
    opacity: opacity.value,
  }));

  const wingAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotateY: `${wingFlutter.value}deg` },
    ],
  }));

  const circularGlowStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFD700',
    opacity: circularGlowOpacity.value,
    transform: [
      { scale: circularGlowScale.value }
    ],
  }));

  const handlePress = () => {
    // Circular glow effect
    circularGlowScale.value = withSequence(
      withTiming(1, { duration: 200, easing: Easing.out(Easing.quad) }),
      withTiming(1.2, { duration: 800, easing: Easing.inOut(Easing.quad) })
    );
    
    circularGlowOpacity.value = withSequence(
      withTiming(0.8, { duration: 100 }),
      withTiming(0.6, { duration: 900 })
    );
    
    // More dramatic scale effect - grow significantly larger
    const originalScale = scale.value;
    scale.value = withSequence(
      withTiming(originalScale * 1.8, { duration: 120, easing: Easing.out(Easing.quad) }),
      withTiming(originalScale, { duration: 250, easing: Easing.elastic(1.2) })
    );
    
    // Brighter glow effect
    const originalOpacity = opacity.value;
    opacity.value = withSequence(
      withTiming(1, { duration: 80 }),
      withTiming(originalOpacity, { duration: 350 })
    );
    
    // Enhanced glow intensity for press effect
    const originalGlow = glowIntensity.value;
    glowIntensity.value = withSequence(
      withTiming(originalGlow * 2.5, { duration: 100 }),
      withTiming(originalGlow, { duration: 400 })
    );
    
    // Small rotation wiggle for extra feedback
    const originalRotation = rotation.value;
    rotation.value = withSequence(
      withTiming(originalRotation + 15, { duration: 80 }),
      withTiming(originalRotation - 10, { duration: 80 }),
      withTiming(originalRotation, { duration: 160 })
    );
    
    // Show message after 1 second delay and erase tap effects
    setTimeout(() => {
      // Erase all tap effects
      circularGlowOpacity.value = withTiming(0, { duration: 200 });
      circularGlowScale.value = withTiming(0, { duration: 200 });
      
      // Show the message
      alert(message.text);
    }, 1000);
  };

  return (
    <Animated.View style={animatedStyle}>
      {/* Circular glow effect behind firefly */}
      <Animated.View style={[circularGlowStyle, styles.circularGlow]} />
      
      <TouchableOpacity 
        onPress={handlePress} 
        hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
        style={styles.fireflyTouch}
      >
        <Animated.View style={wingAnimatedStyle}>
          <Animated.Image
            source={require('../../assets/images/firefly2.png')}
            style={[styles.fireflyImage, { 
              opacity: glowIntensity.value,
              shadowColor: '#FFFF88',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: glowIntensity.value * 1.5,
              shadowRadius: 50 + glowIntensity.value * 25,
            }]}
            resizeMode="contain"
          />
          {/* Additional glow layers for intense effect */}
          <Animated.Image
            source={require('../../assets/images/firefly2.png')}
            style={[styles.fireflyImage, {
              position: 'absolute',
              opacity: glowIntensity.value * 0.7,
              shadowColor: '#FFDD00',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 2.0,
              shadowRadius: 70,
            }]}
            resizeMode="contain"
          />
          <Animated.Image
            source={require('../../assets/images/firefly2.png')}
            style={[styles.fireflyImage, {
              position: 'absolute',
              opacity: glowIntensity.value * 0.4,
              shadowColor: '#FFFFFF',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 2.5,
              shadowRadius: 90,
            }]}
            resizeMode="contain"
          />
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function HomePage() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/home_bg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.firefliesContainer}>
          {messages.map((msg) => (
            <Firefly key={msg.id} message={msg} />
          ))}
        </View>
      </ImageBackground>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001122',
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 50,
  },
  firefliesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    width: '100%',
    pointerEvents: 'box-none',
  },
  fireflyTouch: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fireflyImage: {
    width: 35,
    height: 35,
    shadowColor: '#FFFF00',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1.0,
    shadowRadius: 50,
  },
  circularGlow: {
    shadowColor: '#FFFF00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 5,
  },
  jarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  jarWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  jar: {
    width: 200,
    height: 300,
  },
  jarFillMask: {
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lidContainer: {
    position: 'absolute',
    top: -10, // Position above the jar
    alignItems: 'center',
    justifyContent: 'center',
  },
  lid: {
    width: 80,
    height: 20,
    backgroundColor: '#8B4513', // Brown color for the lid
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#654321',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  middleSpace: {
    flex: 1,
  },
  customJar: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  customFirefly: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFD700',
    shadowColor: '#FFFF88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1.5,
    shadowRadius: 20,
    elevation: 15,
  },
  smallJarBody: {
    width: 80,
    height: 100,
    backgroundColor: 'rgba(135, 206, 250, 0.15)',
    borderWidth: 2.5,
    borderColor: 'rgba(70, 130, 180, 0.5)',
    borderRadius: 12,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    shadowColor: '#87CEEB',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    // Inner glow effect
    overflow: 'hidden',
  },
  smallJarNeck: {
    width: 35,
    height: 20,
    backgroundColor: 'rgba(135, 206, 250, 0.15)',
    borderWidth: 2.5,
    borderColor: 'rgba(70, 130, 180, 0.5)',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomWidth: 0,
    position: 'absolute',
    top: -18,
    shadowColor: '#87CEEB',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
  },
  smallJarRim: {
    width: 40,
    height: 5,
    backgroundColor: 'rgba(70, 130, 180, 0.7)',
    borderRadius: 20,
    position: 'absolute',
    top: -18,
    shadowColor: '#4682B4',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 12,
  },
  jarBody: {
    width: 140,
    height: 200,
    backgroundColor: 'rgba(135, 206, 250, 0.3)', // Light blue with transparency
    borderWidth: 3,
    borderColor: 'rgba(70, 130, 180, 0.6)',
    borderRadius: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: '#87CEEB',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  jarNeck: {
    width: 60,
    height: 40,
    backgroundColor: 'rgba(135, 206, 250, 0.3)',
    borderWidth: 3,
    borderColor: 'rgba(70, 130, 180, 0.6)',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomWidth: 0,
    position: 'absolute',
    top: -35,
    shadowColor: '#87CEEB',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
  },
  jarRim: {
    width: 70,
    height: 8,
    backgroundColor: 'rgba(70, 130, 180, 0.8)',
    borderRadius: 35,
    position: 'absolute',
    top: -35,
    shadowColor: '#4682B4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 12,
  },
  explosionContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  explosionCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#FFD700',
    shadowColor: '#FFFF00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 50,
    elevation: 10,
  },
  magicalExplosionContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  centralGlow: {
    position: 'absolute',
    width: width * 2.0,  // Much larger central glow
    height: width * 2.0,
    borderRadius: width * 1.0,
    backgroundColor: '#FFFFFF',
    shadowColor: '#FFFF00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 3,
    shadowRadius: 200,
    elevation: 40,
  },
  innerGlow: {
    position: 'absolute',
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: width * 0.75,
    backgroundColor: '#FFFF88',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 2.5,
    shadowRadius: 150,
    elevation: 42,
  },
  outerGlow: {
    position: 'absolute',
    width: width * 2.5,  // Massive outer glow
    height: width * 2.5,
    borderRadius: width * 1.25,
    backgroundColor: '#FFD700',
    shadowColor: '#FFAA00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 2,
    shadowRadius: 250,
    elevation: 38,
  },
  explosionRay: {
    position: 'absolute',
    width: 6,
    height: height * 1.5,  // Much longer - extends beyond screen
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
    top: -height * 0.75,
    shadowColor: '#FFFF00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 3,
    shadowRadius: 40,
    elevation: 25,
  },
  explosionRaySparkle: {
    position: 'absolute',
    width: 3,
    height: height * 1.3,
    backgroundColor: '#FFDD00',
    borderRadius: 1.5,
    top: -height * 0.65,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 2.5,
    shadowRadius: 30,
    elevation: 27,
  },
  mainExplosionRay: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderTopWidth: height * 1.2,  // Extends well beyond screen
    borderBottomWidth: 0,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FFFF00',
    top: -height * 1.2,
    shadowColor: '#FFDD00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 3.5,
    shadowRadius: 60,
    elevation: 30,
  },
  mainRaySparkle: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: height * 1.0,
    borderBottomWidth: 0,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FFFFFF',
    top: -height * 1.0,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 4,
    shadowRadius: 50,
    elevation: 32,
  },
  subExplosionRay: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: height * 0.8,
    borderBottomWidth: 0,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FFDD00',
    top: -height * 0.8,
    shadowColor: '#FFFF88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 2.5,
    shadowRadius: 35,
    elevation: 26,
  },
  explosionParticle: {
    position: 'absolute',
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: '#FFD700',
    shadowColor: '#FFFF88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1.2,
    shadowRadius: 20,
    elevation: 12,
  },
  explosionWave: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFDD00',
    backgroundColor: 'transparent',
    shadowColor: '#FFFF88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 25,
  },
  glitterParticle: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 15,
  },
  sparkleParticle: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FFFFFF',
    borderBottomColor: '#FFFFFF',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 20,
  },
  intenseExplosionRay: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderTopWidth: height * 1.4,  // Super long rays like reference
    borderBottomWidth: 0,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FFFFFF',
    top: -height * 1.4,
    shadowColor: '#FFFF00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 4,
    shadowRadius: 80,
    elevation: 35,
  },
});
