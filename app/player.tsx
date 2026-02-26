import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { setAudioModeAsync } from "expo-audio";
import Slider from "@react-native-community/slider";
import { useRouter } from "expo-router";
import { usePlayer } from "./context/PlayerContext"; 

const { width } = Dimensions.get("window");

export default function PlayerScreen() {
  const router = useRouter();
  const { 
    currentSong, 
    isPlaying, 
    currentTime, 
    duration,
    pauseSong,
    resumeSong,
    seekTo,
    setVolume,
  } = usePlayer();

  const [isLiked, setIsLiked] = useState(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    setAudioModeAsync({ playsInSilentMode: true });

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    if (!isMountedRef.current) return;
    
    if (isPlaying) {
      pauseSong();
    } else {
      resumeSong();
    }
  };

  const handleClose = () => {
    router.back();
  };

  if (!currentSong) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No song playing</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={["#5c4a3d", "#3d2f26", "#2a1f1a"]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose} style={styles.headerButton}>
          <Text style={styles.headerIcon}>⌄</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerSubtitle}>PLAYING FROM LIBRARY</Text>
          <Text style={styles.headerTitle}>{currentSong.album}</Text>
        </View>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerIcon}>•••</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.artworkContainer}>
        <View style={styles.artworkShadow}>
          <Image
            source={{ uri: currentSong.artwork }}
            style={styles.artwork}
            resizeMode="cover"
          />
        </View>
      </View>

      <View style={styles.songInfo}>
        <View style={styles.songTextContainer}>
          <Text style={styles.songTitle} numberOfLines={1}>
            {currentSong.title}
          </Text>
          <Text style={styles.artistName} numberOfLines={1}>
            {currentSong.artist}
          </Text>
        </View>
        <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
          <Text style={styles.likeIcon}>{isLiked ? "❤️" : "🤍"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.progressContainer}>
        <Slider
          style={styles.progressBar}
          minimumValue={0}
          maximumValue={duration || 1}
          value={currentTime}
          onSlidingComplete={(value) => seekTo(value)}
          minimumTrackTintColor="white"
          maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
          thumbTintColor="transparent"
        />
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
          <Text style={styles.timeText}>
            -{formatTime(duration - currentTime)}
          </Text>
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.controlIcon}>⏮</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePlayPause} style={styles.playButton}>
          <Text style={styles.playIcon}>{isPlaying ? "⏸" : "▶️"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.controlIcon}>⏭</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomControls}>
        <View style={styles.volumeContainer}>
          <Text style={styles.volumeIcon}>🔈</Text>
          <Slider
            style={styles.volumeSlider}
            minimumValue={0}
            maximumValue={1}
            value={1}
            onValueChange={(value) => setVolume(value)}
            minimumTrackTintColor="rgba(255, 255, 255, 0.9)"
            maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
            thumbTintColor="transparent"
          />
          <Text style={styles.volumeIcon}>🔊</Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity>
            <Text style={styles.actionIcon}>↻</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.actionIcon}>🎧</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.actionIcon}>☰</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.deviceName}>iPhone Speaker</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  errorText: {
    color: '#fff',
    fontSize: 18,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
  },
  headerButton: {
    padding: 5,
  },
  headerIcon: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "600",
  },
  headerCenter: {
    alignItems: "center",
  },
  headerSubtitle: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 3,
  },
  artworkContainer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 35,
  },
  artworkShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.6,
    shadowRadius: 35,
    elevation: 25,
  },
  artwork: {
    width: width - 70,
    height: width - 70,
    borderRadius: 8,
  },
  songInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  songTextContainer: {
    flex: 1,
    marginRight: 15,
  },
  songTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 6,
  },
  artistName: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 19,
    fontWeight: "400",
  },
  likeIcon: {
    fontSize: 28,
  },
  progressContainer: {
    paddingHorizontal: 25,
    marginBottom: 8,
  },
  progressBar: {
    width: "100%",
    height: 40,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  timeText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 13,
    fontWeight: "500",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 35,
  },
  controlButton: {
    padding: 10,
  },
  controlIcon: {
    color: "#fff",
    fontSize: 38,
    marginHorizontal: 20,
  },
  playButton: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  playIcon: {
    fontSize: 34,
  },
  bottomControls: {
    paddingHorizontal: 25,
    marginTop: "auto",
    paddingBottom: 40,
  },
  volumeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  volumeIcon: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.8)",
  },
  volumeSlider: {
    flex: 1,
    marginHorizontal: 12,
    height: 40,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
    gap: 50,
  },
  actionIcon: {
    fontSize: 26,
    color: "rgba(255, 255, 255, 0.8)",
  },
  deviceName: {
    color: "rgba(255, 255, 255, 0.75)",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});