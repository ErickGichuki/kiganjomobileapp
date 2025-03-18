import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Link } from "expo-router";

const Hero = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.circle1} />
          <View style={styles.circle2} />

          <Image source={require("../assets/images/logo.png")} style={styles.logo} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.title}>Welcome to SDA Kiganjo Church Choir</Text>

          <Image source={require("../assets/images/musicb.png")} style={styles.musicPlayer} />

          <Text style={styles.message}>
            Sing with the spirit and understanding. {"\n"}
            Let everything that has breath praise {"\n"}
            the Lord! Amen! Read in (psalms 150:1)
          </Text>

          <TouchableOpacity style={styles.buttonPrimary}>
            <Link href="/Recordedsongs" style={styles.buttonText}>Our Songs</Link>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonSecondary}>
            <Link href="/(stack)/contact" style={styles.buttonText}>Get in Touch</Link>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Hero;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F3",
    marginTop: 20
  },
  header: {
    position: "relative",
    width: "100%",
    height: 80,
    justifyContent: "center",
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    position: "absolute",
    top: 10,
    right: 10,
    borderRadius: 100,
  },
  circle1: {
    width: 100,
    height: 100,
    backgroundColor: "#B3E5FC",
    borderRadius: 50,
    position: "absolute",
    top: -20,
    left: -40,
  },
  circle2: {
    width: 100,
    height: 100,
    backgroundColor: "#B1F5FE",
    borderRadius: 50,
    position: "absolute",
    top: -50,
    left: 20,
  },
  scrollView: {
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  musicPlayer: {
    width: 250,
    height: 300,
    resizeMode: "contain",
    marginBottom: 15,
  },
  message: {
    textAlign: "center",
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  buttonPrimary: {
    backgroundColor: "#E57373",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 10,
  },
  buttonSecondary: {
    backgroundColor: "#81D4FA",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
