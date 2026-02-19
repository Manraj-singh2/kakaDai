import { View, StyleSheet, Button } from 'react-native';
import { useAudioPlayer } from 'expo-audio';

const audioSource = 'https://dl2.djring.com/sd2.djjohal.com/128/525531/Rang(DJJOhAL.Com).mp3'

export default function HomeScreen() {
  const player = useAudioPlayer(audioSource);

  return (
    <View style={styles.container}>
      <Button title="Play Sound" onPress={() => player.play()} />
      <Button title="Pause Sound" onPress={() => player.pause()} />
      <Button
        title="Replay Sound"
        onPress={() => {
          player.seekTo(0);
          player.play();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});


