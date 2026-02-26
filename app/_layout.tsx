import { Stack } from 'expo-router';
import { PlayerProvider } from './context/PlayerContext';

export default function RootLayout() {
  return (
    <PlayerProvider>
      <Stack>
        <Stack.Screen 
          name="(tabs)" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="player" 
          options={{
            presentation: 'modal',
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'vertical',
            animation: 'slide_from_bottom',
          }} 
        />
      </Stack>
    </PlayerProvider>
  );
}