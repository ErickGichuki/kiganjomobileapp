import { View, Text, SafeAreaView, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const Register = () => {
    
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Register with us today!</Text>
        <Text style={styles.subtitle}>
          Register to get all info about the choir, lyrics, and upcoming recorded songs.
        </Text>
      </View>

      <View style={styles.form}>
        <TextInput 
          placeholder='Enter your username'
          style={styles.input}
        />
        <TextInput 
          placeholder='Enter your email'
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput 
          placeholder='Enter your password'
          secureTextEntry
          style={styles.input}
        />
        <TextInput 
          placeholder='Confirm your password'
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity style={styles.signupButton}>
          <Text style={styles.signupText}>Signup</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text>Already have an account? </Text>
          <TouchableOpacity>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F3',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  header: {
    alignItems: 'center',
    marginBottom: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555'
  },
  form: {
    width: '100%'
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 10
  },
  signupButton: {
    backgroundColor: '#4DE2F1',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  signupText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10
  },
  loginText: {
    color: '#22B8B6',
    fontWeight: 'bold'
  }
})
