import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, Alert, Image
} from 'react-native';
import { useAppContext } from '../../Context/AppContext'; // update path if needed
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const profile = () => {
  const { user, setUser, setToken } = useAppContext();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('user in profile:', user);
    
    if (user) {
      setUsername(user.displayName || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleSave = async () => {
    const currentUser = auth().currentUser;

    if (!currentUser) {
      Alert.alert('Error', 'No user is currently logged in.');
      return;
    }

    setLoading(true);
    try {
      const updatedUser = {
        ...user,
        username: username.trim(),
      };

     
      await firestore()
        .collection('users')
        .doc(currentUser.uid)
        .update({
          username: updatedUser.username,
        });

      // Update Context API
      setUser(updatedUser);

      Alert.alert('Success', 'Profile updated successfully.');
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null); 
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
         <View style={styles.header}>
                  <Image source={require('../../images/logo.png')} style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 150,
                    height: 50,
                  }} resizeMode="contain" />
                {/* <Text style={styles.logo}>SkinSinc</Text> */}
              </View>
      <Text style={styles.title}>Profile</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        editable={false} 
      />

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder= {username}
      />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
        disabled={loading}
      >
        <Text style={styles.saveButtonText}>
          {loading ? 'Saving...' : 'Save Changes'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#fff',
    // justifyContent: 'center',
  },
   header: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 30,
    textAlign: 'center',
    color: '#FF6B6B',
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#FF6B6B',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#f2f2f2',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#E53935',
    fontWeight: 'bold',
  },
});

export default profile;
