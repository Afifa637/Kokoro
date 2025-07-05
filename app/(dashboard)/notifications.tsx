import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import Colors from '../../constants/Colors';

/* -------------------------------------------------------------
 * Mock notifications (replace with backend data / context)
 * -----------------------------------------------------------*/
const initialNotifications = [
  {
    id: '1',
    title: 'New Follower',
    message: 'ShadowScribe started following you.',
    time: '5m ago',
    read: false,
    icon: 'person-add',
  },
  {
    id: '2',
    title: 'Post Liked',
    message: 'Your poem "Midnight lanterns" got 12 likes!',
    time: '1h ago',
    read: false,
    icon: 'heart',
  },
  {
    id: '3',
    title: 'Reminder',
    message: 'It’s been a day since you logged a dream 💤',
    time: 'Yesterday',
    read: true,
    icon: 'notifications-outline',
  },
];

/* =================================================================
 * NotificationsScreen
 * =================================================================*/
const NotificationsScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [notifications, setNotifications] = useState(initialNotifications);
  const router = useRouter();

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const renderItem = ({ item }: { item: typeof initialNotifications[0] }) => {
    const opacity = new Animated.Value(1);

    const handlePress = () => {
      if (!item.read) markAsRead(item.id);
      // Optional: animate fade when marking as read
      Animated.timing(opacity, {
        toValue: 0.5,
        duration: 200,
        useNativeDriver: true,
      }).start();
    };

    return (
      <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
        <Animated.View
          style={[
            styles.card,
            {
              backgroundColor: theme.card,
              borderLeftColor: item.read ? theme.border : theme.focus,
              opacity,
            },
          ]}
        >
          <Ionicons
            name={item.icon as any}
            size={20}
            color={item.read ? theme.iconColor : theme.focus}
            style={{ marginRight: 12 }}
          />
          <View style={{ flex: 1 }}>
            <ThemedText style={{ color: theme.text, fontWeight: '600' }}>{item.title}</ThemedText>
            <ThemedText style={{ color: theme.mutedText, marginTop: 2, fontSize: 12 }}>
              {item.message}
            </ThemedText>
          </View>
          <ThemedText style={{ color: theme.mutedText, fontSize: 11 }}>{item.time}</ThemedText>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={[theme.background, theme.backgroundAlt]}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.header}>
        <Ionicons name="chevron-back" size={24} color={theme.tint} onPress={() => router.back()} />
        <ThemedText title style={[styles.title, { color: theme.tint }]}>Notifications</ThemedText>
        <View style={{ width: 24 }} /> {/* Placeholder for balanced header */}
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </ThemedView>
  );
};

/* =================================================================
 * Styles
 * =================================================================*/
const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 14,
    marginBottom: 8,
  },
  title: {
    fontFamily: 'GochiHand-Regular',
    fontSize: 22,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    borderLeftWidth: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default NotificationsScreen;
