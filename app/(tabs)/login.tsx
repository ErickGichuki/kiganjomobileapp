import { SafeAreaView, Image, Text, View, TextInput, TouchableOpacity, StyleSheet, Switch } from 'react-native'
import React, { useState } from 'react'
import { Link, useRouter } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from 'axios';
import { Alert } from 'react-native';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [see, setSee] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://kiganjochoir.onrender.com/account/login/', {
        email,
        password,
      });

      await AsyncStorage.setItem('access_token', response.data.access_token);
      await AsyncStorage.setItem('refresh_token', response.data.refresh_token);
      await AsyncStorage.setItem('role', response.data.role);

      if (response.data.role === 'trainer'){
        router.push('/trainer')
      }
      else {
        router.push('/lyrics')
      }
    } catch (error: any){
      Alert.alert(
        "Login failed",
        error.response?.data?.detail || "Something went wrong"
      )
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View className="py-10">
        <Text className="font-bold text-lg text-center mb-4">Welcome back to the ministry!</Text>
        <Image 
          source={require('../../assets/images/login.png')}
          resizeMode="contain"
          className="w-full h-48 mb-6"
        />
      </View>

      <View className="w-full px-6">
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!see}
          style={styles.input}
        />

        <TouchableOpacity className="self-end mb-4">
          <Text className="text-blue-600">Forgot your password?</Text>
        </TouchableOpacity>
        <View style={styles.switchContainer}>
          <Switch
            value={see}
            onValueChange={() => setSee(!see)}
            trackColor={{ false: "#ccc", true: "#3b82f6"}}
            thumbColor={see ? "#fff" : "#f4f4f4"}
          />
          <Text style={styles.switchText}>Show Password</Text>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text className="text-white text-center font-semibold">Login</Text>
        </TouchableOpacity>

        <View className='items-center justify-center flex-row mt-4'>
          <Text className="text-center">
            Don't have an account? 
            < Link href='/(stack)/register'style={styles.signupText}> Signup</Link>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F3',
    justifyContent: 'center'
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  switchText: {
    fontSize: 14,
    color: "#4b5563",
    marginLeft: 8,
  },
  loginButton: {
    backgroundColor: '#124FDC',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  signupText: {
    color: '#124FDC',
    fontWeight: 'bold',
    marginLeft: 4,
  }
})
