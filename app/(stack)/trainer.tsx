import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const Trainer = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View >
        <Text className='text-center'>Welcome to Trainers Dashboard1</Text>
        <Text>You'll be in a position to manage all the songs and hymns, users and get realtime messages.</Text>
        <View>
            <TouchableOpacity style={styles.manageSongsButton}>
                <Text>Manage Songs</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Meessages</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Create a Song</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Manage Lyrics</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Trainer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:10,
    },
    manageSongsButton: {
        backgroundColor: '#DADA3C',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
        borderRadius: 16
    },
    messages: {
        backgroundColor: '#124FDC',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    createasong: {
        backgroundColor: '#D764BE',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    lyrics: {
        backgroundColor: '#51D5B8',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16
    },
    logout: {
        backgroundColor: '#C51414',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    }
})