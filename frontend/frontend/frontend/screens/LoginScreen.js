import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import axios from 'axios';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    try {
      const res = await axios.post('http://localhost:4000/api/users/login', { email, password });
      // Save token in AsyncStorage or Context
      Alert.alert('Επιτυχία', 'Συνδεθήκατε επιτυχώς!');
      navigation.navigate('Restaurants', { token: res.data.token });
    } catch (err) {
      Alert.alert('Σφάλμα', 'Λάθος email ή κωδικός');
    }
  }

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Κωδικός" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Σύνδεση" onPress={handleLogin} />
      <Button title="Εγγραφή" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}
