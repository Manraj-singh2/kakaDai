import { Tabs } from "expo-router";
import React from "react";
import { BlurView } from "expo-blur";
import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorScheme === "dark" ? "#fff" : "#007AFF",
        tabBarInactiveTintColor: colorScheme === "dark" ? "#8E8E93" : "#8E8E93",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          position: "absolute",
          bottom: 9,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "transparent",
          borderTopWidth: 0,
          height: 65,
          borderRadius: 30,
          paddingBottom: 10,
          paddingTop: 8,
          overflow: "hidden",
          shadowColor: colorScheme === "dark" ? "#000" : "#000",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: colorScheme === "dark" ? 0.6 : 0.15,
          shadowRadius: 25,
        },
        tabBarBackground: () => (
          <BlurView
            intensity={20}
            tint={colorScheme === "dark" ? "dark" : "light"}
            style={{
              position: "absolute",
              top: 0,
              left: 6,
              right: 6,
              bottom: 0,
              backgroundColor:
                colorScheme === "dark"
                  ? "rgba(10, 10, 15, 0.4)"
                  : "rgba(255, 255, 255, 0.5)", 
              overflow: "hidden",
              borderRadius: 30,
              borderWidth: 1,
              borderColor:
                colorScheme === "dark"
                  ? "rgba(255, 255, 255, 0.2)"
                  : "rgba(255, 255, 255, 0.8)",
            }}
          />
        ),
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Listen Now",
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={focused ? 30 : 26}
              name="play.circle.fill"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Browse",
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={focused ? 30 : 26}
              name="square.grid.2x2.fill"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: "Library",
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={focused ? 30 : 26}
              name="music.note.list"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={focused ? 30 : 26}
              name="magnifyingglass"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
