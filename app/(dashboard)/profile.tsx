import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Animated,
  useColorScheme,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Fireflies from '../../components/Fireflies';
import { useRouter } from 'expo-router';
import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import ThemedButton from '../../components/ThemedButton';
import Spacer from '../../components/Spacer';
import Colors from '../../constants/Colors';

const WINDOW_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = (WINDOW_WIDTH - 48) / 2;

const writingCategories = [
  'Poems',
  'Thoughts',
  'Letters',
  'Dream Logs',
  'Short Stories',
  'One‑Liners',
  'Confessions',
  'Affirmations',
];
const samplePosts = writingCategories.map((c, i) => ({
  id: `${i + 1}`,
  category: c,
  excerpt: `✎  Sample snippet from ${c.toLowerCase()} …`,
}));
const sampleSticker =
  'https://raw.githubusercontent.com/Afifa637/assets/main/stickers/firefly_avatar.png';

const moodPalette: Record<string, string> = {
  Happy: '#FFE066',
  Sad: '#4A4E69',
  Dreamy: '#B8C1EC',
  Chill: '#4EA8DE',
  Excited: '#FF9F1C',
};

type Mood = keyof typeof moodPalette;

const ProfileScreen: React.FC = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [mood, setMood] = useState<Mood>('Happy');
  const fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const moodColor = moodPalette[mood];

  const StatButton = ({
    label,
    value,
    onPress,
  }: {
    label: string;
    value: number;
    onPress?: () => void;
  }) => {
    const scale = useRef(new Animated.Value(1)).current;

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPressIn={() =>
          Animated.spring(scale, { toValue: 0.9, useNativeDriver: true }).start()
        }
        onPressOut={() => {
          Animated.spring(scale, { toValue: 1, friction: 4, useNativeDriver: true }).start();
          onPress?.();
        }}
      >
        <Animated.View style={[styles.statsBlock, { transform: [{ scale }] }]}>
          <ThemedText title style={[styles.statNumber, { color: theme.tint }]}>
            {value}
          </ThemedText>
          <ThemedText style={{ color: theme.text }}>{label}</ThemedText>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const PostCard = ({ category, excerpt }: { category: string; excerpt: string }) => {
    const translateY = useRef(new Animated.Value(12)).current;
    useEffect(() => {
      Animated.spring(translateY, {
        toValue: 0,
        friction: 5,
        useNativeDriver: true,
      }).start();
    }, []);
    return (
      <Animated.View
        style={[
          styles.postCard,
          {
            backgroundColor: theme.card,
            opacity: fadeIn,
            transform: [{ translateY }],
            borderColor: moodColor,
            borderWidth: 1,
            shadowColor: moodColor,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 5,
          },
        ]}
      >
        <View style={[styles.postCategoryBadge, { backgroundColor: `${moodColor}44` }]}>
          <ThemedText style={[styles.postCategory, { color: moodColor }]}>{category}</ThemedText>
        </View>
        <ThemedText style={{ color: theme.text, marginTop: 4, fontSize: 12 }}>{excerpt}</ThemedText>
      </Animated.View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <LinearGradient colors={[theme.background, theme.backgroundAlt]} style={StyleSheet.absoluteFill} />
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <Fireflies count={30} />
      </View>

      <View style={styles.header}>
        <ThemedText title style={[styles.username, { color: theme.primary }]}>
          anon_firefly
        </ThemedText>
        <View style={styles.headerIcons}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color={theme.tint}
            style={{ marginRight: 16 }}
          />
          <Feather name="settings" size={24} color={theme.tint} />
        </View>
      </View>

      <View style={styles.infoRow}>
        <Image
          source={{ uri: sampleSticker }}
          style={[styles.avatar, { borderColor: `${theme.tint}55` }]}
        />
        <View style={styles.statsBlock}>
          <ThemedText title style={[styles.statNumber, { color: theme.tint }]}>
            8
          </ThemedText>
          <ThemedText style={{ color: theme.text }}>Categories</ThemedText>
        </View>
        <View style={styles.statsBlock}>
          <ThemedText title style={[styles.statNumber, { color: theme.tint }]}>
            32
          </ThemedText>
          <ThemedText style={{ color: theme.text }}>Entries</ThemedText>
        </View>
        
        <StatButton
          label="Followers"
          value={45}
          onPress={() => router.push('/(follow)/FollowersList')}
        />
        <StatButton
          label="Following"
          value={111}
          onPress={() => router.push('/(follow)/FollowingList')}
        />
      </View>

      <View style={styles.bioContainer}>
        <ThemedText style={[styles.bioName, { color: theme.tint }]}>Default‑User ♀︎</ThemedText>
        <ThemedText style={{ color: theme.text }}>I write what I can’t speak. 🌙</ThemedText>
        <TouchableOpacity
          style={[styles.moodChip, { backgroundColor: moodColor }]}
          onPress={() => {
            const keys = Object.keys(moodPalette) as Mood[];
            setMood(keys[(keys.indexOf(mood) + 1) % keys.length]);
          }}
        >
          <ThemedText style={[styles.moodLabel, { color: theme.background }]}>{mood}</ThemedText>
        </TouchableOpacity>
      </View>

      <Spacer height={6} />
      <View style={styles.actionRow}>
        <ThemedButton
          title="Set Mood"
          style={{ flex: 1, marginRight: 6, borderColor: moodColor, borderWidth: 1 }}
          textColor={moodColor}
          onPress={() => {}}
        />
        <ThemedButton
          title="New Post"
          style={{ flex: 1, marginLeft: 6, borderColor: moodColor, borderWidth: 1 }}
          textColor={moodColor}
          onPress={() => {}}
        />
      </View>

      <FlatList
        data={samplePosts}
        renderItem={({ item }) => <PostCard category={item.category} excerpt={item.excerpt} />}
        keyExtractor={(i) => i.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 16 }}
        contentContainerStyle={{ paddingBottom: 120, paddingTop: 10 }}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  username: { fontFamily: 'GochiHand-Regular', fontSize: 22 },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
    marginVertical: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 45,
    marginRight: 8,
    borderWidth: 2,
  },
  statsBlock: { alignItems: 'center', marginHorizontal: 4 },
  statNumber: { fontSize: 18, fontWeight: '600' },
  bioContainer: { paddingHorizontal: 16 },
  bioName: { fontWeight: '600', fontFamily: 'GochiHand-Regular' },
  moodChip: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 6,
  },
  moodLabel: { fontSize: 12, fontWeight: '600' },
  actionRow: { flexDirection: 'row', paddingHorizontal: 16, marginVertical: 8 },
  postCard: {
    width: ITEM_WIDTH,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  postCategoryBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  postCategory: { fontSize: 12, fontWeight: '600' },
});

export default ProfileScreen;