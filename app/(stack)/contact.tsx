import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ImageBackground } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import axios from 'axios';

const ContactPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    if (!email || !name || !subject || !message) {
      setStatus("Please fill all fields.");
      Alert.alert("Error", "All fields are required!");
      return;
    }

    try {
      await axios.post("https://kiganjochoir.onrender.com/account/contact/", {
        name,
        email,
        subject,
        message,
      });

      setStatus("Your message has been sent successfully!");
      Alert.alert("Success", "Your message has been sent successfully!");
      setEmail("");
      setName("");
      setSubject("");
      setMessage("");

      setTimeout(() => {
        setStatus("");
      }, 1500);
    } catch (error) {
      console.error("Error sending message: ", error);
      setStatus("Failed to send message! Please try again.");
      Alert.alert("Error", "Failed to send message! Please try again.");
    }
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <Text style={styles.title}>Talk to us Today</Text>
      <View className='justify-center my-6'>
        <Text className='text-lg'>Heard us before? <Text style={styles.talktoustext}>visit us on sabbath! we love visitors,cherish vistors and ofcourse mean it!</Text></Text>
        <Text className='text-lg'>If you got any questions kindly get in touch so that we can help you and know about Jesus.</Text>
      </View>
      <View style={styles.form}>
        {status ? <Text style={styles.status}>{status}</Text> : null}

        <TextInput
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          placeholder="Subject"
          value={subject}
          onChangeText={setSubject}
          style={styles.input}
        />
        <TextInput
          placeholder="Your Message"
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={4}
          style={[styles.input, styles.textArea]}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Send Message</Text>
        </TouchableOpacity>
      </View>

      <Image source={require('../../assets/images/contactus.png')} style={styles.image} />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 20,
    paddingTop: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  form: {
    width: '100%',
    marginBottom: 20,
  },
  status: {
    color: 'green',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#1E40AF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginTop: 20,
  },
  talktoustext: {
    color: '#9545B5',
    fontSize: 15
  }
});

export default ContactPage;
