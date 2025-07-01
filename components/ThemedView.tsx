import { StyleProp, View, ViewStyle, useColorScheme, type ViewProps } from 'react-native'
import Colors from '../constants/Colors';

interface ThemedViewProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export function ThemedView ({ style, children, ...props }: ThemedViewProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];


  return (
    <View 
    style={[{ backgroundColor: theme.background }, style]}
        {...props}
       >
          {children}
       </View> 
  )
}

export default ThemedView;