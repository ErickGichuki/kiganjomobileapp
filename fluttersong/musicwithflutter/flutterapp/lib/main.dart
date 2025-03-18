import 'package:flutter/material.dart';
import 'songs.dart';
import 'contactus.dart';
import 'home.dart';

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
      initialRoute: '/',
      routes: {
        '/songs': (context) => RecordedSongs(),
        '/contact': (context) => ContactPage(),
        '/': (context) => HomePage(),
      },
    );
  }
}
