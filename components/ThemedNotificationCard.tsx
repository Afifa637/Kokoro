import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import ThemedText from './ThemedText';
import Spacer from './Spacer';
import Colors from '../constants/Colors';

interface Props {
  title: string;
  body: string;
  timestamp: string;
  onPress?: () => void;
}

const ThemedNotificationCard = ({ title, body, timestamp, onPress }: Props) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const glow = useSharedValue(1);

  useEffect(() => {
    glow.value = withRepeat(
      withTiming(1.05, { duration: 1200 }),
      -1,
      true
    );
  }, []);

  const animatedGlow = useAnimatedStyle(() => ({
    transform: [{ scale: glow.value }],
  }));

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: pressed ? theme.focus : theme.border,
          shadowColor: theme.shadow,
        },
      ]}
    >
      <Animated.Text
        style={[
          styles.title,
          {
            color: theme.secondary,
            textShadowColor: theme.primary,
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 12,
          },
          animatedGlow,
        ]}
      >
        {title}
      </Animated.Text>

      <Spacer height={6} />
      <ThemedText style={{ color: theme.text }}>{body}</ThemedText>
      <Spacer height={10} />
      <ThemedText style={[styles.timestamp, { color: theme.text }]}>
        {timestamp}
      </ThemedText>
    </Pressable>
  );
};

export default ThemedNotificationCard;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    textAlign: 'left',
  },
  timestamp: {
    fontSize: 12,
    textAlign: 'right',
  },
});