import { Slot } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function ChatLayout() {
  return (
    <View style={styles.container}>
      <Slot /> {/* This renders index.tsx or [id].tsx based on route */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'fff', // Or use a themed background
    paddingTop: 40, // Space for header or status bar
  },
});
