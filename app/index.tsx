import Spacer from '@/components/Spacer';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => {
        const path = '/login' as const;
        router.push(path);
      }}>
        <Text style={styles.buttonText}>Go to Login Page</Text>
      </Pressable>

      <Spacer height={20} />

      <Pressable style={styles.button} onPress={() => {
        const path = '/home' as const;
        router.push(path);
      }}>
        <Text style={styles.buttonText}>Go to Home Page</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  },
  button: {
    backgroundColor: '#3D82F6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white', fontSize: 16, fontWeight: '600'
  },
});
