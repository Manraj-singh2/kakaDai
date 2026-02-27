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
import MiniPlayer from '../components/MiniPlayer';  // Import MiniPlayer
import { usePlayer } from '../context/PlayerContext';  // Import usePlayer
import SONGS, { Song } from '../data/songs';

export default function HomeScreen() {
  const router = useRouter();
  const { playSong } = usePlayer();  // Get playSong from context

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning PineApple 🍍';
    if (hour < 18) return 'Ayye oye';
    return 'O Janda aei';
  };

  const recentlyPlayed = SONGS.slice(0, 5);
  const recommended = SONGS.slice(2, 7);

  const handleSongPress = (song: Song) => {
    // Play song using context (makes it available globally)
    playSong(song);
    
    // Open full player
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

      {/*  Mini Player */}
      <MiniPlayer />
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
    paddingBottom: 170, // Space for mini player + tab bar
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