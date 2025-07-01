import ThemedView from '@/components/ThemedView';

import { StyleSheet, Text} from 'react-native';

export default function ChatScreen() {
  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title}>Welcome to the Chat Page 💬</Text>
      <Text style={styles.subtitle}>Your messages will appear here.</Text>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});
