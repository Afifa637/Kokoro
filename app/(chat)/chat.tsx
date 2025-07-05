import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

const chats = [
  { id: '1', name: 'Setsuko' },
  { id: '2', name: 'Seita' },
  { id: '3', name: 'Mother' },
  { id: '4', name: 'Aunt' },
  { id: '5', name: 'Abira' },
  { id: '6', name: 'Naba' },
  { id: '7', name: 'Ismi' },
  { id: '8', name: 'Mingming' },
  { id: '9', name: 'Masha' },
  { id: '10', name: 'Sizuka' },
  { id: '11', name: 'Nonte' },
  { id: '12', name: 'Fonte' },
  { id: '13', name: 'Bubbly' },
];

export default function ChatListScreen() {
  const router = useRouter();
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -4,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 4,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const renderLantern = ({ item }: { item: { id: string; name: string } }) => {
  return (
    <TouchableOpacity onPress={() => router.push(`/(chat)/${item.id}`)}>
      <Animated.View
        style={[
          styles.letterItem,
          {
            transform: [{ translateY: floatAnim }],
          },
        ]}
      >
        <ImageBackground
          source={require('../../assets/images/paper-texture2.jpg')}
          style={[styles.letterItem, { marginBottom: 0}]}
          imageStyle={{ borderRadius: 12, opacity: 0.8 }}
        >
          <Text style={styles.letterSender}>📮 From: {item.name}</Text>
          <View style={styles.letterLine} />
          <Text style={styles.letterPreview}>
            "A letter waiting in the dusk..."
          </Text>
        </ImageBackground>
      </Animated.View>
    </TouchableOpacity>
  );
};


  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/chat-bg.jpg')}
        style={StyleSheet.absoluteFill}
        blurRadius={0.5}
      />
      <LottieView
        source={require('@/assets/animations/fireflies.json')}
        autoPlay
        loop
        style={StyleSheet.absoluteFill}
      />

      <Text style={styles.title}>Messages in the Night</Text>

      <FlatList
        data={chats}
        renderItem={renderLantern}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />

      <Text style={styles.quote}>
        "September 21, 1945… that was the night I died."
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0C0A',
    paddingTop: 20,
  },
  title: {
    fontSize: 26,
    color: '#FFD88C',
    textAlign: 'center',
    fontFamily: 'serif',
    marginBottom: 16,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  lantern: {
    backgroundColor: 'rgba(255, 215, 120, 0.1)',
    borderColor: '#FFD88C',
    borderWidth: 0.5,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 28,
    marginBottom: 18,
    alignItems: 'center',
    shadowColor: '#FFD88C',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
  },
  name: {
    fontSize: 18,
    color: '#FFEBC0',
    fontFamily: 'serif',
  },
  quote: {
    position: 'absolute',
    bottom: 20,
    width: width,
    textAlign: 'center',
    color: '#9E8370',
    fontSize: 12,
    fontStyle: 'italic',
    fontFamily: 'serif',
  },
  letterItem: {
    backgroundColor: 'rgba(244, 236, 216, 0.12)',
    borderColor: '#D1BFA3',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#FFD88C',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  letterSender: {
    fontSize: 15,
    // color: '#FFDEB4',
    color: 'rgba(74, 54, 12, 0.9)',
    fontFamily: 'serif',
    marginBottom: 6,
  },

  letterLine: {
    height: 2,
    backgroundColor: 'rgba(163, 16, 23, 0.3)',
    marginBottom: 8,
    opacity: 1,
  },

  letterPreview: {
    fontSize: 13,
    // color: '#E7D6B0',
    color: 'rgba(84, 81, 75, 0.7)',
    fontStyle: 'italic',
    fontFamily: 'serif',
  },

});
