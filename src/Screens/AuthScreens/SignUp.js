import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth'; 
import { getFirestore, doc, setDoc } from '@react-native-firebase/firestore';
import Header from '../../component/Header';
import { moderateScale } from 'react-native-size-matters';
import {AppContext, useAppContext} from '../../Context/AppContext';
const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const[phoneNumber,setphoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {setUser} = useAppContext(AppContext);
 const storeUserInDb = async (uid, username, email) => {
  const db = getFirestore();
  const userRef = doc(db, 'users', uid);
  return await setDoc(userRef, {
    uid,
    username,
    email,
  });
};

  const handleSignup = async () => {
    if (!email || !password || !username) {
      Alert.alert('Missing Info', 'Please fill in all fields');
      return;
    }

    // setIsLoading(true);

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const uid = userCredential.user.uid;
      const user = userCredential.user;
        await user.updateProfile({
        displayName: username,
      });
     setUser({
        uid: user.uid,
        email: user.email,
        displayName: username,
        phoneNumber: user.phoneNumber,
       
      });
 

      console.log('User account created & signed in:', user);
      

      Alert.alert('Success', 'Account created successfully')
      navigation.navigate('Login');
      await storeUserInDb(uid, username, email);
      console.log('User account created & signed in!');
      
    } catch (error) {
      Alert.alert('Signup Failed', error.message);
      log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: moderateScale(20), fontSize: moderateScale(40) }}>
        <Text style={styles.title}>Sign Up</Text>
       
      </View>

      <KeyboardAvoidingView>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
         <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setphoneNumber}
          keyboardType="phone-pad"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity onPress={handleSignup} style={styles.button} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.link}>
          <Text style={styles.Ftxt}>Already have an account?</Text>
          <Text style={[styles.Ftxt, { fontWeight: '900' }]}> Login</Text>
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
  brandTitle: {
    fontSize: 40,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#FF6B6B',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 16,
    borderRadius: 6,
  },
  button: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  link: {
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: moderateScale(-200, 0.1),
   
  },
  Ftxt: {
    color: '#333',
  },
});

export default SignUp;
