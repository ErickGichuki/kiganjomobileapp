import { Stack } from "expo-router";
import '../global.css'

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(stack)/contact" options={{ title: "Contact Us" }} />
      <Stack.Screen name="(stack)/register" options={{ title: "Register with us!" }} />
      <Stack.Screen name="(stack)/trainer" options={{ title: "Trainers Dshboard!" }} />
    </Stack>
  );
}
