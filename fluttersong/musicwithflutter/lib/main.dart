import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:audioplayers/audioplayers.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Recorded Songs',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: RecordedSongs(),
    );
  }
}

class RecordedSongs extends StatefulWidget {
  @override
  _RecordedSongsState createState() => _RecordedSongsState();
}

class _RecordedSongsState extends State<RecordedSongs> {
  List<dynamic> songs = [];
  bool isLoading = true;
  String? errorMessage;
  String searchTerm = '';
  AudioPlayer _audioPlayer = AudioPlayer();
  int? currentSongId;
  bool isPlaying = false;

  @override
  void initState() {
    super.initState();
    fetchSongs();
  }

  Future<void> fetchSongs() async {
    try {
      final response = await http.get(Uri.parse('https://kiganjochoir.onrender.com/recordedsongs/'));
      if (response.statusCode == 200) {
        setState(() {
          songs = json.decode(response.body);
          isLoading = false;
        });
      } else {
        setState(() {
          errorMessage = 'Failed to load songs. Please try again later.';
          isLoading = false;
        });
      }
    } catch (error) {
      setState(() {
        errorMessage = 'Failed to load songs. Please try again later.';
        isLoading = false;
      });
    }
  }

  void handlePlayPause(dynamic song) async {
    try {
      if (currentSongId == song['id'] && isPlaying) {
        await _audioPlayer.pause();
        setState(() => isPlaying = false);
      } else {
        await _audioPlayer.stop();
        await _audioPlayer.play(UrlSource(song['audio']));
        setState(() {
          currentSongId = song['id'];
          isPlaying = true;
        });
      }
    } catch (error) {
      print('Error handling audio: $error');
    }
  }

  @override
  void dispose() {
    _audioPlayer.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    List<dynamic> filteredSongs = songs
        .where((song) => song['title'].toLowerCase().contains(searchTerm.toLowerCase()))
        .toList();

    return Scaffold(
      backgroundColor: Colors.lightBlue[50],
      appBar: AppBar(
        title: Text(
          "May these songs bless you and prepare you for Jesus' return",
          textAlign: TextAlign.center,
          style: TextStyle(fontSize: 16),
        ),
        backgroundColor: Colors.blue[900],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              decoration: InputDecoration(
                hintText: "Search for a song",
                border: OutlineInputBorder(),
                prefixIcon: Icon(Icons.search),
              ),
              onChanged: (value) {
                setState(() => searchTerm = value);
              },
            ),
            SizedBox(height: 10),
            isLoading
                ? Center(child: CircularProgressIndicator())
                : errorMessage != null
                    ? Center(
                        child: Text(
                          errorMessage!,
                          style: TextStyle(color: Colors.red, fontSize: 16),
                          textAlign: TextAlign.center,
                        ),
                      )
                    : filteredSongs.isEmpty
                        ? Center(
                            child: Text(
                              "No songs available at the moment!",
                              style: TextStyle(fontSize: 16, color: Colors.grey),
                            ),
                          )
                        : Expanded(
                            child: ListView.builder(
                              itemCount: filteredSongs.length,
                              itemBuilder: (context, index) {
                                var song = filteredSongs[index];
                                return Card(
                                  margin: EdgeInsets.symmetric(vertical: 8),
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(10),
                                  ),
                                  child: ListTile(
                                    title: Text(
                                      "${index + 1}. ${song['title']}",
                                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                                    ),
                                    trailing: ElevatedButton(
                                      onPressed: () => handlePlayPause(song),
                                      style: ElevatedButton.styleFrom(
                                        backgroundColor: Colors.blue[600],
                                      ),
                                      child: Text(
                                        currentSongId == song['id'] && isPlaying ? "Pause" : "Play",
                                        style: TextStyle(color: Colors.white),
                                      ),
                                    ),
                                  ),
                                );
                              },
                            ),
                          ),
          ],
        ),
      ),
    );
  }
}
