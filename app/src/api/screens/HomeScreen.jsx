import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getPosts, deletePost } from '../jsonPlaceholder';

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await getPosts();
    setPosts(response.data);
  };

  const handleDelete = async (id) => {
    try {
      const response = await deletePost(id);
      console.log('Delete response:', response); // Log the response
      if (response.status === 200) {
        fetchPosts(); // Refresh the posts list after deletion
      } else {
        Alert.alert('Error', 'Failed to delete the post.');
      }
    } catch (error) {
      Alert.alert('Error', `Failed to delete the post: ${error.message}`);
    }
  };

  const handleNewPost = (newPost) => {
    // Add new post to the beginning of the posts array
    setPosts([newPost, ...posts]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(post) => post.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <TouchableOpacity>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.body}>{item.body}</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.viewButton]}
                onPress={() => navigation.navigate('Post', { id: item.id })}
              >
                <Text style={styles.buttonText}>View</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity
        style={[styles.button, styles.createButton]}
        onPress={() => navigation.navigate('CreatePost', { handleNewPost })}
      >
        <Text style={styles.buttonText}>Create Post</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  post: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  body: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  viewButton: {
    backgroundColor: '#1E90FF',
  },
  deleteButton: {
    backgroundColor: '#FF6347',
  },
  createButton: {
    backgroundColor: '#007BFF',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
