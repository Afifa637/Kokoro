import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  Pressable,
  Animated,
  useColorScheme,
  StatusBar,
  Platform,
  ImageBackground,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

import Fireflies from '../../components/Fireflies';
import { ThemedText } from '../../components/ThemedText';
import ThemedButton from '../../components/ThemedButton';
import { Spacer } from '../../components/Spacer';
import Colors from '../../constants/Colors';

const WRITING_CATEGORIES = [
  'Poems',
  'Thoughts',
  'Letters',
  'Dream Logs',
  'Short Stories',
  'One‑Liners',
  'Confessions',
  'Affirmations',
];

const SAMPLE_POSTS = WRITING_CATEGORIES.map((c, i) => ({
  id: `${i + 1}`,
  category: c,
  excerpt: `✎  Sample snippet from ${c.toLowerCase()} …`,
}));

const AVATAR_URL = 'https://raw.githubusercontent.com/Afifa637/assets/main/stickers/firefly_avatar.png';
const PROFILE_BG = require('../../assets/img/profilebg.jpg');

const MOOD_PALETTE = {
  Happy: '#998A2A',
  Sad: '#2E3041',
  Dreamy: '#6A7299',
  Chill: '#2B6A90',
  Excited: '#995F0D',
} as const;

type Mood = keyof typeof MOOD_PALETTE;

