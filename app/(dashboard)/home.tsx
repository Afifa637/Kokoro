import React, { useEffect } from 'react';
import { Alert, Dimensions, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import TopNavigation from '../../components/TopNavigation';


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
  // Random starting position - constrained to stay below TopNavigation
  const topNavHeight = 100; // Height of TopNavigation + safe area
  const x = useSharedValue(Math.random() * width);
  const y = useSharedValue(topNavHeight + Math.random() * (height * 0.8 - topNavHeight));
  const opacity = useSharedValue(0.6 + Math.random() * 0.4);
  const scale = useSharedValue(0.8 + Math.random() * 0.3);
  const glowIntensity = useSharedValue(0.8);
  const wingFlutter = useSharedValue(0);
  const rotation = useSharedValue(Math.random() * 30 - 15);
  
  // Remove circular glow from regular fireflies - only main Firefly should have it
  const circularGlowScale = useSharedValue(0);
  const circularGlowOpacity = useSharedValue(0);
  
  // Remove subtle circular enhancement from regular fireflies
  const subtleGlow = useSharedValue(0.3 + Math.random() * 0.2);
  
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
      
      // Keep fireflies in area with smooth redirects - constrained below TopNavigation
      const topNavHeight = 100; // Height of TopNavigation + safe area
      if (currentY < topNavHeight) {
        y.value = topNavHeight + 20; // Keep 20px below TopNavigation
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

    // Subtle glow animation
    subtleGlow.value = withRepeat(
      withSequence(
        withTiming(0.5, { duration: (2000 + Math.random() * 1000) / glowSpeed }),
        withTiming(0.2, { duration: (1500 + Math.random() * 800) / glowSpeed })
      ),
      -1,
      true
    );

    return () => clearInterval(interval);
  }, [glowIntensity, opacity, speedMultiplier, wingFlutter, x, y, velocityX, velocityY, rotation, subtleGlow]);



  const animatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    transform: [
      { translateX: x.value },
      { translateY: y.value },
      { scale: scale.value },
      { rotate: rotation.value + 'deg' },
    ],
    opacity: opacity.value,
  }));

  const wingAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotateY: wingFlutter.value + 'deg' },
    ],
  }));

  const circularGlowStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFD700',
    opacity: circularGlowOpacity.value,
    transform: [
      { scale: circularGlowScale.value }
    ],
  }));

  const subtleGlowStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFD700',
    opacity: subtleGlow.value * 0.3,
    transform: [
      { scale: 0.8 }
    ],
  }));

  // Animated styles for firefly images
  const mainFireflyImageStyle = useAnimatedStyle(() => ({
    opacity: glowIntensity.value,
    shadowOpacity: glowIntensity.value * 1.5,
    shadowRadius: 50 + glowIntensity.value * 25,
  }));

  const glowLayerStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    opacity: glowIntensity.value * 0.7,
    shadowOpacity: 2.0,
    shadowRadius: 70,
  }));

  const whiteGlowLayerStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    opacity: glowIntensity.value * 0.4,
    shadowOpacity: 2.5,
    shadowRadius: 90,
  }));

  const handlePress = () => {
    // Show the message using React Native Alert
    Alert.alert('Firefly Message', message.text);
    
    // Circular glow effect
    circularGlowScale.value = withSequence(
      withTiming(1, { duration: 200, easing: Easing.out(Easing.quad) }),
      withTiming(1.2, { duration: 400, easing: Easing.inOut(Easing.quad) }),
      withTiming(0, { duration: 300 }) // Fade out
    );
    
    circularGlowOpacity.value = withSequence(
      withTiming(0.8, { duration: 100 }),
      withTiming(0.6, { duration: 500 }),
      withTiming(0, { duration: 300 }) // Fade out
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
  };

  return (
    <Animated.View style={animatedStyle}>
      {/* Subtle circular enhancement behind firefly */}
      <Animated.View style={[subtleGlowStyle, styles.subtleGlow]} />
      
      {/* Circular glow effect for tap */}
      <Animated.View style={[circularGlowStyle, styles.circularGlow]} />
      
      <TouchableOpacity 
        onPress={handlePress} 
        hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}
        style={[styles.fireflyTouch, { zIndex: 1000 }]}
        activeOpacity={0.7}
      >
        <Animated.View style={wingAnimatedStyle}>
          <Animated.Image
            source={require('../../assets/images/firefly3.png')}
            style={[styles.fireflyImage, mainFireflyImageStyle]}
            resizeMode="contain"
          />
          {/* Additional glow layers for intense effect */}
          <Animated.Image
            source={require('../../assets/images/firefly3.png')}
            style={[styles.fireflyImageGlow, glowLayerStyle]}
            resizeMode="contain"
          />
          <Animated.Image
            source={require('../../assets/images/firefly3.png')}
            style={[styles.fireflyImageWhiteGlow, whiteGlowLayerStyle]}
            resizeMode="contain"
          />
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const JarFirefly = ({ id }: { id: number }) => {
  const x = useSharedValue(Math.random() * 80 + 110); // Adjusted bounds (110-190px from center)
  const y = useSharedValue(Math.random() * 150 + 120); // Adjusted bounds (120-270px from top)
  const opacity = useSharedValue(0.3 + Math.random() * 0.2);
  const scale = useSharedValue(0.4 + Math.random() * 0.2);

  useEffect(() => {
    // Blurry movement within jar (slower and more natural)
    const moveInJar = () => {
      const targetX = Math.random() * 80 + 110; // Keep within 110-190px
      const targetY = Math.random() * 150 + 120; // Keep within 120-270px
      
      x.value = withTiming(targetX, {
        duration: 4000 + Math.random() * 3000, // Slower movement (was 3000 + 2000)
        easing: Easing.inOut(Easing.sin),
      });
      
      y.value = withTiming(targetY, {
        duration: 4000 + Math.random() * 3000, // Slower movement (was 3000 + 2000)
        easing: Easing.inOut(Easing.sin),
      });
    };

    moveInJar();
    const interval = setInterval(() => {
      // Ensure fireflies stay within jar bounds
      if (x.value < 110) x.value = 110;
      if (x.value > 190) x.value = 190;
      if (y.value < 120) y.value = 120;
      if (y.value > 270) y.value = 270;
      
      moveInJar();
    }, 4000 + Math.random() * 3000); // Slower interval (was 3000 + 2000)

    // Blurry glow animation (slower)
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.5, { duration: 2000 + Math.random() * 1500 }), // Slower glow
        withTiming(0.2, { duration: 1500 + Math.random() * 1000 }) // Slower glow
      ),
      -1,
      true
    );

    return () => clearInterval(interval);
  }, [x, y, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: x.value - 14, // Center the firefly (28px width / 2)
    top: y.value - 14,  // Center the firefly (28px height / 2)
    transform: [
      { scale: scale.value },
    ],
    opacity: opacity.value,
    zIndex: 10, // Ensure fireflies appear on top of jar
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Animated.Image
        source={require('../../assets/images/firefly3.png')}
        style={styles.jarFireflyImage}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

const LowerJarFirefly = ({ id }: { id: number }) => {
  const x = useSharedValue(Math.random() * 80 + 110); // Same horizontal bounds (110-190px from center)
  const y = useSharedValue(Math.random() * 100 + 250); // Lower positioning (250-350px from top)
  const opacity = useSharedValue(0.3 + Math.random() * 0.2);
  const scale = useSharedValue(0.4 + Math.random() * 0.2);

  useEffect(() => {
    // Blurry movement within lower jar area (slower and more natural)
    const moveInJar = () => {
      const targetX = Math.random() * 80 + 110; // Keep within 110-190px
      const targetY = Math.random() * 100 + 250; // Keep within 250-350px
      
      x.value = withTiming(targetX, {
        duration: 4000 + Math.random() * 3000,
        easing: Easing.inOut(Easing.sin),
      });
      
      y.value = withTiming(targetY, {
        duration: 4000 + Math.random() * 3000,
        easing: Easing.inOut(Easing.sin),
      });
    };

    moveInJar();
    const interval = setInterval(() => {
      // Ensure fireflies stay within lower jar bounds
      if (x.value < 110) x.value = 110;
      if (x.value > 190) x.value = 190;
      if (y.value < 250) y.value = 250;
      if (y.value > 350) y.value = 350;
      
      moveInJar();
    }, 4000 + Math.random() * 3000);

    // Blurry glow animation (slower)
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.5, { duration: 2000 + Math.random() * 1500 }),
        withTiming(0.2, { duration: 1500 + Math.random() * 1000 })
      ),
      -1,
      true
    );

    return () => clearInterval(interval);
  }, [x, y, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: x.value - 14, // Center the firefly (28px width / 2)
    top: y.value - 14,  // Center the firefly (28px height / 2)
    transform: [
      { scale: scale.value },
    ],
    opacity: opacity.value,
    zIndex: 10, // Ensure fireflies appear on top of jar
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Animated.Image
        source={require('../../assets/images/firefly3.png')}
        style={styles.jarFireflyImage}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

const BottomJarFirefly = ({ id }: { id: number }) => {
  const x = useSharedValue(Math.random() * 60 + 120); // Slightly tighter horizontal bounds (120-180px from center)
  const y = useSharedValue(Math.random() * 80 + 350); // Bottom positioning (350-430px from top)
  const opacity = useSharedValue(0.3 + Math.random() * 0.2);
  const scale = useSharedValue(0.3 + Math.random() * 0.15); // Slightly smaller for bottom area

  useEffect(() => {
    // Blurry movement within bottom jar area (slower and more natural)
    const moveInJar = () => {
      const targetX = Math.random() * 60 + 120; // Keep within 120-180px
      const targetY = Math.random() * 80 + 350; // Keep within 350-430px
      
      x.value = withTiming(targetX, {
        duration: 5000 + Math.random() * 3000, // Even slower for bottom area
        easing: Easing.inOut(Easing.sin),
      });
      
      y.value = withTiming(targetY, {
        duration: 5000 + Math.random() * 3000, // Even slower for bottom area
        easing: Easing.inOut(Easing.sin),
      });
    };

    moveInJar();
    const interval = setInterval(() => {
      // Ensure fireflies stay within bottom jar bounds
      if (x.value < 120) x.value = 120;
      if (x.value > 180) x.value = 180;
      if (y.value < 350) y.value = 350;
      if (y.value > 430) y.value = 430;
      
      moveInJar();
    }, 5000 + Math.random() * 3000);

    // Blurry glow animation (slower)
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.4, { duration: 2500 + Math.random() * 1500 }),
        withTiming(0.15, { duration: 2000 + Math.random() * 1000 })
      ),
      -1,
      true
    );

    return () => clearInterval(interval);
  }, [x, y, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: x.value - 12, // Center the firefly (24px width / 2)
    top: y.value - 12,  // Center the firefly (24px height / 2)
    transform: [
      { scale: scale.value },
    ],
    opacity: opacity.value,
    zIndex: 10, // Ensure fireflies appear on top of jar
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Animated.Image
        source={require('../../assets/images/firefly3.png')}
        style={styles.bottomJarFireflyImage}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

const ExtraBottomJarFirefly = ({ id }: { id: number }) => {
  const x = useSharedValue(Math.random() * 50 + 125); // Even tighter horizontal bounds (125-175px from center)
  const y = useSharedValue(Math.random() * 60 + 420); // Absolute bottom positioning (420-480px from top)
  const opacity = useSharedValue(0.25 + Math.random() * 0.15);
  const scale = useSharedValue(0.25 + Math.random() * 0.1); // Even smaller for absolute bottom area

  useEffect(() => {
    // Very slow movement within absolute bottom jar area
    const moveInJar = () => {
      const targetX = Math.random() * 50 + 125; // Keep within 125-175px
      const targetY = Math.random() * 60 + 420; // Keep within 420-480px
      
      x.value = withTiming(targetX, {
        duration: 6000 + Math.random() * 4000, // Very slow for absolute bottom
        easing: Easing.inOut(Easing.sin),
      });
      
      y.value = withTiming(targetY, {
        duration: 6000 + Math.random() * 4000, // Very slow for absolute bottom
        easing: Easing.inOut(Easing.sin),
      });
    };

    moveInJar();
    const interval = setInterval(() => {
      // Ensure fireflies stay within absolute bottom jar bounds
      if (x.value < 125) x.value = 125;
      if (x.value > 175) x.value = 175;
      if (y.value < 420) y.value = 420;
      if (y.value > 480) y.value = 480;
      
      moveInJar();
    }, 6000 + Math.random() * 4000);

    // Very subtle glow animation
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.35, { duration: 3000 + Math.random() * 2000 }),
        withTiming(0.1, { duration: 2500 + Math.random() * 1500 })
      ),
      -1,
      true
    );

    return () => clearInterval(interval);
  }, [x, y, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: x.value - 10, // Center the firefly (20px width / 2)
    top: y.value - 10,  // Center the firefly (20px height / 2)
    transform: [
      { scale: scale.value },
    ],
    opacity: opacity.value,
    zIndex: 10, // Ensure fireflies appear on top of jar
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Animated.Image
        source={require('../../assets/images/firefly3.png')}
        style={styles.extraBottomJarFireflyImage}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

const EscapingButterfly = ({ id }: { id: number }) => {
  const x = useSharedValue(150); // Start from larger jar mouth center (300px / 2)
  const y = useSharedValue(45); // Start from jar mouth
  const opacity = useSharedValue(1);
  const scale = useSharedValue(0.6);
  const rotation = useSharedValue(0);

  useEffect(() => {
    const delay = id * 1200; // Longer stagger for more natural timing
    
    setTimeout(() => {
      // Escape animation (slower and more natural)
      const targetX = 150 + (Math.random() - 0.5) * 200;
      const targetY = -100 - Math.random() * 100;
      
      x.value = withTiming(targetX, {
        duration: 4000, // Slower escape
        easing: Easing.out(Easing.sin),
      });
      
      y.value = withTiming(targetY, {
        duration: 4000, // Slower escape
        easing: Easing.out(Easing.sin),
      });
      
      // Fade out as it escapes (slower)
      opacity.value = withTiming(0, {
        duration: 4000, // Slower fade
        easing: Easing.out(Easing.sin),
      });
      
      // Gentle rotation (slower)
      rotation.value = withTiming((Math.random() - 0.5) * 40, {
        duration: 3000, // Slower rotation
        easing: Easing.out(Easing.sin),
      });
      
      // Scale slightly up (slower)
      scale.value = withTiming(0.8, {
        duration: 2000, // Slower scale
        easing: Easing.out(Easing.sin),
      });
      
    }, delay);
  }, [id, x, y, opacity, scale, rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    transform: [
      { translateX: x.value },
      { translateY: y.value },
      { scale: scale.value },
      { rotate: rotation.value + 'deg' },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Animated.Image
        source={require('../../assets/images/firefly3.png')}
        style={styles.escapingButterflyImage}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

const JarMouthFirefly = ({ id }: { id: number }) => {
  const x = useSharedValue(145 + Math.random() * 10);
  const y = useSharedValue(8 + Math.random() * 8);
  const opacity = useSharedValue(0.6 + Math.random() * 0.2);
  const scale = useSharedValue(0.3 + Math.random() * 0.1);
  const glowIntensity = useSharedValue(0.7);
  const rotation = useSharedValue(Math.random() * 20 - 10);

  useEffect(() => {
    const escapeLoop = () => {
      // Reset to jar mouth position
      x.value = 145 + Math.random() * 10;
      y.value = 8 + Math.random() * 8;
      opacity.value = 0.6 + Math.random() * 0.2;
      scale.value = 0.3 + Math.random() * 0.1;
      
      const delay = id * 1500;
      
      setTimeout(() => {
        // Hover around jar mouth
        const hoverDuration = 3000 + Math.random() * 2000;
        const hoverX = 145 + Math.random() * 10;
        const hoverY = 8 + Math.random() * 8;
        
        x.value = withTiming(hoverX, {
          duration: hoverDuration,
          easing: Easing.out(Easing.quad),
        });
        
        y.value = withTiming(hoverY, {
          duration: hoverDuration,
          easing: Easing.out(Easing.quad),
        });
        
        setTimeout(() => {
          // Escape trajectory
          let targetX, targetY;
          
          if (id === 1) {
            targetX = -100;
            targetY = height * 0.25;
          } else if (id === 2) {
            targetX = width + 100;
            targetY = height * 0.3;
          } else {
            targetX = width * 0.4;
            targetY = -80;
          }
          
          // Escape animation
          x.value = withTiming(targetX, {
            duration: 6000,
            easing: Easing.out(Easing.sin),
          });
          
          y.value = withTiming(targetY, {
            duration: 6000,
            easing: Easing.out(Easing.sin),
          });
          
          // Fade out during escape
          opacity.value = withTiming(0, {
            duration: 5000,
            easing: Easing.out(Easing.sin),
          });
          
          // Scale up slightly
          scale.value = withTiming(0.7, {
            duration: 4000,
            easing: Easing.out(Easing.sin),
          });
          
          // After escape, restart
          setTimeout(() => {
            escapeLoop();
          }, 6000);
          
        }, hoverDuration);
      }, delay);
    };
    
    escapeLoop();
    
    // Basic animations
    glowIntensity.value = withRepeat(
      withSequence(
        withTiming(0.4, { duration: 1600 + Math.random() * 600 }),
        withTiming(0.9, { duration: 1400 + Math.random() * 800 })
      ),
      -1,
      true
    );
    
    rotation.value = withRepeat(
      withSequence(
        withTiming(-5, { duration: 3000 + Math.random() * 1000 }),
        withTiming(5, { duration: 2800 + Math.random() * 1200 })
      ),
      -1,
      true
    );
    
  }, [x, y, opacity, glowIntensity, rotation, scale, id]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: x.value },
        { translateY: y.value },
        { scale: scale.value },
        { rotate: rotation.value + 'deg' },
      ],
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[styles.fireflyTouch, animatedStyle]}>
      <View style={[styles.jarMouthFireflySmallImage, {
        backgroundColor: '#FFD700',
        borderRadius: 6,
        width: 12,
        height: 12,
        shadowColor: '#FFD700',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
      }]} />
    </Animated.View>
  );
};

export default function HomePage() {
  const handleSearchPress = () => {
    // Add your search logic here
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/home_bg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Top Navigation */}
        <TopNavigation 
          onSearchPress={handleSearchPress}
        />

        {/* Main content container with padding for TopNavigation */}
        <View style={styles.contentContainer}>
          <View style={[styles.firefliesContainer, { zIndex: 100 }]}>
            {messages.map((msg) => (
              <Firefly key={msg.id} message={msg} />
            ))}
          </View>
          
          {/* Jar with internal fireflies and escaping butterflies */}
          <View style={[styles.jarContainer, { zIndex: 50 }]}>
            <View style={styles.jarWrapper}>
              {/* Jar image - rendered first so it's behind fireflies */}
              <Animated.Image
                source={require('../../assets/images/latest_jar.png')}
                style={styles.jar}
                resizeMode="contain"
              />
              
              {/* Internal jar fireflies - rendered after jar so they appear on top */}
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
                <JarFirefly key={`jar-${id}`} id={id} />
              ))}
              
              {/* Additional jar fireflies positioned lower but still inside jar */}
              {[11, 12, 13, 14, 15, 16, 17, 18].map((id) => (
                <LowerJarFirefly key={`jar-lower-${id}`} id={id} />
              ))}
              
              {/* Bottom jar fireflies - fill the very bottom of the jar */}
              {[19, 20, 21, 22, 23, 24].map((id) => (
                <BottomJarFirefly key={`jar-bottom-${id}`} id={id} />
              ))}
              
              {/* Extra bottom jar fireflies - even lower in the jar */}
              {[25, 26, 27, 28, 29, 30].map((id) => (
                <ExtraBottomJarFirefly key={`jar-extra-bottom-${id}`} id={id} />
              ))}
              
              {/* Jar mouth fireflies - escaped fireflies around jar mouth */}
            {[1, 2, 3].map((id) => (
              <JarMouthFirefly 
                key={`mouth-${id}`} 
                id={id} 
              />
            ))}
            
            {/* Escaping butterflies */}
            {[1, 2, 3].map((id) => (
              <EscapingButterfly key={`escape-${id}`} id={id} />
            ))}
          </View>
        </View>
        
        {/* Grass backgrounds at bottom of screen */}
        <Animated.Image
          source={require('../../assets/images/grassbg.png')}
          style={styles.grassBackground}
          resizeMode="cover"
        />
        
        <Animated.Image
          source={require('../../assets/images/grassbg2.png')}
          style={styles.grassBackground2}
          resizeMode="cover"
        />
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
  contentContainer: {
    flex: 1,
    width: '100%',
    paddingTop: 100, // Space for TopNavigation (about 70px + safe area)
  },
  firefliesContainer: {
    position: 'absolute',
    top: 100, // Start below TopNavigation
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    width: '100%',
    pointerEvents: 'auto',
    zIndex: 100,
  },
  fireflyTouch: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 50,
    minHeight: 50,
    zIndex: 1000,
  },
  fireflyImage: {
    width: 24,
    height: 24,
    shadowColor: '#FFFF88',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1.0,
    shadowRadius: 50,
  },
  fireflyImageGlow: {
    width: 24,
    height: 24,
    shadowColor: '#FFDD00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 2.0,
    shadowRadius: 70,
  },
  fireflyImageWhiteGlow: {
    width: 24,
    height: 24,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 2.5,
    shadowRadius: 90,
  },
  circularGlow: {
    shadowColor: '#FFFF00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
  },
  subtleGlow: {
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 3,
  },
  jarContainer: {
    position: 'absolute',
    bottom: -150, // Moved lower - was -100, now -150
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 40,
  },
  grassBackground: {
    position: 'absolute',
    bottom: -100, // Extend below the screen
    left: 0,
    right: 0,
    width: '100%',
    height: 650, // Taller to reach behind navbar
    zIndex: 50,
  },
  grassBackground2: {
    position: 'absolute',
    bottom: -100, // Extend below screen like grassbg.png
    left: 0,
    right: 0,
    width: '100%',
    height: 400, // Taller to reach behind navbar
    zIndex: 51,
  },
  jarWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 520,
  },
  jar: {
    width: 300,
    height: 520,
    zIndex: 1,
  },
  jarFireflyImage: {
    width: 28,
    height: 28,
    shadowColor: '#FFFF88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1.0,
    shadowRadius: 18,
    opacity: 0.7,
  },
  bottomJarFireflyImage: {
    width: 24,
    height: 24,
    shadowColor: '#FFFF88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    opacity: 0.6,
  },
  extraBottomJarFireflyImage: {
    width: 20,
    height: 20,
    shadowColor: '#FFFF88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    opacity: 0.5,
  },
  jarMouthFireflyImage: {
    width: 32,
    height: 32,
    shadowColor: '#FFFF88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1.5,
    shadowRadius: 25,
    opacity: 0.9,
  },
  jarMouthFireflySmallImage: {
    width: 20,
    height: 20,
    shadowColor: '#FFFF88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1.0,
    shadowRadius: 15,
    opacity: 0.7,
  },
  jarMouthFireflyBaseImage: {
    shadowColor: '#FFFF88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 2.0,
  },
  jarMouthFireflyGlowImage: {
    shadowColor: '#FFDD00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 2.5,
  },
  jarMouthFireflyWhiteGlowImage: {
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 3.0,
  },
  escapingButterflyImage: {
    width: 18,
    height: 18,
    shadowColor: '#FFDD00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1.2,
    shadowRadius: 20,
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
