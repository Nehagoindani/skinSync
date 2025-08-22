import React, { useState } from 'react';
import Header from '../../component/Header';
import { moderateScale } from 'react-native-size-matters';
import {
  View, TextInput, Button, StyleSheet, Text,
  TouchableOpacity, KeyboardAvoidingView,
  Alert
} from 'react-native';

import auth from '@react-native-firebase/auth';
import {AppContext, useAppContext} from '../../Context/AppContext';


const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[username, setUsername] = useState('');
 
  const {setToken, setUser,user} = useAppContext(AppContext);



 const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing Info', 'Please enter both email and password');
      return;
    }

    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
        await user.updateProfile({
        displayName: username,
      });
      setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
       
      });
    
     setToken('abc')
     console.log('abc');
     
      Alert.alert('Login Success');
    } catch (error) {
      console.error('Login error', error);
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      <Text style={{
        fontSize: moderateScale(40, 0.1),
        textAlign: 'center',
fontFamily: '',
        fontWeight: 'bold',
        marginBottom: moderateScale(30, 0.1),
        color: '#FF6B6B',

      }}>Login</Text>
      <KeyboardAvoidingView style={{ justifyContent: 'center', marginTop: moderateScale(20), marginBottom: moderateScale(20) }}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
         {/* <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          keyboardType="text"
        /> */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('forgotPass')}
          style={styles.flink}>
          <Text style={{
            fontWeight: 'bold'
          }}>Forgot Password ?</Text>
        </TouchableOpacity>


        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
          style={styles.link}>
          <Text style={styles.fTxt}>Don’t have an account?</Text>
          <Text style={[styles.fTxt, { fontWeight: '900' }]}> Sign Up Now</Text>
        </TouchableOpacity>



      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    top: 10,
    flex: 1,
  },
  title: {
    // fontSize: 40,
    // marginBottom: 30,

    // color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 16,
    borderRadius: 6,
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
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  fTxt: {
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end',

  },
  flink: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: moderateScale(10, 0.1),
    marginTop: moderateScale(20, 0.1),
    fontWeight: 'bold',
  },
  link: {
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: moderateScale(-230, 0.1),
   
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Login
