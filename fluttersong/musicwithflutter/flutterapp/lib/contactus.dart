import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class ContactPage extends StatefulWidget {
  @override
  _ContactPageState createState() => _ContactPageState();
}

class _ContactPageState extends State<ContactPage> {
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _subjectController = TextEditingController();
  final TextEditingController _messageController = TextEditingController();
  String _status = "";

  Future<void> _handleSubmit() async {
    if (_nameController.text.isEmpty ||
        _emailController.text.isEmpty ||
        _subjectController.text.isEmpty ||
        _messageController.text.isEmpty) {
      setState(() {
        _status = "Please fill all fields.";
      });
      return;
    }

    try {
      final response = await http.post(
        Uri.parse("https://kiganjochoir.onrender.com/account/contact/"),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          "name": _nameController.text,
          "email": _emailController.text,
          "subject": _subjectController.text,
          "message": _messageController.text,
        }),
      );

      if (response.statusCode == 200) {
        setState(() {
          _status = "Your message has been sent successfully!!";
        });
        _nameController.clear();
        _emailController.clear();
        _subjectController.clear();
        _messageController.clear();
      } else {
        setState(() {
          _status = "Failed to send message! Please try again.";
        });
      }
    } catch (error) {
      setState(() {
        _status = "Error sending message! Please try again.";
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Talk to Us")),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "Heard us before? Visit us on Sabbath! We love and cherish visitors.",
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 10),
            if (_status.isNotEmpty)
              Text(
                _status,
                style: TextStyle(color: Colors.green, fontWeight: FontWeight.bold),
              ),
            TextField(
              controller: _nameController,
              decoration: InputDecoration(labelText: "Enter your name"),
            ),
            TextField(
              controller: _emailController,
              decoration: InputDecoration(labelText: "Enter your email"),
            ),
            TextField(
              controller: _subjectController,
              decoration: InputDecoration(labelText: "Subject"),
            ),
            TextField(
              controller: _messageController,
              decoration: InputDecoration(labelText: "Your Message"),
              maxLines: 5,
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: _handleSubmit,
              child: Text("Send Message"),
            ),
          ],
        ),
      ),
    );
  }
}