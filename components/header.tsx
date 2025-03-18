import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react'

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoRow}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.title}>SDA Church Choir</Text>
      </View>
      <Text style={styles.tagline}>Singing to Glorify God</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E88E5',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  tagline: {
    fontSize: 14,
    color: '#E3F2FD',
    marginTop: 5,
    textAlign: 'center',
  },
});
  

export default Header