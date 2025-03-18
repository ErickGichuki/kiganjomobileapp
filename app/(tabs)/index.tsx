import { Text, View } from "react-native";
import Header from "@/components/header";
import { StatusBar } from "expo-status-bar"; 
import Hero from "@/components/hero";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Header /> */}
      <Hero />
      <StatusBar backgroundColor="#161622" style="light"/>
    </View>
  );
}
