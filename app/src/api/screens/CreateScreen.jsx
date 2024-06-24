import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { createPost } from '../jsonPlaceholder';

const CreatePostScreen = ({ navigation, route }) => {
  const { handleNewPost } = route.params;
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleCreatePost = async () => {
    try {
      const response = await createPost({ title, body });
      handleNewPost(response.data); // Call the callback to update HomeScreen
      navigation.navigate('Home');
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Body"
        value={body}
        onChangeText={setBody}
        multiline
        numberOfLines={4}
      />
      <Button title="Create Post" onPress={handleCreatePost} color="#007BFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  input: {
    height: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top', // for Android to start the text from the top
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default CreatePostScreen;
