import React, { useEffect, useState } from 'react';
import { 
  View, Text, TextInput, FlatList, ActivityIndicator, 
  StyleSheet, TouchableOpacity 
} from 'react-native';
import axios from 'axios';
import { Audio } from 'expo-av';
import { StatusBar } from "expo-status-bar";

interface Song {
  id: number;
  title: string;
  audio: string;
}

const Recordedsongs: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentSound, setCurrentSound] = useState<Audio.Sound | null>(null);
  const [currentSongId, setCurrentSongId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get('https://kiganjochoir.onrender.com/recordedsongs/');
        setSongs(response.data);
      } catch (error) {
        console.error('Error fetching songs:', error);
        setError('Failed to load songs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  const handlePlayPause = async (song: Song) => {
    try {
      if (currentSound && currentSongId === song.id) {
        if (isPlaying) {
          await currentSound.pauseAsync();
          setIsPlaying(false);
        } else {
          await currentSound.playAsync();
          setIsPlaying(true);
        }
      } else {
        if (currentSound) {
          await currentSound.stopAsync();
          await currentSound.unloadAsync();
        }

        const { sound } = await Audio.Sound.createAsync({ uri: song.audio });
        setCurrentSound(sound);
        setCurrentSongId(song.id);
        setIsPlaying(true);
        await sound.playAsync();
      }
    } catch (error) {
      console.error('Error handling audio:', error);
    }
  };

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        May these songs bless you, touch you, and prepare you for the soon return of Jesus.
      </Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search for a song"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : songs.length === 0 ? (
        <Text style={styles.emptyText}>No songs available at the moment!</Text>
      ) : (
        <FlatList
          data={filteredSongs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.songContainer}>
              <Text style={styles.songTitle}>
                {index + 1}. {item.title}
              </Text>
              <TouchableOpacity 
                style={styles.playButton} 
                onPress={() => handlePlayPause(item)}
              >
                <Text style={styles.playButtonText}>
                  {currentSongId === item.id && isPlaying ? "Pause" : "Play"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
      
      <StatusBar backgroundColor="#161622" style="light"/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    paddingVertical: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0D47A1',
    marginBottom: 10,
    marginHorizontal: 20,
  },
  searchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'gray',
    width: '80%',
    backgroundColor: 'white',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    fontSize: 16,
    marginTop: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 16,
    marginTop: 10,
  },
  songContainer: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  songTitle: {
    fontSize: 18,
    color: '#0D47A1',
    fontWeight: '600',
  },
  playButton: {
    backgroundColor: '#1E88E5',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  playButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Recordedsongs;
