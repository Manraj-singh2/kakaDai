import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Song } from '../data/songs';

const CARD_WIDTH = 200;

interface LargeSongCardProps {
  song: Song;
  onPress: () => void;
}

export default function LargeSongCard({ song, onPress }: LargeSongCardProps) {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image 
        source={{ uri: song.artwork }} 
        style={styles.artwork}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {song.title}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {song.artist}
        </Text>
        <Text style={styles.album} numberOfLines={1}>
          {song.album}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginRight: 15,
  },
  artwork: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#1a1a1a',
  },
  info: {
    paddingHorizontal: 4,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  artist: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  album: {
    color: '#666',
    fontSize: 13,
  },
});