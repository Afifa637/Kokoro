import React from 'react';
import {
  Text,
  Pressable,
  useColorScheme,
  StyleSheet,
  type GestureResponderEvent,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import Colors from '../constants/Colors';

interface ThemedButtonProps {
  title?: string;
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  textColor?: string;
}

const ThemedButton = ({ title, onPress, style, textStyle, textColor, children, ...props }: ThemedButtonProps) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.btn,
        { backgroundColor: theme.primary },
        pressed && styles.pressed,
        style,
      ]}
      {...props}
    >
      {title ? (
        <Text style={[styles.text, { color: theme.text ?? '#000' }, textColor ? {color: textColor}: null, textStyle]}>
          {title}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    padding: 18,
    borderRadius: 6,
    alignItems: 'center',
    marginVertical: 10,
  },
  pressed: {
    opacity: 0.6,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ThemedButton;
