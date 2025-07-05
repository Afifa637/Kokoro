import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import Colors from '../../constants/Colors';

/* --- mock data ------------------------------------ */
const following = [
  {
    id: 'u10',
    name: 'MapleInk',
    avatar: 'https://raw.githubusercontent.com/Afifa637/assets/main/avatars/b1.png',
  },
  {
    id: 'u11',
    name: 'CloudBound',
    avatar: 'https://raw.githubusercontent.com/Afifa637/assets/main/avatars/b2.png',
  },
  {
    id: 'u12',
    name: 'SunlitVerses',
    avatar: 'https://raw.githubusercontent.com/Afifa637/assets/main/avatars/b3.png',
  },
];

/* --- row component -------------------------------- */
const PersonRow = ({
  name,
  avatar,
  theme,
}: {
  name: string;
  avatar: string;
  theme: typeof Colors.light;
}) => (
  <View style={[styles.row, { backgroundColor: theme.card }]}>
    <Image source={{ uri: avatar }} style={styles.avatar} />
    <ThemedText style={{ flex: 1, color: theme.text }}>{name}</ThemedText>
    {/* optional unfollow button */}
    <TouchableOpacity>
      <Ionicons name="remove-circle-outline" size={20} color={theme.iconColorFocused} />
    </TouchableOpacity>
  </View>
);

/* --- screen --------------------------------------- */
const FollowingList: React.FC = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <ThemedView style={styles.container}>
      <LinearGradient colors={[theme.background, theme.backgroundAlt]} style={StyleSheet.absoluteFill} />

      {/* header */}
      <View style={styles.header}>
        <Ionicons name="chevron-back" size={24} color={theme.tint} onPress={() => router.back()} />
        <ThemedText title style={[styles.title, { color: theme.tint }]}>
          Following
        </ThemedText>
        <View style={{ width: 24 }} />
      </View>

      {/* list */}
      <FlatList
        data={following}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => <PersonRow {...item} theme={theme} />}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
      />
    </ThemedView>
  );
};

export default FollowingList;

/* --- styles --------------------------------------- */
const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 14,
    marginBottom: 4,
  },
  title: { fontFamily: 'GochiHand-Regular', fontSize: 22 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  avatar: { width: 36, height: 36, borderRadius: 18, marginRight: 12 },
});
