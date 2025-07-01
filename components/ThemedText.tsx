import { useColorScheme, Text, type TextProps, StyleProp,
  TextStyle, } from 'react-native';
import Colors from '../constants/Colors';

interface ThemedTextProps extends TextProps {
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  title?: boolean;
}

export function ThemedText({ style, children, title, ...props }: ThemedTextProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const titleStyle: TextStyle = title
    ? { fontSize: 24, fontWeight: 'bold', textAlign: 'center' }
    : {};

  return (
    <Text style={[{ color: theme.text }, titleStyle, style]} {...props}>
      {children}
    </Text>
  );
}

export default ThemedText;