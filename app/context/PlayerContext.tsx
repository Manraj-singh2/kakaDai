import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Song } from '../data/songs';
import { useAudioPlayer, useAudioPlayerStatus, setAudioModeAsync } from 'expo-audio';

interface PlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playSong: (song: Song) => void;
  pauseSong: () => void;
  resumeSong: () => void;
  seekTo: (time: number) => void;
  setVolume: (volume: number) => void;
  player: any;
  status: any;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const isInitialized = useRef(false);
  
  // Create player ONCE with empty string
  const player = useAudioPlayer('');
  const status = useAudioPlayerStatus(player);

  // Configure audio mode once on mount
  useEffect(() => {
    if (!isInitialized.current) {
      setAudioModeAsync({ playsInSilentMode: true });
      isInitialized.current = true;
    }
  }, []);

  const playSong = (song: Song) => {
    try {
      // If same song, just play
      if (currentSong?.id === song.id) {
        player.play();
        return;
      }

      // Stop current playback if any
      if (status.playing) {
        player.pause();
      }

      // Replace the source directly
      player.replace(song.audioUrl);
      
      // Update state
      setCurrentSong(song);
      
      // Play immediately - no timeout needed!
      player.play();
    } catch (error) {
      console.error('Play song error:', error);
    }
  };

  const pauseSong = () => {
    try {
      if (status.playing) {
        player.pause();
      }
    } catch (error) {
      console.error('Pause error:', error);
    }
  };

  const resumeSong = () => {
    try {
      player.play();
    } catch (error) {
      console.error('Resume error:', error);
    }
  };

  const seekTo = (time: number) => {
    try {
      player.seekTo(time);
    } catch (error) {
      console.error('Seek error:', error);
    }
  };

  const setVolume = (volume: number) => {
    try {
      player.volume = volume;
    } catch (error) {
      console.error('Volume error:', error);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying: status.playing || false,
        currentTime: status.currentTime || 0,
        duration: status.duration || 0,
        playSong,
        pauseSong,
        resumeSong,
        seekTo,
        setVolume,
        player,
        status,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within PlayerProvider');
  }
  return context;
}