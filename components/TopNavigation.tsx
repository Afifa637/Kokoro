import React, { useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import SideDrawer from './SideDrawer'

interface TopNavigationProps {
  onSearchPress?: () => void
}

const TopNavigation: React.FC<TopNavigationProps> = ({ 
  onSearchPress 
}) => {
  const insets = useSafeAreaInsets()
  const [isDrawerVisible, setIsDrawerVisible] = useState(false)

  const handleMenuPress = () => {
    setIsDrawerVisible(true)
  }

  const handleCloseDrawer = () => {
    setIsDrawerVisible(false)
  }

  const handleSettingsPress = () => {
    setIsDrawerVisible(false)
  }

  const handleHelpPress = () => {
    setIsDrawerVisible(false)
  }

  const handleAboutPress = () => {
    setIsDrawerVisible(false)
  }

  const handleRatePress = () => {
    setIsDrawerVisible(false)
  }

  return (
    <>
      <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
        {/* Hamburger Menu */}
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={handleMenuPress}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // Larger touch area
        >
          <View style={styles.hamburgerIcon}>
            <View style={[styles.hamburgerLine, { backgroundColor: '#FFD700', height: 3 }]} />
            <View style={[styles.hamburgerLine, { backgroundColor: '#FFD700', height: 3 }]} />
            <View style={[styles.hamburgerLine, { backgroundColor: '#FFD700', height: 3 }]} />
          </View>
        </TouchableOpacity>

        {/* Search Icon */}
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={onSearchPress}
          activeOpacity={0.7}
        >
          <Image 
            source={require('../assets/images/search_icon.png')} 
            style={styles.searchIcon} 
          />
        </TouchableOpacity>
      </View>

      {/* Side Drawer */}
      <SideDrawer
        isVisible={isDrawerVisible}
        onClose={handleCloseDrawer}
        onSettingsPress={handleSettingsPress}
        onHelpPress={handleHelpPress}
        onAboutPress={handleAboutPress}
        onRatePress={handleRatePress}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000, // Keep high z-index
  },
  iconButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  // Hamburger icon styles
  hamburgerIcon: {
    width: 20,
    height: 16,
    justifyContent: 'space-between',
  },
  hamburgerLine: {
    width: 20,
    height: 2,
    backgroundColor: '#FFD700',
    borderRadius: 1,
  },
  // Search icon styles
  searchIcon: {
    width: 42,
    height: 42,
    tintColor: '#FFD700',
    resizeMode: 'contain',
  },
})

export default TopNavigation