export default function ProfileScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [mood, setMood] = useState<Mood>('Happy');
  const moodColor = MOOD_PALETTE[mood];

  const fadeIn = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeIn, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, [fadeIn]);

  const { width } = useWindowDimensions();
  const NUM_COLUMNS = width >= 1024 ? 4 : width >= 768 ? 3 : 2;
  const ITEM_GUTTER = 16 * (NUM_COLUMNS + 1);
  const ITEM_WIDTH = Math.max(120, (width - ITEM_GUTTER) / NUM_COLUMNS);

  const stats = useMemo(() => [
    { label: 'Categories', value: WRITING_CATEGORIES.length },
    { label: 'Entries', value: 32 },
    { label: 'Followers', value: 45, onPress: () => router.push('/(follow)/FollowersList') },
    { label: 'Following', value: 111, onPress: () => router.push('/(follow)/FollowingList') },
  ], [router]);

  const StatItem = ({ label, value, onPress }: { label: string; value: number; onPress?: () => void }) => {
    const scale = useRef(new Animated.Value(1)).current;
    const Container = onPress ? Pressable : View;

    return (
      <Container
        onPress={onPress}
        onPressIn={onPress ? () => Animated.spring(scale, { toValue: 0.9, useNativeDriver: true }).start() : undefined}
        onPressOut={onPress ? () => Animated.spring(scale, { toValue: 1, friction: 4, useNativeDriver: true }).start() : undefined}
        style={styles.statItem}
      >
        <Animated.View style={{ transform: [{ scale }] }}>
          <ThemedText title style={[styles.statNumber, { color: moodColor }]}>{value}</ThemedText>
          <ThemedText style={{ color: theme.text, fontSize: 12 }}>{label}</ThemedText>
        </Animated.View>
      </Container>
    );
  };

  const PostCard = ({ category, excerpt }: { category: string; excerpt: string }) => {
    const translateY = useRef(new Animated.Value(12)).current;
    useEffect(() => {
      Animated.spring(translateY, { toValue: 0, friction: 5, useNativeDriver: true }).start();
    }, []);

    return (
      <Animated.View
        style={[styles.postCard, {
          width: ITEM_WIDTH,
          backgroundColor: theme.card + 'AA',
          borderColor: moodColor,
          opacity: fadeIn,
          transform: [{ translateY }],
        }]}
      >
        <View style={[styles.postCategoryBadge, { backgroundColor: `${moodColor}1A` }]}> 
          <ThemedText style={[styles.postCategory, { color: moodColor }]}>{category}</ThemedText>
        </View>
        <ThemedText style={{ color: theme.text, marginTop: 6, fontSize: 12 }}>{excerpt}</ThemedText>
      </Animated.View>
    );
  };

  return (
    <ImageBackground source={PROFILE_BG} resizeMode="cover" style={[styles.container, { width: '100%', height: '100%' }]}>
      {Platform.OS === 'ios' && <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />}

      <LinearGradient colors={[theme.background + '99', theme.backgroundAlt + '99']} style={StyleSheet.absoluteFill} />
      <View style={StyleSheet.absoluteFill} pointerEvents="none"><Fireflies count={25} /></View>

      <View style={styles.header}>
        <ThemedText title style={[styles.username, { color: moodColor }]}>@anon_firefly</ThemedText>
        <View style={styles.headerIcons}>
          <Ionicons name="notifications-outline" size={24} color={moodColor} style={{ marginRight: 16 }} />
          <Feather name="settings" size={24} color={moodColor} />
        </View>
      </View>

      <View style={styles.infoRow}>
        <Pressable>
          <LinearGradient colors={[theme.tint, moodColor]} style={styles.avatarRing}>
            <Image source={{ uri: AVATAR_URL }} style={styles.avatar} />
          </LinearGradient>
        </Pressable>
        <View style={styles.statsWrapper}>{stats.map((s) => <StatItem key={s.label} {...s} />)}</View>
      </View>

      <View style={styles.bioContainer}>
        <ThemedText style={[styles.bioName, { color: theme.tint }]}>Default‑User ♀︎</ThemedText>
        <ThemedText style={{ color: theme.text }}>I write what I can’t speak. 🌙</ThemedText>
        <Pressable
          style={[styles.moodChip, { backgroundColor: moodColor }]}
          onPress={() => {
            const keys = Object.keys(MOOD_PALETTE) as Mood[];
            setMood(keys[(keys.indexOf(mood) + 1) % keys.length]);
          }}
        >
          <ThemedText style={[styles.moodLabel, { color: theme.background }]}>{mood}</ThemedText>
        </Pressable>
      </View>

      <Spacer height={6} />
      <View style={styles.actionRow}>
        <ThemedButton title="Set Mood" style={{ flex: 1, marginRight: 6, borderColor: moodColor, borderWidth: 1, backgroundColor: theme.card + '99' }} textColor={moodColor} onPress={() => {}} />
        <ThemedButton title="New Post" style={{ flex: 1, marginLeft: 6, borderColor: moodColor, borderWidth: 1, backgroundColor: theme.card + '99' }} textColor={moodColor} onPress={() => {}} />
      </View>

      <FlatList
        data={SAMPLE_POSTS}
        key={NUM_COLUMNS.toString()}
        renderItem={({ item }) => <PostCard {...item} />}
        keyExtractor={(i) => i.id}
        numColumns={NUM_COLUMNS}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 16 }}
        contentContainerStyle={{ paddingBottom: 120, paddingTop: 10 }}
        showsVerticalScrollIndicator={false}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 12 },
  username: { fontFamily: 'GochiHand-Regular', fontSize: 22 },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  infoRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, marginVertical: 12 },
  avatarRing: { padding: 2, borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
  avatar: { width: 90, height: 90, borderRadius: 45 },
  statsWrapper: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', marginLeft: 12 },
  statItem: { marginHorizontal: 4, marginVertical: 4, alignItems: 'center' },
  statNumber: { fontSize: 18, fontWeight: '600' },
  bioContainer: { paddingHorizontal: 16 },
  bioName: { fontWeight: '600', fontFamily: 'GochiHand-Regular' },
  moodChip: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginTop: 6 },
  moodLabel: { fontSize: 12, fontWeight: '600' },
  actionRow: { flexDirection: 'row', paddingHorizontal: 16, marginVertical: 8 },
  postCard: { borderRadius: 12, padding: 12, marginBottom: 16, overflow: 'hidden' },
  postCategoryBadge: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: 8, alignSelf: 'flex-start' },
  postCategory: { fontSize: 12, fontWeight: '600' },
});
