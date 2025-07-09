import { Tabs } from 'expo-router'
import { useEffect } from 'react'
import { Image, ImageBackground, StyleSheet, View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


const NavbarFirefly = ({ id }: { id: number }) => {
  const x = useSharedValue(Math.random() * 350) // Wider range
  const y = useSharedValue(Math.random() * 60 + 10) // Taller range
  const opacity = useSharedValue(0.5 + Math.random() * 0.5) // Brighter
  const scale = useSharedValue(0.8 + Math.random() * 0.4) // Bigger

  useEffect(() => {
    // Floating animation
    const moveFirefly = () => {
      const targetX = Math.random() * 350 // Wider movement
      const targetY = Math.random() * 60 + 10 // Taller movement
      
      x.value = withTiming(targetX, {
        duration: 4000 + Math.random() * 2000,
        easing: Easing.inOut(Easing.sin),
      })
      
      y.value = withTiming(targetY, {
        duration: 4000 + Math.random() * 2000,
        easing: Easing.inOut(Easing.sin),
      })
    }

    moveFirefly()
    const interval = setInterval(moveFirefly, 3000 + Math.random() * 2000)

    // Brighter glowing animation
    opacity.value = withRepeat(
      withSequence(
        withTiming(1.0, { duration: 1500 + Math.random() * 1000 }), // Brighter
        withTiming(0.3, { duration: 1000 + Math.random() * 800 })
      ),
      -1,
      true
    )

    // Subtle scale animation
    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 2000 + Math.random() * 1000 }), // Bigger
        withTiming(0.6, { duration: 1500 + Math.random() * 800 })
      ),
      -1,
      true
    )

    return () => clearInterval(interval)
  }, [x, y, opacity, scale])

  const animatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: x.value,
    top: y.value,
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }))

  return (
    <Animated.View style={[animatedStyle, styles.fireflyDot]} />
  )
}


const DashboardLayout = () => {
  const insets = useSafeAreaInsets()
  
  return (
    <View style={styles.container}>
      {/* Background that shows behind transparent navbar */}
      <ImageBackground
        source={require('../../assets/images/home_bg.png')}
        style={styles.homeBackground}
        resizeMode="cover"
      />
      
      {/* Firefly particles for navbar */}
      {/* <View style={styles.navbarFireflies}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
          <NavbarFirefly key={id} id={id} />
        ))}
      </View> */}
      
      <Tabs 
        screenOptions={{
          tabBarActiveTintColor: '#FFD700', // Soft gold - matches fireflies
          tabBarInactiveTintColor: '#ffffff99', // White with 60% opacity
          tabBarStyle: {
            backgroundColor: 'rgba(3, 44, 52, 1)', // Updated background color
            borderTopWidth: 0, // Remove default border
            height: 70 + insets.bottom, // Taller + safe area
            paddingBottom: insets.bottom + 12, // Safe area + extra padding
            paddingTop: 8,
            borderRadius: 0, // Remove border radius for full width
            shadowColor: 'transparent', // Remove shadow
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0,
            shadowRadius: 0,
            elevation: 0, // Remove Android shadow
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
            marginTop: 4,
          },
          tabBarItemStyle: {
            paddingVertical: 4,
          },
          headerShown: false, // Hide headers
          tabBarHideOnKeyboard: true, // Hide when keyboard appears
        }}
      >
        <Tabs.Screen 
          name="home" 
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Image 
                source={require('../../assets/images/home_icon.png')} 
                style={[styles.tabIcon, { tintColor: color }]} 
              />
            ),
          }}
        />
        <Tabs.Screen 
          name="chat" 
          options={{
            tabBarLabel: 'Chat',
            tabBarIcon: ({ color, size }) => (
              <Image 
                source={require('../../assets/images/chat_icon.png')} 
                style={[styles.tabIcon, { tintColor: color }]} 
              />
            ),
          }}
        />
        <Tabs.Screen 
          name="create" 
          options={{
            tabBarLabel: 'Create',
            tabBarIcon: ({ color, size }) => (
              <Image 
                source={require('../../assets/images/create_icon.png')} 
                style={[styles.tabIcon, { tintColor: color }]} 
              />
            ),
          }}
        />
        <Tabs.Screen 
          name="notifications" 
          options={{
            tabBarLabel: 'Alerts',
            tabBarIcon: ({ color, size }) => (
              <Image 
                source={require('../../assets/images/notification_icon.png')} 
                style={[styles.tabIcon, { tintColor: color }]} 
              />
            ),
          }}
        />
        <Tabs.Screen 
          name="profile" 
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <Image 
                source={require('../../assets/images/profile_icon.png')} 
                style={[styles.tabIcon, { tintColor: color }]} 
              />
            ),
          }}
        />
      </Tabs>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001122',
  },
  homeBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: -1, // Behind everything
  },
  navbarFireflies: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0, // Start from very bottom
    height: 80, // Taller firefly area
    width: '100%',
    pointerEvents: 'none', // Don't interfere with navbar touches
    zIndex: 1000, // Above navbar
  },
  fireflyDot: {
    width: 6, // Bigger dots
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 12, // Bigger glow
    elevation: 10,
  },
  // Tab icon style
  tabIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
})

export default DashboardLayout
