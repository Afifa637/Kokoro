import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ChatDetailScreen() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleSend = () => {
    if (input.trim()) {
      setMessages(prev => [...prev, input.trim()]);
      setInput('');
    }
  };

  const GlowingMessageBubble = ({ text }: { text: string }) => {
    const glowAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 0.6,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, []);

    return (
      <Animated.View style={[styles.lanternBubble, { opacity: glowAnim }]}>
        <Text style={styles.lanternText}>{text}</Text>
      </Animated.View>
    );
  };

  const renderItem = ({ item }: { item: string }) => {
    return <GlowingMessageBubble text={item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.chatWrapper}>
            <FlatList
              data={messages}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.messageContainer}
              renderItem={renderItem}
              keyboardShouldPersistTaps="handled"
            />

            <View 
              // key={keyboardVisible ? 'withKeyboard' : 'withoutKeyboard'}
              style={[styles.inputContainer, 
              {
                  // Only add bottom inset padding if keyboard is NOT visible
                  paddingBottom: keyboardVisible ? insets.bottom : insets.bottom || 12,
              },
            ]}>
              <TextInput
                style={styles.input}
                placeholder="Write a lantern message..."
                placeholderTextColor="#bbb"
                value={input}
                onChangeText={setInput}
              />
              <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
                <Text style={styles.sendButtonText}>➤</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1410',
  },
  chatWrapper: {
    flex: 1,
  },
  messageContainer: {
    padding: 16,
    flexGrow: 1,
  },
  lanternBubble: {
    backgroundColor: 'rgba(255, 210, 120, 0.15)',
    borderColor: '#FFDE8D',
    borderWidth: 0.4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 22,
    marginBottom: 12,
    alignSelf: 'flex-start',
    maxWidth: '75%',
    shadowColor: '#FFDE8D',
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  lanternText: {
    color: '#FFD88C',
    fontSize: 16,
    fontFamily: 'serif',
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: '#3A2E25',
    backgroundColor: '#261D18',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#3C2F25',
    color: '#fff8e1',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 15,
    marginRight: 10,
    borderWidth: 0.4,
    borderColor: '#5E4A3C',
  },
  sendButton: {
    backgroundColor: '#FFDE8D',
    borderRadius: 50,
    padding: 10,
  },
  sendButtonText: {
    color: '#3A2E25',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
