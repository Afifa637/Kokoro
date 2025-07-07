import { BlurView } from 'expo-blur'
import React, { useEffect, useRef } from 'react'
import {
  Animated,
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

const { width } = Dimensions.get('window')

interface SideDrawerProps {
  isVisible: boolean
  onClose: () => void
  onSettingsPress?: () => void
  onHelpPress?: () => void
  onAboutPress?: () => void
  onRatePress?: () => void
}

const SideDrawer: React.FC<SideDrawerProps> = ({
  isVisible,
  onClose,
  onSettingsPress,
  onHelpPress,
  onAboutPress,
  onRatePress,
}) => {
  const slideAnim = useRef(new Animated.Value(-width * 0.65)).current // Start off-screen to the left
  
  useEffect(() => {
    if (isVisible) {
      // Slide in from left
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start()
    } else {
      // Slide out to left
      Animated.timing(slideAnim, {
        toValue: -width * 0.65,
        duration: 250,
        useNativeDriver: true,
      }).start()
    }
  }, [isVisible, slideAnim])
  
  if (!isVisible) return null
  
  return (
    <View style={{ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      zIndex: 9999,
      backgroundColor: 'rgba(0, 0, 0, 0.65)' 
    }}>
      <Animated.View style={{ 
        width: '65%', 
        height: '100%', 
        position: 'absolute', 
        left: 0,
        transform: [{ translateX: slideAnim }]
      }}>
        <ImageBackground
          source={require('../assets/images/hambg.png')}
          style={{ flex: 1, width: '100%', height: '100%' }}
          resizeMode="cover"
        >
          <BlurView intensity={10} style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
            <View style={{ paddingTop: 60, paddingHorizontal: 20, marginTop: 40 }}>
              <TouchableOpacity 
                style={{ 
                  padding: 8, 
                  marginBottom: 20, 
                  alignSelf: 'flex-end',
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: 'rgba(255, 215, 0, 0.2)',
                  borderWidth: 2,
                  borderColor: '#FFD700',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onPress={onClose}
              >
                <Text style={{ 
                  color: '#FFD700', 
                  fontSize: 20, 
                  fontWeight: 'bold'
                }}>✕</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={{ paddingVertical: 15, paddingLeft: 20, marginBottom: 12 }}
                onPress={onSettingsPress}
              >
                <Text style={{ 
                  color: '#FFD700', 
                  fontSize: 17, 
                  fontWeight: '600',
                  textDecorationLine: 'underline',
                  textShadowColor: '#000000',
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 2,
                }}>• Settings</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={{ paddingVertical: 15, paddingLeft: 20, marginBottom: 12 }}
                onPress={onHelpPress}
              >
                <Text style={{ 
                  color: '#FFD700', 
                  fontSize: 17, 
                  fontWeight: '600',
                  textDecorationLine: 'underline',
                  textShadowColor: '#000000',
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 2,
                }}>• Help</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={{ paddingVertical: 15, paddingLeft: 20, marginBottom: 12 }}
                onPress={onAboutPress}
              >
                <Text style={{ 
                  color: '#FFD700', 
                  fontSize: 17, 
                  fontWeight: '600',
                  textDecorationLine: 'underline',
                  textShadowColor: '#000000',
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 2,
                }}>• About Us</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={{ paddingVertical: 15, paddingLeft: 20, marginBottom: 12 }}
                onPress={onRatePress}
              >
                <Text style={{ 
                  color: '#FFD700', 
                  fontSize: 17, 
                  fontWeight: '600',
                  textDecorationLine: 'underline',
                  textShadowColor: '#000000',
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 2,
                }}>• Rate App</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </ImageBackground>
      </Animated.View>
    </View>
  )
}

export default SideDrawer
