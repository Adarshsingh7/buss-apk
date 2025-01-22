import { Stack, Tabs } from "expo-router";
import CustomHeader from "@/components/header";
import { Ionicons } from "@expo/vector-icons";

export default function layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Main",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          header: ({ navigation }) => (
            <CustomHeader
              rightIcon="map-outline"
              title="Home"
              onLeftPress={() => navigation.goBack()}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="location"
        options={{
          title: "Location",
          header: ({ navigation }) => (
            <CustomHeader
              title="Location"
              onLeftPress={() => navigation.goBack()}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="location" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          header: ({ navigation }) => (
            <CustomHeader
              title="Home"
              onLeftPress={() => navigation.goBack()}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
