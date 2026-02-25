import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import HorizontalSongList from '../components/HorizontalSongList';
import SONGS, { Song } from '../data/songs';


export default function HomeScreen() {
  const router = useRouter();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning Pineapple 🍍';
    if (hour < 18) return 'Haaye Oye';
    return 'Oo janada ee';
  };

  const recentlyPlayed = SONGS.slice(0, 5);
  const recommended = SONGS.slice(2, 7);

  const handleSongPress = (song: Song) => {
    router.push({
      pathname: '/player',
      params: {
        id: song.id,
        title: song.title,
        artist: song.artist,
        album: song.album,
        artwork: song.artwork,
        audioUrl: song.audioUrl,
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.greeting}>{getGreeting()}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recently Played</Text>
          <HorizontalSongList
            songs={recentlyPlayed}
            onSongPress={handleSongPress}
            cardSize="large"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Picks</Text>
          <HorizontalSongList
            songs={SONGS}
            onSongPress={handleSongPress}
            cardSize="regular"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
          <HorizontalSongList
            songs={recommended}
            onSongPress={handleSongPress}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  greeting: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 25,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
});