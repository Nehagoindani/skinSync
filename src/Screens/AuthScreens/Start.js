import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Start=({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../images/back.webp')}
      style={styles.background}
    >
      <View style={styles.overlay}>
       <View style={styles.header}>
                <Image source={require('../../images/logo.png')} style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 180,
                  height: 70,
                }} resizeMode="contain" />
              {/* <Text style={styles.logo}>SkinSinc</Text> */}
            </View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
   header: {
    margin: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#FF6B6B',
  },
  button: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Start
