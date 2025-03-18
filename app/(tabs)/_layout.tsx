import { Tabs } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import "../global.css";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: "#4A90E2",
        // tabBarInactiveTintColor: "#A0A0A0",
        tabBarStyle: {
          backgroundColor: "white", //#1E1E1E
          borderTopWidth: 0,
          paddingBottom: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Recordedsongs"
        options={{
          headerShown: false,
          tabBarLabel: "Songs",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="musical-notes-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          headerShown: false,
          tabBarLabel: "Contact",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="contacts" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          headerShown: false,
          tabBarLabel: "Login",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="lock-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
