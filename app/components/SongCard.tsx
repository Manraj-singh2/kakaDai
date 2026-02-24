import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Song } from '../data/songs';

const CARD_WIDTH = 160;

interface SongCardProps {
  song: Song;
  onPress: () => void;
}

export default function SongCard({ song, onPress }: SongCardProps) {
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
      <Text style={styles.title} numberOfLines={1}>
        {song.title}
      </Text>
      <Text style={styles.artist} numberOfLines={1}>
        {song.artist}
      </Text>
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
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#1a1a1a',
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  artist: {
    color: '#888',
    fontSize: 13,
  },
});