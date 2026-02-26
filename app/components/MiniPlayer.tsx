import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import { usePlayer } from '../context/PlayerContext';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function MiniPlayer() {
  const router = useRouter();
  const { currentSong, isPlaying, pauseSong, resumeSong } = usePlayer();
  const colorScheme = useColorScheme();

  if (!currentSong) return null;

  const handleOpenPlayer = () => {
    router.push({
      pathname: '/player',
      params: {
        id: currentSong.id,
        title: currentSong.title,
        artist: currentSong.artist,
        album: currentSong.album,
        artwork: currentSong.artwork,
        audioUrl: currentSong.audioUrl,
      },
    });
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseSong();
    } else {
      resumeSong();
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handleOpenPlayer}
      style={styles.container}
    >
      <BlurView
        intensity={90}
        tint={colorScheme === 'dark' ? 'dark' : 'light'}
        style={styles.blurContainer}
      >
        <View style={styles.content}>
          {/* Album Artwork */}
          <Image
            source={{ uri: currentSong.artwork }}
            style={styles.artwork}
          />

          {/* Song Info */}
          <View style={styles.info}>
            <Text style={styles.title} numberOfLines={1}>
              {currentSong.title}
            </Text>
            <Text style={styles.artist} numberOfLines={1}>
              {currentSong.artist}
            </Text>
          </View>

          {/* Play/Pause Button */}
          <TouchableOpacity
            onPress={handlePlayPause}
            style={styles.playButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.playIcon}>
              {isPlaying ? '⏸' : '▶️'}
            </Text>
          </TouchableOpacity>

          {/* Forward Button */}
          <TouchableOpacity
            style={styles.forwardButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.forwardIcon}>⏭</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 95, // Above tab bar (65 + 30 margin)
    left: 8,
    right: 8,
    height: 60,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  blurContainer: {
    flex: 1,
    backgroundColor: 'rgba(28, 28, 30, 0.8)',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  artwork: {
    width: 44,
    height: 44,
    borderRadius: 6,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  artist: {
    color: '#8E8E93',
    fontSize: 13,
  },
  playButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  playIcon: {
    fontSize: 22,
  },
  forwardButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forwardIcon: {
    color: '#8E8E93',
    fontSize: 22,
  },
});