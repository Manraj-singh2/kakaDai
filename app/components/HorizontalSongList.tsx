import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import SongCard from './SongCard';
import LargeSongCard from './LargeSongCard';
import { Song } from '../data/songs';

interface HorizontalSongListProps {
  songs: Song[];
  onSongPress: (song: Song) => void;
  cardSize?: 'regular' | 'large';  // Add this
}

export default function HorizontalSongList({ 
  songs, 
  onSongPress,
  cardSize = 'regular'  // Default to regular
}: HorizontalSongListProps) {
  
  // Choose which card to use
  const CardComponent = cardSize === 'large' ? LargeSongCard : SongCard;
  
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {songs.map((song) => (
        <CardComponent
          key={song.id}
          song={song}
          onPress={() => onSongPress(song)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});