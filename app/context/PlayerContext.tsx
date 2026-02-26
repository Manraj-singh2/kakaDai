import React, { createContext, useContext, useState } from 'react';
import { Song } from '../data/songs';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';

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
  const [audioUrl, setAudioUrl] = useState<string>('');
  
  const player = useAudioPlayer(audioUrl || '');
  const status = useAudioPlayerStatus(player);

  const playSong = (song: Song) => {
    setCurrentSong(song);
    setAudioUrl(song.audioUrl);
    
    //Small delay to ensure player is ready
    setTimeout(() => {
      player.play();
    }, 100);
  };

  const pauseSong = () => {
    try {
      if (status.playing) {
        player.pause();
      }
    } catch (error) {
      console.log('Pause error:', error);
    }
  };

  const resumeSong = () => {
    try {
      player.play();
    } catch (error) {
      console.log('Resume error:', error);
    }
  };

  const seekTo = (time: number) => {
    try {
      player.seekTo(time);
    } catch (error) {
      console.log('Seek error:', error);
    }
  };

  const setVolume = (volume: number) => {
    try {
      player.volume = volume;
    } catch (error) {
      console.log('Volume error:', error);
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